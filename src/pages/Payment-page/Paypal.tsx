/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { getUserIdFromToken, getAddressFromToken } from "../../utils/jwtHelper";
import { useEffect } from "react";
import swal from "sweetalert";
import { ordersPaypal } from "../../apiServices/OrderServices/OrderServices";
import { useNavigate } from "react-router-dom";
import { iProduct } from "../../interfaces";
import { useCart } from "../Cart-page/CartContext";
import { refreshToken } from "../../apiServices/AccountServices/refreshTokenServices";

type PayPalButtonStyle = {
  layout?: "vertical" | "horizontal";
};

// Style Paypal
const style: PayPalButtonStyle = {
  layout: "vertical",
};

interface ButtonWrapperProps {
  currency: string;
  showSpinner: boolean;
  amount: any;
  shippingMethodIdPay: number;
  total: number;
  selectedVoucher: any;
}

// Layout Loading Screen Paypal
const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  currency,
  showSpinner,
  amount,
  shippingMethodIdPay,
  total,
  selectedVoucher,
}) => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency, showSpinner]);

  const handlePaymentSuccess = async (_data: any, actions: any) => {
    try {
      const response = await actions.order.capture();
      console.log(response);

      if (response.status === "COMPLETED") {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found");
          return;
        }

        const userIdFromToken = getUserIdFromToken(token);
        const userAddress = getAddressFromToken(token);

        const userId = parseInt(userIdFromToken);
        const orderDate = new Date().toISOString();
        const shippingMethodId = shippingMethodIdPay; // From web
        const paymentMethod = "By Paypal"; // From web
        const address = String(userAddress); // From web
        const voucherId =  selectedVoucher 
      
        const products = cart.map((product: iProduct) => ({
          productId: product.productId,
          nameProduct: product.name,
          quantity: product.quantity,
          price: product.price,
          total: product.quantity * product.price,
        }));
        console.log("Check data products", JSON.stringify(products));
        const order = {
          userId,
          orderDate,
          address,
          paymentMethod,
          shippingMethodId,
          voucherId,
          total: total,
          products,
        };
        console.log("Check data order:   ", JSON.stringify(order)); //
        //const apiResponse = await ordersPaypal2(order)
        const apiResponse = await ordersPaypal(order, token);

        if (!apiResponse) {
          throw new Error("Failed to store cart data");
        }
        
        if (response.status === 401) {
          await refreshToken();
        }
        localStorage.removeItem("cart");
        localStorage.removeItem("currentQuantities");
        swal("Congrat!", "Order was created!", "success").then(() => {
          
          window.location.href = "/processing";
        });
      }
    } catch (error) {
      console.error("Error storing cart data:", error);
    }
  };

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[style, currency, amount]}
        fundingSource={undefined}
        createOrder={(_data, actions) =>
          actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
            intent: "CAPTURE", // or "AUTHORIZE"
          })
        }
        onApprove={handlePaymentSuccess}
      />
    </>
  );
};

export default function Paypal({
  amount,
  shippingMethod,
  total,
  selectedVoucher,
}: {
  amount: any;
  shippingMethod: number;
  total: number;
  selectedVoucher: any;
}) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "156px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          shippingMethodIdPay={shippingMethod}
          total={total}
          selectedVoucher={selectedVoucher}
        />
      </PayPalScriptProvider>
    </div>
  );
}

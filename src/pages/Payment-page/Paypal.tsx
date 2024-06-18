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

type PayPalButtonStyle = {
  layout?: "vertical" | "horizontal";
};

// Style Paypal
const style: PayPalButtonStyle = {
  layout: "vertical",
};


interface ButtonWrapperProps {
  currency: string,
  showSpinner: boolean,
  amount: any,
  payload: any,
  shippingMethodIdPay: number
  total: number
}


// Layout Loading Screen Paypal
const ButtonWrapper: React.FC<ButtonWrapperProps>  = ({
  currency,
  showSpinner,
  amount,
  payload,
  shippingMethodIdPay,
  total
}) => {

  const navigate = useNavigate();

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
      console.log(payload);

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
        const address = userAddress; // From web

        const products = payload.map((product: any) => ({
          productId: product.productId,
          quantity: product.quantity,
          price: product.price,
          total: product.quantity * product.price,
        }));

        const order = {
          userId,
          orderDate,
          address,
          paymentMethod,
          shippingMethodId,
          products,
          total: total
        };
        console.log(JSON.stringify(order));//
        const apiResponse = await ordersPaypal(order,token)

        if (!apiResponse) {
          throw new Error("Failed to store cart data");
        }

        localStorage.removeItem("cart");
        localStorage.removeItem("currentQuantities");
        swal("Congrat!", "Order was created!", "success").then(() => {
          navigate("/processing");
        });
        
        const data = await apiResponse.data;//
        console.log("Cart data stored:", data);//
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

export default function Paypal({ amount, payload, shippingMethod, total } : {amount: any, payload: any, shippingMethod: number, total: number}) {

  return (
    <div style={{ maxWidth: "750px", minHeight: "156px" }}>
      <PayPalScriptProvider
        options={{ clientId: "test", components: "buttons", currency: "USD" }}
      >
        <ButtonWrapper
          payload={payload}
          currency={"USD"}
          amount={amount}
          showSpinner={false}
          shippingMethodIdPay={shippingMethod}
          total={total}
        />
      </PayPalScriptProvider>
    </div>
  );
}

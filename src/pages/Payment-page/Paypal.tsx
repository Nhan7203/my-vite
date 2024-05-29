import { useEffect } from "react";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../context/ShopContext'
import swal from "sweetalert";
import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer
} from "@paypal/react-paypal-js";


// Style Paypal
const style = { "layout": "vertical" };


// Layout Loading Screen Paypal
const ButtonWrapper = ({ currency, showSpinner, amount, payload }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
        dispatch({
            type: 'resetOptions',
            value: {
                ...options,
                currency: currency
            }
        });
    }, [currency, showSpinner]);

    const handlePaymentSuccess = async (data, actions) => {
        try {
            const response = await actions.order.capture();
            console.log(response);
            console.log(payload);

            if (response.status === "COMPLETED") {
                const token = localStorage.getItem('token');

                if (!token) {
                    console.error('Token not found');
                    return;
                }

                const decodedToken = jwtDecode(token) as JwtPayload;
                const userId = decodedToken.userId;
                const orderDate = new Date().toISOString();
                const shippingMethodId = 1;         // From web
                const paymentMethod = "By Paypal";  // From web
                const address = "456";              // From web

                const products = payload.map((product) => ({
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
                    products
                };

                const apiResponse = await fetch('', {    //https://localhost:7030/api/orders
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify(order),
                });

                if (!apiResponse.ok) {
                    throw new Error('Failed to store cart data');
                }

                localStorage.removeItem("cart");
                swal("Congrat!", "Order was created!", "success");
                //window.location.href = '/OrderDetailPage';
            }
        } catch (error) {
            console.error('Error storing cart data:', error);
        }
    };

    return (
        <>
            {(showSpinner && isPending) && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: currency,
                                value: amount
                            }
                        }
                    ],
                    intent: "CAPTURE" // or "AUTHORIZE"
                })}
                onApprove={handlePaymentSuccess}
            />
        </>
    );
};

export default function Paypal({ amount, payload }) {
    return (
        <div style={{ maxWidth: "750px", minHeight: "156px" }}>
            <PayPalScriptProvider options={{ clientId: "test", components: "buttons", currency: "USD" }}>
                <ButtonWrapper payload={payload} currency={'USD'} amount={amount} showSpinner={false} />
            </PayPalScriptProvider>
        </div>
    );
}
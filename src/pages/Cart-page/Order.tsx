import { useEffect, useState } from 'react';
import { useCart } from './CartContext';

const OrderForm = () => {
    const { cart } = useCart();
    const [orderData, setOrderData] = useState<{ products: any; token: string }>({
        products: [],
        token: "authentication token"
    });

    useEffect(() => {
        const products = cart.map((product) => ({
            isActive: product.isActive,
            productId: product.productId,
            quantity: product.quantity,
        }));

        setOrderData((prevOrderData) => ({ ...prevOrderData, products}));
    }, [cart]);

    const handleSubmit = () => {
        console.log(cart)
        fetch('<API endpoint URL>', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${orderData.token}`
            },
            body: JSON.stringify(orderData)
        })
            .then((response) => response.json())
            .then((data) => {
                // Handle the response from the API
                console.log(data); // Replace with your logic
            })
            .catch((error) => {
                // Handle the error
                console.error(error); // Replace with your error handling logic
            });
    };

    return (
        <button onClick={handleSubmit}>Submit Order</button>
    );
};

export default OrderForm;
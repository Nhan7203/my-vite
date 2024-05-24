import { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import { Product } from '../../context/ShopContext';

const OrderForm = () => {
    const { cart } = useCart();
    const [orderData, setOrderData] = useState<{ products: Product[]; token: string }>({
        products: [],
        token: "authentication token"
    });

    useEffect(() => {
        const products = cart.map((product) => ({
            brandId: product.brandId,
            categoryId: product.categoryId,
            description: product.description,
            forAgeId: product.forAgeId,
            imageProducts: product.imageProducts,
            isActive: product.isActive,
            name: product.name,
            price: product.price,
            productId: product.productId,
            quantityInStock: product.quantityInStock,
            stock: product.stock
        }));

        setOrderData((prevOrderData) => ({ ...prevOrderData, products }));
    }, [cart]);

    const handleSubmit = () => {
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
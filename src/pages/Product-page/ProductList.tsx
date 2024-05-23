import React from "react";

interface ProductProps {
    name: string;
    price: number;
    imageUrl: string;
}

const ProductList: React.FC<ProductProps> = ({ name, price, imageUrl }) => {
    return (
        <div className="product-list">
            <img src={imageUrl} alt={name} />
            <h4>{name}</h4>
            <p>Price : ${price}</p>

        </div>
    )
}
export default ProductList;
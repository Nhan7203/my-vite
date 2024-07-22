import React from "react";
import { Link } from "react-router-dom";
import { BsCart3 } from "../../../import/import-libary";
import { by } from "../../../import/import-assets";
import { RatingDetails, aProduct } from "../../../interfaces";

interface ListProductProps {
    products: aProduct[]
    activeOrder: string
    ratings: {
        [key: string]: RatingDetails;
    }
    renderStars: (averageRating: number) => JSX.Element[]
    handleOrderChange: (value: string) => void
    HandleAddToCartClick: (product: aProduct) => void
}

const ListProduct: React.FC<ListProductProps> = ({
  products,
  ratings,
  renderStars,
  activeOrder,
  handleOrderChange,
  HandleAddToCartClick
}) => {
  return (
    <div className="main-pro-list">
      <div
        style={{
          position: "sticky",
          clear: "both",
          zIndex: 500,
          top: "215px",
          background: " #f5f7fc",
          height: "70px",
        }}
      >
        <div className="head-sort">
          <ul>
            <li
              className={activeOrder === "price" ? "active" : ""}
              onClick={() => handleOrderChange("price")}
            >
              Price Low - High
            </li>
            <li
              className={activeOrder === "priceDesc" ? "active" : ""}
              onClick={() => handleOrderChange("priceDesc")}
            >
              Price High - Low
            </li>
          </ul>
        </div>
      </div>
      {products.length > 0 ? (
        <div className="result-product">
          {products.map((product) => {
            const productRating = ratings[product.productId] || {
              averageRating: 0,
              totalRating: 0,
              reviewCount: 0,
            };

            return (
              <div className="element-product" key={product.productId}>
                <div className="element-img">
                  <Link to={`/productDetails/${product.productId}`}>
                    <img
                      src={product.imageProducts[0].imageUrl}
                      className="imgpng"
                      alt=""
                    />
                  </Link>
                </div>
                <p className="element-name">{product.name}</p>
                <div className="rate-sold-2">
                  <div className="rating-stars">
                    {renderStars(productRating.averageRating)}
                  </div>
                  <p>Total: {productRating.reviewCount}</p>
                </div>
                <div className="body-text">
                  <span className="element-price">
                  ₫{product.price.toLocaleString()}{" "}
                  </span>
                  <div className="box-icon-product-page">
                    <BsCart3
                      className="icon-cart-product-page"
                      fontSize="1.4em"
                      onClick={() => HandleAddToCartClick(product)}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="box-empty">
          <img src={by} className="ra-img" alt="" />
          <p>No matching results were found</p>
        </div>
      )}
    </div>
  );
};

export default ListProduct;

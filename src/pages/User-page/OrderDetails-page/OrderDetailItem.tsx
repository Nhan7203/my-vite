/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { OrderDetail, aProduct } from "../../../interfaces";

interface Product {
  productId: number;
}

interface OrderDetailItemProps {
  orderId: string | undefined;
  orderDetails: OrderDetail[];
  products: aProduct[];
  selectedStars: number;
  orderStatus: any;
  comment: string;
  showRatingBox: boolean;
  selectedProducts: Product[];
  handleAddToCart: (product: aProduct, quantity: number) => void;
  handleRate: (product: aProduct, orderDetail: OrderDetail) => void;
  handleStarClick: (star: number) => void;
  handleRatingSubmit: () => Promise<void>;
  handleRatingCancel: (productToRemove: Product | undefined) => void;
  handleCancelClick: (orderId: number) => void
  handleReceiveClick: (orderId: number) => void
  setComment: (value: React.SetStateAction<string>) => void;
  
}

const OrderDetailItem: React.FC<OrderDetailItemProps> = ({
  orderId,
  orderDetails,
  products,
  orderStatus,
  selectedStars,
  handleAddToCart,
  handleRate,
  handleStarClick,
  handleRatingSubmit,
  handleRatingCancel,
  handleCancelClick,
  handleReceiveClick,
  setComment,
  comment,
  selectedProducts,
  showRatingBox,
}) => {
  return (
    <div className="box-orderdeatail">
      <div className="Cart-Summary">
        <h2>Order: {orderId}</h2>
        <ul>
          <li>Price</li>
          <li className="quantity">Quantity</li>
          <li className="total-amount">Total amount</li>
        </ul>
      </div>
      <div
        style={{
          overflow: "auto",
          height: "355px",
          borderTop: "1px solid #eaeaea",
        }}
      >
        {orderDetails.map((orderDetail) => {
          const product = products.find(
            (p) => p.productId === orderDetail.productId
          );

          return (
            <div className="detail-order" key={orderDetail.productId}>
              <div className="order-list">
                <div className="img">
                  <img
                    src={product?.imageProducts[0].imageUrl}
                    className="ma"
                    alt=""
                  />
                </div>
                <div className="name">{product?.name}</div>
                <div className="price-order">
                  ${product?.price.toLocaleString()}
                </div>
                <div className="quantity-count">
                  {`${orderDetail.quantity}`}
                </div>
                <div className="money">
                  ${orderDetail.total.toLocaleString()}
                </div>
                {orderStatus === "Completed" && (
                  <div className="">
                    {product && (
                      <div className="add-product" style={{ width: "280px" }}>
                        <button
                          onClick={() =>
                            handleAddToCart(product, orderDetail.quantity)
                          }
                        >
                          add
                        </button>
                        {!selectedProducts.some(
                          (p) => p.productId === product.productId
                        ) && (
                          <button
                            onClick={() => handleRate(product, orderDetail)}
                          >
                            Rate
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
              {showRatingBox && (
                <div className="rating-box-overlay">
                  <div className="rating-box">
                    <h3>Rate the Product</h3>
                    <div className="stars">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span
                          key={star}
                          className={`star ${
                            selectedStars >= star ? "filled" : ""
                          }`}
                          onClick={() => handleStarClick(star)}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Leave a comment (optional)"
                    />
                    <div className="rating-buttons">
                      <button onClick={handleRatingSubmit}>Submit</button>

                      {selectedProducts.length > 0 && (
                        <button
                          onClick={() =>
                            handleRatingCancel(
                              selectedProducts[selectedProducts.length - 1]
                            )
                          }
                        >
                          Cancel Rating
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {orderStatus === "Pending" && (
        <div
          className="add-product"
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <button onClick={() => handleCancelClick(parseInt(orderId ?? ""))}>
            Cancel Order
          </button>
        </div>
      )}
      {orderStatus === "Submitted" && (
        <div
          className="add-product"
          style={{ display: "flex", flexDirection: "row-reverse" }}
        >
          <button onClick={() => handleReceiveClick(parseInt(orderId ?? ""))}>
            Received
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderDetailItem;

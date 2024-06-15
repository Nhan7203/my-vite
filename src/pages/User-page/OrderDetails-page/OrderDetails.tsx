import {
  useEffect,
  useState,
  useCart,
  swal,
  swal2,
  useCallback,
} from "../../../import/import-another";
import { review } from "../../../apiServices/UserServices/userServices";
import { useLocation } from "react-router-dom";
import { Navbar, Footer, BoxMenuUser } from "../../../import/import-components";
import { OrderDetail, aProduct } from "../../../interfaces";

// import { getUserReview } from "../../../apiServices/ReviewServices/reviewServices";

import "./OrderDetails.css";
import {
  useHandleCancelOrder,
  useHandleOrderReceived,
} from "../components/HandleOrder";

import { useOrderDetails } from "./useOrderDetails";

const OrderDetails = () => {
  const { orderDetails, products, currentUserId, orderData, orderId, token } =
    useOrderDetails();
  const location = useLocation();
  const { orderStatus } = location.state;
  const [comment, setComment] = useState<string>("");
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail>();
  const [showRatingBox, setShowRatingBox] = useState<boolean>(false);

  // const fetchUserReviews = useCallback(
  //   async (userId: string) => {
  //     try {
  //       const response = await getUserReview(userId, orderId ?? "", token);
  //       if (response) {
  //         console.log(response);
  //       } else {
  //         throw new Error("Failed to fetch GetUserReview");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching GetUserReview:", error);
  //     }
  //   },
  //   [orderId, token]
  // );

  // useEffect(() => {
  //   if (currentUserId) {
  //     fetchUserReviews(currentUserId);
  //   }
  // }, [currentUserId, fetchUserReviews]);

  //---------------------------------------------- quantitty handle -------------------------------------------------------------

  interface CurrentQuantities {
    [key: string]: number;
  }
  const { addToCart2 } = useCart();
  const [currentQuantities, setCurrentQuantities] = useState<CurrentQuantities>(
    {}
  );

  useEffect(() => {
    const storedQuantitiesStr = localStorage.getItem("currentQuantities");
    const storedQuantities = storedQuantitiesStr
      ? JSON.parse(storedQuantitiesStr)
      : {};
    setCurrentQuantities(storedQuantities);
  }, []);

  const handleAddToCart = (product: aProduct, quantity: number) => {
    if (product.stock > 0) {
      const newCurrentQuantities = { ...currentQuantities };
      const newQuantity =
        (newCurrentQuantities[product.productId] || 0) + quantity;

      if (newQuantity > product.stock) {
        swal2
          .fire({
            title: `${newCurrentQuantities[product.productId]}/ ${
              product.stock
            }`,
            text: `You cannot order more than ${product.stock} items of this product.`,
            icon: "info",
          })
          .then(() => {
            return;
          });
      } else {
        newCurrentQuantities[product.productId] = newQuantity;
        setCurrentQuantities(newCurrentQuantities);
        localStorage.setItem(
          "currentQuantities",
          JSON.stringify(newCurrentQuantities)
        );
        addToCart2(product, quantity, "add");
      }
    } else {
      try {
        swal({
          title: "Out of stock",
          text: "This product is currently out of stock, but you can place a pre-order.",
          icon: "info",
          buttons: ["Cancel", "Confirm"],
          dangerMode: true,
        }).then(async (confirm) => {
          if (confirm) {
            addToCart2(product, quantity, "add");
          }
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };
  
  //-----------------------------------------  Order handle ---------------------------------------------------------------

  const { handleCancelOrder } = useHandleCancelOrder();
  const { handleOrderReceived } = useHandleOrderReceived(orderData);

  const handleCancelClick = (orderId: number) => {
    handleCancelOrder(orderId);
  };

  const handleReceiveClick = (orderId: number) => {
    handleOrderReceived(orderId);
  };
//----------------------------------------------------------------------------------------------------------------------------
  interface Product {
    productId: number;
  }

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleRate = (product: Product, orderDetail: OrderDetail) => {
    setSelectedProducts([...selectedProducts, product]);
    setSelectedOrderDetail(orderDetail);
    setShowRatingBox(true);
    setSelectedProduct(product);
  };

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
  };
  //---------------------------------------------- Rate cancel handle --------------------------------------

  const handleRatingCancel = (productToRemove: Product | undefined) => {
    const orderData: OrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    if (orderId && orderData[orderId]) {
      const updatedSelectedProducts = orderData[orderId].filter(
        (product) => product.productId !== productToRemove?.productId
      );
      const updatedOrderData: OrderData = {
        ...orderData,
        [orderId]: updatedSelectedProducts,
      };
      localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
      setSelectedProducts(updatedSelectedProducts);
    }

    setShowRatingBox(false);
    setSelectedStars(0);
    setComment("");
  };
  //--------------------------------------- Submit handle ---------------------------------------------

  const handleRatingSubmit = useCallback(async () => {
    if (selectedProducts.length === 0 || !selectedOrderDetail) return;

    const rating = selectedStars || 1;

    const reviewData = {
      userId: parseInt(currentUserId),
      orderDetailId: parseInt(orderId ?? ""),
      productId: selectedProduct?.productId,

      date: new Date().toISOString(),
      rating: rating,
      comment: comment || "",
      isRated: false,
    };
    console.log("h0000", reviewData);
    try {
      const response = await review(token, reviewData);

      if (response) {
        swal("Success!", "Your review has been submitted.", "success");
        setShowRatingBox(false);
        setSelectedStars(0);
        setComment("");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      swal("Error", "Failed to submit your review. Please try again.", "error");
    }
  }, [
    comment,
    orderId,
    selectedOrderDetail,
    selectedProduct?.productId,
    selectedProducts.length,
    selectedStars,
    token,
    currentUserId,
  ]);

  //------------------------------------------------- localStorage orderData ------------------------------------------

  interface OrderData {
    [orderId: string]: Product[];
  }

  useEffect(() => {
    if (orderId && selectedProducts.length > 0) {
      const orderData: OrderData = {
        ...JSON.parse(localStorage.getItem("orderData") || "{}"),
        [orderId]: selectedProducts,
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));
    }
  }, [orderId, selectedProducts]);

  // Đọc dữ liệu từ localStorage
  useEffect(() => {
    const orderData: OrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    if (orderId) {
      setSelectedProducts(orderData[orderId] || []);
    } else {
      setSelectedProducts([]);
    }
  }, [orderId]);

  return (
    <div>
      <Navbar />
      <div className="body-user">
        <div>
          <BoxMenuUser />
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
                            <div
                              className="add-product"
                              style={{ width: "280px" }}
                            >
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
                                  onClick={() =>
                                    handleRate(product, orderDetail)
                                  }
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
                                    selectedProducts[
                                      selectedProducts.length - 1
                                    ]
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
                <button
                  onClick={() => handleCancelClick(parseInt(orderId ?? ""))}
                >
                  Cancel Order
                </button>
              </div>
            )}
            {orderStatus === "Submitted" && (
              <div
                className="add-product"
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <button
                  onClick={() => handleReceiveClick(parseInt(orderId ?? ""))}
                >
                  Received
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />

      <Footer />
    </div>
  );
};

export default OrderDetails;

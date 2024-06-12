import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Footer } from "../../import/import-router";
import BoxMenuUser from "./components/BoxMenuUser";
import { useEffect, useState } from "react";
import { getProductId } from "../../apiServices/ProductServices/productServices";
import { getOrderDetails } from "../../apiServices/UserServices/userServices";
import { jwtDecode } from "jwt-decode";
import { useCart } from "../Cart-page/CartContext";
import swal from "sweetalert";
import "./OrderDetails.css";
import { aProduct } from "../../interfaces";
import Swal from "sweetalert2";
import { getUserIdFromToken } from "../../utils/jwtHelper";

export interface OrderDetail {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}
interface Product {
  productId: number;
}

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [cancelOrderResponse, setCancelOrderResponse] = useState();
  const [products, setProducts] = useState<aProduct[]>([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const location = useLocation();
  const { orderStatus } = location.state;
  const [currentOrderStatus, setCurrentOrderStatus] = useState<string>("");

  const [showRatingBox, setShowRatingBox] = useState<boolean>(false);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  //const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail>();
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [isRated, setIsRated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (token) {
        const decodedToken: any = jwtDecode(token);
        const userIdIdentifier =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];
        const userId = userIdIdentifier;

        const response = await fetch(
          `https://localhost:7030/api/Review/GetUserReview?userId=${parseInt(
            userId
          )}&orderId=${orderId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        console.log(data);
        console.log(orderId);

        if (data.length > 0 && data[0].isRated) {
          setIsRated(true);
        }
      }
    };

    fetchUserReviews();
  }, [orderId, token]);

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) {
        navigate("/user");
        return;
      }
      const queryParams = new URLSearchParams();
      queryParams.append("orderId", orderId.toString());
      const result = await getOrderDetails(queryParams);
      setOrderDetails(result);
    };
    fetchData();
  }, [orderId, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams();
      const productIds = orderDetails.map(
        (orderDetail) => orderDetail.productId
      );
      if (productIds != null) {
        queryParams.append("", productIds.toString());
      }
      const result = await getProductId(queryParams);
      setProducts(result);
    };
    fetchProducts();
  }, [orderDetails]);

  const { addToCart2 } = useCart();
  //-----------------------------------------------------------------------------------------------------------

  interface CurrentQuantities {
    [key: string]: number;
  }
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
        Swal.fire({
          title: `${newCurrentQuantities[product.productId]}/ ${product.stock}`,
          text: `You cannot order more than ${product.stock} items of this product.`,
          icon: "info",
        }).then(() => {
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
  //---------------------------------------------------------------------------------------------------------------
  const handleCancelOrder = async () => {
    try {
      if (!token) {
        console.error("Token not found");
        return;
      }

      const decodedToken: any = jwtDecode(token);

      const userIdIdentifier =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      const userId = userIdIdentifier;

      swal({
        title: "This can not be undo!",
        text: "You are about to cancel the order!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await fetch(
            `https://localhost:7030/api/User/cancelOrder?userId=${userId}&orderId=${orderId}`,
            {
              method: "DELETE",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentOrderStatus("Canceled");

          if (response.ok) {
            swal("Success!", "Order was canceled!", "success");
            const data = await response.json();
            setCancelOrderResponse(data);
          } else {
            throw new Error("Failed to cancel order");
          }
        }
      });
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  if (!token) {
    console.error("Token not found");
    return;
  }

  const handleCompleteOrder = async () => {
    try {
      const userIdIdentifier = getUserIdFromToken(token);

      const userId = userIdIdentifier;

      const totalPrice = orderDetails.reduce(
        (sum, orderDetail) => sum + orderDetail.total,
        0
      );

      swal({
        title: "Recieved The Order!",
        text: `Confirm payment of $${totalPrice.toLocaleString()} to the seller`,
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await fetch(
            `https://localhost:7030/api/User/completeOrder?userId=${userId}&orderId=${orderId}`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setCurrentOrderStatus("Completed");

          if (response.ok) {
            swal("Success!", "Thanks for shopping at M&B", "success");
            const data = await response.json();
            setCancelOrderResponse(data);
          } else {
            throw new Error("Failed to cancel order");
          }
        }
      });
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const handleRate = (product: Product, orderDetail: OrderDetail) => {
    setSelectedProducts([...selectedProducts, product]);
    setSelectedOrderDetail(orderDetail);
    setShowRatingBox(true);
    setSelectedProduct(product);
  };

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
  };

  const handleRatingCancel = (productToRemove: Product | undefined) => {
    // setSelectedProducts(
    //   selectedProducts.filter((p) => p.productId !== product?.productId)
    // );
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

  const handleRatingSubmit = async () => {
    if (selectedProducts.length === 0 || !selectedOrderDetail) return;

    const userIdIdentifier = getUserIdFromToken(token);

    const userId = userIdIdentifier;

    const rating = selectedStars || 1;

    const reviewData = {
      userId,
      orderDetailId: orderId,
      productId: selectedProduct?.productId,

      date: new Date().toISOString(),
      rating,
      comment: comment || "",
      isRated: false,
    };

    console.log("hiiiii", selectedProducts);
    console.log("hahahahah", reviewData);

    try {
      const response = await fetch("https://localhost:7030/api/Review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
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
  };

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
                      {(orderStatus === "Completed" ||
                        currentOrderStatus === "Completed") && (
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
            {orderStatus === "Pending" && currentOrderStatus === "" && (
              <div
                className="add-product"
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <button onClick={handleCancelOrder}>Cancel Order</button>
              </div>
            )}
            {orderStatus === "Submitted" && currentOrderStatus === "" && (
              <div
                className="add-product"
                style={{ display: "flex", flexDirection: "row-reverse" }}
              >
                <button onClick={handleCompleteOrder}>Received</button>
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

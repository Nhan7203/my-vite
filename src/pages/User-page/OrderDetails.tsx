import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Navbar, Footer } from "../../import/import-router";
import BoxMenuUser from "./components/BoxMenuUser";
import { useEffect, useState } from "react";
import * as searchOrderDetails from "../../apiServices/getOrderDetails";
import * as searchProduct from "../../apiServices/getProductId";
import { jwtDecode } from "jwt-decode";
import { aProduct } from "../../context/ShopContext";
import { useCart } from "../Cart-page/CartContext";
import swal from "sweetalert";


export interface OrderDetail {
  productId: number;
  quantity: number;
  price: number;
  total: number;
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



  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) {
        navigate("/user");
        return;
      }
      const queryParams = new URLSearchParams();
      queryParams.append("orderId", orderId.toString());
      const result = await searchOrderDetails.getOrderDetails(queryParams);
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
      const result = await searchProduct.getProductId(queryParams);
      setProducts(result);
    };
    fetchProducts();
  }, [orderDetails]);

  const { addToCart2 } = useCart();

  const handleAddToCart = (product: aProduct, quantity: number) => {
    addToCart2(product, quantity, "add");
  };


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

  const handleCompleteOrder = async () => {
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

      const totalPrice = orderDetails.reduce(
        (sum, orderDetail) => sum + orderDetail.total,
        0
      );

      swal({
        title: "Recieved The Order!",
        text: `Confirm payment of $${totalPrice} to the seller`,
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
              {orderStatus === "Pending" && (
                <div className="add-product">
                  <button>Cancel</button>
                </div>
              )}
              {orderStatus === "Submitted" && (
                <div className="add-product">
                  <button>Received</button>
                </div>
              )}
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
                      <div className="money">${orderDetail.total}</div>
                      {orderStatus === "Submitted" && (
                        <div className="add-product">
                          {product && (
                            <button
                              onClick={() =>
                                handleAddToCart(product, orderDetail.quantity)
                              }
                            >
                              add
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {orderStatus === "Pending" && (
              <div className="add-product">
                <button onClick={handleCancelOrder}>Cancel Order</button>
              </div>
            )}
            {orderStatus === "Submitted" && (
              <div className="add-product">
                <button onClick={handleCompleteOrder}>Received</button>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
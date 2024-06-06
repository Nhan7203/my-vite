import { useState, useEffect } from "react";
import { Navbar, Footer } from "../../import/import-router";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import StatusListOrder from "./components/StatusListOrder";
import BoxMenuUser from "./components/BoxMenuUser";
import "./User.css";
import "../Admin-page//Admin.css";
import { Link } from "../../import/import-libary";
import { useNavigate } from 'react-router-dom';

interface Order {
  orderId: number;
  userId: number;
  orderDate: string;
  address: string;
  paymentMethod: string;
  shippingMethodId: number;
  orderStatus: string;
  orderDetails: {
    productId: number;
    quantity: number;
    price: number;
    total: number;
  }[];
  total: number;
}

const User = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isGlowing, setIsGlowing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsGlowing((prevIsGlowing) => !prevIsGlowing);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          swal({
            title: "Oops!",
            text: "You haven't logged in yet! Redirecting to Login Page...",
            icon: "warning",
            buttons: {
              ok: {
                text: "OK",
                value: true,
                className: "swal-ok-button",
              },
            },
          }).then((value) => {
            if (value) {
              window.location.href = "/login";
            }
          });

          return;
        }

        const decodedToken: any = jwtDecode(token);
        const userIdIdentifier =
          decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        const response = await fetch(
          `https://localhost:7030/api/User/getOrderList?userId=${parseInt(
            userIdIdentifier
          )}`
        );

        if (response.ok) {
          const data = await response.json();

          const updatedOrderData = data.map((order: Order) => {
            const total = order.orderDetails.reduce(
              (acc, detail) => acc + detail.total,
              0
            );
            return {
              ...order,
              total: total,
            };
          });

          setOrderData(updatedOrderData);
        } else {
          console.error("Failed to retrieve order data:", response.status);
        }
      } catch (error) {
        console.error("Failed to retrieve order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  const handleCancelOrder = (orderId: number) => {
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
            setOrderData(data);
            navigate("/user");
          } else {
            throw new Error("Failed to cancel order");
          }
        }
      });
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  const handleOrderReceived = (orderId: number) => {
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
        title: "Recieved The Order!",
        text: `Confirm payment of $${orderData
          .find((order) => order.orderId === orderId)
          ?.total.toLocaleString()} to the seller`,
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
            setOrderData(data);
            navigate("/user");
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

          <div className="box-menu-order">
            <StatusListOrder />

            <div className="order-show">
              <div className="limiter">
                <div className="container-table100">
                  <div className="wrap-table100">
                    <div className="table100">
                      <table style={{ width: "980px" }}>
                        <thead>
                          <tr className="table100-head">
                            <th className="column1">Date</th>
                            <th className="column2">Order ID</th>
                            <th className="column3">Address</th>
                            <th className="column4">Payment Method</th>
                            <th className="column5">Shipping Method</th>
                            <th className="column6">Total</th>
                            <th className="column65"></th>
                            <th className="column7">Status</th>
                            <th className="column8">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {orderData.map((order, index) => (
                            <tr
                              key={order.orderId}
                              className={
                                index < orderData.length - 1
                                  ? "table-row-separator"
                                  : ""
                              }
                            >
                              <td className="column1 dynamic-content">
                                <Link
                                  to={`/orderdetails/${order.orderId}`}
                                  state={{ orderStatus: order.orderStatus }}
                                >
                                  {order.orderDate}
                                </Link>
                              </td>
                              <td className="column2 dynamic-content">
                                {order.orderId}
                              </td>
                              <td className="column3 dynamic-content">
                                {order.address}
                              </td>
                              <td className="column4 dynamic-content">
                                {order.paymentMethod}
                              </td>
                              <td className="column5 dynamic-content">
                                {
                                  [
                                    "Economical delivery",
                                    "Regular delivery",
                                    "Express delivery",
                                  ][order.shippingMethodId - 1]
                                }
                              </td>
                              <td className="column6 dynamic-content">
                                ${order.total.toLocaleString()}
                              </td>

                              <td className="column65 dynamic-content">
                                <span
                                  style={{ margin: "0 0 0 15px" }}
                                  className={`status ${order.orderStatus === "Pending"
                                    ? "yellow"
                                    : order.orderStatus === "Canceled"
                                      ? "red"
                                      : order.orderStatus === "Submitted"
                                        ? "orange"
                                        : order.orderStatus === "Completed"
                                          ? "green"
                                          : ""
                                    } ${isGlowing ? "glow" : ""}`}
                                />
                              </td>

                              <td className="column7 dynamic-content">
                                {order.orderStatus}
                              </td>
                              <td className="column8 dynamic-content">
                                {order.orderStatus === "Pending" && (
                                  <button
                                    className="cancel-button"
                                    onClick={() =>
                                      handleCancelOrder(order.orderId)
                                    }
                                  >
                                    Cancel
                                  </button>
                                )}
                                {order.orderStatus === "Submitted" && (
                                  <>
                                    <button
                                      className="received-button"
                                      onClick={() =>
                                        handleOrderReceived(order.orderId)
                                      }
                                    >
                                      Received
                                    </button>
                                  </>
                                )}
                                {order.orderStatus === "Completed" && (
                                  <Link
                                    to={`/orderdetails/${order.orderId}`}
                                    state={{ orderStatus: order.orderStatus }}
                                  >
                                    <button className="reorder-button">
                                      Reorder
                                    </button>
                                  </Link>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default User;

import { StatusListOrder, BoxMenuUser } from "../../import/import-components";
import { useState, useEffect } from "react";
import { getUserIdFromToken } from "../../utils/jwtHelper";
import { Navbar, Footer } from "../../import/import-router";
import { getOrderList } from "../../apiServices/UserServices/userServices";
import { Order } from "../../interfaces";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const PreOrder = () => {
  const [orderData, setOrderData] = useState<Order[]>([]);
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

        const userIdIdentifier = getUserIdFromToken(token);

        const response = await getOrderList(userIdIdentifier);

        if (response) {
          const updatedOrderData = response.map((order: Order) => {
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
          console.error("Failed to retrieve order data:", response);
        }
      } catch (error) {
        console.error("Failed to retrieve order data:", error);
      }
    };

    fetchOrderData();
  }, []);
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
                          {orderData
                            .filter(
                              (order) => order.orderStatus === "Pre-Order"
                            )
                            .map((order, index) => (
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
                                    className={`status ${
                                      order.orderStatus === "Pre-Order"
                                        ? "purple"
                                        : ""
                                    } ${isGlowing ? "glow" : ""}`}
                                  />
                                </td>

                                <td className="column7 dynamic-content">
                                  {order.orderStatus}
                                </td>
                                <td className="column8 dynamic-content"></td>
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

export default PreOrder;

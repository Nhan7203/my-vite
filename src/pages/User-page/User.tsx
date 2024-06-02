import { useState, useEffect } from "react";
import { Navbar, Footer } from "../../import/import-router";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
import StatusListOrder from "./components/StatusListOrder";
import BoxMenuUser from "./components/BoxMenuUser";
import "./User.css";

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

  useEffect(() => {
    const fetchOrderData = async () => {
      try {
        const token = localStorage.getItem('token');

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
              }
            },
          }).then((value) => {
            if (value) {
              window.location.href = '/login';
            }
          });

          return;
        }


        const decodedToken: any = jwtDecode(token);
        const userIdIdentifier = decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];

        const response = await fetch(`https://localhost:7030/api/User/getOrderList?userId=${parseInt(userIdIdentifier)}`);

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
                      <table>
                        <thead>
                          <tr className="table100-head">
                            <th className="column1">Date</th>
                            <th className="column2">Order ID</th>
                            <th className="column3">Address</th>
                            <th className="column4">Payment Method</th>
                            <th className="column5">Shipping Method</th>
                            <th className="column6">Total</th>
                            <th className="column7">Status</th>
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
                              <td className="column1 dynamic-content">{order.orderDate}</td>
                              <td className="column2 dynamic-content">{order.orderId}</td>
                              <td className="column3 dynamic-content">{order.address}</td>
                              <td className="column4 dynamic-content">{order.paymentMethod}</td>
                              <td className="column5 dynamic-content">{order.shippingMethodId}</td>
                              <td className="column6 dynamic-content">${order.total}</td>
                              <td className="column7 dynamic-content">{order.orderStatus}</td>
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
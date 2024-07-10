import React from "react";
import { aOrder } from "../../../interfaces";
import StatusListOrder from "./StatusListOrder";

interface OrderTableProps {
  orderData: aOrder[];
  handleViewOrderDetails: (order: aOrder) => void;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orderData,
  handleViewOrderDetails,
}) => {
  return (
    <main>
      <div>
        <div className="head-table">
          <StatusListOrder/>
        </div>
        <table className="table-order">
          {orderData.map((order) => (
            <tr key={order.orderId}>
              <td>
                <div
                  className="square-box"

                  onClick={() => handleViewOrderDetails(order)}

                >
                  <div className="header-square">
                    <span className="id-border">Order Id: {order.orderId}</span>
                    <span className="status-head">{order.orderStatus}</span>
                  </div>
                  <div className="customer-span">
                    <span>{/* Customer <p>{userToken.Name}</p> */}</span>
                  </div>

                  <span>
                    Payment <p>{order.paymentMethod}</p>
                  </span>
                  <div className="remainder-span">
                    <span>
                      Shipping
                      <p>
                        {
                          [
                            "Economical delivery",
                            "Regular delivery",
                            "Express delivery",
                          ][order.shippingMethodId - 1]
                        }
                      </p>
                    </span>
                  </div>

                  <div className="line-bottom"></div>
                  <div className="under-square">
                    <span className="total-text">
                      Total
                      <p id="p-total">${order.total.toLocaleString()}</p>
                    </span>
                    <p> {order.orderDate}</p>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </table>
      </div>
    </main>
  );
};

export default OrderTable;

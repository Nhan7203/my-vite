import React from 'react';
import { Link } from 'react-router-dom';
import { aOrder } from '../../../interfaces';

interface OrderTableProps {
  orderData: aOrder[];
  handleCancelClick: (orderId: number) => void;
  handleReceiveClick: (orderId: number) => void;
  isGlowing?: boolean;
}

const OrderTable: React.FC<OrderTableProps> = ({
  orderData,
  handleCancelClick,
  handleReceiveClick,
  isGlowing = false,
}) => {
  return (
    <tbody>
      {orderData.map((order, index) => (
        <tr
          key={order.orderId}
          className={index < orderData.length - 1 ? 'table-row-separator' : ''}
        >
          <td className="column1 dynamic-content">
            <Link to={`/orderdetails/${order.orderId}`} state={{ orderStatus: order.orderStatus }}>
              {order.orderDate}
            </Link>
          </td>
          <td className="column2 dynamic-content">{order.orderId}</td>
          <td className="column3 dynamic-content">{order.address}</td>
          <td className="column4 dynamic-content">{order.paymentMethod}</td>
          <td className="column5 dynamic-content">
            {['Economical delivery', 'Regular delivery', 'Express delivery'][order.shippingMethodId - 1]}
          </td>
          <td className="column6 dynamic-content">${order.total.toLocaleString()}</td>
          <td className="column65 dynamic-content">
            <span
              style={{ margin: '0 0 0 15px' }}
              className={`status ${
                order.orderStatus === 'Pending'
                  ? 'yellow'
                  : order.orderStatus === 'Canceled'
                  ? 'red'
                  : order.orderStatus === 'Submitted'
                  ? 'orange'
                  : order.orderStatus === 'Completed'
                  ? 'green'
                  : order.orderStatus === 'Pre-Order'
                  ? 'purple'
                  : ''
              } ${isGlowing ? 'glow' : ''}`}
            />
          </td>
          <td className="column7 dynamic-content">{order.orderStatus}</td>
          <td className="column8 dynamic-content">
            {(order.orderStatus === 'Pending' || order.orderStatus === 'Pre-Order') && (
              <button className="cancel-button" onClick={() => handleCancelClick(order.orderId)}>
                Cancel
              </button>
            )}
            {order.orderStatus === 'Submitted' && (
              <>
                <button className="received-button" onClick={() => handleReceiveClick(order.orderId)}>
                  Received
                </button>
              </>
            )}
            {order.orderStatus === 'Completed' && (
              <Link to={`/orderdetails/${order.orderId}`} state={{ orderStatus: order.orderStatus }}>
                <button className="reorder-button">Reorder</button>
              </Link>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default OrderTable;
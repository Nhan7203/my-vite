import { useNavigate } from "../../../import/import-another";
import useOrderData from "../components/useOrderData";
import HeaderMain from "../components/Header-main";
import OrderTable from "../components/OrderTable";
import Sidebar from "../components/Sidebar";
import { aOrder } from "../../../interfaces";

const CancelledInAdmin = () => {
  const { orderData } = useOrderData();
  const navigate = useNavigate();

  const handleViewOrderDetails = (order: aOrder) => {
    navigate(`/order-information/${order.orderId}`, {
      state: { orderStatus: order.orderStatus },
    });
  };

  return (
    <>
      <div>
        <input type="checkbox" id="nav-toggle" />
        <Sidebar />

        <div className="main-content">
          <HeaderMain />

          <OrderTable
            orderData={orderData.filter(
              (order) => order.orderStatus === "Canceled"
            )}
            handleViewOrderDetails={handleViewOrderDetails}
          />
        </div>
      </div>
    </>
  );
};
export default CancelledInAdmin;

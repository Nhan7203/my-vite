
import { useNavigate } from "../../../import/import-another";
import useOrderData from "../components/useOrderData";
import HeaderMain from "../components/Header-main";
import OrderTable from "../components/OrderTable";
import Sidebar from "../components/Sidebar";
import { aOrder } from "../../../interfaces";



const ProcessedInAdmin = () => {
  const { orderData } = useOrderData();
  const navigate = useNavigate();

  const handleViewOrderDetails = (order: aOrder) => {

    navigate(`/orderinformation/${order.orderId}/${order.userId}`, {

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
                (order) => order.orderStatus === "Submitted"
              )}
            handleViewOrderDetails={handleViewOrderDetails}
          />
        </div>
      </div>
    </>
  );
};
export default ProcessedInAdmin;


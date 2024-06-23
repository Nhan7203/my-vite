import { useNavigate } from "../../../../import/import-another";
import { aOrder } from "../../../../interfaces";
import useOrderData from "../../components/useOrderData";
import HeaderMain from "../../components/Header-main";
import OrderTable from "../../components/OrderTable";
import Sidebar from "../../components/Sidebar";

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
          <HeaderMain
            searchQuery={""}
            displayed={[]}
            setSearchQuery={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

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

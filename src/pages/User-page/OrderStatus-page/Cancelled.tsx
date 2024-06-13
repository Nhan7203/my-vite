import {
  StatusListOrder,
  BoxMenuUser,
  Navbar,
  Footer,
} from "../../../import/import-components.tsx";
import useGlowingEffect from "../components/useGlowingEffect.tsx";
import useOrderData from "../components/useOrderData.tsx";
import OrderTable from "../components/OrderTable.tsx.tsx";

const Cancelled = () => {
  const isGlowing = useGlowingEffect(true, 1000);

  const { orderData } = useOrderData();

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
                        <OrderTable
                          orderData={orderData.filter(
                            (order) => order.orderStatus === "Canceled"
                          )}
                          isGlowing={isGlowing}
                          handleCancelClick={function (): void {
                            throw new Error("Function not implemented.");
                          }}
                          handleReceiveClick={function (): void {
                            throw new Error("Function not implemented.");
                          }}
                        />
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

export default Cancelled;

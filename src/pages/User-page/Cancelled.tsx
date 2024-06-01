import { Navbar, Footer } from "../../import/import-router";
import BoxMenuUser from "./components/BoxMenuUser";
import "./User.css";
import StatusListOrder from "./components/StatusListOrder";

const Cancelled = () => {
  return (
    <div>
      <Navbar />
      <div className="body-user">
        <div>
          <BoxMenuUser />
          <div className="box-menu-order">
            <StatusListOrder />
            <div className="order-show">
              <div></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cancelled;

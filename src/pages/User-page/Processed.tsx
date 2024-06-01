import { Navbar, Footer } from "../../import/import-router";
import StatusListOrder from "./components/StatusListOrder";
import BoxMenuUser from "./components/BoxMenuUser";
import "./User.css";
const Processed = () => {
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

export default Processed;

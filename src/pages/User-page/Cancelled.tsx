import { Navbar, Footer } from "../../import/import-router";
import { Link } from "../../import/import-libary";
import BoxMenuUser from "./BoxMenuUser"
import "./User.css";

const Cancelled = () => {
  return (
    <div>
    <Navbar />
    <div className="body-user">
      <div>
      <BoxMenuUser/>
        <div className="box-menu-order">
          <div className="status-list-order">
            <div><Link to="/user">All</Link></div>
            <div><Link to="/complete">Complete</Link></div>
            <div><Link to="/cancelled">Cancelled</Link></div>
            <div><Link to="/giveback">Give back</Link></div>
          </div>
          <div className="order-show">
            <div></div>
          </div>
          
        </div>
        
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default Cancelled
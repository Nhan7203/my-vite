import { BsCart3 } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="header">
      <div className="top-navbar">
        <ul className="top-navbar-list">
          <li>
            <Link to="/shop">Location: Thu Duc - HCM - VN</Link>
          </li>

          <li>Tel: (+84) 3939393939</li>

          <li>
            <Link to="/Adress">
              <GiPositionMarker />
              Add address to purchase
            </Link>
          </li>

          <li className="login">
            <BsFillPeopleFill fontSize="1em" />
            <Link to="/login">
              <button>Login</button>
            </Link>
          </li>
        </ul>
      </div>

      <div className="navbar-search">
        <div className="navbar-logo">
          <img src={logo} alt="M&B-logo" className="logo-img" />
        </div>

        <div className="box-search">
          <input type="text" placeholder="What would you like to buy today?" />
          <FaSearch color="white" fontSize="1.5em" className="icon-search" />
        </div>
        <div className="cart-noti-icons">
          <div className="icon-cart">
            <Link to="/cart">
              <BsCart3 fontSize="2.0em" className="cart-icon" />
            </Link>
            <div className="cart-count">0</div>
          </div>

          <div className="icon-noti">
            <Link to="/noti">
              <IoNotificationsOutline fontSize="2.0em" className="icon-noti" />
            </Link>
            <div className="cart-count">0</div>
          </div>
        </div>
      </div>

      <div className="bottom-navbar">
        <ul className="bottom-navbar-list">
          <li>
            <Link to="/" className="white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/product" className="white">
              Product
            </Link>
          </li>
          <li>
            <Link to="/Blog" className="white">
              Blog
            </Link>
          </li>
          <li>
            <Link to="/Voucher" className="white">
              Voucher
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

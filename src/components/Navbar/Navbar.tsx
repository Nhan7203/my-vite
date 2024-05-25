import { useState, useEffect } from "react";
import { BsCart3 } from "react-icons/bs";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { GiPositionMarker } from "react-icons/gi";
import { NavLink, Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../../pages/Cart-page/CartContext";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { cart } = useCart();

  useEffect(() => {
    // Calculate the total quantity in stock
    const totalQuantityInStock = cart.reduce(
      (total, product) => total + product.quantityInStock,
      0
    );
    setCartCount(totalQuantityInStock);
  }, [cart]);

  const handleLogo = () => {
    location.href = "/";
  };

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    navigate("/product", { state: { query: searchQuery } });
    window.location.reload();
  };

  return (
    <nav className="header">
      <div className="top-navbar">
        <ul className="top-navbar-list">
          <li>Location: Thu Duc - HCM - VN</li>

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
        <div className="navbar-logo" onClick={() => handleLogo()}>
          <img src={logo} alt="M&B-logo" className="logo-img" />
        </div>
        <form className="box-search" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="What would you like to buy today?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button type="submit">
            {" "}
            <FaSearch
              color="white"
              fontSize="1.8em"
              className="icon-search"
              type="submit"
            />
          </button>
        </form>

        <div className="cart-noti-icons">
          <div className="icon-cart">
            <Link to="/cart">
              <BsCart3 fontSize="2.0em" className="cart-icon" />
            </Link>
            <div className="cart-count">{cartCount}</div>
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
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/product" className="nav-link">
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/Blog" className="nav-link">
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/Voucher" className="nav-link">
              Voucher
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

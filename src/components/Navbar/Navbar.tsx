import {
  NavLink,
  Link,
  BsCart3,
  FaSearch,
  BsFillPeopleFill,
} from "../../import/import-libary";
import { avatar, logo } from "../../import/import-assets";
import { useState, useEffect } from "react";
import { getNameFromToken, getRoleFromToken } from "../../utils/jwtHelper";
import Notification from "../../components/Notification/Notification";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../pages/Cart-page/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { cart } = useCart();
  const [userName, setUserName] = useState();
  const [role, setRole] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    const roleIdentifier = getRoleFromToken(token);
    setRole(roleIdentifier);
    const usernameIdentifier = getNameFromToken(token);
    setUserName(usernameIdentifier);
  }, [token]);

  useEffect(() => {
    // Calculate the total quantity in stock
    const totalQuantityInStock = cart.reduce(
      (total, product) => total + product.quantity,
      0
    );
    setCartCount(totalQuantityInStock);
  }, [cart]);

  useEffect(() => {
    const storedSearchQuery = localStorage.getItem("searchQuery");
    if (storedSearchQuery) {
      setSearchQuery(storedSearchQuery);
    }
  }, []);

  const handleLogo = () => {
    setSearchQuery("");
    localStorage.removeItem("searchQuery");
    location.href = "/";
  };

  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    if (searchQuery.length > 0) {
      navigate("/product", { state: { query: searchQuery } });
    } else {
      navigate("/product", { state: { query: "" } });
    }
  };

  useEffect(() => {
    localStorage.setItem("searchQuery", searchQuery);
  }, [searchQuery]);

  //Get token login
  const isLoggedIn = localStorage.getItem("token");

  //Renove token logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("cart");
  };

  return (
    <nav className="header">
      <div className="top-navbar">
        <ul className="top-navbar-list">
          <li>Location: Thu Duc - HCM - VN</li>

          <li>Tel: (+84) 3939393939</li>

          {isLoggedIn ? (
            <div className="user-menu">
              <div className="avatar">
                <img src={avatar} alt="Avatar"></img>
                <h4>{userName}</h4>
              </div>
              <div className="menu-box">
                {role === "Admin" && <a href="/admin">DashBoard</a>}
                {role === "Staff" && <a href="/order">Order Management</a>}
                <a href="/profile">View Profile</a>
                <a href="/user">Purchase order</a>
                <a
                  href="/login"
                  onClick={handleLogout}
                  style={{ border: "none" }}
                >
                  Logout
                </a>
              </div>
            </div>
          ) : (
            <li className="login">
              <BsFillPeopleFill fontSize="1em" />
              <Link to="/login">
                <button>Login</button>
              </Link>
            </li>
          )}
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

          <Notification />
        </div>
      </div>

      <div className="bottom-navbar">
        <ul className="bottom-navbar-list">
          <li>
            <NavLink to="/" className="nav-link" onClick={handleLogo}>
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
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

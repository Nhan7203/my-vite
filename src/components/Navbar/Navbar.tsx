import {
  NavLink,
  Link,
  BsCart3,
  IoNotificationsOutline,
  FaSearch,
  BsFillPeopleFill,
  GiPositionMarker,
  FaRegTrashCan,
} from "../../import/import-libary";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../pages/Cart-page/CartContext";
import logo from "../../assets/logo.png";
import "./Navbar.css";
import avatar from "../../assets/vu.jpg";
import noti from "../../assets/notification.png";
import trash from "../../assets/trash-can.png";
import empty from "../../assets/folder.png";
import { jwtDecode } from "jwt-decode";

export interface Notification {
  notificationId: number;
  userId: number;
  header: string;
  content: string;
  isRead: boolean;
  isRemoved: boolean;
  createdDate: Date;
}

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const { cart } = useCart();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showNotification, setShowNotification] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwtDecode(token);

      const userIdIdentifier =
        decodedToken[
          "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
        ];

      const userId = userIdIdentifier;
      const apiUrl = `https://localhost:7030/api/Notification/getAllNotisByUser?userId=${userId}`;

      fetch(apiUrl)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error retrieving notifications");
          }
        })
        .then((data) => {
          setNotifications(data);
        })
        .catch((error) => {
          console.error("Error retrieving notifications:", error);
        });
    }
  }, []);

  const deleteNotification = async (notificationId: number) => {
    try {
      await fetch(
        `https://localhost:7030/api/Notification/deleteOneNotification?notificationId=${notificationId}`,
        {
          method: "DELETE",
        }
      );

      setNotifications(
        notifications.filter(
          (notification) => notification.notificationId !== notificationId
        )
      );
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  const deleteAllNotifications = async () => {
    try {
      if (token) {
        const decodedToken: any = jwtDecode(token);

        const userIdIdentifier =
          decodedToken[
            "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
          ];

        const userId = userIdIdentifier;

        await fetch(
          `https://localhost:7030/api/Notification/deleteAllNotificationsByUser?userId=${userId}`,
          {
            method: "DELETE",
          }
        );

        setNotifications([]);
      }
    } catch (error) {
      console.error("Error deleting notifications:", error);
    }
  };

  const handleNotificationClick = async (notification: Notification) => {
    if (!notification.isRead) {
      const updatedNotifications = notifications.map((n) =>
        n.notificationId === notification.notificationId
          ? { ...n, isRead: true }
          : n
      );
      setNotifications(updatedNotifications);

      try {
        const response = await fetch(
          `https://localhost:7030/api/Notification/updateNotificationReadStatus?notificationId=${notification.notificationId}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isRead: true }),
          }
        );

        if (!response.ok) {
          throw new Error("Error updating notification status");
        }
      } catch (error) {
        console.error("Error updating notification status:", error);
      }
    }
  };

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
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('cart');
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
  };

  const handleMouseLeave = () => {
    setShowNotification(false);
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
          {isLoggedIn ? (
            <div className="user-menu">
              <div className="avatar">
                <img src={avatar} alt="Avatar"></img>
              </div>
              <div className="menu-box">
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

          <div className="icon-noti">
            <IoNotificationsOutline
              fontSize="2.0em"
              className="icon-noti "
              onClick={toggleNotification}
            />
            <div className="cart-count">
              {
                notifications.filter((notification) => !notification.isRead)
                  .length
              }
            </div>
            <div
              className={`noti-box ${showNotification ? "active" : ""}`}
              onMouseLeave={handleMouseLeave}
            >
              {notifications && notifications.length > 0 ? (
                <>
                  <div
                    style={{
                      overflow: "auto",
                      height: "400px",
                      width: "499px",
                    }}
                  >
                    {notifications.map((notification) => (
                      <div
                        className={`element-noti ${
                          notification.isRead ? "" : "unread"
                        }`}
                        key={notification.notificationId}
                        onClick={() => handleNotificationClick(notification)}
                      >
                        <div className="img-noti">
                          <img src={noti} alt="" />
                        </div>
                        <div className="text-noti">
                          <div className="header-noti">
                            {notification.header}
                          </div>
                          <div className="content-noti">
                            {notification.content}
                          </div>
                          <div className="date-noti">
                            {new Date(notification.createdDate).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>
                        </div>
                        <div className="status-noti">
                          <FaRegTrashCan
                            fontSize="1.5em"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                              deleteNotification(notification.notificationId)
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                  <div
                    className="icon-trash-all"
                    onClick={deleteAllNotifications}
                  >
                    <img src={trash} alt=""></img>
                    Delete all
                  </div>
                </>
              ) : (
                <img src={empty} alt="" style={{ width: "50px" }} />
              )}
            </div>
          </div>
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

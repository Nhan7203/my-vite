import { useLocation } from "react-router-dom";
const Sidebar = () => {
  const location = useLocation();
  const activeUrl = location.pathname;
  return (
    <div className="sidebar">
      <div className="sidebar-brand">
        <h2>
          <span className="lab la-accusoft"></span> <span>M&B</span>
        </h2>
      </div>

      <div className="sidebar-menu">
        <ul>
          <li>
            <a href="/admin" className={activeUrl === "/admin" ? "active" : ""}>
              <span className="las la-igloo"></span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a
              href="/account"
              className={activeUrl === "/account" ? "active" : ""}
            >
              <span className="las la-user-circle"></span>
              <span>Accounts</span>
            </a>
          </li>
          <li>
            <a
              href="/customer"
              className={activeUrl === "/customer" ? "active" : ""}
            >
              <span className="las la-users"></span>
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a
              href="/manage-product"
              className={activeUrl === "/manage-product" ? "active" : ""}
            >
               <span className="las la-cube"></span>
              <span>Products</span>
            </a>
          </li>
          <li>
            <a href="/order" className={activeUrl === "/order" ? "active" : ""}>
              <span className="las la-shopping-bag"></span>
              <span>Orders</span>
            </a>
          </li>
          <li>
            <a href="/blogs" className={activeUrl === "/blogs" ? "active" : ""}>
              <span className="las la-newspaper"></span>
              <span>Blogs</span>
            </a>
          </li>
          <li>
            <a
              href="/vouchers"
              className={activeUrl === "/vouchers" ? "active" : ""}
            >
              <span className="las la-gift"></span>
              <span>Vouchers</span>
            </a>
          </li>
          <li>
            <a
              href="/charts"
              className={activeUrl === "/charts" ? "active" : ""}
            >
              <span className="las la-chart-bar"></span>
              <span>Charts</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

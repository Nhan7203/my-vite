const Sidebar = () => {
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
            <a href="/admin" className="active">
              <span className="las la-igloo"></span>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/customer">
              <span className="las la-users"></span>
              <span>Customers</span>
            </a>
          </li>
          <li>
            <a href="/manage-product">
              <span className="las la-clipboard-list"></span>
              <span>Products</span>
            </a>
          </li>
          <li>
            <a href="/order">
              <span className="las la-shopping-bag"></span>
              <span>Orders</span>
            </a>
          </li>

          <li>
            <a href="/account">
              <span className="las la-user-circle"></span>
              <span>Accounts</span>
            </a>
          </li>
          <li>
            <a href="">
              <span className="las la-clipboard-list"></span>
              <span>Tasks</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

import './Admin.css'
const Admin = () => {
  return (
    <div className='Admin-css'>
      <body>

        <input type="checkbox" id="nav-toggle" />
        <div className="sidebar">
          <div className="sidebar-brand">
            <h2><span className="lab la-accusoft"></span> <span>M&B</span>
            </h2>
          </div>

          <div className="sidebar-menu">
            <ul>
              <li>
                <a href="/admin" className="active"><span className="las la-igloo"></span>
                  <span>Dashboard</span></a>
              </li>
              <li>
                <a href="/customer"><span className="las la-users"></span>
                  <span>Customers</span></a>
              </li>
              <li>
                <a href="/product"><span className="las la-clipboard-list"></span>
                  <span>Products</span></a>
              </li>
              <li>
                <a href="/order"><span className="las la-shopping-bag"></span>
                  <span>Orders</span></a>
              </li>

              <li>
                <a href="/account"><span className="las la-user-circle"></span>
                  <span>Accounts</span></a>
              </li>
              <li>
                <a href=""><span className="las la-clipboard-list"></span>
                  <span>Tasks</span></a>
              </li>
            </ul>

          </div>
        </div>

        <div className="main-content">
          <div className="header-main">
            <h2>
              <label htmlFor="nav-toggle">
                <span className="las la-bars"></span>
              </label>
              Dashboard
            </h2>

            <div className="search-wrapper">
              <span className="las la-search"></span>
              <input type="search" placeholder="Search here" />
            </div>

            <div className="user-wrapper">
              <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
              <div>
                <h4>Datnt nt</h4>
                <small>Super admin</small>
              </div>
            </div>
          </div>

          <main>

            <div className="cards">
              <div className="card-single">
                <div>
                  <h1>54</h1>
                  <span>Customers</span>
                </div>
                <div>
                  <span className="las la-users"></span>
                </div>
              </div>

              <div className="card-single">
                <div>
                  <h1>79</h1>
                  <span>Product</span>
                </div>
                <div>
                  <span className="las la-clipboard-list"></span>
                </div>
              </div>

              <div className="card-single">
                <div>
                  <h1>124</h1>
                  <span>orders</span>
                </div>
                <div>
                  <span className="las la-shopping-bag"></span>
                </div>
              </div>

              <div className="card-single">
                <div>
                  <h1>$6k</h1>
                  <span>Income</span>
                </div>
                <div>
                  <span className="lab la-google-wallet"></span>
                </div>
              </div>
            </div>

            <div className="recent-grid">
              <div className="projects">
                <div className="card-product">
                  <div className="card-header">
                    <h3>Recent Products</h3>
                    <button>See all <span className="las la-arrow-right"></span></button>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table width="100%">
                        <thead>
                          <tr>
                            <td>Product Name</td>
                            <td>Department</td>
                            <td>Status</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Nestle S-26 ULTIMA Milk No. 3 750g</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status purple">
                              </span>
                              review
                            </td>
                          </tr>

                          <tr>
                            <td>Abbott Grow 4 milk 900g (over 2 years old)</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status pink"></span>
                              in progress
                            </td>
                          </tr>
                          <tr>
                            <td>Abbott Grow 4 milk 900g (over 2 years old)</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status orange"></span>
                              pending
                            </td>
                          </tr>

                          <tr>
                            <td>Nestle S-26 ULTIMA Milk No. 3 750g</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status purple">
                              </span>
                              review
                            </td>
                          </tr>

                          <tr>
                            <td>Abbott Grow 4 milk 900g (over 2 years old)</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status pink"></span>
                              in progress
                            </td>
                          </tr>
                          <tr>
                            <td>Abbott Grow 4 milk 900g (over 2 years old)</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status orange"></span>
                              pending
                            </td>
                          </tr>

                          <tr>
                            <td>Nestle S-26 ULTIMA Milk No. 3 750g</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status purple">
                              </span>
                              review
                            </td>
                          </tr>

                          <tr>
                            <td>Abbott Grow 4 milk 900g (over 2 years old)</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status pink"></span>
                              in progress
                            </td>
                          </tr>
                          <tr>
                            <td>Abbott Grow 4 milk 900g (over 2 years old)</td>
                            <td>Ho CHi Minh city</td>
                            <td>
                              <span className="status orange"></span>
                              pending
                            </td>
                          </tr>

                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="customers">
                <div className="card-product">
                  <div className="card-header">
                    <h3>New customer</h3>
                    <button>See all <span className="las la-arrow-right"></span></button>
                  </div>

                  <div className="card-body">
                    <div className="customer">
                      <div className="info">
                        <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
                        <div>
                          <h4>Anya Forger</h4>
                          <small>Staff</small>
                        </div>
                      </div>
                      <div className="contact">
                        <span className="las la-user-circle"></span>
                        <span className="las la-comment"></span>
                        <span className="las la-phone"></span>
                      </div>
                    </div>

                    <div className="customer">
                      <div className="info">
                        <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
                        <div>
                          <h4>Anya Forger</h4>
                          <small>Staff</small>
                        </div>
                      </div>
                      <div className="contact">
                        <span className="las la-user-circle"></span>
                        <span className="las la-comment"></span>
                        <span className="las la-phone"></span>
                      </div>
                    </div>

                    <div className="customer">
                      <div className="info">
                        <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
                        <div>
                          <h4>Anya Forger</h4>
                          <small>Staff</small>
                        </div>
                      </div>
                      <div className="contact">
                        <span className="las la-user-circle"></span>
                        <span className="las la-comment"></span>
                        <span className="las la-phone"></span>
                      </div>
                    </div>

                    <div className="customer">
                      <div className="info">
                        <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
                        <div>
                          <h4>Anya Forger</h4>
                          <small>Staff</small>
                        </div>
                      </div>
                      <div className="contact">
                        <span className="las la-user-circle"></span>
                        <span className="las la-comment"></span>
                        <span className="las la-phone"></span>
                      </div>
                    </div>

                    <div className="customer">
                      <div className="info">
                        <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
                        <div>
                          <h4>Anya Forger</h4>
                          <small>Staff</small>
                        </div>
                      </div>
                      <div className="contact">
                        <span className="las la-user-circle"></span>
                        <span className="las la-comment"></span>
                        <span className="las la-phone"></span>
                      </div>
                    </div>

                    <div className="customer">
                      <div className="info">
                        <img src="/src/assets/anya-cute.jpg" width="40px" height="40px" alt="" />
                        <div>
                          <h4>Anya Forger</h4>
                          <small>Staff</small>
                        </div>
                      </div>
                      <div className="contact">
                        <span className="las la-user-circle"></span>
                        <span className="las la-comment"></span>
                        <span className="las la-phone"></span>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            </div>

          </main>
        </div>

      </body>




    </div>
  )
}

export default Admin
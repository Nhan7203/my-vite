import { useState, useEffect } from "react";
import { useAllProduct } from "../../context/ShopContext";
import * as tu from "../../apiServices/getTotalUser";
import * as tp from "../../apiServices/getTotalProduct";
import * as to from "../../apiServices/getTotalOrder";
import * as tf from "../../apiServices/getTotalProfit";
import * as au from "../../apiServices/GetAllUsers";
import vu from "../../assets/vu.jpg";
import "./Admin.css";

export interface AllUsers {
  userId: number;
  roleId: number;
  email: string;
  phoneNumber: number;
  adress: string;
  isActive: boolean;
}

const Admin = () => {
  const { allProduct } = useAllProduct();
  const [totalUser, setTotalUser] = useState<number>();
  const [totalProduct, setTotalProduct] = useState<number>();
  const [totalOrder, setTotalOrder] = useState<number>();
  const [totalProfit, setTotalProfit] = useState<number>();
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await tu.getTotalUser();
      setTotalUser(result);
      const result1 = await tp.getTotalProduct();
      setTotalProduct(result1);
      const result2 = await to.getTotalOrder();
      setTotalOrder(result2);
      const result3 = await tf.getTotalProfit();
      setTotalProfit(result3);
      const result4 = await au.GetAllUsers();
      setAllUsers(result4);
    };
    fetchData();
  }, []);

  return (
    <div className="all-page">
      <body>
        <input type="checkbox" id="nav-toggle" />
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

        <div className="main-content">
          <div className="header-main" >
            <h2 >
              <label htmlFor="nav-toggle">
                <span className="las la-bars"></span>
              </label>
              Dashboard
            </h2>

            {/* <div className="search-wrapper">
              <span className="las la-search"></span>
              <input type="search" placeholder="Search here" />
            </div> */}

            <div className="user-wrapper">
              <img
                src="/src/assets/anya-cute.jpg"
                width="40px"
                height="40px"
                alt=""
              />
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
                  <h1>{totalUser}</h1>
                  <span>Customers</span>
                </div>
                <div>
                  <span className="las la-users"></span>
                </div>
              </div>

              <div className="card-single">
                <div>
                  <h1>{totalProduct}</h1>
                  <span>Product</span>
                </div>
                <div>
                  <span className="las la-clipboard-list"></span>
                </div>
              </div>

              <div className="card-single">
                <div>
                  <h1>{totalOrder}</h1>
                  <span>orders</span>
                </div>
                <div>
                  <span className="las la-shopping-bag"></span>
                </div>
              </div>

              <div className="card-single">
                <div>
                  <h1>${totalProfit?.toLocaleString()}</h1>
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
                    <button>
                      See all <span className="las la-arrow-right"></span>
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table width="100%" >
                        <thead>
                          <tr >
                            <td>Product Name</td>
                            <td style={{ transform: "translateX(-23px)" }}>
                              Quantity
                            </td>
                            <td style={{ transform: "translateX(30px)" }}>Status</td>
                          </tr>
                        </thead>
                        <tbody >
                          {allProduct
                            .slice(0, 9)
                            .map((product, index: number) => (
                              <tr key={index} style={{backgroundColor: "white"}}>
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>
                                  <span
                                    className={`status ${product.isActive ? "green" : "purple"
                                      }`}
                                  />
                                  {product.isActive ? "in progress" : "pending"}
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              <div className="customers">
                <div className="card-product">
                  <div className="card-header">
                    <h3>Accounts</h3>
                    <button>
                      See all <span className="las la-arrow-right"></span>
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="customer-list">
                      {allUsers.map((user) => (
                        <div className="customer" key={user.userId}>
                          <div className="info">
                            <img src={vu} width="40px" height="40px" alt="" />
                            <div>
                              <h4>{user.email}</h4>
                              <small>{['User', 'Staff', 'Admin'][user.roleId - 1]}</small>
                            </div>
                          </div>
                          <div className="contact">
                            <span className="las la-user-circle"></span>
                            <span className="las la-comment"></span>
                            <span className="las la-phone"></span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </body>
    </div>
  );
};

export default Admin;

import {
  getAllUsers,
  getTotalOrder,
  getTotalProduct,
  getTotalProfit,
  getTotalUser,
} from "../../apiServices/AdminServices/adminServices";
import { useState, useEffect } from "react";
import { useAllProduct } from "../../context/ShopContext";
import { AllUsers } from "../../interfaces";
import { avatar } from "../../import/import-assets";
import "./Admin.css";
import HeaderMain from "./components/Header-main";
import Sidebar from "./components/Sidebar";

const Admin = () => {
  const { allProduct } = useAllProduct();
  const [totalUser, setTotalUser] = useState<number>();
  const [totalProduct, setTotalProduct] = useState<number>();
  const [totalOrder, setTotalOrder] = useState<number>();
  const [totalProfit, setTotalProfit] = useState<number>();
  const [allUsers, setAllUsers] = useState<AllUsers[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getTotalUser();
      setTotalUser(result);
      const result1 = await getTotalProduct();
      setTotalProduct(result1);
      const result2 = await getTotalOrder();
      setTotalOrder(result2);
      const result3 = await getTotalProfit();
      setTotalProfit(result3);
      const result4 = await getAllUsers();
      setAllUsers(result4);
    };
    fetchData();
  }, []);

  const handleSeeProductClick = () => {
    window.location.href = '/manage-product';
  };

  const handleSeeAccountClick = () => {
    window.location.href = '/account';
  };
  
  return (
    <div className="all-page">
      <div>
        <input type="checkbox" id="nav-toggle" />

        <Sidebar />

        <div className="main-content">
          <HeaderMain
            searchQuery={""}
            displayed={[]}
            setSearchQuery={function (): void {
              throw new Error("Function not implemented.");
            }}
          />

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
                  <span className="las la-cube"></span>
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
                    <button onClick={() => handleSeeProductClick()}>
                      See all <span className="las la-arrow-right"></span>
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="table-responsive">
                      <table width="100%">
                        <thead>
                          <tr>
                            <td>Product Name</td>
                            <td style={{ transform: "translateX(-23px)" }}>
                              Quantity
                            </td>
                            <td style={{ transform: "translateX(30px)" }}>
                              Status
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {allProduct
                            .slice(0, 9)
                            .map((product, index: number) => (
                              <tr
                                key={index}
                                style={{ backgroundColor: "white" }}
                              >
                                <td>{product.name}</td>
                                <td>{product.stock}</td>
                                <td>
                                  <span
                                    className={`status ${
                                      product.isActive ? "green" : "purple"
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
                    <button onClick={() => handleSeeAccountClick()}>
                      See all <span className="las la-arrow-right"></span>
                    </button>
                  </div>

                  <div className="card-body">
                    <div className="customer-list">
                      {allUsers.map((user) => (
                        <div className="customer" key={user.userId}>
                          <div className="info">
                            <img
                              src={avatar}
                              width="40px"
                              height="40px"
                              alt=""
                            />
                            <div>
                              <h4>{user.email}</h4>
                              <small>
                                {["User", "Staff", "Admin"][user.roleId - 1]}
                              </small>
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
      </div>
    </div>
  );
};

export default Admin;

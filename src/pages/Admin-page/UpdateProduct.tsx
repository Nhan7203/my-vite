//import { toast } from "react-toastify";
import "./Admin.css";
//import { useState, useEffect } from "react";
import * as tu from "../../apiServices/getTotalUser";
import * as au from "../../apiServices/GetAllUsers";
import "./Admin.css";
import { useAllProduct } from "../../context/ShopContext";
import { Link, useParams } from "react-router-dom";
// import { aProduct } from "../../context/ShopContext";

const UpdateProduct = () => {
  const { allProduct } = useAllProduct();

  const { productId } = useParams<{ productId?: string }>();

  let product: any;
  if (productId) {
    product = allProduct.find((e) => e.productId === parseInt(productId));
  }

  const handleUpdate = () => {};

  const handleCancel = () => {
    location.href = "/manage-product";
  };
  return (
    <>
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
                <a href="/product">
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
            {product ? (
              <div id="boder-form">
                <form className="form-add">
                  <div>
                    <h4>Image</h4>
                    <input type="file" />
                    <h4>For Age</h4>
                    <input
                        type="text"
                        name="txtForAge"
                        value={product}
                        // onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                    <h4>Brand</h4>
                    <input type="text" />
                    <h4>Name</h4>
                    <input type="text" />
                    <h4>Description</h4>
                    <input type="text" />
                  </div>
                </form>
                <div className="both-button">
                  <button className="bt-add" onClick={() => handleUpdate()}>
                    Update
                  </button>
                  <button className="bt-cancel" onClick={() => handleCancel()}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/product"></Link>
            )}
          </main>
        </div>
      </body>
    </>
  );
};

export default UpdateProduct;

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import "./Admin.css";
export interface aProduct {
    productId: number;
    forAgeId: number;
    categoryId: number;
    brandId: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageProducts: ImageProduct[];
    isActive: boolean;
}

export interface ImageProduct {
    imageId: number
    productId: number
    imageUrl: string
}


const ProductManage = () => {
    const handleClickAdd = () => {
        location.href = "/addproduct";
    }
    const handleUpdate = () => {
        location.href = "/updateproduct";
    }
    const handleDelete = () => {

    };


    return (
        <>
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
                                <a href="/manage-product"><span className="las la-clipboard-list"></span>
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
                        <div>
                            <div className="head-table">
                                <ul>
                                    <li
                                        className="view-product"

                                    >
                                        View Product
                                    </li>
                                    <li
                                        className="add-product" onClick={() => handleClickAdd()}

                                    >
                                        Add Product
                                    </li>
                                </ul>
                            </div>
                            <table className="table-custome">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Image</th>
                                        <th>ProductId</th>
                                        <th>For Age</th>
                                        <th>Brand</th>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Update</th>
                                        <th>Delete</th>
                                    </tr>

                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>
                                            <div className="img-table">
                                                <img className="img-pro" src="/src/assets/anya-cute.jpg" alt="" />
                                            </div>
                                        </td>
                                        <td>1</td>
                                        <td>4 year  old</td>
                                        <td>nutrifood</td>
                                        <td>a</td>
                                        <td>abc</td>

                                        <td>
                                            <button className="Edit" onClick={() => handleUpdate()}>Update
                                            </button>
                                        </td>

                                        <td>
                                            <button className=""

                                            >Delete</button>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>

                    </main>
                </div >

            </body >




        </>
    )
}

export default ProductManage;
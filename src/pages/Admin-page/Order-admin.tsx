import { useEffect, useState } from "react";
//import * as productitems from "../../apiServices/productItems";
import { aProduct } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { useAllProduct } from "../../context/ShopContext";
import { jwtDecode } from "jwt-decode";
import swal from "sweetalert";
//import StatusListOrder from "../User-page/components/StatusListOrder";
import "./Admin.css";

export interface ImageProduct {
    imageId: number;
    productId: number;
    imageUrl: string;
}

interface Order {
    orderId: number;
    userId: number;
    orderDate: string;
    address: string;
    paymentMethod: string;
    shippingMethodId: number;
    orderStatus: string;
    orderDetails: {
        productId: number;
        quantity: number;
        price: number;
        total: number;
    }[];
    total: number;
}

const Order = () => {
    const [orderData, setOrderData] = useState<Order[]>([]);
    const token = localStorage.getItem("token");
    const [isGlowing, setIsGlowing] = useState(false);

    if (!token) {
        swal({
            title: "Oops!",
            text: "You haven't logged in yet! Redirecting to Login Page...",
            icon: "warning",
            buttons: {
                ok: {
                    text: "OK",
                    value: true,
                    className: "swal-ok-button",
                },
            },
        }).then((value) => {
            if (value) {
                window.location.href = "/login";
            }
        });

        return;
    }

    const decodedToken: any = jwtDecode(token);


    const userName =
        decodedToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];

    const userToken = {
        Name: userName,
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setIsGlowing((prevIsGlowing) => !prevIsGlowing);
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const token = localStorage.getItem("token");

                if (!token) {
                    swal({
                        title: "Oops!",
                        text: "You haven't logged in yet! Redirecting to Login Page...",
                        icon: "warning",
                        buttons: {
                            ok: {
                                text: "OK",
                                value: true,
                                className: "swal-ok-button",
                            },
                        },
                    }).then((value) => {
                        if (value) {
                            window.location.href = "/login";
                        }
                    });

                    return;
                }

                const decodedToken: any = jwtDecode(token);
                const userIdIdentifier =
                    decodedToken[
                    "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
                    ];

                const response = await fetch(
                    `https://localhost:7030/api/User/getOrderList?userId=${parseInt(
                        userIdIdentifier
                    )}`
                );

                if (response.ok) {
                    const data = await response.json();

                    const updatedOrderData = data.map((order: Order) => {
                        const total = order.orderDetails.reduce(
                            (acc, detail) => acc + detail.total,
                            0
                        );
                        return {
                            ...order,
                            total: total,
                        };
                    });

                    setOrderData(updatedOrderData);
                } else {
                    console.error("Failed to retrieve order data:", response.status);
                }
            } catch (error) {
                console.error("Failed to retrieve order data:", error);
            }
        };

        fetchOrderData();
    }, []);

    const { allProduct } = useAllProduct();
    const [products, setProducts] = useState<aProduct[]>(allProduct);
    const navigate = useNavigate();
    console.log(allProduct);

    useEffect(() => {
        setProducts(allProduct);
    }, [allProduct]);

    const handleClickAdd = (products: aProduct[]) => {
        navigate("/addproduct", { state: { productList: products } });
    };

    const handleUpdate = (product: aProduct) => {
        navigate("/updateproduct", { state: { productId: product.productId } });
    };

    const deleteProduct = async (productId: number) => {
        console.log(productId);
        try {
            await fetch(
                `https://localhost:7030/api/Products/Delete?id=${productId}`,
                {
                    method: "DELETE",
                }
            );

            setProducts(
                products.filter((product) => product.productId !== productId)
            );
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
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
                        <div>
                            <div className="head-table">
                                <ul>
                                    <li className="view-product">All</li>
                                    <li className="add-product">
                                        Pending
                                    </li>
                                    <li className="view-product">Processing</li>
                                    <li className="view-product">Processed</li>
                                    <li className="view-product">Completed</li>
                                    <li className="view-product">Cancelled</li>
                                    <li className="view-product">Give back</li>
                                </ul>
                            </div>
                            <table className="table-order">
                                {
                                    orderData.map((order, index) => (
                                        <tr
                                            key={order.orderId}
                                        >
                                            <td>
                                                <div className="square-box">
                                                    <div className="header-square">
                                                        <span className="id-border">Order Id: {order.orderId}</span>
                                                        <span className="status-head">
                                                            {order.orderStatus}
                                                        </span>
                                                    </div>
                                                    <div className="customer-span">
                                                        <span>Customer <p>{userToken.Name}</p></span>
                                                    </div>

                                                    <span>Payment <p>{order.paymentMethod}</p></span>
                                                    <div className="remainder-span">
                                                        <span>Shipping<p>
                                                            {
                                                                [
                                                                    "Economical delivery",
                                                                    "Regular delivery",
                                                                    "Express delivery",
                                                                ][order.shippingMethodId - 1]
                                                            }
                                                        </p></span>
                                                    </div>

                                                    <div className="line-bottom">

                                                    </div>
                                                    <div className="under-square">
                                                        <span className="total-text">Total <p id="p-total">${order.total.toLocaleString()}</p></span>
                                                        <h5> {order.orderDate}</h5>
                                                    </div>

                                                </div>
                                            </td>


                                        </tr>
                                    ))}
                            </table>
                        </div>
                    </main>
                </div >
            </body >
        </>
    );
}
export default Order;




import { getUserIdFromToken, getAddressFromToken } from "../../utils/jwtHelper";
import { GiPositionMarker, Link } from "../../import/import-libary";
import { avatar, sec, sr, se } from "../../import/import-assets";
import { refreshToken } from "../../apiServices/AccountServices/refreshTokenServices";
import { useState } from "react";
import { useCart } from "../Cart-page/CartContext";
import Footer from "../../components/Footer/footer";
import Paypal from "./Paypal";
import swal from "sweetalert";
import "./Payment.css";

const Payment = () => {
  const [shippingMethodId, setShippingMethodId] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );
  const token = localStorage.getItem("token");

  const hasAddress = getAddressFromToken(token);
  const handleContinueClick = async () => {
    try {
     

      if (!token) {
        console.error("Token not found");
        return;
      }

      const userIdFromToken = getUserIdFromToken(token);
      const userAddress = getAddressFromToken(token);

      const userId = userIdFromToken;
      const orderDate = new Date().toISOString();

      const paymentMethod = "By Cash"; //From web
      const address = userAddress; //From web
      //console.error("Token not found", address);
      const products = cart.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        total: product.quantity * product.price,
      }));

      const order = {
        userId,
        orderDate,
        address,
        paymentMethod,
        shippingMethodId,
        products,
      };

      console.log(JSON.stringify(order));
      const response = await fetch("https://localhost:7030/api/orders", {
        //API CALL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`, //do later
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error("Failed to store cart data");
      }

      if (response.status === 401) {
        await refreshToken();
      }

      const data = await response.json();
      localStorage.removeItem("cart");
      console.log("Cart data stored:", data);
    } catch (error) {
      console.error("Error storing cart data:", error);
    }
  };

  const handleOnClick = () => {
    location.href = "/";
  };

  //get money from box-ship
  const handleOrderShipChange = (value: number) => {
    if (value === 1) {
      setSubtotal(30000);
      setShippingMethodId(1);
    } else if (value === 2) {
      setSubtotal(50000);
      setShippingMethodId(2);
    } else {
      setSubtotal(120000);
      setShippingMethodId(3);
    }
  };

  //Renove token logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
  };

  return (
    <div>
      <div className="header-payment">
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

            <div className="user-menu">
              <div className="avatar">
                <img src={avatar} alt="Avatar"></img>
              </div>
              <div className="menu-box">
                <a href="/user">View Profile</a>
                <a href="/login" onClick={handleLogout}>
                  Logout
                </a>
              </div>
            </div>
          </ul>
        </div>

        <div className="navbar-name-web">
          <div>
            <div className="name-web" onClick={() => handleOnClick()}>
              <h3>M</h3>
              <h3 id="and">&</h3>
              <h3>B.COM</h3>
            </div>

            <div className="line1"></div>
            <div className="text-payment">Payment</div>
          </div>
        </div>
      </div>

      <div className="body-payment">
        <div>
          <div className="box-top">
            <div className="box-method-ship">
              <h2>Shipping method</h2>
            </div>
            <div className="ship-method-list">
              <div className="economical">
                <div
                  className={`box-sec ${
                    shippingMethodId === 1 ? "active" : ""
                  }`}
                  onClick={() => handleOrderShipChange(1)}
                >
                  <img src={sec} alt="" className="logo-sec" />
                  <div>Economical delivery $30,000</div>
                </div>
              </div>
              <div className="regular">
                <div
                  className={`box-sr ${shippingMethodId === 2 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(2)}
                >
                  <img src={sr} alt="" className="logo-sr" />
                  <div>Regular delivery $50,000</div>
                </div>
              </div>
              <div className="express">
                <div
                  className={`box-se ${shippingMethodId === 3 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(3)}
                >
                  <img src={se} alt="" className="logo-se" />
                  <div>Express delivery $120,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-right">
            <div className="adress">
              <p>Shipping Address</p>
              <div className="box-adress">
              {hasAddress ? (
                    <Link to="/profile" >
                      <div className="box-adress">
                        <div>{hasAddress}</div>
                      </div>
                    </Link>
                  ) : (
                    <Link to="/profile" style={{ color: "white" }}>
                      <div className="box-adress">
                        <div>Confirm Shipping Address</div>
                      </div>
                    </Link>
                  )}
              </div>
            </div>
            <div className="voucher">
              <p>Voucher</p>
              <div className="box-voucher">
                <div>Promo Code</div>
              </div>
            </div>

            <div className="payment-methods">
              <p>Payment methods</p>
              {subtotal ? (
                <Paypal
                  payload={cart.map((product) => ({
                    productId: product.productId,
                    quantity: product.quantity,
                    price: product.price,
                    total: product.quantity * product.price,
                  }))}
                  amount={(totalAmount / 23500).toFixed(2)}
                  shippingMethod={shippingMethodId}
                />
              ) : (
                <Paypal
                  payload={[]}
                  amount="0.00"
                  shippingMethod={shippingMethodId}
                />
              )}
            </div>

            <div className="bill">
              <div className="total-sub">
                <p>Subtotal</p>
                <div>${subtotal.toLocaleString()}</div>
              </div>
              <div className="money-voucher">Voucher</div>
              <div className="total">
                <p>Total</p>
                <div className="total-price">
                  ${(totalAmount + subtotal).toLocaleString()}
                </div>
              </div>

              <div className="vat">(Incl. VAT)</div>
              {subtotal ? (
                <div
                  className="box-continue"
                  onClick={() => {
                    handleContinueClick();
                    swal({
                      title: "Order Placed Successfully!",
                      text: "Thank you for your purchase. Please check your purchase order for order details.",
                      icon: "success",
                      buttons: {
                        ok: {
                          text: "OK",
                          value: true,
                          className: "swal-ok-button",
                        },
                      },
                    }).then(() => {
                      window.location.href = "/processing";
                    });
                  }}
                >
                  Order
                </div>
              ) : (
                <div
                  className="box-continue"
                  style={{ color: "white", background: "#B4B4B4" }}
                >
                  Order
                </div>
              )}
            </div>
          </div>

          <div className="box-left-payment">
            <div className="Cart-Summary">
              <h2>Product</h2>
              <ul>
                <li>Price</li>
                <li className="quantity">Quantity</li>
                <li className="total-amount">Total amount</li>
              </ul>
            </div>
            <div style={{ overflow: "auto", height: "520px" }}>
              {cart.map((product, index) => {
                const totalAmount = product.price * product.quantity;
                const formattedProductTotalAmount =
                  totalAmount.toLocaleString();
                return (
                  <div className="detail-order" key={index}>
                    <div className="order-list">
                      <div className="img">
                        <img
                          src={product.imageProducts[0].imageUrl}
                          className="ma"
                          alt=""
                        />
                      </div>
                      <div className="name">{product.name}</div>
                      <div className="price-order">
                        ${product.price.toLocaleString()}
                      </div>
                      <div className="quantity-count">
                        {`${product.quantity}`}
                      </div>
                      <div className="money">
                        ${formattedProductTotalAmount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;

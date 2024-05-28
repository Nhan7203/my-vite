import { Link } from "react-router-dom";
import { useCart } from "../Cart-page/CartContext";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../../context/ShopContext";
import { GiPositionMarker } from "react-icons/gi";
import { BsFillPeopleFill } from "react-icons/bs";
import SEC from "../../assets/ship-economical.png";
import SR from "../../assets/ship-regular.png";
import SE from "../../assets/ship-Epress.png";
import StickyBox from "react-sticky-box";
import "./Payment.css";
import Footer from "../../components/Footer/footer";
import { useState } from "react";

const Payment = () => {
  const [activeOrderShip, setActiveOrderShip] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleContinueClick = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const decodedToken = jwtDecode(token) as JwtPayload;

      const userId = decodedToken.userId;
      const orderDate = new Date().toISOString();
      const shippingMethodId = 1; //From web  1:
      const paymentMethod = "123"; //From web
      const address = "456"; //From web

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

      const data = await response.json();
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
      setSubtotal(30);
      setActiveOrderShip(1);
    } else if (value === 2) {
      setSubtotal(50);
      setActiveOrderShip(2);
    } else {
      setSubtotal(120);
      setActiveOrderShip(3);
    }
  };

  return (
    <div>
      <StickyBox offsetTop={0}>
        <nav className="header-payment">
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

              <li className="login">
                <BsFillPeopleFill fontSize="1em" />
                <Link to="/login">
                  <button>Login</button>
                </Link>
              </li>
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
        </nav>
      </StickyBox>
      <div className="body-payment">
        <div>
          <div className="box-top">
            <div className="box-method-ship">
              <h2>Shipping method</h2>
            </div>
            <div className="ship-method-list">
              <div className="economical">
                <div
                  className={`box-sec ${activeOrderShip === 1 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(1)}
                >
                  <img src={SEC} alt="" className="logo-sec" />
                  <div>Economical delivery $30</div>
                </div>
              </div>
              <div className="regular">
                <div
                  className={`box-sr ${activeOrderShip === 2 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(2)}
                >
                  <img src={SR} alt="" className="logo-sr" />
                  <div>Regular delivery $50</div>
                </div>
              </div>
              <div className="express">
                <div
                  className={`box-se ${activeOrderShip === 3 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(3)}
                >
                  <img src={SE} alt="" className="logo-se" />
                  <div>Express delivery $120</div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-right">
            <div className="adress">
              <h4>Shipping Address</h4>
              <div className="box-adress">
                <div>Confirm Shipping Address</div>
              </div>
            </div>
            <div className="voucher">
              <h4>Voucher</h4>
              <div className="box-voucher">
                <div>Promo Code</div>
              </div>
            </div>

            <div className="payment-methods">
              <h4>Payment methods</h4>
            </div>

            <div className="bill">
              <div className="total-sub">
                <p>Subtotal</p>
                <div>{subtotal}</div>
              </div>
              <div className="money-voucher">Voucher</div>
              <div className="total">
                <p>Total</p>
                <div className="total-price">
                  ${totalAmount.toLocaleString() + subtotal}
                </div>
              </div>

              <div className="vat">(Incl. VAT)</div>
              <Link to="/order" style={{ color: "white" }}>
                <div className="box-continue" onClick={handleContinueClick}>
                  Order
                </div>
              </Link>
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
            <div style={{ overflow: "auto", height: "395px" }}>
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

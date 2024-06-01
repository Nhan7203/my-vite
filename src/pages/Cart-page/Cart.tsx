import { StickyBox, Link, FaRegTrashCan } from "../../import/import-libary";
import { Navbar, Footer } from "../../import/import-router";
import { useCart } from "./CartContext";
import Swal from "sweetalert2";
import "./Cart.css";
import ra from "../../assets/rabbit.png";

const ShoppingCart = () => {
  const { cart, decrementQuantity, incrementQuantity, removeItems } = useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const isLoggedIn = localStorage.getItem("token");
  //localStorage.setItem('hasAddress', true);
  const hasAddress = localStorage.getItem("hasAddress");
  return (
    <div>
      <StickyBox offsetTop={0} className="sticky-navbar">
        <Navbar />
      </StickyBox>

      <div className="body-cart">
        <div>
          <div className="box-left">
            <div className="Cart-Summary">
              <h2>Cart</h2>
              <ul>
                <li>Price</li>
                <li className="quantity">Quantity</li>
                <li className="total-amount">Total amount</li>
              </ul>
            </div>
            {totalAmount ? (
              <div style={{ overflow: "auto", height: "450px" }}>
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
                          <div
                            className="decrease"
                            onClick={() => decrementQuantity(product.productId)}
                          >
                            -
                          </div>
                          <input
                            type="text"
                            className="number"
                            placeholder={`${product.quantity}`}
                            readOnly
                          />
                          <div
                            className="increase"
                            onClick={() => incrementQuantity(product.productId)}
                          >
                            +
                          </div>
                        </div>
                        <div className="money">
                          ${formattedProductTotalAmount}
                        </div>
                        <div
                          className="icon"
                          onClick={() => removeItems(product.productId)}
                        >
                          <FaRegTrashCan />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="No-product-cart">
                <img src={ra} className="ra-img" alt="" />
                <p>Your cart is currently empty</p>
              </div>
            )}
          </div>
          <div className="box-right">
            <div className="adress">
              <p>Shipping Address</p>
              {isLoggedIn ? (
                <>
                  {hasAddress ? (
                    <div className="box-adress">
                      <div>Has Address</div>
                    </div>
                  ) : (
                    <Link to="/user" style={{ color: "white" }}>
                      <div className="box-adress">
                        <div>Confirm Shipping Address</div>
                      </div>
                    </Link>
                  )}
                </>
              ) : (
                <Link to="/login" style={{ color: "white" }}>
                  <div className="box-adress">
                    <div>Confirm Shipping Address</div>
                  </div>
                </Link>
              )}
            </div>
            <div className="voucher">
              <p>Voucher</p>
              <div className="box-voucher">
                <div>Promo Code</div>
              </div>
            </div>
            <div className="bill">
              <div>Subtotal</div>
              <div className="money-voucher">Voucher</div>
              <div className="total">
                <p>Total</p>
                <div className="total-price">
                  ${totalAmount.toLocaleString()}
                </div>
              </div>

              <div className="vat">(Incl. VAT)</div>
              {totalAmount ? (
                isLoggedIn ? (
                  <Link to="/payment" style={{ color: "white" }}>
                    <div className="box-continue">Payment</div>
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "white" }}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default link behavior
                      Swal.fire({
                        title: "Oops!",
                        text: "You haven't logged in yet! Redirecting to Login...",
                        icon: "error",
                      }).then(() => {
                        // Redirect to the login page after the Swal.fire is closed
                        window.location.href = "/login";
                      });
                    }}
                  >
                    <div className="box-continue">Payment</div>
                  </Link>
                )
              ) : (
                <div
                  className="box-continue"
                  style={{ color: "white", background: "#B4B4B4" }}
                >
                  Payment
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;

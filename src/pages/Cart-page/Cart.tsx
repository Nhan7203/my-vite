import { getUserIdFromToken, getAddressFromToken } from "../../utils/jwtHelper";
import { StickyBox, Link, FaRegTrashCan } from "../../import/import-libary";
import { Navbar, Footer } from "../../import/import-router";
import { useState } from "react";
import { useCart } from "./CartContext";
import Swal from "sweetalert2";
import swal from "sweetalert";
import ra from "../../assets/rabbit.png";
import "./Cart.css";

const ShoppingCart = () => {
  const { cart, decrementQuantity, incrementQuantity, removeItems } = useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  // const handleIncrement = (productId: number, quantity: number, stock: number) => {
  //   if (quantity < stock) {
  //     incrementQuantity(productId);
  //   } else {
  //     Swal.fire({
  //       title: "Oops!",
  //       text: "Cannot increase quantity beyond available stock!",
  //       icon: "error",
  //     });
  //   }
  // };
  const [isPreOrder, setIsPreOrder] = useState(false);
  const handleIncrement = (
    productId: number,
    quantity: number,
    stock: number
  ) => {
    if (quantity < stock || isPreOrder) {
      incrementQuantity(productId);
    } else {
      swal({
        title: "Out of stock",
        text: "This product is currently out of stock, but you can place a pre-order.",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
          incrementQuantity(productId);
          setIsPreOrder(true);
        }
      });
    }
  };

  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Token not found");
    return;
  }
  const isLoggedIn = getUserIdFromToken(token);

  const hasAddress = getAddressFromToken(token);

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
                            onClick={() =>
                              handleIncrement(
                                product.productId,
                                product.quantity,
                                product.stock
                              )
                            }
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

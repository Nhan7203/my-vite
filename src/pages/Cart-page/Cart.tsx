import { useState, useNavigate, useCart, swal2, swal } from "../../import/import-another";
import { getUserIdFromToken, getAddressFromToken } from "../../utils/jwtHelper";
import { StickyBox, Link, FaRegTrashCan } from "../../import/import-libary";
import { Navbar, Footer } from "../../import/import-components";
import { ra } from "../../import/import-assets";
import "./Cart.css";

const ShoppingCart = () => {
  const { cart, decrementQuantity, incrementQuantity, removeItems } = useCart();
  const [isPreorder, setIsPreorder] = useState(false);
  const [isNotPreorder, setIsNotPreorder] = useState(false);
  const navigate = useNavigate();
  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  cart.forEach((product) => {
    if (!isPreorder && product.stock === 0) {
      setIsPreorder(true);
    } else if (!isNotPreorder && product.stock > 0) {
      setIsNotPreorder(true);
    }
  });

  const handleIncrement = (
    productId: number,
    quantity: number,
    stock: number
  ) => {
    if (quantity < stock) {
      incrementQuantity(productId);
    } else if (quantity >= stock && stock !== 0) {
      swal({
        title: "Out of stock",
        text: "This product is currently out of stock.",
        icon: "info",
        dangerMode: true,
      }).then(() => {
        return;
      });
    } else if (quantity >= stock && stock == 0) {
      incrementQuantity(productId);
    }
  };

  //---------------------------------------------------------------------------------------------
  const token = localStorage.getItem("token");

  const isLoggedIn = token ? getUserIdFromToken(token) : null;
  const hasAddress = token ? getAddressFromToken(token) : null;

//-------------------------------------

const handlePaymentClick = () => {
  localStorage.setItem('hasAccessedCart', 'true');
  navigate('/payment');
};

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
                        ₫{product.price.toLocaleString()}
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
                        ₫{formattedProductTotalAmount}
                        </div>
                        <div
                          className="icon"
                          onClick={() => {
                            removeItems(product.productId);
                            window.location.reload();
                          }}
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
                    <Link to="/profile">
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
              <div
                className="box-voucher"
                style={{
                  backgroundColor: "#B4B4B4",
                  color: "white",
                  border: "none",
                }}
              >
                <div>Promo Code</div>
              </div>
            </div>
            <div className="bill">
              <div>Subtotal</div>
              <div className="money-voucher">Voucher</div>
              <div className="total">
                <p>Total</p>
                <div className="total-price">
                ₫{totalAmount.toLocaleString()}
                </div>
              </div>

              <div className="vat">(Incl. VAT)</div>
              {totalAmount ? (
                isLoggedIn ? (
                  isPreorder && isNotPreorder ? (
                    <div
                      className="box-continue"
                      style={{ color: "white" }}
                      onClick={(e) => {
                        e.preventDefault();
                        swal2.fire({
                          title: "Oops!",
                          text: "You cannot purchase a mix of in-stock and pre-order items in the same order. Please remove the in-stock items or the pre-order items from your cart before proceeding to payment.",
                          icon: "error",
                        });
                      }}
                    >
                      Payment
                    </div>
                  ) : (
                    <Link
                      to="#"
                      onClick={handlePaymentClick}
                      style={{ color: "white" }}
                    >
                      <div className="box-continue">Payment</div>
                    </Link>
                  )
                ) : (
                  <Link
                    to="/login"
                    style={{ color: "white" }}
                    onClick={(e) => {
                      e.preventDefault(); // Prevent the default link behavior
                      swal2.fire({
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

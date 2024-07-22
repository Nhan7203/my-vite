import { getUserIdFromToken, getAddressFromToken, getRoleFromToken, getNameFromToken } from "../../utils/jwtHelper";
import { useEffect, useState, swal } from "../../import/import-another";
import { avatar, sec, sr, se } from "../../import/import-assets";
import { refreshToken } from "../../apiServices/AccountServices/refreshTokenServices";
import { useCart } from "../Cart-page/CartContext";
import { CartData, Voucher } from "../../interfaces";
import { orders } from "../../apiServices/OrderServices/OrderServices";
import { Link } from "../../import/import-libary";
import VoucherModal from "../../components/Voucher/VoucherModal";
import Footer from "../../components/Footer/footer";
import Paypal from "./Paypal";
import "./Payment.css";

const Payment = () => {
  const [shippingMethodId, setShippingMethodId] = useState<number>(0);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);
  const [userName, setUserName] = useState();
  const [role, setRole] = useState();
  const [address, setAdress] = useState();
  const [userId, setId] = useState<string>("");
  const { cart } = useCart();

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (!token) {
      console.error("Token not found");
      return;
    }
    const userIdFromToken = getUserIdFromToken(token);
    setId(userIdFromToken);
    const roleIdentifier = getRoleFromToken(token);
    setRole(roleIdentifier);
    const usernameIdentifier = getNameFromToken(token);
    setUserName(usernameIdentifier);
    const userAddress = getAddressFromToken(token);
    setAdress(userAddress);
  }, [token]);

  //------------------- Handle Continue Click ------------------

  const handleContinueClick = async () => {
    try {
      const orderDate = new Date().toISOString();

      const paymentMethod = "By Cash"; //From web

      //console.error("Token not found", address);
      const products = cart.map((product) => ({
        productId: product.productId,
        nameProduct: product.name,
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
        voucherId: selectedVoucher ? selectedVoucher.voucherId : null,
        total: discountedTotal + subtotal,
      };

      console.log(JSON.stringify(order));

      const response = await orders(order);

      if (!response) {
        throw new Error("Failed to store cart data");
      }

      if (response.status === 401) {
        await refreshToken();
      }
      
      const cartData: CartData = JSON.parse(
        localStorage.getItem("storedCart") || "{}"
      );
      delete cartData[userId];
      localStorage.setItem("storedCart", JSON.stringify(cartData));
      
      localStorage.removeItem("currentQuantities");
      const data = await response.data;
      console.log("Cart data stored:", data);
    } catch (error) {
      console.error("Error storing cart data:", error);
    }
  };

  const handleOnClick = () => {
    location.href = "/";
  };

  //----------------- Get Money From box-ship --------------------

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

  //-------------------------------------------------------------

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleVoucherSelect = (voucher: Voucher) => {
    console.log("Selected Voucher:", voucher);
    setSelectedVoucher(voucher);
    localStorage.setItem("selectedVoucher",JSON.stringify(voucher));
  };

  //---------------- Calculate Disconunted ToTal --------------

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const calculateDiscountedTotal = () => {
    if (selectedVoucher) {
      if (selectedVoucher.discountType === "%") {
        return (
          totalAmount - (totalAmount * selectedVoucher.discountValue) / 100
        );
      } else if (selectedVoucher.discountType === "K") {
        const t = totalAmount - selectedVoucher.discountValue * 1000;
         return t < 0 ? 0 : t;
      }
    }
    return totalAmount;
  };

  const discountedTotal = calculateDiscountedTotal();

  //---------------- Handle Remove Voucher -------------------

  const handleRemoveVoucher = () => {
    setSelectedVoucher(null);
    setIsModalOpen(false);
  };

  //------------- Renove token logout ----------------------

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentQuantities");
  };

  localStorage.removeItem("hasAccessedCart");

  return (
    <div>
      <div className="header-payment">
        <div className="top-navbar">
          <ul className="top-navbar-list">
            <li>Location: Thu Duc - HCM - VN</li>

            <li>Tel: (+84) 3939393939</li>

            <div className="user-menu">
              <div className="avatar">
                <img src={avatar} alt="Avatar"></img>
                <h4>{userName}</h4>
              </div>
              <div className="menu-box">
                {role === "Admin" && <a href="/admin">DashBoard</a>}
                {role === "Staff" && <a href="/order">Order Management</a>}
                <a href="/profile">View Profile</a>
                <a href="/user">Purchase order</a>
                <a
                  href="/login"
                  onClick={handleLogout}
                  style={{ border: "none" }}
                >
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
                  <div>Economical delivery ₫30,000</div>
                </div>
              </div>
              <div className="regular">
                <div
                  className={`box-sr ${shippingMethodId === 2 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(2)}
                >
                  <img src={sr} alt="" className="logo-sr" />
                  <div>Regular delivery ₫50,000</div>
                </div>
              </div>
              <div className="express">
                <div
                  className={`box-se ${shippingMethodId === 3 ? "active" : ""}`}
                  onClick={() => handleOrderShipChange(3)}
                >
                  <img src={se} alt="" className="logo-se" />
                  <div>Express delivery ₫120,000</div>
                </div>
              </div>
            </div>
          </div>

          <div className="box-right">
            <div className="adress">
              <p>Shipping Address</p>
              {address ? (
                <Link to="/profile">
                  <div className="box-adress">
                    <div>{address}</div>
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
            <div className="voucher">
              <p>Voucher</p>
              <div className="box-voucher" onClick={handleOpenModal}>
                {selectedVoucher ? (
                  <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <div
                        onClick={handleRemoveVoucher}
                        style={{ cursor: "pointer", marginRight: "8px" }}
                      >
                        &#x2715;
                      </div>
                      <div>{selectedVoucher.code}</div>
                    </div>
                  </div>
                ) : (
                  <div>Select Vouchers</div>
                )}
                {!selectedVoucher && (
                  <div style={{ zIndex: 999 }}>
                    <VoucherModal
                      isOpen={isModalOpen}
                      onRequestClose={handleCloseModal}
                      cart={cart}
                      totalAmount={totalAmount}
                      onVoucherSelect={handleVoucherSelect}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="payment-methods">
              <p>Payment methods</p>
              {subtotal ? (
                <Paypal
                  amount={(totalAmount / 23500).toFixed(2)}
                  shippingMethod={shippingMethodId}
                  subtotal={subtotal}
                  totalAmount={totalAmount}
                />
              ) : (
                <Paypal                 
                    amount="0.00"
                    shippingMethod={shippingMethodId} 
                    subtotal={0}                       
                    totalAmount={0} 
                />
              )}
            </div>

            <div className="bill">
              <div className="total-sub">
                <p>Subtotal</p>
                <div>₫{subtotal.toLocaleString()}</div>
              </div>
              <div className="money-voucher">
                <p>Voucher</p>
                <div>
                  {selectedVoucher
                    ? selectedVoucher.discountValue +
                      (selectedVoucher.discountType === "%"
                        ? "%"
                        : selectedVoucher.discountType === "K"
                        ? "K"
                        : "")
                    : "None"}
                </div>
              </div>
              <div className="total">
                <p>Total</p>
                <div className="total-price">
                ₫{(discountedTotal + subtotal).toLocaleString()}
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
                      ₫{product.price.toLocaleString()}
                      </div>
                      <div className="quantity-count">
                        {`${product.quantity}`}
                      </div>
                      <div className="money">
                      ₫{formattedProductTotalAmount}
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

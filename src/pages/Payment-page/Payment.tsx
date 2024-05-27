import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../Cart-page/CartContext";
import StickyBox from "react-sticky-box";
import "./Payment.css";

const Payment = () => {
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  return (
    <div>
     <StickyBox offsetTop={0}>
      <Navbar />
    </StickyBox> 
      <div className="body-cart">
        <div>
          <div className="box-left">
            <div className="Cart-Summary">
              <h2>Product</h2>
              <ul>
                <li>Price</li>
                <li className="quantity">Quantity</li>
                <li className="total-amount">Total amount</li>
              </ul>
            </div>
            {cart.map((product, index) => {
              const totalAmount = product.price * product.quantity;
              const formattedProductTotalAmount = totalAmount.toLocaleString();
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
                    <div className="money">${formattedProductTotalAmount}</div>
                    
                  </div>
                </div>
              );
            })}
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
              <div>Subtotal</div>
              <div className="money-voucher">Voucher</div>
              <div className="total">
                <p>Total</p>
                <div className="total-price">
                  ${totalAmount.toLocaleString()}
                </div>
              </div>

              <div className="vat">(Incl. VAT)</div>
              <Link to="/order" style={{ color: "white" }}>
                <div className="box-continue">Order</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

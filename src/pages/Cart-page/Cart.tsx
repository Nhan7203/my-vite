import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import igh from "../../assets/milk.png";

const Cart = () => {
  return (
    <div>
      <Navbar />

      <div className="body-cart">
        <div>
          <div className="box-left">
            <div className="Cart-Summary">
              <h2>Cart</h2>
              <ul>
                <li>Price</li>
                <li className="quantity">Quantity</li>
                <li>Money</li>
              </ul>
            </div>
            <div className="detail-order">
              <div
                className="order-list"
                style={{
                  gridColumn: 1 / 13,
                }}
              >
                <div className="img"> <img src={igh} className="ma" alt="" /></div>
                <div className="name">2</div>
                <div className="price-order">3</div>
                <div className="quantity-count">4</div>
                <div className="money">5</div>
                <div className="icon">6</div>
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
            <div className="bill">
                <div>Subtotal</div>
                <div className="money-voucher">Voucher</div>
                <div className="total">Total</div>
                <div className="vat">(Incl. VAT)</div>
                <div className="box-continue">Continue</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

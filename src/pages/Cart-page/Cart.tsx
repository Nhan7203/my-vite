import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import { useCart } from "./CartContext";
import { FaRegTrashCan } from "react-icons/fa6";

const ShoppingCart = () => {
  const { cart, decrementQuantity, incrementQuantity, removeItems } = useCart();

  const totalAmount = cart.reduce((total, product) => total + (product.price * product.quantity), 0);

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
                      <img src={product.imageProducts[0].imageUrl} className="ma" alt="" />
                    </div>
                    <div className="name">{product.name}</div>
                    <div className="price-order">${product.price.toLocaleString()}</div>
                    <div className="quantity-count">
                      <div className="decrease" onClick={() => decrementQuantity(product.productId)}>
                        -
                      </div>
                      <input
                        type="text"
                        className="number"
                        placeholder={`${product.quantity}`}
                      />
                      <div className="increase" onClick={() => incrementQuantity(product.productId)}>
                        +
                      </div>
                    </div>
                    <div className="money">${formattedProductTotalAmount}</div>
                    <div className="icon" onClick={() => removeItems(product.productId)}>
                      <FaRegTrashCan />
                    </div>
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
            <div className="bill">
              <div>Subtotal</div>
              <div className="money-voucher">Voucher</div>
              <div className="total">
                <p>Total</p>
              <div className="total-price">${totalAmount.toLocaleString()}</div>
              </div>
              
              <div className="vat">(Incl. VAT)</div>
              <div className="box-continue">Continue</div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
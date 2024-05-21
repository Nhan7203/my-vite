import Navbar from "../../components/Navbar/Navbar";
import "./Cart.css";
import { useCart } from "./CartContext";
import { FaRegTrashCan } from "react-icons/fa6";

const ShoppingCart = () => {
  const { cart, decrementQuantity, incrementQuantity, totals, removeItems } = useCart();

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
            {cart.map((product, index) => (
              <div className="detail-order" key={index}>
                <div className="order-list">
                  <div className="img">
                    <img src={product.imageProducts[0].imageUrl} className="ma" alt="" />
                  </div>
                  <div className="name">{product.name}</div>
                  <div className="price-order">{product.price}</div>
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
                      placeholder={`${product.quantityInStock}`}
                    />
                    <div
                      className="increase"
                      onClick={() => incrementQuantity(product.productId)}
                    >
                      +
                    </div>
                  </div>
                  <div className="money">${totals[product.productId]}</div>
                  <div className="icon" onClick={() => removeItems(product.productId)}><FaRegTrashCan /></div>
                </div>
              </div>
            ))}
          </div>
          <div className="box-right">
            {/* ... */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
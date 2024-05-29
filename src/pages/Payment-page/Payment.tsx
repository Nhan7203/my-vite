import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useCart } from "../Cart-page/CartContext";
import StickyBox from "react-sticky-box";
import "./Payment.css";
import { jwtDecode } from 'jwt-decode';
import { JwtPayload } from '../../context/ShopContext'
import Paypal from "./Paypal";

const Payment = () => {
  const { cart } = useCart();

  const totalAmount = cart.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  );

  const handleContinueClick = async () => {
    try {

      const token = localStorage.getItem('token');

      if (!token) {

        console.error('Token not found');
        return;
      }

      const decodedToken = jwtDecode(token) as JwtPayload;

      const userId = decodedToken.userId;
      const orderDate = new Date().toISOString();
      const shippingMethodId = 1;               //From web
      const paymentMethod = "By Cash";          //From web 
      const address = "456";                    //From web

      const products = cart.map((product) => ({
        productId: product.productId,
        quantity: product.quantity,
        price: product.price,
        total: product.quantity * product.price,
      }))



      const order = {
        userId,
        orderDate,
        address,
        paymentMethod,
        shippingMethodId,
        products
      }

      console.log(JSON.stringify(order))
      const response = await fetch('https://localhost:7030/api/orders', { //API CALL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`, //do later
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to store cart data');
      }

      const data = await response.json();
      console.log('Cart data stored:', data);


    } catch (error) {
      console.error('Error storing cart data:', error);
    }
  };

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
              <Paypal
                payload={cart.map((product) => ({
                  productId: product.productId,
                  quantity: product.quantity,
                  price: product.price,
                  total: product.quantity * product.price,
                }))}
                amount={(totalAmount / 23500).toFixed(2)} />

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
                <div className="box-continue" onClick={handleContinueClick}>Order</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

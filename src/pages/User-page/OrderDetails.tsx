import { useParams, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../import/import-router";
import BoxMenuUser from "./components/BoxMenuUser";
import { useEffect, useState } from "react";
import * as searchOrderDetails from "../../apiServices/getOrderDetails";
import * as searchProduct from "../../apiServices/getProductId";
import { aProduct } from "../../context/ShopContext";
export interface OrderDetail {
  productId: number;
  quantity: number;
  price: number;
  total: number;
}

const OrderDetails = () => {
  const { orderId } = useParams<{ orderId?: string }>();
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<aProduct[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      if (!orderId) {
        navigate("/user");
        return;
      }
      const queryParams = new URLSearchParams();

      queryParams.append("orderId", orderId.toString());

      const result = await searchOrderDetails.getOrderDetails(queryParams);
      setOrderDetails(result);
    };
    fetchData();
  }, [orderId, navigate]);

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams();
      const productIds = orderDetails.map(
        (orderDetail) => orderDetail.productId
      );
      if (productIds != null) {
        queryParams.append("", productIds.toString());
      }
      const result = await searchProduct.getProductId(queryParams);
      setProducts(result);
    };
    fetchProducts();
  }, [orderDetails]);

  return (
    <div>
      <Navbar />
      <div className="body-user">
        <div>
          <BoxMenuUser />
          <div className="box-orderdeatail">
            <div className="Cart-Summary">
              <h2>Order</h2>
              <ul>
                <li>Price</li>
                <li className="quantity">Quantity</li>
                <li className="total-amount">Total amount</li>
              </ul>
            </div>
            <div style={{ overflow: "auto", height: "355px", borderTop: "1px solid #eaeaea" }}>
              {orderDetails.map((orderDetail) => {
                const product = products.find(
                  (p) => p.productId === orderDetail.productId
                );

                return (
                  <div className="detail-order" key={orderDetail.productId}>
                    <div className="order-list">
                      <div className="img">
                        <img
                          src={product?.imageProducts[0].imageUrl}
                          className="ma"
                          alt=""
                        />
                      </div>
                      <div className="name">{product?.name}</div>
                      <div className="price-order">
                        ${product?.price.toLocaleString()}
                      </div>
                      <div className="quantity-count">
                        {`${orderDetail.quantity}`}
                      </div>
                      <div className="money">${orderDetail.total}</div>
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

export default OrderDetails;

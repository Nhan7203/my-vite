// import { BsCart3 } from "react-icons/bs";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { GiPositionMarker } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";
import "./Product.css";
import Navbar from "../../components/Navbar/Navbar";
import ProductList from "./ProductList";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { aProduct } from "../../context/ShopContext";
import Footer from "../../components/Footer/footer";

const Product = () => {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<aProduct[]>([]);

  useEffect(() => {
    if (location.state && location.state.products) {
      setProducts(location.state.products);
      setIsLoading(false);
    }
  }, [location.state]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }
  return (
    <>
      <Navbar />

      <div className="container">
        <div className="filter-product">
          <div className="space"></div>
          <div>
            <div className="content-filter-head">
              <p className="text-cate">Category</p>
              <div className="content-cate">
                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Nut milk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Powdered milk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Fresh milk, Yogurt</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Nutritional drinks</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="main-pro-list">
              <div className="head-sort">
                <ul>
                  <li> Price Low - High</li>
                  <li>Price High - Low</li>
                </ul>
              </div>

              <div>
                {/* {products.map(product => (
                  <div key={product.productId}>
                    <h4>{product.name}</h4>
              

                  </div>
                ))} */}
                {products.map((product) => (
                  <ProductList
                    key={product.productId}
                    name={product.name}
                    price={product.price}
                    imageUrl={product.imageProducts[0].imageUrl}
                  />
                ))}
              </div>
            </div>

            <div className="content-filter-age">
              <p className="text-fotage">For age</p>
              <div className="content-cate">
                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>0 - 6 Month</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>6 - 12 Month</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>0 - 1 Year</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>1 - 2 year</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>+2 year</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="content-filter-brand">
              <p className="text-brand">For brand</p>
              <div className="content-cate">
                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>137degree</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>FrutoNyanya</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Hoff</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Meiji</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Nestle</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>PediaSure</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Sahmyook</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Similac</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>THtruemilk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Vinamilk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input type="checkbox" />
                  </li>
                  <li>
                    <span>Yakult</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Product;

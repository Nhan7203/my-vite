// import { BsCart3 } from "react-icons/bs";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { FaSearch } from "react-icons/fa";
// import { BsFillPeopleFill } from "react-icons/bs";
// import { GiPositionMarker } from "react-icons/gi";
// import { Link } from "react-router-dom";
// import logo from "../../assets/logo.png";
import "./Product.css";
import Footer from "../../components/Footer/footer";
import axios from "axios";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { aProduct } from "../../context/ShopContext";

const Product = () => {
  const [products, setProducts] = useState<aProduct[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [forAgeId, setForAgeId] = useState<number>(0);
  const [orderBy, setOrderBy] = useState("");
  const [brandId, setBrandId] = useState<number>(0);
  const [isCategoryChecked, setIsCategoryChecked] = useState(false);
  const [isForAgeChecked, setIsForAgeChecked] = useState(false);
  const [isBrandChecked, setIsBrandChecked] = useState(false);
  const location = useLocation();
  const [query, setQuery] = useState("");
  const [isInitialLoad, setIsInitialLoad] = useState(false);

  useEffect(() => {
    if (location.state && location.state.query) {
      setQuery(location.state.query);
    }
    setIsInitialLoad(true);
  }, [location.state]);

  useEffect(() => {
    if (isInitialLoad) {
      const fetchProductsByFilter = async () => {
        const queryParams = new URLSearchParams();

        if (isCategoryChecked && categoryId !== 0) {
          queryParams.append("categoryId", categoryId.toString());
        }

        if (isForAgeChecked && forAgeId !== 0) {
          queryParams.append("categoryId", forAgeId.toString());
        }

        if (isBrandChecked && brandId !== 0) {
          queryParams.append("brandId", brandId.toString());
        }

        if (orderBy === "price") {
          queryParams.append("orderBy", "price");
        } else if (orderBy === "priceDesc") {
          queryParams.append("orderBy", "priceDesc");
        }

        let url = `https://localhost:7030/api/Products?${queryParams.toString()}`;

        if (query) {
          url += `&search=${query}`;
        }

        const response = await axios.get(url);
        setProducts(response.data);
      };

      fetchProductsByFilter();
    }
  }, [
    isBrandChecked,
    isForAgeChecked,
    isCategoryChecked,
    categoryId,
    forAgeId,
    orderBy,
    brandId,
    query,
    isInitialLoad,
  ]);
  console.log("this is product : ", products);
  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.checked) {
      setCategoryId(Number(value));
      setIsCategoryChecked(true);
    } else {
      setCategoryId(0);
      setIsCategoryChecked(false);
    }
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.checked) {
      setBrandId(Number(value));
      setIsBrandChecked(true);
    } else {
      setBrandId(0);
      setIsBrandChecked(false);
    }
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.checked) {
      setForAgeId(Number(value));
      setIsForAgeChecked(true);
    } else {
      setForAgeId(0);
      setIsForAgeChecked(false);
    }
  };

  const handleOrderChange = (value: string) => {
    if (value === "price") {
      setOrderBy("price");
    } else if (value === "priceDesc") {
      setOrderBy("priceDesc");
    } else {
      setOrderBy("");
    }
  };

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
                    <input
                      type="checkbox"
                      value={2}
                      onChange={handleCategoryChange}
                    />
                  </li>
                  <li>
                    <span>Nut milk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={1}
                      onChange={handleCategoryChange}
                    />
                  </li>
                  <li>
                    <span>Powdered milk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={4}
                      onChange={handleCategoryChange}
                    />
                  </li>
                  <li>
                    <span>Fresh milk, Yogurt</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={3}
                      onChange={handleCategoryChange}
                    />
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
                  <li>
                    <button onClick={() => handleOrderChange("price")}>
                      Price Low - High
                    </button>
                  </li>
                  <li>
                    <button onClick={() => handleOrderChange("priceDesc")}>
                      Price High - Low
                    </button>
                  </li>
                </ul>
              </div>

              <div>
                
                {products.map((product) => (
                  <div className="detail-order" key={product.productId}>
                    <div className="order-list">
                      <div className="img">
                        <img
                          src={product.imageProducts[0].imageUrl}
                          className="ma"
                          alt=""
                        />
                      </div>
                      <div className="name">{product.name}</div>
                      <div className="price-order">{product.price}</div>
                      <div className="quantity-count">
                        <div className="decrease"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="content-filter-age">
              <p className="text-fotage">For age</p>
              <div className="content-cate">
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={1}
                      onChange={handleAgeChange}
                    />
                  </li>
                  <li>
                    <span>0 - 6 Month</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={2}
                      onChange={handleAgeChange}
                    />
                  </li>
                  <li>
                    <span>6 - 12 Month</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={3}
                      onChange={handleAgeChange}
                    />
                  </li>
                  <li>
                    <span>0 - 1 Year</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={4}
                      onChange={handleAgeChange}
                    />
                  </li>
                  <li>
                    <span>1 - 2 year</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={5}
                      onChange={handleAgeChange}
                    />
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
                    <input
                      type="checkbox"
                      value={5}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>137degree</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={3}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>FrutoNyanya</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={7}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>Hoff</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={1}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>Meiji</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={6}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>Nestle</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={10}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>PediaSure</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={4}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>Sahmyook</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={11}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>Similac</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={2}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>THtruemilk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={9}
                      onChange={handleBrandChange}
                    />
                  </li>
                  <li>
                    <span>Vinamilk</span>
                  </li>
                </ul>

                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={8}
                      onChange={handleBrandChange}
                    />
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

import "./Product.css";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/Navbar";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { aProduct } from "../../context/ShopContext";
import { BsCart3 } from "react-icons/bs";
import * as searchServices from "../../apiServices/searchServices";
import { useCart } from '../../pages/Cart-page/CartContext';
import { Link } from "react-router-dom"

const Product = () => {
  const location = useLocation();
  const { addToCart } = useCart();
  const [products, setProducts] = useState<aProduct[]>([]);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [forAgeId, setForAgeId] = useState<number>(0);
  const [orderBy, setOrderBy] = useState("");
  const [brandId, setBrandId] = useState<number>(0);
  const [isCategoryChecked, setIsCategoryChecked] = useState(false);
  const [isForAgeChecked, setIsForAgeChecked] = useState(false);
  const [isBrandChecked, setIsBrandChecked] = useState(false);
  const [activeOrder, setActiveOrder] = useState("");
  const [isSearchSuccess, setIsSearchSuccess] = useState(false);
  const [query, setQuery] = useState("");
  const [isCheckedData, setIsCheckedData] = useState(false);

useEffect(() => {
  if (location.state && location.state.query) {
    setQuery(location.state.query);
  }
}, [location.state]);

useEffect(() => {
  const fetchProductsByFilter = async () => {
    const queryParams = new URLSearchParams();

    if (isCategoryChecked && categoryId !== 0) {
      queryParams.append("categoryId", categoryId.toString());
      setIsCheckedData(true)
    }

    if (isForAgeChecked && forAgeId !== 0) {
      queryParams.append("forAgeId", forAgeId.toString());
      setIsCheckedData(true)
    }

    if (isBrandChecked && brandId !== 0) {
      queryParams.append("brandId", brandId.toString());
      setIsCheckedData(true)
    }

    if (orderBy === "price") {
      queryParams.append("orderBy", "price");
      setIsCheckedData(true)
    } else if (orderBy === "priceDesc") {
      queryParams.append("orderBy", "priceDesc");
      setIsCheckedData(true)
    }

    if (query) {
      queryParams.append("search", query);
   
      setIsSearchSuccess(true);
    }
    if(isSearchSuccess){
      const response = await searchServices.search(queryParams);
      setProducts(response);
      setIsSearchSuccess(false);
    }
    else if(!isSearchSuccess){
      const response = await searchServices.search(queryParams);
      setProducts(response);
    }
    
  };

  if (!isSearchSuccess && isCheckedData) {
    setQuery("");
    setIsSearchSuccess(false);
      //setIsCheckedData(false)
  }
  fetchProductsByFilter();
}, [
  isBrandChecked,
  isForAgeChecked,
  isCategoryChecked,
  categoryId,
  forAgeId,
  orderBy,
  brandId,
  query,
  isSearchSuccess,
  isCheckedData
]);
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
      setActiveOrder("price");
    } else if (value === "priceDesc") {
      setOrderBy("priceDesc");
      setActiveOrder("priceDesc");
    } else {
      setOrderBy("");
      setActiveOrder("");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
       
        <div className="filter-product">
          <div className="space-white"></div>
          <div>
            <div className="content-filter-head">
              <p className="text-cate">Category</p>
              <div className="content-cate">
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      value={2}
                      checked={categoryId === 2}
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
                      checked={categoryId === 1}
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
                      checked={categoryId === 4}
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
                      checked={categoryId === 3}
                      onChange={handleCategoryChange}
                    />
                  </li>
                  <li>
                    <span>Nutritional drinks</span>
                  </li>
                </ul>
              </div>

              <div className="content-filter-age">
                <p className="text-fotage">For age</p>
                <div className="content-cate">
                  <ul>
                    <li>
                      <input
                        type="checkbox"
                        value={1}
                        checked={forAgeId === 1}
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
                        checked={forAgeId === 2}
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
                        checked={forAgeId === 3}
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
                        checked={forAgeId === 4}
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
                        checked={forAgeId === 5}
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
                        checked={brandId === 5}
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
                        checked={brandId === 3}
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
                        checked={brandId === 7}
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
                        checked={brandId === 6}
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
                        checked={brandId === 10}
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
                        checked={brandId === 4}
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
                        checked={brandId === 11}
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
                        checked={brandId === 2}
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
                        checked={brandId === 9}
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
                        checked={brandId === 8}
                        onChange={handleBrandChange}
                      />
                    </li>
                    <li>
                      <span>Yakult</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="filter-under-line"></div>
            </div>

            <div className="main-pro-list">
              <div className="head-sort">
                <ul>
                  <li
                    className={activeOrder === "price" ? "active" : ""}
                    onClick={() => handleOrderChange("price")}
                  >
                    Price Low - High
                  </li>
                  <li
                    className={activeOrder === "priceDesc" ? "active" : ""}
                    onClick={() => handleOrderChange("priceDesc")}
                  >
                    Price High - Low
                  </li>
                </ul>
              </div>

              <div className="result-product">
                {products.map((product) => (
                  <div className="element-product" key={product.productId}>
                    <div className="element-img">
                    <Link to={`/productDetails/${product.productId}`}><img
                        src={product.imageProducts[0].imageUrl}
                        className="imgpng"
                        alt=""
                      /></Link>
                    </div>
                    <p className="element-name">{product.name}</p>

                    <div className="body-text">
                      <span className="element-price">
                        ${product.price.toLocaleString()}{" "}
                      </span>
                      <div className="box-icon-product-page">
                        <BsCart3
                          className="icon-cart-product-page"
                          fontSize="1.4em" onClick={() => addToCart(product)}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="under-line"></div>
      </div>
      <Footer />
    </>
  );
};

export default Product;





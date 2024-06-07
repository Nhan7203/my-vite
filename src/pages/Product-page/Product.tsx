import { useState, useEffect } from "react";
import { StickyBox, Link } from "../../import/import-libary";
import { Navbar, Footer } from "../../import/import-router";
import { useLocation } from "react-router-dom";
import { aProduct } from "../../context/ShopContext";
import { BsCart3 } from "react-icons/bs";
import { useCart } from "../../pages/Cart-page/CartContext";
import * as searchServices from "../../apiServices/searchServices";
import * as brand from "../../apiServices/getBrand";
import by from "../../assets/search-empty.png";
import { MdNavigateBefore, MdNavigateNext } from "../../import/import-libary";
import "./Product.css";
import React, { useRef } from "react";
import rate from "../../assets/rating.png";

export interface Brand {
  brandId: number;
  name: string;
  imageBrandUrl: string;
}

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

  useEffect(() => {
    const fetchProductsByFilter = async () => {
      const queryParams = new URLSearchParams();

      if (isCategoryChecked && categoryId !== 0) {
        queryParams.append("categoryId", categoryId.toString());
      }

      if (isForAgeChecked && forAgeId !== 0) {
        queryParams.append("forAgeId", forAgeId.toString());
      }

      if (isBrandChecked && brandId !== 0) {
        queryParams.append("brandId", brandId.toString());
      }

      if (orderBy === "price") {
        queryParams.append("orderBy", "price");
      } else if (orderBy === "priceDesc") {
        queryParams.append("orderBy", "priceDesc");
      }

      if (location.state && location.state.query) {
        queryParams.append("search", location.state.query);
      }

      const response = await searchServices.search(queryParams);
      setProducts(response);
    };
    fetchProductsByFilter();
  }, [
    isBrandChecked,
    isForAgeChecked,
    isCategoryChecked,
    categoryId,
    forAgeId,
    orderBy,
    brandId,
    location.state,
  ]);

  const [brandList, setBrandList] = useState<Brand[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await brand.getBrand();
      setBrandList(result);
    };
    fetchData();
  }, []);

  const getGridColumn = (index: number) => {
    const columns = 15;
    const start = 1 + (index % columns) * 2;
    const end = start + 1;
    return `${start} / ${end}`;
  };
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

  const handleBrand = (value: number) => {
    setBrandId(brandId);
    handleBrandChange({
      target: { value: String(value), checked: value !== 0 },
    } as React.ChangeEvent<HTMLInputElement>);
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
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft -= 1200;
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += 1200;
    }
  };
  return (
    <div>
      <StickyBox offsetTop={0} className="sticky-navbar">
        <Navbar />
      </StickyBox>

      <div className="container">
        <div className="filter-product">
          <button className="scroll-left" onClick={scrollLeft}>
            <MdNavigateBefore />
          </button>
          <div
            ref={containerRef}
            style={{
              overflow: "auto",
              zIndex: "0",
            }}
          >
            {brandList.map((brand, index) => (
              <div
                className={`element-brand ${
                  brandId === brand.brandId ? "active" : ""
                }`}
                style={{
                  gridColumn: getGridColumn(index),
                  zIndex: "0",
                }}
              >
                <img
                  src={brand.imageBrandUrl}
                  className="element-img-brand"
                  alt=""
                  onClick={() => handleBrand(brand.brandId)}
                />
              </div>
            ))}
          </div>
          <button className="scroll-right" onClick={scrollRight}>
            <MdNavigateNext />
          </button>
          <div
            className="box-white"
            style={{
              background: "#f5f7fc",
              position: "sticky",
              zIndex: 500,
              top: "200px",
              height: "15px",
              marginTop: "5px",
            }}
          >
            {" "}
          </div>
          <div style={{ background: "#f5f7fc", marginTop: 0 }}>
            <div className="all-filter">
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
                    {brandList.map((brand) => (
                      <ul key={brand.brandId}>
                        <li>
                          <input
                            type="checkbox"
                            value={brand.brandId}
                            checked={brandId === brand.brandId}
                            onChange={handleBrandChange}
                          />
                        </li>
                        <li>
                          <span>{brand.name}</span>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>

                {/*<div className="filter-under-line"></div>*/}
              </div>
            </div>
            <div className="main-pro-list">
              <div
                style={{
                  position: "sticky",
                  clear: "both",
                  zIndex: 500,
                  top: "215px",
                  background: " #f5f7fc",
                  height: "70px",
                }}
              >
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
              </div>
              {products.length > 0 ? (
                <div className="result-product">
                  {products.map((product) => (
                    <div className="element-product" key={product.productId}>
                      <div className="element-img">
                        <Link to={`/productDetails/${product.productId}`}>
                          <img
                            src={product.imageProducts[0].imageUrl}
                            className="imgpng"
                            alt=""
                          />
                        </Link>
                      </div>
                      <p className="element-name">{product.name}</p>
                      <div className="rate-sold">
                        <img src={rate} className="rate-star" alt="" />
                        <p>Sold: 50k</p>
                      </div>
                      <div className="body-text">
                        <span className="element-price">
                          ${product.price.toLocaleString()}{" "}
                        </span>
                        <div className="box-icon-product-page">
                          <BsCart3
                            className="icon-cart-product-page"
                            fontSize="1.4em"
                            onClick={() => addToCart(product)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="box-empty">
                  <img src={by} className="ra-img" alt="" />
                  <p>No matching results were found</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="under-line"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;

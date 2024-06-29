/* eslint-disable @typescript-eslint/no-explicit-any */
import { StickyBox } from "../../import/import-libary";
import { useState, useEffect, useCallback } from "../../import/import-another";
import { RatingDetails, aProduct } from "../../interfaces";
import { HandleAddToCart } from "../Cart-page/HandleAddToCart";
import { Navbar, Footer } from "../../import/import-components";
import FitlerContent from "./components/FitlerContent";
import ListProduct from "./components/ListProduct";
import BrandCarousel from "./components/BrandCarousel";
import { fetchRatingss, renderStars } from "./components/ratingUtils";
import "./Product.css";
import useProductFilter from "./components/useProductFilter";

const Product = () => {
  const {
    products,
    brandList,
    brandId,
    activeOrder,
    forAgeId,
    categoryId,
    handleCategoryChange,
    handleBrandChange,
    handleBrand,
    handleAgeChange,
    handleOrderChange,
  } = useProductFilter();

  //------------------------------------------------------------------------
  const [ratings, setRatings] = useState<{ [key: string]: RatingDetails }>({});

  const fetchRatings = useCallback(async () => {
    try {
      const ratingsMap = await fetchRatingss(products);
      setRatings(ratingsMap);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  }, [products]);

  useEffect(() => {
    fetchRatings();
  }, [fetchRatings]);

  //-----------------------------------------------------------------------------------------------
  const { handleAddToCart } = HandleAddToCart();

  const HandleAddToCartClick = (product: aProduct) => {
    handleAddToCart(product);
  };
  //-------------------------------------------------------------------------------------------------------------

  return (
    <div>
      <StickyBox offsetTop={0} className="sticky-navbar">
        <Navbar />
      </StickyBox>

      <div className="container">
        <div className="filter-product">
          <BrandCarousel
            brandId={brandId}
            brandList={brandList}
            handleBrand={handleBrand}
          />
          <div
            style={{
              background: "#f5f7fc",
              position: "sticky",
              zIndex: 500,
              top: "200px",
              height: "15px",
              marginTop: "5px",
            }}
          ></div>
          <div style={{ background: "#f5f7fc", marginTop: 0 }}>
            <FitlerContent
              brandId={brandId}
              forAgeId={forAgeId}
              categoryId={categoryId}
              brandList={brandList}
              handleAgeChange={handleAgeChange}
              handleBrandChange={handleBrandChange}
              handleCategoryChange={handleCategoryChange}
            />
            <ListProduct
              products={products}
              ratings={ratings}
              renderStars={renderStars}
              activeOrder={activeOrder}
              handleOrderChange={handleOrderChange}
              HandleAddToCartClick={HandleAddToCartClick}
            />
          </div>
        </div>
        <div className="under-line"></div>
      </div>
      <Footer />
    </div>
  );
};

export default Product;

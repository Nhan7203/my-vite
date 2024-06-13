import { useState, useEffect, useCallback, useMemo } from "react";
import { adv, adv1, adv2 } from "../../../import/import-assets";
import { useAllProduct } from "../../../context/ShopContext";
import ProductCard from "./ProductCard";
import ChatIconComponent from "../../Chat/ChatIconComponent";
import "./Main.css";

const Main = () => {

  const { allProduct } = useAllProduct();
  const [noOfElement, setNoOfElement] = useState(8);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = useMemo(() => [adv, adv1, adv2], []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
  }, [bannerImages]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const loadMore = () => {
    setNoOfElement((prevNoOfElement) => prevNoOfElement + noOfElement);
  };

  const slice = allProduct.slice(0, noOfElement);

  return (
    <div className="container">
      <div className="banner">
        <img
          src={bannerImages[currentSlide]}
          className={`adv-banner slide-${currentSlide}`}
          alt=""
        />
      </div>

      <h2 className="suggest">Suggested Products</h2>

      <div className="home-product">
        <div>
          {slice.map((product, index) => (
            <ProductCard key={index} index={index} product={product} />
          ))}
        </div>
      </div>

      {slice.length < allProduct.length && (
        <div className="load-more">
          <button onClick={loadMore}>Load more</button>
        </div>
      )}
      {<ChatIconComponent />}
    </div>
  );
};

export default Main;
import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import adv from "../../../assets/adv.png";
import adv1 from "../../../assets/adv1.png";
import adv2 from "../../../assets/adv1.png";
import "./Main.css";
import { useAllProduct } from "../../../context/ShopContext";

const Main = () => {
  const { allProduct } = useAllProduct();
  const [noOfElement, setNoOfElement] = useState(8);
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [adv, adv1, adv2];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

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

      <div className="load-more">
        <button onClick={loadMore}>Load more</button>
      </div>
    </div>
  );
};

export default Main;
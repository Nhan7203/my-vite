import ProductCard from "./ProductCard";
import adv from "../../../assets/adv.png";
import "./Main.css";

import { useState } from "react";
import { useAllProduct } from "../../../context/ShopContext";

const Main = () => {
  
  const {allProduct} = useAllProduct();

  const [noOfElement, setnoOfElement] = useState(8);
  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };

  const slice = allProduct.slice(0, noOfElement);

  return (
    <div className="container">
      <div className="banner">
        <img src={adv} className="adv-banner" alt="" />
      </div>

      <h2 className="suggest">Suggest Product</h2>

      <div className="home-product">
        <div>
          {slice.map((product, index) => (
            <ProductCard key={index} index={index} product={product} />
          ))}
        </div>
      </div>

      <div className="load-more">
        <button onClick={() => loadMore()}>Loard more</button>
      </div>
    </div>
  );
};

export default Main;

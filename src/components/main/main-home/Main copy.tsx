import ProductCard from "./ProductCard";
import adv from "../../../assets/adv.png";
import "./Main.css";

import { useEffect, useState } from "react";
import axios from "axios";

const Main = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://localhost:7174/api/ProductItems")
      .then((response) => {
        setItems(response.data);
        console.log("check data axios: ", response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [noOfElement, setnoOfElement] = useState(8);
  const loadMore = () => {
    setnoOfElement(noOfElement + noOfElement);
  };

  const slice = items.slice(0, noOfElement);
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

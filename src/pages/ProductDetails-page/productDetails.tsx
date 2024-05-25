import "./ProductDetail.css";
import Footer from "../../components/Footer/footer";
import Navbar from "../../components/Navbar/Navbar";
import { useAllProduct } from "../../context/ShopContext";
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";
import ProductCard from "../../components/main/main-home/ProductCard";
import adv from "/src/assets/adv.png";
import adv1 from "/src/assets/adv1.png";
import adv2 from "/src/assets/adv2.png";



const ProductDetail = () => {


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


  // const { allProduct } = useAllProduct();
  const { productId } = useParams<{ productId?: string }>();

  let product;
  if (productId) {
    product = allProduct.find((e) => e.productId === parseInt(productId));
  }


  return (
    <>
      <Navbar />
      {product ? (
        <div className="body-detail">
          <div className="grid-12">
            <div className="big-image">
              <img className="img-detail" src={product.imageProducts[0].imageUrl} alt="" />
            </div>
            <div className="content-product">
              <p className="name-pro">{product.name}</p>
              <div className="rating-sold">
                <span className="sold">Available: 1</span>
              </div>

              <h3>
                {product.price}
                <span>$</span>
              </h3>
              <div className="trans-zalo">
                <div className="img-zalo">
                  <img src="" alt="" />
                </div>

                <span>
                  30,000 VND discount for orders from 900,000 VND when entering
                  code ZLPYEUCON to pay with ZaloPay wallet
                </span>
              </div>
              <div className="quantity-content">
                <span>Quantity</span>
                <div>
                  <div id="btMinus">
                    <img src="/src/assets/minus.svg" alt="" />
                  </div>

                  <span id="quantity">1</span>
                  <div id="btPlus">
                    <img src="/src/assets/plus.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="button-cart">
                <span id="add-cart">Add to cart</span>
                <span className="buy-now">Buy now</span>
              </div>
            </div>

            <img className="img-1" src="" alt="" />
            <img className="img-2" src="" alt="" />
            <img className="img-3" src="" alt="" />


          </div>

        </div>
      ) : (
        <p>Loading...</p>
      )}



      <div className="home-product">
        <div>
          <h4>
            Similar Products
          </h4>
          {slice.map((product, index) => (
            <ProductCard key={index} index={index} product={product} />
          ))}
        </div>
      </div>

      <div className="load-more">
        <button onClick={loadMore}>Load more</button>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;

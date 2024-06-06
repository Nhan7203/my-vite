import { useAllProduct, aProduct } from "../../context/ShopContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Footer } from "../../import/import-router";
import { useCart } from "../../pages/Cart-page/CartContext";
import ProductCard from "../../components/main/main-home/ProductCard";
import adv from "/src/assets/adv.png";
import adv1 from "/src/assets/adv1.png";
import adv2 from "/src/assets/adv2.png";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { addToCart2 } = useCart();
  const { allProduct } = useAllProduct();
  const [noOfElement, setNoOfElement] = useState(8);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

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

  const { productId } = useParams<{ productId?: string }>();

  let product: any;
  if (productId) {
    product = allProduct.find((e) => e.productId === parseInt(productId));
  }

  const [quantity, setQuantity] = useState(1);

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < product.stock) setQuantity(quantity + 1);
  };

  const handleAddToCart = (product: aProduct) => {
    addToCart2(product, quantity, "add");
  };

  const handleBuyNow = (product: aProduct) => {
    addToCart2(product, quantity, "buy");
    navigate("/cart");
  };

  return (
    <>
      <Navbar />
      {product ? (
        <div className="body-detail">
          <div className="grid-12">
            <div className="big-image">
              <img
                className="img-detail"
                src={product.imageProducts[0].imageUrl}
                alt=""
              />
            </div>
            <div className="content-product">
              <p className="name-pro">{product.name}</p>
              <div className="rating-sold">
                <span className="sold">Available: {product.stock}</span>
              </div>

              <h3>${product.price.toLocaleString()}</h3>
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
                  <div id="btMinus" onClick={handleDecrementQuantity}>
                    <img src="/src/assets/minus.svg" alt="" />
                  </div>

                  <span id="quantity">{quantity}</span>
                  <div id="btPlus" onClick={handleIncrementQuantity}>
                    <img src="/src/assets/plus.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="button-cart">
                <span
                  className="add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to cart
                </span>
                <span className="buy-now" onClick={() => handleBuyNow(product)}>
                  Buy now
                </span>
              </div>
            </div>

            <div className="box-img-1"><img className="img-1" src={product.imageProducts[1].imageUrl} alt="" /></div>
            <div className="box-img-2"><img className="img-2" src={product.imageProducts[2].imageUrl} alt="" /></div>
            <div className="box-img-3"><img className="img-3" src={product.imageProducts[3].imageUrl} alt="" /></div>
          </div>
        </div>
      ) : (
        <Link to="/product"></Link>
      )}

      <div className="home-product">
        <div>
          <h4>Similar Products</h4>
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

      <Footer />
    </>
  );
};

export default ProductDetail;

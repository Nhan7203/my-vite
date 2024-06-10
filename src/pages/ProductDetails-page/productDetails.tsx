import { useAllProduct } from "../../context/ShopContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Navbar, Footer } from "../../import/import-router";
import { useCart } from "../Cart-page/CartContext";
import ProductCard from "../../components/main/main-home/ProductCard";
import adv from "/src/assets/adv.png";
import adv1 from "/src/assets/adv1.png";
import adv2 from "/src/assets/adv2.png";
import "./ProductDetail.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStarOutline } from "@fortawesome/free-regular-svg-icons";
import swal from "sweetalert";
import { aProduct } from "../../interfaces";
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

  const [ratingInfo, setRatingInfo] = useState({
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
  });

  const [productReviews, setProductReviews] = useState([]);
  const [currentProductId, setCurrentProductId] = useState(null);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadMore = () => {
    setNoOfElement((prevNoOfElement) => prevNoOfElement + noOfElement);
  };

  const slice = allProduct.slice(0, noOfElement);

  const { productId } = useParams<{ productId?: string }>();

  const [products, setProducts] = useState<aProduct | null>(null);

  useEffect(() => {
    if (productId) {
      const selectedProduct = allProduct.find(
        (e) => e.productId === parseInt(productId)
      );
      setProducts(selectedProduct);
      setCurrentProductId(productId);
    }
  }, [productId, allProduct]);

  let product: any;
  if (productId) {
    product = allProduct.find((e) => e.productId === parseInt(productId ?? ""));
  }

  const [quantity, setQuantity] = useState(1);

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      setQuantity(quantity);
    }
  };
  //----------------------------------------------------------------------------------------------
  const handleAddToCart = (product: aProduct, quantity: number) => {
    if (product.stock > 0) {
      addToCart2(product, quantity, "add");
    } else {
      try {
        swal({
          title: "Out of stock",
          text: "This product is currently out of stock, but you can place a pre-order.",
          icon: "info",
          buttons: ["Cancel", "Confirm"],
          dangerMode: true,
        }).then(async (confirm) => {
          if (confirm) {
            addToCart2(product, quantity, "add");
          }
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };
  //--------------------------------------------------------------------------------------------------------
  const handleBuyNow = (product: aProduct) => {
    addToCart2(product, quantity, "buy");
    navigate("/cart");
  };

  const fetchRatings = async (productId: string) => {
    try {
      const response = await fetch(
        "https://localhost:7030/api/Review/GetAllRating"
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allRatings = await response.json();

      const productRatings = allRatings.filter(
        (rating) => String(rating.productId) === String(productId)
      );
      setProductReviews(productRatings);

      if (productRatings.length > 0) {
        const response = await fetch(
          `https://localhost:7030/api/Review/GetProductRating?productId=${productId}`,
          {
            method: "POST",
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productRatingDetails = await response.json();
        setRatingInfo({
          averageRating: productRatingDetails.averageRating,
          totalRating: productRatingDetails.totalRating,
          reviewCount: productRatingDetails.reviewCount,
        });
      } else {
        setRatingInfo({
          averageRating: 0,
          totalRating: 0,
          reviewCount: 0,
        });
      }
    } catch (error) {
      console.error("Failed to fetch product ratings:", error);
    }
  };

  useEffect(() => {
    if (currentProductId) {
      fetchRatings(currentProductId);
    }
  }, [currentProductId]);

  useEffect(() => {
    if (product) {
      fetchRatings(product.productId);
    }
  }, [product]);

  const renderStars = (rating = ratingInfo.averageRating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`full-${i}`}
          icon={solidStar}
          style={{ color: "yellow" }}
        />
      );
    }

    if (halfStar) {
      stars.push(
        <FontAwesomeIcon
          key="half"
          icon={faStarHalfAlt}
          style={{ color: "yellow" }}
        />
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <FontAwesomeIcon
          key={`empty-${i}`}
          icon={regularStarOutline}
          style={{ color: "grey" }}
        />
      );
    }

    return stars;
  };

  const renderProductReviews = () => {
    return productReviews.map((review, index) => (
      <div key={index} className="review">
        <div className="review-header">
          <span className="review-user">User: {review.userId}</span>
          <span className="review-date">
            Date: {new Date(review.date).toLocaleDateString()}
          </span>
        </div>
        <div className="review-rating">{renderStars(review.rating)}</div>
        <div className="review-comment">
          <p>{review.comment}</p>
        </div>
      </div>
    ));
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
              <div className="rate-sold">
                <div className="rating-stars">{renderStars()}</div>
                <p>Total Rating: {ratingInfo.reviewCount}</p>
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
                  onClick={() => handleAddToCart(product, quantity)}
                >
                  Add to cart
                </span>
                {product.stock > 0 ? (
                  <span
                    className="buy-now"
                    onClick={() => handleBuyNow(product)}
                  >
                    Buy now
                  </span>
                ) : (
                  <span className="order">Order now</span>
                )}
              </div>
            </div>

            <div className="box-img-1">
              <img
                className="img-1"
                src={product.imageProducts[1].imageUrl}
                alt=""
              />
            </div>
            <div className="box-img-2">
              <img
                className="img-2"
                src={product.imageProducts[2].imageUrl}
                alt=""
              />
            </div>
            <div className="box-img-3">
              <img
                className="img-3"
                src={product.imageProducts[3].imageUrl}
                alt=""
              />
            </div>
          </div>

          <div className="product-reviews">
            <h3>Product Reviews</h3>
            {productReviews.length > 0 ? (
              renderProductReviews()
            ) : (
              <p>No reviews available for this product.</p>
            )}
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

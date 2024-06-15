import {
  useCart,
  useNavigate,
  useCallback,
  useParams,
  useAllProduct,
  useState,
  useEffect,
  swal,
  swal2,
} from "../../import/import-another";
import {
  faStar as solidStar,
  faStarHalfAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  getAllRating,
  getProductRating,
} from "../../apiServices/ReviewServices/reviewServices";
import { faStar as regularStarOutline } from "@fortawesome/free-regular-svg-icons";
import { ProductCard, Navbar, Footer } from "../../import/import-components";
import { RatingInfo, aProduct, aProductReview } from "../../interfaces";
import { FontAwesomeIcon, Link } from "../../import/import-libary";
import { bgProduct } from "../../import/import-assets";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { allProduct } = useAllProduct();
  const { productId } = useParams<{ productId?: string }>();

  const [currentProductId, setCurrentProductId] = useState<number>();
  const [product, setProduct] = useState<aProduct | null>(null);

  useEffect(() => {
    if (productId) {
      const selectedProduct = allProduct.find(
        (e) => e.productId === parseInt(productId ?? "")
      );
      if (selectedProduct) {
        setProduct(selectedProduct);
        setCurrentProductId(parseInt(productId));
      }
    }
  }, [productId, allProduct]);

  //--------------------------- load product ------------------------------------------------------------------

  const [noOfElement, setNoOfElement] = useState(8);
  const loadMore = () => {
    setNoOfElement((prevNoOfElement) => prevNoOfElement + noOfElement);
  };
  const slice = allProduct.slice(0, noOfElement);

  //---------------------------------next sile and select img product -----------------------------------------

  const [bannerImages, setBannerImages] = useState<string[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (product && product.imageProducts) {
      setBannerImages(
        product.imageProducts.map(
          (image: { imageUrl: string }) => image.imageUrl
        )
      );
    }
  }, [product]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % bannerImages.length);
  }, [bannerImages]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const handleImageClick = (index: number) => {
    setCurrentSlide(index);
  };

  //--------------------------------Product Quantity Handling-------------------------------
  interface CurrentQuantities {
    [key: string]: number;
  }
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [currentQuantities, setCurrentQuantities] = useState<CurrentQuantities>(
    {}
  );

  useEffect(() => {
    const storedQuantitiesStr = localStorage.getItem("currentQuantities");
    const storedQuantities = storedQuantitiesStr
      ? JSON.parse(storedQuantitiesStr)
      : {};
    setCurrentQuantities(storedQuantities);
  }, []);

  const handleDecrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrementQuantity = (product: aProduct) => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const { addToCart2 } = useCart();

  const handleAddToCart = (product: aProduct) => {
    if (product.stock > 0) {
      const newCurrentQuantities = { ...currentQuantities };
      const newQuantity =
        (newCurrentQuantities[product.productId] || 0) + quantity;

      if (newQuantity > product.stock) {
        swal2
          .fire({
            title: `${newCurrentQuantities[product.productId]}/ ${
              product.stock
            }`,
            text: `You cannot order more than ${product.stock} items of this product.`,
            icon: "info",
          })
          .then(() => {
            return;
          });
      } else {
        newCurrentQuantities[product.productId] = newQuantity;
        setCurrentQuantities(newCurrentQuantities);
        localStorage.setItem(
          "currentQuantities",
          JSON.stringify(newCurrentQuantities)
        );
        addToCart2(product, quantity, "add");
      }
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

  const handleBuyNow = (product: aProduct) => {
    if (product.stock > 0) {
      const newCurrentQuantities = { ...currentQuantities };
      const newQuantity =
        (newCurrentQuantities[product.productId] || 0) + quantity;
      if (newQuantity > product.stock) {
        swal2
          .fire({
            title: `${newCurrentQuantities[product.productId]}/ ${
              product.stock
            }`,
            text: `You cannot order more than ${product.stock} items.`,
            icon: "info",
          })
          .then(() => {
            return;
          });
      } else {
        newCurrentQuantities[product.productId] = newQuantity;
        setCurrentQuantities(newCurrentQuantities);
        addToCart2(product, quantity, "buy");
        navigate("/cart");
      }
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
            navigate("/cart");
          }
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };

  //------------------------------------------Product Reviews Section"---------------------------

  const [productReviews, setProductReviews] = useState<aProductReview[]>([]);
  const [ratingInfo, setRatingInfo] = useState<RatingInfo>({
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0,
  });

  useEffect(() => {
    if (currentProductId) {
      fetchRatings(currentProductId);
    }
  }, [currentProductId]);

  const fetchRatings = async (productId: number) => {
    try {
      const response = await getAllRating();
      if (!response) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const allRatings = await response;

      const productRatings = allRatings.filter(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (rating: any) => String(rating.productId) === String(productId)
      );
      setProductReviews(productRatings);

      if (productRatings.length > 0) {
        const response = await getProductRating(productId);
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productRatingDetails = await response;
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
            <div
              className="big-image"
              style={{ backgroundImage: `url(${bgProduct})` }}
            >
              <img
                className="img-detail"
                src={bannerImages[currentSlide]}
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
                  <div
                    id="btPlus"
                    onClick={() => handleIncrementQuantity(product)}
                  >
                    <img src="/src/assets/plus.svg" alt="" />
                  </div>
                </div>
              </div>

              <div className="button-cart">
                {product.stock > 0 ? (
                  <>
                    <span
                      className="add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </span>

                    <span
                      className="buy-now"
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy now
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="add-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to cart
                    </span>

                    <span
                      className="buy-now"
                      onClick={() => handleBuyNow(product)}
                    >
                      Order now
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="box-img-1" onClick={() => handleImageClick(1)}>
              <img
                className="img-1"
                src={product.imageProducts[1].imageUrl}
                alt=""
              />
            </div>
            <div className="box-img-2" onClick={() => handleImageClick(2)}>
              <img
                className="img-2"
                src={product.imageProducts[2].imageUrl}
                alt=""
              />
            </div>
            <div className="box-img-3" onClick={() => handleImageClick(3)}>
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

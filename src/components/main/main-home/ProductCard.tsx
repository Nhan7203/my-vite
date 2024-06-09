import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useCart } from '../../../pages/Cart-page/CartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStarOutline } from '@fortawesome/free-regular-svg-icons';
import swal from "sweetalert";
import './ProductCart.css'
import { aProduct } from '../../../context/ShopContext';

const getGridColumn = (index: number) => {
  const gridColumnMap = ["1 / 3", "4 / 6", "7 / 9", "10 / 12"];
  return gridColumnMap[index % gridColumnMap.length];
};

const ProductCard = ({ product, index }: { product: aProduct, index: number }) => {
  const { addToCart } = useCart();

//--------------------------------------------------------------------------------------------
  const handleCartClick = (product: aProduct) => {
    if (product.stock > 0) {
      addToCart(product);
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
            addToCart(product);
          }
        });
      } catch (error) {
        console.error("Error: ", error);
      }
    }
  };
//-----------------------------------------------------------------------------------------------------
  const [ratingInfo, setRatingInfo] = useState({
    averageRating: 0,
    totalRating: 0,
    reviewCount: 0
  });

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await fetch('https://localhost:7030/api/Review/GetAllRating');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const allRatings = await response.json();


        const productRatings = allRatings.filter((rating: any) => String(rating.productId) === String(product.productId));

        if (productRatings.length > 0) {
          const response = await fetch(`https://localhost:7030/api/Review/GetProductRating?productId=${product.productId}`, {
            method: 'POST',
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const productRatingDetails = await response.json();
          setRatingInfo({
            averageRating: productRatingDetails.averageRating,
            totalRating: productRatingDetails.totalRating,
            reviewCount: productRatingDetails.reviewCount
          });
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      }
    };

    fetchRatings();
  }, [product.productId]);

  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(ratingInfo.averageRating);
    const halfStar = ratingInfo.averageRating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={solidStar} style={{ color: 'yellow' }} />);
    }

    if (halfStar) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} style={{ color: 'yellow' }} />);
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FontAwesomeIcon key={`empty-${i}`} icon={regularStarOutline} style={{ color: 'grey' }} />);
    }

    return stars;
  };

  const imageUrl = product.imageProducts.length > 0 ? product.imageProducts[0].imageUrl : '';

  return (
    <div className="card" style={{ gridColumn: getGridColumn(index) }}>
      <div className="box-card">
        <div className="header-card">
          <Link to={`/productDetails/${product.productId}`}>
            <img src={imageUrl} className="img-card" alt="" />
          </Link>
        </div>
        <div className="body-card">
          <p>{product.name}</p>
        </div>
        <div className="rate-sold">
          <div className="rating-stars">
            {renderStars()}
          </div>
          <p>Total Rating: {ratingInfo.reviewCount}</p>
        </div>
        <div className="footer-card">
          <h2 className="price">${product.price.toLocaleString()}</h2>
          <div className="box-shopping">
            <BsCart3 className="icon-shopping" fontSize="1.5em" onClick={() => handleCartClick (product)}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
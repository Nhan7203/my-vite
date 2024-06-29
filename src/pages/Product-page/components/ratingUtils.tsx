/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAllRating, getProductRating } from "../../../apiServices/ReviewServices/reviewServices";
import { RatingDetails, aProduct } from "../../../interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStarOutline } from "@fortawesome/free-regular-svg-icons";

export const fetchRatingss = async (products: aProduct[]) => {
  
  try {
    const response = await getAllRating();
    if (!response) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const allRatings = response;

    const ratingsMap: { [key: string]: RatingDetails } = {};

    for (const product of products) {
      const productId = product.productId;
      const productRatings = allRatings.filter(
        (rating: any) => String(rating.productId) === String(productId)
      );

      if (productRatings.length > 0) {
        const response = await getProductRating(productId);
        if (!response) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const productRatingDetails = response;
        ratingsMap[productId] = {
          averageRating: productRatingDetails.averageRating,
          totalRating: productRatingDetails.totalRating,
          reviewCount: productRatingDetails.reviewCount,
        };
      } else {
        ratingsMap[productId] = {
          averageRating: 0,
          totalRating: 0,
          reviewCount: 0,
        };
      }
    }

    return ratingsMap;
  } catch (error) {
    console.error("Error fetching ratings:", error);
    throw error;
  }
};

export const renderStars = (averageRating: number) => {
    const stars = [];
    const fullStars = Math.floor(averageRating);
    const halfStar = averageRating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FontAwesomeIcon key={i} icon={solidStar} style={{ color: "yellow" }} />
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

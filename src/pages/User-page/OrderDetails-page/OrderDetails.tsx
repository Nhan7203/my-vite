import {
  useEffect,
  useState,
  swal,
  useCallback,
} from "../../../import/import-another";
import { review } from "../../../apiServices/UserServices/userServices";
import { useLocation } from "react-router-dom";
import { Navbar, Footer, BoxMenuUser } from "../../../import/import-components";
import { OrderDetail, aProduct } from "../../../interfaces";

import "./OrderDetails.css";
import {
  useHandleCancelOrder,
  useHandleOrderReceived,
} from "../components/HandleOrder";

import { useOrderDetails } from "./useOrderDetails";
import OrderDetailItem from "./OrderDetailItem";
import { HandleAddToCart } from "../../Cart-page/HandleAddToCart";

const OrderDetails = () => {
  const { orderDetails, products, currentUserId, orderData, orderId, token } =
    useOrderDetails();
  const location = useLocation();
  const { orderStatus } = location.state;
  const [comment, setComment] = useState<string>("");
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<OrderDetail>();
  const [showRatingBox, setShowRatingBox] = useState<boolean>(false);

  //---------------------------------------------- quantitty handle -------------------------------------------------------------

  const { handleAddToCart2 } = HandleAddToCart();

  const HandleAddToCartClick = (product: aProduct, quantity: number) => {
    handleAddToCart2(product, quantity);
  };

  //-----------------------------------------  Order handle ---------------------------------------------------------------

  const { handleCancelOrder } = useHandleCancelOrder();
  const { handleOrderReceived } = useHandleOrderReceived(orderData);

  const handleCancelClick = (orderId: number) => {
    handleCancelOrder(orderId);
  };

  const handleReceiveClick = (orderId: number) => {
    handleOrderReceived(orderId);
  };
  //----------------------------------------------------------------------------------------------------------------------------
  interface Product {
    productId: number;
  }

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();

  const handleRate = (product: Product, orderDetail: OrderDetail) => {
    setSelectedProducts([...selectedProducts, product]);
    setSelectedOrderDetail(orderDetail);
    setShowRatingBox(true);
    setSelectedProduct(product);
  };

  const handleStarClick = (star: number) => {
    setSelectedStars(star);
  };

  //---------------------------------------------- Rate cancel handle --------------------------------------

  const handleRatingCancel = (productToRemove: Product | undefined) => {
    const orderData: OrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    if (orderId && orderData[orderId]) {
      const updatedSelectedProducts = orderData[orderId].filter(
        (product) => product.productId !== productToRemove?.productId
      );
      const updatedOrderData: OrderData = {
        ...orderData,
        [orderId]: updatedSelectedProducts,
      };
      localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
      setSelectedProducts(updatedSelectedProducts);
    }

    setShowRatingBox(false);
    setSelectedStars(0);
    setComment("");
  };
  //--------------------------------------- Submit handle ---------------------------------------------

  const handleRatingSubmit = useCallback(async () => {
    if (selectedProducts.length === 0 || !selectedOrderDetail) return;

    const rating = selectedStars || 1;

    const reviewData = {
      userId: parseInt(currentUserId),
      orderDetailId: parseInt(orderId ?? ""),
      productId: selectedProduct?.productId,

      date: new Date().toISOString(),
      rating: rating,
      comment: comment || "",
      // isRated: false,
    };
    console.log("h0000", JSON.stringify(reviewData));
    try {
      const response = await review(token, reviewData);

      if (response) {
        swal("Success!", "Your review has been submitted.", "success");
        setShowRatingBox(false);
        setSelectedStars(0);
        setComment("");
      } else {
        throw new Error("Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      swal("Error", "Failed to submit your review. Please try again.", "error");
    }
  }, [
    comment,
    orderId,
    selectedOrderDetail,
    selectedProduct?.productId,
    selectedProducts.length,
    selectedStars,
    token,
    currentUserId,
  ]);

  //------------------------------------------------- localStorage orderData ------------------------------------------

  interface OrderData {
    [orderId: string]: Product[];
  }

  useEffect(() => {
    if (orderId && selectedProducts.length > 0) {
      const orderData: OrderData = {
        ...JSON.parse(localStorage.getItem("orderData") || "{}"),
        [orderId]: selectedProducts,
      };
      localStorage.setItem("orderData", JSON.stringify(orderData));
    }
  }, [orderId, selectedProducts]);

  // Đọc dữ liệu từ localStorage
  useEffect(() => {
    const orderData: OrderData = JSON.parse(
      localStorage.getItem("orderData") || "{}"
    );
    if (orderId) {
      setSelectedProducts(orderData[orderId] || []);
    } else {
      setSelectedProducts([]);
    }
  }, [orderId]);

  return (
    <div>
      <Navbar />
      <div className="body-user">
        <div>
          <BoxMenuUser />
          <OrderDetailItem
            orderId={orderId}
            comment={comment}
            products={products}
            orderStatus={orderStatus}
            orderDetails={orderDetails}
            selectedStars={selectedStars}
            showRatingBox={showRatingBox}
            selectedProducts={selectedProducts}
            setComment={setComment}
            handleRate={handleRate}
            handleStarClick={handleStarClick}
            handleAddToCart={HandleAddToCartClick}
            handleCancelClick={handleCancelClick}
            handleReceiveClick={handleReceiveClick}
            handleRatingSubmit={handleRatingSubmit}
            handleRatingCancel={handleRatingCancel}
          />
        </div>
      </div>
      <Footer />

      <Footer />
    </div>
  );
};

export default OrderDetails;

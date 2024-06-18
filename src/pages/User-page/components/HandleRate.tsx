// import { review } from "../../../apiServices/UserServices/userServices";
// import { OrderDetail } from "../../../interfaces";
// import { swal } from "../../../import/import-another";

// interface Product {
//   productId: number;
// }

// interface OrderData {
//   [orderId: string]: Product[];
// }

// export const handleRate = (
//   product: Product,
//   orderDetail: OrderDetail,
//   selectedProducts: Product[],
//   setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>,
//   setSelectedProduct: React.Dispatch<React.SetStateAction<Product | undefined>>,
//   setShowRatingBox: React.Dispatch<React.SetStateAction<boolean>>,
//   setSelectedOrderDetail: React.Dispatch<
//     React.SetStateAction<OrderDetail | undefined>
//   >
// ) => {
//   setSelectedProducts([...selectedProducts, product]);
//   setSelectedOrderDetail(orderDetail);
//   setShowRatingBox(true);
//   setSelectedProduct(product);
// };

// export const handleStarClick = (
//   star: number,
//   setSelectedStars: React.Dispatch<React.SetStateAction<number>>
// ) => {
//   setSelectedStars(star);
// };

// export const handleRatingCancel = (
//   productToRemove: Product | undefined,
//   orderId: string | undefined,
//   setSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>,
//   setShowRatingBox: React.Dispatch<React.SetStateAction<boolean>>,
//   setSelectedStars: React.Dispatch<React.SetStateAction<number>>,
//   setComment: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   const orderData: OrderData = JSON.parse(
//     localStorage.getItem("orderData") || "{}"
//   );
//   if (orderId && orderData[orderId]) {
//     const updatedSelectedProducts = orderData[orderId].filter(
//       (product) => product.productId !== productToRemove?.productId
//     );
//     const updatedOrderData: OrderData = {
//       ...orderData,
//       [orderId]: updatedSelectedProducts,
//     };
//     localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
//     setSelectedProducts(updatedSelectedProducts);
//   }

//   setShowRatingBox(false);
//   setSelectedStars(0);
//   setComment("");
// };

// export const handleRatingSubmit = async (
//   selectedProducts: Product[],
//   selectedOrderDetail: OrderDetail | undefined,
//   selectedProduct: Product | undefined,
//   selectedStars: number,
//   comment: string,
//   token: string,
//   currentUserId: string,
//   orderId: string | undefined,
//   setShowRatingBox: React.Dispatch<React.SetStateAction<boolean>>,
//   setSelectedStars: React.Dispatch<React.SetStateAction<number>>,
//   setComment: React.Dispatch<React.SetStateAction<string>>
// ) => {
//   if (selectedProducts.length === 0 || !selectedOrderDetail) return;

//   const rating = selectedStars || 1;

//   const reviewData = {
//     userId: parseInt(currentUserId),
//     orderDetailId: parseInt(orderId ?? ""),
//     productId: selectedProduct?.productId,
//     date: new Date().toISOString(),
//     rating: rating,
//     comment: comment || "",
//     isRated: false,
//   };
//   console.log("h0000", reviewData);
//   try {
//     const response = await review(token, reviewData);

//     if (response) {
//       swal("Success!", "Your review has been submitted.", "success");
//       setShowRatingBox(false);
//       setSelectedStars(0);
//       setComment("");
//     } else {
//       throw new Error("Failed to submit review");
//     }
//   } catch (error) {
//     console.error("Error submitting review:", error);
//     swal("Error", "Failed to submit your review. Please try again.", "error");
//   }
// };

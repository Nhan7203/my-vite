
// export const handleRatingCancel = (orderId, selectedProducts, setSelectedProducts) => {
//     const orderData: OrderData = JSON.parse(
//       localStorage.getItem("orderData") || "{}"
//     );
//     if (orderId && orderData[orderId]) {
//       const updatedSelectedProducts = orderData[orderId].filter(
//         (product) => product.productId !== productToRemove?.productId
//       );
//       const updatedOrderData: OrderData = {
//         ...orderData,
//         [orderId]: updatedSelectedProducts,
//       };
//       localStorage.setItem("orderData", JSON.stringify(updatedOrderData));
//       setSelectedProducts(updatedSelectedProducts);
//     }
  
//     setShowRatingBox(false);
//     setSelectedStars(0);
//     setComment("");
//   };

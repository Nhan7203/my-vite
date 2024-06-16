import {
  cancelOrder,
  completeOrder,
} from "../../../apiServices/UserServices/userServices";
import { getUserIdFromToken } from "../../../utils/jwtHelper";
import { useNavigate, swal } from "../../../import/import-another";
import { aOrder } from "../../../interfaces";

const useHandleCancelOrder = () => {
  const navigate = useNavigate();

  const handleCancelOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const userIdIdentifier = getUserIdFromToken(token);
      const userId = userIdIdentifier;

      swal({
        title: "This can not be undo!",
        text: "You are about to cancel the order!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await cancelOrder(userId, orderId, token);
          if (response) {
            swal("Success!", "Order was canceled!", "success").then(() => {
              navigate("/cancelled");
            });
          } else {
            throw new Error("Failed to cancel order");
          }
        }
      });
    } catch (error) {
      console.error("Error canceling order:", error);
    }
  };

  return { handleCancelOrder };
};
//-----------------------------------------------------------------------------------------------

const useHandleOrderReceived = (orderData: aOrder[]) => {
  const navigate = useNavigate();

  const handleOrderReceived = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      const userIdIdentifier = getUserIdFromToken(token);
      const userId = userIdIdentifier;

      swal({
        title: "Recieved The Order!",
        text: `Confirm payment of $${orderData
          .find((order) => order.orderId === orderId)
          ?.total.toLocaleString()} to the seller`,
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmReceived) => {
        if (confirmReceived) {
          const response = await completeOrder(userId, orderId, token);
          if (response) {
            swal("Success!", "Thanks for shopping at M&B", "success").then(
              () => {
                navigate("/complete");
              }
            );
          } else {
            throw new Error("Failed to complete order");
          }
        }
      });
    } catch (error) {
      console.error("Error completing order:", error);
    }
  };

  return { handleOrderReceived };
};

export { useHandleCancelOrder, useHandleOrderReceived };
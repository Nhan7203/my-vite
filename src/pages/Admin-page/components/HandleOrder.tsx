import {
  cancelOrder,
  submitOrder,
} from "../../../apiServices/StaffServices/staffServices";
import { useNavigate, swal } from "../../../import/import-another";

const useHandleCancelOrder = () => {
  const navigate = useNavigate();

  const handleCancelOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undo!",
        text: "You are about to cancel the order!",
        icon: "warning",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await cancelOrder(orderId, token);
          if (response) {
            swal("Success!", "Order was canceled!", "success").then(() => {
              navigate("/cancelled-staff");
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

const useHandleConfirmOrder = () => {
  const navigate = useNavigate();

  const handleConfirmOrder = async (orderId: number) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undo!",
        text: "You are about to Confirm the order!",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirmDelete) => {
        if (confirmDelete) {
          const response = await submitOrder(orderId);
          if (response) {
            swal("Success!", "Order was confirm order!", "success").then(() => {
              navigate("/processed-staff");
            });
          } else {
            throw new Error("Failed to submit order");
          }
        }
      });
    } catch (error) {
      console.error("Error submit order:", error);
    }
  };

  return { handleConfirmOrder };
};

export { useHandleCancelOrder, useHandleConfirmOrder };

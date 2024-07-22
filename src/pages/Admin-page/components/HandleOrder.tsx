// HandleOrder.tsx
import {
  cancelOrder,
  submitOrder,
} from "../../../apiServices/StaffServices/staffServices";
import { useNavigate, swal } from "../../../import/import-another";
import emailjs from 'emailjs-com';

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
        title: "This can not be undone!",
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

  const handleConfirmOrder = async (orderId: number, userData: any) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("Token not found");
        return;
      }

      swal({
        title: "This can not be undone!",
        text: "You are about to confirm the order!",
        icon: "info",
        buttons: ["Cancel", "Confirm"],
        dangerMode: true,
      }).then(async (confirm) => {
        if (confirm) {
          const response = await submitOrder(orderId);
          if (response) {
            swal("Success!", "Order was confirmed!", "success").then(async () => {

              const emailParams = {
                user_name: userData?.name,
                order_id: orderId,
                to_email: userData?.email,
              };

              try {
                await emailjs.send('service_4j0f6f9', 'template_9gwpxfk', emailParams, 'Fm8U5RN0vDmjsIl4S');
                console.log('Email sent successfully');
              } catch (error) {
                console.error('Error sending email:', error);
              }

              navigate("/processed-staff");
            });
          } else {
            throw new Error("Failed to submit order");
          }
        }
      });
    } catch (error) {
      console.error("Error submitting order:", error);
    }
  };

  return { handleConfirmOrder };
};

export { useHandleCancelOrder, useHandleConfirmOrder };
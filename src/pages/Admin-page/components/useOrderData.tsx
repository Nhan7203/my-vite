import { getOrders } from "../../../apiServices/StaffServices/staffServices";
import { useEffect, useState, swal } from "../../../import/import-another";
import { aOrder } from "../../../interfaces";


const useOrderData = () => {
    const [orderData, setOrderData] = useState<aOrder[]>([]);
    const orderStatusId = 0;

    useEffect(() => {
        const fetchOrderData = async () => {
          try {
            const token = localStorage.getItem("token");
    
            if (!token) {
              await swal({
                title: "Oops!",
                text: "You haven't logged in yet! Redirecting to Login Page...",
                icon: "warning",
                buttons: {
                  ok: {
                    text: "OK",
                    value: true,
                    className: "swal-ok-button",
                  },
                },
              });
              window.location.href = "/login";
              return;
            }
    
            const response = await getOrders(orderStatusId);
    
            if (response) {
              setOrderData(response);
            } else {
              console.error("Failed to retrieve order data:", response);
            }
          } catch (error) {
            console.error("Failed to retrieve order data:", error);
          }
        };
    
        fetchOrderData();
      }, [orderStatusId]);
  
    return { orderData, setOrderData };
  };
  
  export default useOrderData;
  
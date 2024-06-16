import { useState, useEffect, swal } from "../../../import/import-another";
import { getUserIdFromToken } from "../../../utils/jwtHelper";
import { getOrderList } from "../../../apiServices/UserServices/userServices";
import { aOrder } from "../../../interfaces";

const useOrderData = () => {
  const [orderData, setOrderData] = useState<aOrder[]>([]);

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

        const userIdIdentifier = getUserIdFromToken(token);

        const response = await getOrderList(userIdIdentifier);
        console.log("hahahahah", response)
        if (response) {
          // const updatedOrderData = response.map((order: aOrder) => {
          //   const total = order.orderDetails.reduce(
          //     (acc, detail) => acc + detail.total,
          //     0
          //   );
          //   return {
          //     ...order,
          //     total: total ,
          //   };
          // });
          setOrderData(response);
          // setOrderData(updatedOrderData);
        } else {
          console.error("Failed to retrieve order data:", response);
        }
      } catch (error) {
        console.error("Failed to retrieve order data:", error);
      }
    };

    fetchOrderData();
  }, []);

  return { orderData, setOrderData };
};

export default useOrderData;

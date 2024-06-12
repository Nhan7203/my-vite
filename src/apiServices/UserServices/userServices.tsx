import * as request from "../../utils/request";

export const getOrderDetails = async (queryParams: URLSearchParams) => {
    try {
      const res = await request.get("User/getOrderDetails", { params: queryParams });
      // console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const getOrderList = async (userId: string) => {
    try {
      const res = await request.get(`User/getOrderList?userId=${parseInt(userId)}`);
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const completeOrder = async (userId: number, orderId: number, token: string) => {
    try {
      const response = await request.put(
        `User/completeOrder?userId=${userId}&orderId=${orderId}`,
        null, // no data to send in PUT request
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const cancelOrder = async (userId: number, orderId: number, token: string) => {
    try {
      const response = await request.deleteData(
        `User/cancelOrder?userId=${userId}&orderId=${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

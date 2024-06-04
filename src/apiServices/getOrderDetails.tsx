import * as request from "../utils/request";

export const getOrderDetails = async (queryParams: URLSearchParams) => {
    try {
      const res = await request.get("User/getOrderDetails", { params: queryParams });
      console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };




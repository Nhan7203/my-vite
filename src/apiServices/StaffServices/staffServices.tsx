import request from "../../utils/request";

export const getOrders = async (orderStatusId: number) => {
    try {
      const res = await request.get(`Staff/GetOrders?status=${orderStatusId}`);
      //console.log("check data search: ", res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };
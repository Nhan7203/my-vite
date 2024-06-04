import * as request from "../utils/request";

export const getBlogId = async (orderId: string) => {
  try {
    const res = await request.get(`Blog/${orderId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

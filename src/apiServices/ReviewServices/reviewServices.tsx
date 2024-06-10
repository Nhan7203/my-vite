import * as request from "../../utils/request";

export const getAllRating = async () => {
  try {
    const res = await request.get("Review/GetAllRating");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductRating = async (productId: number) => {
  try {
    const res = await request.post(`Review/GetProductRating?productId=${productId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

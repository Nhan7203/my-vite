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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getUserReview = async (userId: string, orderId: string, token: any) => {
  try {
    const res = await request.get(
      `Review/GetUserReview?userId=${parseInt(userId)}&orderId=${parseInt(orderId)}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getProductRating = async (productId: number) => {
  try {
    const res = await request.post(`Review/GetProductRating?productId=${productId}`);
    //console.log("check data search: ", res);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};



import * as request from "../../utils/request";

export const getBlogId = async (orderId: string) => {
  try {
    const res = await request.get(`Blog/${orderId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const increaseLike = async (userId: string, blogId: number) => {
  try {
    const res = await request.post(
      `Blog/IncreaseLike?userId=${parseInt(userId)}&blogId=${blogId}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const cancelLike = async (userId: string, blogId: number) => {
  try {
    const res = await request.post(
      `Blog/CancelLike?userId=${parseInt(userId)}&blogId=${blogId}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const increaseView = async (userId: string, blogId: number) => {
  try {
    const res = await request.post(
      `Blog/IncreaseView?userId=${parseInt(userId)}&blogId=${blogId}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await request.get(`Blog/getAllBlogs`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

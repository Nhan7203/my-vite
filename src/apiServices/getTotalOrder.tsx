import * as request from "../utils/request";

export const getTotalOrder = async () => {
  try {
    const res = await request.get("Admin/getTotalOrder");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
import * as request from "../utils/request";

export const getTotalProfit = async () => {
  try {
    const res = await request.get("Admin/getTotalProfit");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
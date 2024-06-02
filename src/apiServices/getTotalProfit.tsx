import * as request from "../utils/request";

export const getTotalProfit = async () => {
  try {
    const res = await request.get("https://localhost:7030/api/Admin/getTotalProfit");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
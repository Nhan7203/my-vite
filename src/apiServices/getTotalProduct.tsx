import * as request from "../utils/request";

export const getTotalProduct = async () => {
  try {
    const res = await request.get("Admin/getTotalProduct");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

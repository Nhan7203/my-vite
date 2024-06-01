import * as request from "../utils/request";

export const getTotalUser = async () => {
  try {
    const res = await request.get("Admin/getTotalUser");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

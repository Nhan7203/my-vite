import * as request from "../../utils/request";

export const getBrand = async () => {
  try {
    const res = await request.get('Brand');
    //console.log("check data add: ", res);
    return res

  } catch (error) {
    console.log(error);
  }

};
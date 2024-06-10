import * as request from "../../utils/request";

export const getCategory = async () => {
  try {
    const res = await request.get('Category');
    //console.log("check data add: ", res);
    return res

  } catch (error) {
    console.log(error);
  }

};
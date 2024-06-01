import * as request from "../utils/request";

export const GetAllUsers = async () => {
  try {
    const res = await request.get('Admin/GetAllUsers');
    console.log("check data add: ", res);
    return res

  } catch (error) {
    console.log(error);
  }

};
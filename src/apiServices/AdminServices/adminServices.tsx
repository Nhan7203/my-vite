import * as request from "../../utils/request";

export const getAllUsers = async () => {
  try {
    const res = await request.get('Admin/GetAllUsers');
    //console.log("check data add: ", res);
    return res;

  } catch (error) {
    console.log(error);
  }
};

export const getTotalOrder = async () => {
    try {
      const res = await request.get("Admin/getTotalOrder");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

export const getTotalProduct = async () => {
    try {
      const res = await request.get("Admin/getTotalProduct");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const getTotalProfit = async () => {
    try {
      const res = await request.get("Admin/getTotalProfit");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const getTotalUser = async () => {
    try {
      const res = await request.get("Admin/getTotalUser");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };
  
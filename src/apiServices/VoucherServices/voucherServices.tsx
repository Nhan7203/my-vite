import * as request from "../../utils/request";

export const getAllVouchers = async () => {
  try {
    const res = await request.get("Voucher/GetAllVouchers");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};
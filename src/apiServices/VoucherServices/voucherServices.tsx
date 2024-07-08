import * as request from "../../utils/request";
import axios from "axios";

export const getAllVouchers = async () => {
  try {
    const res = await request.get("Voucher/GetAllVouchers");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getVoucherId = async (voucherId: string) => {
  try {
    const res = await request.get(`Voucher/${voucherId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};


export const deleteVoucher = async (voucherId: number) => {
  try {
    const response = await axios.delete(`https://localhost:7030/api/Voucher/DeleteVoucher?voucherId=${voucherId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

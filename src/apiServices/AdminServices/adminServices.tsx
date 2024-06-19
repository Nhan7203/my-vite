import axios from "axios";
import * as request from "../../utils/request";

export const getAllUsers = async () => {
  try {
    const res = await request.get("Admin/GetAllUsers");
    //console.log("check data add: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const searchUser = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("Admin/GetAllUsers", { params: queryParams });
    // console.log("check data search: ", res);
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

export const deleteCustomer = async (userId: number) => {
  try {
    const response = await axios.delete(`https://localhost:7030/api/Admin/Delete?id=${userId}`);

    return response;
  } catch (error) {
    console.log(error);
  }
};
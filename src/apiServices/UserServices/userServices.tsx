/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { ReviewData } from "../../interfaces";
import * as request from "../../utils/request";

export const getOrderDetails = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("User/getOrderDetails", {
      params: queryParams,
    });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getOrderList = async (userId: string) => {
  try {
    const res = await request.get(
      `User/getOrderList?userId=${parseInt(userId)}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const completeOrder = async (
  userId: number,
  orderId: number,
  token: any
) => {
  try {
    const response = await request.put(
      `User/completeOrder?userId=${userId}&orderId=${orderId}`,
      null, // no data to send in PUT request
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const cancelOrder = async (
  userId: number,
  orderId: number,
  token: any
) => {
  try {
    const response = await request.deleteData(
      `User/cancelOrder?userId=${userId}&orderId=${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const review = async (token: any, reviewData: ReviewData) => {
  try {
    const response = await axios.post(
      "https://localhost:7030/api/Review",
      reviewData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getUserAPI = async (userId: number) => {
  try {
    const res = await request.get(`User/${userId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const userUpdate = async (userId: string, payload: any) => {
  try {
    const response = await axios.put(
      `https://localhost:7030/api/User/Update?id=${parseInt(userId)}`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

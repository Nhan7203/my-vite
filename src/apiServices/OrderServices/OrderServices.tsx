/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export const orders = async (order: any) => {
  try {
    const res = await axios.post(
      `https://localhost:7030/api/orders`,order,
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const ordersPaypal = async (order: any, token: any) => {
    try {
      const res = await axios.post(
        `https://localhost:7030/api/orders`,order,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },       
      );
      // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmmmm: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

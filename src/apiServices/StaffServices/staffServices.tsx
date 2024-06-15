import * as request from "../../utils/request";

export const getOrders = async (orderStatusId: number) => {
  try {
    const res = await request.get(`Staff/GetOrders?status=${orderStatusId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async (roleId: number) => {
  try {
    const res = await request.get(`Staff/GetAllUsers?roleId=${roleId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const cancelOrder = async (orderId: number, token: any) => {
  try {
    const response = await request.deleteData(
      `Staff/cancelOrder?orderId=${orderId}`,
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

export const submitOrder = async (orderId: number) => {
  try {
    const response = await request.put(
      `Staff/submitOrder?orderId=${orderId}`,
      null
    );
    return response;
  } catch (error) {
    console.error("Error submitOrder :", error);
    throw error;
  }
};

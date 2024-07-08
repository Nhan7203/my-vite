/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as request from "../../utils/request";

export const getProductId = async (queryParams: URLSearchParams) => {
    try {
      const res = await request.get("Products", { params: queryParams });
      //console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const getProduct = async () => {
    try {
      const res = await request.get("Products");
      //console.log("check data add: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const search = async (queryParams: URLSearchParams) => {
    try {
      const res = await request.get("Products", { params: queryParams });
      // console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const deleteProducts = async (productId: number) => {
    try {
      const res = await axios.delete(`https://localhost:7030/api/Products/Delete?id=${productId}`);
      // console.log("check data search: ", res);
      return res;
    } catch (error) {
      console.log(error);
    }
  };

  export const createProduct = async (formData: any) => {
    try {
      const response = await axios.post(`https://localhost:7030/api/Products/Create`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  export const updateProduct = async (productId: string, formData: any) => {
    try {
      const response = await axios.put(`https://localhost:7030/api/Products/Update?id=${parseInt(productId)}`,
        formData
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  


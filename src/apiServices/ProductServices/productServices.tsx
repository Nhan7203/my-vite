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
  


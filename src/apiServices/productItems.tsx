import * as request from "../utils/request";

export const add = async () => {
    try {
      const res = await request.get('ProductItems');
      console.log("check data axios: ", res);
      return res
      
    } catch (error) {
        console.log(error);
    }

  };
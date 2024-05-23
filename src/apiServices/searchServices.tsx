import * as request from "../utils/request";

export const search = async (q: string, type = 'less') => {
    try {
      const res = await request.get("search", {
        params: {
          q,  
          type,
        },
      });
      
      return res.data
      
    } catch (error) {
        console.log(error);
    }

  };
 
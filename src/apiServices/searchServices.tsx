import * as request from "../utils/request";

export const search = async (queryParams: URLSearchParams) => {
  try {
    const res = await request.get("Products", { params: queryParams });
    // console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

import request from "../../utils/request";

export const login = async (email: string, password: string) => {
  try {
    const res = await request.post("Account/Login", { email, password });
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

import { AxiosError } from "axios";
import request from "../../utils/request";

export const login = async (email: string, password: string) => {
  try {
    const res = await request.post("Account/Login", { email, password });
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    if (error instanceof AxiosError) {
      // Ném lại lỗi để có thể xử lý nó ở hàm gọi
      throw error;
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
}
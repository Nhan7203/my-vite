import axios from "axios";

const loginApi = (email: string, password: string) => {
    return axios.post("https://localhost:7030/api/Account/Login", { email, password });
};

export { loginApi };
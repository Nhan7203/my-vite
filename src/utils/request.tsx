import axios from 'axios';

const request = axios.create({
    baseURL: 'https://localhost:7174/api/'
})

export const get = async (path: string, options = {}) => {
    const response = await request.get(path, options);
    console.log("check data axios: ", response.data);
    return response.data;
}

export default request
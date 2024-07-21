/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import * as request from "../../utils/request";

export const getBlogId = async (orderId: string) => {
  try {
    const res = await request.get(`Blog/${orderId}`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const increaseLike = async (userId: string, blogId: number) => {
  try {
    const res = await request.post(
      `Blog/IncreaseLike?userId=${parseInt(userId)}&blogId=${blogId}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const cancelLike = async (userId: string, blogId: number) => {
  try {
    const res = await request.post(
      `Blog/CancelLike?userId=${parseInt(userId)}&blogId=${blogId}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const increaseView = async (userId: string, blogId: number) => {
  try {
    const res = await request.post(
      `Blog/IncreaseView?userId=${parseInt(userId)}&blogId=${blogId}`
    );
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getAllBlogs = async () => {
  try {
    const res = await request.get(`Blog/getAllBlogs`);
    //console.log("check data search: ", res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const deleteBlog = async (blogId: number) => {
  try {
    const response = await axios.delete(`https://localhost:7030/api/Blog/Delete?blogId=${blogId}`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createBlog = async (formData: any) => {
  try {
    const response = await axios.post(`https://localhost:7030/api/Blog/Create`,
      formData
    );
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getLikedBlogsByUser = async (userId: number) => {
  const response = await axios.get(`https://localhost:7030/api/Blog/GetBlogLikeByUser?userId=${userId}`);
  return response.data;
};


import * as request from "../utils/request";

export const Search = async (q: string) => {
  try {
    const res = await request.get("search", {
      params: {
        q,
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const CategoryId = async (q: string) => {
  try {
    const res = await request.get("categoryId", {
      params: {
        q,
        
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const OrderBy = async (q: string) => {
  try {
    const res = await request.get("orderBy", {
      params: {
        q,
        
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const BrandId = async (q: string) => {
  try {
    const res = await request.get("brandId", {
      params: {
        q,
        
      },
    });

    return res.data;
  } catch (error) {
    console.log(error);
  }
};

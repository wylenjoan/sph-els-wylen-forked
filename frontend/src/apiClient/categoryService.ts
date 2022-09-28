import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import Category from "../interfaces/category";

const createCategory = async (category: Category) => {
  await axiosClient.post(`${apiUrls.CATEGORY}`, category)
}

export {
  createCategory,
}

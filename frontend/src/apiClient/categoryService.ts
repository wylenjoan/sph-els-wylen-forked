import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { CategoryCreation, Category } from "../interfaces/category";

const createCategory = async (category: CategoryCreation) => {
  await axiosClient.post(`${apiUrls.CATEGORY}`, category)
}

const listCategories = async () => {
  return await axiosClient.get(`${apiUrls.CATEGORY}`)
}

const getCategory = async (id: number) => {
  return await axiosClient.get(`${apiUrls.CATEGORY}${id}`)
}

const updateCategory = async (category: Category) => {
  const { id, title, description } = category;

  return await axiosClient.patch(
    `${apiUrls.CATEGORY}${id}`, { title, description })
}

const deleteCategory = async (id: number) => {
  await axiosClient.delete(`${apiUrls.CATEGORY}${id}`);
}

export {
  createCategory,
  listCategories,
  getCategory,
  updateCategory,
  deleteCategory,
}

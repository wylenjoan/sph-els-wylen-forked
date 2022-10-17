import axiosClient from "."
import apiUrls from "../constants/apiUrls"
import { LessonCreation } from "../interfaces/lesson"

const createLesson = async ({ categoryId, userId }: LessonCreation) => {
  const lesson = {
    category: categoryId,
    user: userId,
  }
  return await axiosClient.post(`${apiUrls.LESSON}`, lesson)
}

const getLesson = async (id: number) => {
  return await axiosClient.get(`${apiUrls.LESSON}${id}`)
}

const listLessonsByUser = async (userId: number) => {
  return await axiosClient.get(`lessons?user=${userId}`)
}

export {
  createLesson,
  getLesson,
  listLessonsByUser,
}

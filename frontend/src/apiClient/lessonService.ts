import axiosClient from "."
import apiUrls from "../constants/apiUrls"
import { LessonCreation } from "../interfaces/lesson"

const createLesson = async (lesson: LessonCreation) => {
  return await axiosClient.post(`${apiUrls.LESSON}`, lesson)
}

const getLesson = async (id: number) => {
  return await axiosClient.get(`${apiUrls.LESSON}${id}`)
}

export {
  createLesson,
  getLesson,
}

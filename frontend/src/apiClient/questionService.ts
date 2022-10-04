import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { QuestionCreation } from "../interfaces/question";

const createQuestion = async (question: QuestionCreation) => {
  return await axiosClient.post(`${apiUrls.QUESTION}`, question)
}

const listQuestionsByCategory = async (categoryId: number) => {
  return await axiosClient.get(`questions?category=${categoryId}`)
}

const getQuestion = async (id: number) => {
  return await axiosClient.get(`${apiUrls.QUESTION}${id}`)
}

export {
  createQuestion,
  listQuestionsByCategory,
  getQuestion,
};

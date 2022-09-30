import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import Question from "../interfaces/question";

const createQuestion = async (question: Question) => {
  return await axiosClient.post(`${apiUrls.QUESTION}`, question)
}

const listQuestionsByCategory = async (categoryId: number) => {
  return await axiosClient.get(`questions?category=${categoryId}`)
}

export {
  createQuestion,
  listQuestionsByCategory
};

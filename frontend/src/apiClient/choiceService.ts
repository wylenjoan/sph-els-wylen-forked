import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { ChoiceCreation } from "../interfaces/choice";

const createChoice = async (choice: ChoiceCreation) => {
  return await axiosClient.post(`${apiUrls.CHOICE}`, choice)
}

const listChoicesByQuestion = async (categoryId: number) => {
  return await axiosClient.get(`choices?question=${categoryId}`)
}

export {
  createChoice,
  listChoicesByQuestion,
};

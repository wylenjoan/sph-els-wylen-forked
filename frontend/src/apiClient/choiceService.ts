import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import Choice from "../interfaces/choice";

const createChoice = async (choice: Choice) => {
  return await axiosClient.post(`${apiUrls.CHOICE}`, choice)
}

export {
  createChoice
};

import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { UserCreation, User } from "../interfaces/user";

const registerUser = async (user: UserCreation) => {
  await axiosClient.post(`${apiUrls.REGISTRATION}`, user)
}

const listUsers = async () => {
  return await axiosClient.get(`${apiUrls.USER}`)
}

export {
  registerUser,
  listUsers
};

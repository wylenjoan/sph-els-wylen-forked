import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import User from "../interfaces/user";

const registerUser = async (user: User) => {
  await axiosClient.post(`${apiUrls.REGISTRATION}`, user)
}

const listUsers = async () => {
  return await axiosClient.get(`${apiUrls.USER}`)
}

export {
  registerUser,
  listUsers
};

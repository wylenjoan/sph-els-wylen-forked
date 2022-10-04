import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { UserCreation, UserProfile } from "../interfaces/user";

const registerUser = async (user: UserCreation) => {
  await axiosClient.post(`${apiUrls.REGISTRATION}`, user)
}

const listUsers = async () => {
  return await axiosClient.get(`${apiUrls.USER}`)
}

const updateUser = async (user: UserProfile) => {
  const { id, first_name, last_name, avatar_url } = user;
  return await axiosClient.patch(`${apiUrls.USER}${id}`, {
    first_name,
    last_name,
    avatar_url
  });
}

export {
  registerUser,
  listUsers,
  updateUser,
};

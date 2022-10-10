import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import { UserCreation, UserProfile } from "../interfaces/user";
import { getCsrfToken } from "./authService";

const registerUser = async (user: UserCreation) => {
  const csrfResponse = await getCsrfToken();
  const csrfToken = csrfResponse.data.csrfToken;

  await axiosClient.post(`${apiUrls.REGISTRATION}`, user, {
    headers: {
      "X-CSRFToken": csrfToken
    }
  })
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

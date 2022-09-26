import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import AuthCredentials from "../interfaces/authCredentials";

const loginUser = async (credentials: AuthCredentials) => {
  return await axiosClient.post(`${apiUrls.LOGIN}`, credentials);
}

const logoutUser = async () => {
  let response = await axiosClient.post(`${apiUrls.LOGOUT}`)
  if (response.status === 200) {
    localStorage.removeItem('user');
    window.location.reload();
  }
}


export {
  loginUser,
  logoutUser
};

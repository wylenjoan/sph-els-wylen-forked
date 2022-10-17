import axios from "axios";
import axiosClient from ".";
import apiUrls from "../constants/apiUrls";
import AuthCredentials from "../interfaces/authCredentials";

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? apiUrls.PROD_ROOT
  : apiUrls.DEV_ROOT;

const getCsrfToken = async () => {
  return await axiosClient.get(`${apiUrls.CSRF}`);
};

const loginUser = async (credentials: AuthCredentials) => {
  const csrfResponse = await getCsrfToken();
  const csrfToken = csrfResponse.data.csrfToken;

  return await axios.post(`${apiUrls.LOGIN}`, credentials, {
    headers: {
      "X-CSRFToken": csrfToken
    },
  });
};

const logoutUser = async () => {
  let response = await axiosClient.post(`${apiUrls.LOGOUT}`);
  if (response.status === 200) {
    localStorage.removeItem('user');
    window.location.reload();
  }
};


export {
  loginUser,
  logoutUser,
  getCsrfToken,
};

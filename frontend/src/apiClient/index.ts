import axios from "axios";
import apiUrls from "../constants/apiUrls";

axios.defaults.withCredentials = true;

const axiosClient = axios.create({
  withCredentials: true,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.defaults.baseURL = process.env.NODE_ENV === 'production'
  ? apiUrls.PROD_ROOT
  : apiUrls.DEV_ROOT;

export default axiosClient;

import axios from "axios";
import apiUrls from "../constants/apiUrls";

const axiosClient = axios.create({
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.defaults.baseURL = process.env.NODE_ENV === 'production' ? apiUrls.PROD_ROOT : apiUrls.DEV_ROOT;

export default axiosClient;

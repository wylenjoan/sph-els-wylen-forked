import axios from "axios";
import apiUrls from "../constants/apiUrls";

const axiosClient = axios.create({
  baseURL: `${apiUrls.ROOT}`,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default axiosClient;

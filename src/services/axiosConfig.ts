import axios, { AxiosInstance } from "axios";

import { BASE_URL } from "../utils/constants";
import { getAccessToken } from "../utils/storage";

const Axios: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

Axios.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default Axios;

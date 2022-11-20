import axios from "axios";

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});

export { axiosInstance };

import axios from 'axios';

const baseURL = "https://ecommerce.routemisr.com/api/v1";

export const publicAxios = axios.create({ baseURL });

export const authAxios = axios.create({ baseURL });

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.token = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

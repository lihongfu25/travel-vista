import axios from 'axios';
import { environment, getToken, removeToken } from '@frontend/configuration';
const axiosInstance = axios.create({
  baseURL: environment.apiUrl + '/',
  timeout: environment.requestTimeout || 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    removeToken();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    removeToken();
    return Promise.reject(error);
  }
);

export default axiosInstance;

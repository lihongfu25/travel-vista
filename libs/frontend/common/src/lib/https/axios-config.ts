import { environment, getToken, removeToken } from '@frontend/configuration';
import axios from 'axios';

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
    const { response } = error;
    if (response) {
      switch (response.status) {
        case 401:
          removeToken();
          sessionStorage.removeItem(`persist:${environment.authPersistKey}`);
          window.location.href = '/auth/login';
          break;
        case 403:
          sessionStorage.removeItem(`persist:${environment.authPersistKey}`);
          window.location.href = '/auth/register';
          break;
        default:
          console.error(`Error ${response.status}: ${response.statusText}`);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

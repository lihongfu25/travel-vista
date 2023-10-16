import axiosInstance from './axios-config';

export class Http {
  async get(endpoint: string, queryParams?: any) {
    return axiosInstance.get(endpoint, {
      params: queryParams,
    });
  }

  async show(endpoint: string, param?: string | number) {
    const url = param ? endpoint + '/' + param : endpoint;
    return axiosInstance.get(url);
  }

  async post(endpoint: string, data: any) {
    return axiosInstance.post(endpoint, data);
  }

  async update(endpoint: string, param: string | number, data: any) {
    const url = endpoint + '/' + param;
    return axiosInstance.put(url, data);
  }

  async delete(endpoint: string, param: string | number) {
    const url = endpoint + '/' + param;
    return axiosInstance.delete(url);
  }
}

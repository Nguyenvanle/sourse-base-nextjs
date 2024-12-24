import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

import { clearTokens, envConfig, getAccessToken, refreshToken } from "~/utils";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: envConfig.API_URL,
  timeout: envConfig.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = await getAccessToken();
    if (token) {
      // tạm tắt vì chưa có api
      // config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Xử lý token expired
    if (error.response?.status === 401 && !(originalRequest as any).retry) {
      try {
        (originalRequest as any).retry = true;
        const newToken = await refreshToken();

        // Thử lại request với token mới
        if (originalRequest) {
          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // Logout nếu refresh token thất bại
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

const apiClient = {
  get: <T>(url: string, params?: any) =>
    axiosInstance.get<any, T>(url, { params }),

  post: <T>(url: string, data: any) => axiosInstance.post<any, T>(url, data),

  put: <T>(url: string, data: any) => axiosInstance.put<any, T>(url, data),

  delete: <T>(url: string) => axiosInstance.delete<any, T>(url),
};

export { apiClient };

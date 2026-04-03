import axios from "axios";
import type { AxiosInstance } from "axios";
import { useNavigate } from "react-router-dom";

// 根据环境变量设置基础配置
export const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000, // 5秒超时
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 允许携带跨域 cookie
});

// 响应拦截器：直接返回 response.data
instance.interceptors.response.use((response) => {
  return response.data;
});

export default instance;

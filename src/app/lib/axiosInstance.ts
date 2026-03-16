// src/utils/axiosInstance.ts
import axios from "axios";
import type { AxiosError, AxiosInstance } from "axios";
import { toast } from "react-toastify";

// 根据环境变量设置基础配置
const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 3000, // 3秒超时
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器 - 统一加 token、处理公共参数等
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器 - 统一处理错误、登录失效等
instance.interceptors.response.use(
  (response) => {
    // if (response.request.responseURL.includes("odata")) {
    //   return response.data.value; // 直接返回 OData 的 value 数组
    // }
    return response.data; // 其他接口直接返回 data
  },
  (error: AxiosError) => {
    // 统一错误处理
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // token 失效处理
          localStorage.removeItem("token");
          // 可以使用 react-router 的 navigate 跳转到登录页，或者直接刷新页面
          // navigate("/login");
          // window.location.href = "/login";
          break;
        case 403:
          toast.error("权限不足");
          break;
        case 500:
          toast.error("服务器错误");
          break;
        default:
          return Promise.reject(error);
      }
    } else if (error.request) {
      toast.error("网络连接失败，请检查网络");
    } else {
      toast.error(error.message);
    }

    return Promise.reject(error);
  }
);

export default instance;

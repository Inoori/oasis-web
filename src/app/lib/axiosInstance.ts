import { useAuthStore } from "@/store/authStore";
import axios from "axios";
import type { AxiosInstance } from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import type { AxiosAuthRefreshOptions } from "axios-auth-refresh";

// 根据环境变量设置基础配置
const baseURL = import.meta.env.VITE_API_BASE_URL;

const instance: AxiosInstance = axios.create({
  baseURL,
  timeout: 5000, // 5秒超时
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    const { AccessToken } = useAuthStore.getState();
    if (AccessToken) {
      config.headers.Authorization = `Bearer ${AccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：直接返回 response.data
instance.interceptors.response.use((response) => {
  return response.data;
});

// 刷新 Token 的逻辑（返回 Promise）
const refreshAuthLogic = async (failedRequest: any) => {
  const refreshToken = useAuthStore.getState().RefreshToken;

  if (!refreshToken) {
    useAuthStore.getState().logout();
    return Promise.reject("No refresh token available");
  }

  try {
    const response = await axios.post(baseURL + "/api/auth/refresh", {
      refreshToken,
    });

    const {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      accessTokenExpiresAtUtc,
      refreshTokenExpiresAtUtc,
    } = response.data;

    // 更新 Zustand store
    useAuthStore.getState().refreshToken({
      accessToken: newAccessToken,
      accessTokenExpiresAtUtc: accessTokenExpiresAtUtc,
      refreshToken: newRefreshToken,
      refreshTokenExpiresAtUtc: refreshTokenExpiresAtUtc,
    });

    // 更新失败请求的 header
    failedRequest.response.config.headers.Authorization = `Bearer ${newAccessToken}`;

    return Promise.resolve();
  } catch (error) {
    // 刷新失败 → 清空登录状态并跳转登录页
    useAuthStore.getState().logout();
    window.location.href = "/login";
    return Promise.reject(error);
  }
};

// 创建身份验证刷新拦截器
createAuthRefreshInterceptor(instance, refreshAuthLogic, {
  statusCodes: [401], // 只对 401 触发
  pauseInstanceWhileRefreshing: true, // 防止并发多个刷新
  interceptNetworkError: false,
} as AxiosAuthRefreshOptions);

export default instance;

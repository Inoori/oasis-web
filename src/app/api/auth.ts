import request from "@/lib/axiosInstance"; // 上面创建的实例

export const api = {
  login: (email: string, password: string) =>
    request.post("api/auth/login", { email, password }),
};

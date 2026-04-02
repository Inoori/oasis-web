import request, { baseURL } from "@/lib/axiosInstance";
import axios from "axios";

export const api = {
  login: (email: string, password: string) =>
    request.post("api/auth/login", { email, password }),

  refresh: (refreshToken: string, signal?: AbortSignal) =>
    axios.post(
      baseURL + "/api/auth/refresh",
      { refreshToken },
      {
        signal: signal,
      }
    ),
};

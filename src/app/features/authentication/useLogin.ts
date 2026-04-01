import { api } from "@/api/auth";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/authStore";
import { jwtDecode } from "jwt-decode";

type LoginParams = {
  email: string;
  password: string;
  onSuccess?: () => void;
  onError?: () => void;
};

export function useLogin() {
  const navigate = useNavigate();

  async function handlerLogin({
    email,
    password,
    onSuccess,
    onError,
  }: LoginParams) {
    mutate({ email, password }, { onSuccess, onError });
  }

  const { mutate, isPending } = useMutation({
    mutationFn: async ({ email, password }: LoginParams) =>
      api.login(email, password),
    onSuccess: (data: any) => {
      // console.log("Login successful:", data);
      // Navigate to the dashboard or another page on successful login
      const decoded = jwtDecode<any>(data.accessToken);

      useAuthStore.getState().login({
        accessToken: data.accessToken,
        accessTokenExpiresAtUtc: data.accessTokenExpiresAtUtc,
        refreshToken: data.refreshToken,
        refreshTokenExpiresAtUtc: data.refreshTokenExpiresAtUtc,
        user: {
          id: decoded.sub!,
          email: decoded.email!,
          name: decoded.name!,
        },
      });
      navigate("/dashboard");
    },
    onError: (error) => {
      toast.error("Email or password is incorrect, please try again.");
      console.error("Login failed:", error);
    },
  });

  return {
    handlerLogin,
    isLoading: isPending,
  };
}

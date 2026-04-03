import { api } from "@/api/auth";
import { api as userApi } from "@/api/user";
import { useAuthStore } from "@/store/authStore";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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
    onSuccess: async () => {
      await useAuthStore.getState().checkAuth(); // 刷新认证状态
      navigate("/"); // 登录成功后跳转到主页
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

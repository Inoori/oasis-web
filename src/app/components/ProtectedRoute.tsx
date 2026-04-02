import { api } from "@/api/auth";
import { useHydration } from "@/hooks/useHydration";
import { useAuthStore } from "@/store/authStore";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 使用响应式的 hydration 状态
  const hasHydrated = useHydration(useAuthStore);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const refreshToken = useAuthStore((s) => s.RefreshToken);

  const navigate = useNavigate();

  useEffect(() => {
    // 如果还没有完成 hydration，什么都不做，等待状态恢复
    if (!hasHydrated) return;

    if (isAuthenticated) return;

    if (!refreshToken) {
      useAuthStore.getState().logout();
      // navigate to login page
      navigate("/login");
      return;
    }

    //有 refreshToken，尝试刷新 token
    const abortController = new AbortController();
    refresh(abortController.signal);

    async function refresh(signal?: AbortSignal) {
      try {
        const res = await api.refresh(refreshToken!, signal);

        const {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpiresAtUtc,
          refreshTokenExpiresAtUtc,
        } = res.data;

        useAuthStore.getState().setToken({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          accessTokenExpiresAtUtc,
          refreshTokenExpiresAtUtc,
        });
      } catch (error) {
        console.error("Token refresh failed:", error);
        useAuthStore.getState().logout();
      }
    }
    return () => abortController.abort();
  }, [hasHydrated, isAuthenticated, refreshToken, navigate]);

  // 等待持久化恢复，避免首屏误跳转
  if (!hasHydrated) return null;

  if (!isAuthenticated) return null;

  return <>{children}</>;
}

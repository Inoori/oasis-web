import { useHydration } from "@/hooks/useHydration";
import { useAuthStore } from "@/store/authStore";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  // 使用响应式的 hydration 状态
  const hasHydrated = useHydration(useAuthStore);

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const refreshToken = useAuthStore((s) => s.RefreshToken);

  // 等待持久化恢复，避免首屏误跳转
  if (!hasHydrated) return null;

  // 登录中 或 有可用 refreshToken 时放行
  if (!isAuthenticated && !refreshToken) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

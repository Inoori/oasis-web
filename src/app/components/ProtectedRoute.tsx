import { useAuthStore } from "@/store/authStore";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({
  children,
}: {
  children?: React.ReactNode;
}) {
  const { isAuthenticated, isLoading, checkAuth } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) return; // 已经认证，无需检查
    checkAuth();
  }, [isAuthenticated, checkAuth]);

  if (isLoading) return null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

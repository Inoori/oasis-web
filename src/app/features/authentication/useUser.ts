import { useAuthStore } from "@/store/authStore";
import { useSuspenseQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { api } from "@/api/user";

export function useUser() {
  const accessToken = useAuthStore((s) => s.AccessToken);
  const decoded = jwtDecode<any>(accessToken!);

  return useSuspenseQuery({
    queryKey: ["user", decoded.sub],
    queryFn: () => api.getUser(decoded.sub),
    staleTime: 1000 * 60 * 5, // 5分钟
  });
}

// src/store/authStore.ts
import { create } from "zustand";
import type { User } from "@/api/user";
import { api as authApi } from "@/api/auth";
import { api as userApi } from "@/api/user";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,

  checkAuth: async () => {
    try {
      const user = await userApi.getUser();
      set({ user, isAuthenticated: true, isLoading: false });
    } catch (error) {
      set({ user: null, isAuthenticated: false, isLoading: false });
      // toast.error("Failed to authenticate. Please log in again.");
      // console.error("Authentication error:", error);
    }
  },

  logout: async () => {
    await authApi.logout();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },
}));

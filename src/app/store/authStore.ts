import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthState = {
  isAuthenticated: boolean;
  AccessToken?: string;
  AccessTokenExpiresAt?: Date;
  RefreshToken?: string;
  RefreshTokenExpiresAt?: Date;

  // actions
  login: (payload: {
    accessToken: string;
    refreshToken: string;
    accessTokenExpiresAtUtc: Date;
    refreshTokenExpiresAtUtc: Date;
  }) => void;

  setToken: (payload: {
    accessToken: string;
    accessTokenExpiresAtUtc: Date;
    refreshToken: string;
    refreshTokenExpiresAtUtc: Date;
  }) => void;

  logout: () => void;
};

const REFRESH_TOKEN_KEY = "oasis-refreshToken";

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      AccessToken: undefined,
      AccessTokenExpiresAt: undefined,
      RefreshToken: undefined,
      RefreshTokenExpiresAt: undefined,

      login: ({
        accessToken,
        accessTokenExpiresAtUtc,
        refreshToken,
        refreshTokenExpiresAtUtc,
      }) => {
        // localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        set({
          isAuthenticated: true,
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          AccessTokenExpiresAt: accessTokenExpiresAtUtc,
          RefreshTokenExpiresAt: refreshTokenExpiresAtUtc,
        });
      },

      setToken: ({
        accessToken,
        accessTokenExpiresAtUtc,
        refreshToken,
        refreshTokenExpiresAtUtc,
      }) => {
        // localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        set({
          isAuthenticated: true,
          AccessToken: accessToken,
          AccessTokenExpiresAt: accessTokenExpiresAtUtc,
          RefreshToken: refreshToken,
          RefreshTokenExpiresAt: refreshTokenExpiresAtUtc,
        });
      },

      logout: () => {
        // localStorage.removeItem(REFRESH_TOKEN_KEY);
        set({
          isAuthenticated: false,
          AccessToken: undefined,
          RefreshToken: undefined,
          AccessTokenExpiresAt: undefined,
          RefreshTokenExpiresAt: undefined,
        });
      },
    }),
    {
      name: REFRESH_TOKEN_KEY,
      partialize: (state) => ({
        // 只持久化 refreshToken
        RefreshToken: state.RefreshToken,
      }),
      merge: (persistedState, currentState) => {
        const persisted = (persistedState ?? {}) as Partial<AuthState>;
        return {
          ...currentState,
          ...persisted,
          isAuthenticated: false, // 刷新后默认未认证，等待验证 refreshToken
        };
      },
    }
  )
);

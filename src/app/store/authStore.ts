import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
};

export type AuthState = {
  isAuthenticated: boolean;
  AccessToken?: string;
  AccessTokenExpiresAt?: Date;
  RefreshToken?: string;
  RefreshTokenExpiresAt?: Date;
  user?: AuthUser;

  // actions
  login: (payload: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
    accessTokenExpiresAtUtc: Date;
    refreshTokenExpiresAtUtc: Date;
  }) => void;

  refreshToken: (payload: {
    accessToken: string;
    accessTokenExpiresAtUtc: Date;
    refreshToken: string;
    refreshTokenExpiresAtUtc: Date;
  }) => void;

  logout: () => void;

  setUser: (user: AuthUser) => void;
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
      user: undefined,

      login: ({
        accessToken,
        accessTokenExpiresAtUtc,
        refreshToken,
        refreshTokenExpiresAtUtc,
        user,
      }) => {
        // localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        set({
          isAuthenticated: true,
          AccessToken: accessToken,
          RefreshToken: refreshToken,
          AccessTokenExpiresAt: accessTokenExpiresAtUtc,
          RefreshTokenExpiresAt: refreshTokenExpiresAtUtc,
          user,
        });
      },

      refreshToken: ({
        accessToken,
        accessTokenExpiresAtUtc,
        refreshToken,
        refreshTokenExpiresAtUtc,
      }) => {
        // localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
        set({
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
          user: undefined,
        });
      },

      setUser: (user) => {
        set({ user });
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
          isAuthenticated: Boolean(persisted.RefreshToken),
        };
      },
    }
  )
);

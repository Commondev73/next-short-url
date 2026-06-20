import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  clearAuthCookies,
  setAuthRoleCookie,
  setAuthTokenCookie,
} from "@/lib/auth/cookie";
import type { User } from "../types/auth.type";

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  setAuth: (user: User, accessToken: string, refreshToken: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      setAuth: (user, accessToken, refreshToken) => {
        setAuthTokenCookie(accessToken);
        setAuthRoleCookie(user.role);
        set({ user, accessToken, refreshToken });
      },
      clearAuth: () => {
        clearAuthCookies();
        set({ user: null, accessToken: null, refreshToken: null });
      },
    }),
    {
      name: "auth-storage",
      onRehydrateStorage: () => (state) => {
        if (state?.accessToken) {
          setAuthTokenCookie(state.accessToken);
        }
        if (state?.user?.role) {
          setAuthRoleCookie(state.user.role);
        }
      },
    },
  ),
);

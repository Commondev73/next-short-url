import { useAuthStore } from "@/features/auth/store/auth.store";
import type { AuthResponse } from "@/features/auth/types/auth.type";
import type { ApiResponse } from "@/shared/types/common";
import { endpoints } from "./endpoints";

let refreshPromise: Promise<string | null> | null = null;

const requestNewAccessToken = async (): Promise<string | null> => {
  const { refreshToken, setAuth, clearAuth } = useAuthStore.getState();

  if (!refreshToken) {
    clearAuth();
    return null;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    const res = await fetch(`${baseUrl}${endpoints.auth.refresh}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refreshToken }),
      cache: "no-store",
    });

    if (!res.ok) {
      clearAuth();
      return null;
    }

    const json = (await res.json()) as ApiResponse<AuthResponse>;
    const { user, access_token, refresh_token } = json.data;
    setAuth(user, access_token, refresh_token);
    return access_token;
  } catch {
    clearAuth();
    return null;
  }
};

export const refreshAccessToken = (): Promise<string | null> => {
  if (!refreshPromise) {
    refreshPromise = requestNewAccessToken().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

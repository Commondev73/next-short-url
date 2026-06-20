import { useAuthStore } from "@/features/auth/store/auth.store";
import { fetcher } from "./fetcher";

const getAccessToken = () => useAuthStore.getState().accessToken ?? undefined;

export const http = {
  get: <T>(url: string) =>
    fetcher<T>(url, { method: "GET", token: getAccessToken() }),

  post: <T>(url: string, body?: unknown) =>
    fetcher<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      token: getAccessToken(),
    }),

  put: <T>(url: string, body?: unknown) =>
    fetcher<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      token: getAccessToken(),
    }),

  delete: <T>(url: string) =>
    fetcher<T>(url, { method: "DELETE", token: getAccessToken() }),
};

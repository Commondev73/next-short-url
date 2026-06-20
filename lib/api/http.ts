import { fetcher } from "./fetcher";

export const http = {
  get: <T>(url: string, token?: string) =>
    fetcher<T>(url, { method: "GET", token }),

  post: <T>(url: string, body?: unknown, token?: string) =>
    fetcher<T>(url, {
      method: "POST",
      body: JSON.stringify(body),
      token,
    }),

  put: <T>(url: string, body?: unknown, token?: string) =>
    fetcher<T>(url, {
      method: "PUT",
      body: JSON.stringify(body),
      token,
    }),

  delete: <T>(url: string, token?: string) =>
    fetcher<T>(url, { method: "DELETE", token }),
};
import { endpoints } from "./endpoints";
import { refreshAccessToken } from "./token-refresh";

type FetchOptions = RequestInit & {
  baseUrl?: string;
  token?: string;
  _retry?: boolean;
};

const NO_REFRESH_PATHS = [
  endpoints.auth.login,
  endpoints.auth.register,
  endpoints.auth.refresh,
];

export const fetcher = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const baseUrl = options.baseUrl ?? process.env.NEXT_PUBLIC_API_URL;
  const isAuthEndpoint = NO_REFRESH_PATHS.some((path) => url.includes(path));

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    cache: options.cache ?? "no-store",
  });

  if (
    res.status === 401 &&
    options.token &&
    !options._retry &&
    !isAuthEndpoint &&
    typeof window !== "undefined"
  ) {
    const newToken = await refreshAccessToken();

    if (!newToken) {
      window.location.href = "/login";
      throw new Error("Session expired");
    }

    return fetcher<T>(url, { ...options, token: newToken, _retry: true });
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
};

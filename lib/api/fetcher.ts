type FetchOptions = RequestInit & {
  baseUrl?: string;
  token?: string;
};

export const fetcher = async <T>(
  url: string,
  options: FetchOptions = {},
): Promise<T> => {
  const baseUrl = options.baseUrl ?? process.env.NEXT_PUBLIC_API_URL;

  const res = await fetch(`${baseUrl}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.token ? { Authorization: `Bearer ${options.token}` } : {}),
      ...options.headers,
    },
    cache: options.cache ?? "no-store",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "API Error");
  }

  return res.json();
}

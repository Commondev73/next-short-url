import type { ShortUrlsQueryParams } from "../types/short-url.type";

export const shortUrlKeys = {
  all: ["short-urls"] as const,
  lists: () => [...shortUrlKeys.all, "list"] as const,
  list: (params: ShortUrlsQueryParams) => [...shortUrlKeys.lists(), params] as const,
  detail: (id: string) => [...shortUrlKeys.all, "detail", id] as const,
};

export const adminShortUrlKeys = {
  all: ["admin", "short-urls"] as const,
  lists: () => [...adminShortUrlKeys.all, "list"] as const,
  list: (params: ShortUrlsQueryParams) => [...adminShortUrlKeys.lists(), params] as const,
  detail: (id: string) => [...adminShortUrlKeys.all, "detail", id] as const,
};

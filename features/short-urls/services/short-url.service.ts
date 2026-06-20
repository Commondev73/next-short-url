import { http } from "@/lib/api/http";
import { endpoints } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/shared/types/common";
import type {
  ShortUrl,
  ShortUrlsResponse,
  ShortUrlsQueryParams,
  CreateShortUrlDto,
  UpdateShortUrlDto,
} from "@/features/short-urls/types/short-url.type";

const buildShortUrlsListUrl = ({ page, perPage }: ShortUrlsQueryParams = {}) => {
  const params = new URLSearchParams();

  if (page) {
    params.set("page", String(page));
  }

  if (perPage) {
    params.set("per_page", String(perPage));
  }

  const queryString = params.toString();
  if (!queryString) {
    return endpoints.shortUrls.list;
  }

  return `${endpoints.shortUrls.list}?${queryString}`;
};

export const getListShortUrls = (params?: ShortUrlsQueryParams) => {
  return http.get<ShortUrlsResponse>(buildShortUrlsListUrl(params));
};

export const getShortUrl = (id: string) => {
  return http.get<ApiResponse<ShortUrl>>(endpoints.shortUrls.get(id));
};

export const createShortUrl = (data: CreateShortUrlDto) => {
  return http.post<ApiResponse<ShortUrl>>(endpoints.shortUrls.create, data);
};

export const updateShortUrl = (id: string, data: UpdateShortUrlDto) => {
  return http.put<ApiResponse<ShortUrl>>(endpoints.shortUrls.update(id), data);
};

export const deleteShortUrl = (id: string) => {
  return http.delete<ApiResponse<null>>(endpoints.shortUrls.delete(id));
};

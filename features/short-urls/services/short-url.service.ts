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

export const getListShortUrls = (token: string, params?: ShortUrlsQueryParams) => {
  return http.get<ShortUrlsResponse>(buildShortUrlsListUrl(params), token);
}

export const getShortUrl = (id: string, token: string) => {
  return http.get<ApiResponse<ShortUrl>>(endpoints.shortUrls.get(id), token);
}

export const createShortUrl = (data: CreateShortUrlDto, token: string) => {
  return http.post<ApiResponse<ShortUrl>>(endpoints.shortUrls.create, data, token);
}

export const updateShortUrl = (id: string, data: UpdateShortUrlDto, token: string) => {
  return http.put<ApiResponse<ShortUrl>>(endpoints.shortUrls.update(id), data, token);
}

export const deleteShortUrl = (id: string, token: string) => {
  return http.delete<ApiResponse<null>>(endpoints.shortUrls.delete(id), token);
}

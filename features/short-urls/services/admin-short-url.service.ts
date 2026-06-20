import { http } from "@/lib/api/http";
import { endpoints } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/shared/types/common";
import type {
  ShortUrl,
  ShortUrlsResponse,
  ShortUrlsQueryParams,
  UpdateShortUrlDto,
} from "@/features/short-urls/types/short-url.type";

const buildAdminShortUrlsListUrl = ({ page, perPage }: ShortUrlsQueryParams = {}) => {
  const params = new URLSearchParams();

  if (page) {
    params.set("page", String(page));
  }

  if (perPage) {
    params.set("per_page", String(perPage));
  }

  const queryString = params.toString();
  if (!queryString) {
    return endpoints.admin.shortUrls.list;
  }

  return `${endpoints.admin.shortUrls.list}?${queryString}`;
};

export const getAdminListShortUrls = (token: string, params?: ShortUrlsQueryParams) => {
  return http.get<ShortUrlsResponse>(buildAdminShortUrlsListUrl(params), token);
};

export const getAdminShortUrl = (id: string, token: string) => {
  return http.get<ApiResponse<ShortUrl>>(endpoints.admin.shortUrls.get(id), token);
};

export const updateAdminShortUrl = (id: string, data: UpdateShortUrlDto, token: string) => {
  return http.put<ApiResponse<ShortUrl>>(endpoints.admin.shortUrls.update(id), data, token);
};

export const deleteAdminShortUrl = (id: string, token: string) => {
  return http.delete<ApiResponse<null>>(endpoints.admin.shortUrls.delete(id), token);
};

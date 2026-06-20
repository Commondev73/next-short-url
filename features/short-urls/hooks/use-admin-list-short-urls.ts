import { useQuery } from "@tanstack/react-query";
import { getAdminListShortUrls } from "../services/admin-short-url.service";
import type {
  ShortUrlsQueryParams,
  ShortUrlsResponse,
} from "../types/short-url.type";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminListShortUrls(token: string, params: ShortUrlsQueryParams = {}) {
  return useQuery<ShortUrlsResponse>({
    queryKey: adminShortUrlKeys.list(params),
    queryFn: () => getAdminListShortUrls(token, params),
    enabled: !!token,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getListShortUrls } from "../services/short-url.service";
import type {
  ShortUrlsQueryParams,
  ShortUrlsResponse,
} from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useListShortUrls(token: string, params: ShortUrlsQueryParams = {}) {
  return useQuery<ShortUrlsResponse>({
    queryKey: shortUrlKeys.list(params),
    queryFn: () => getListShortUrls(token, params),
    enabled: !!token,
  });
}

export const useShortUrls = useListShortUrls;

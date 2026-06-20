import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getListShortUrls } from "../services/short-url.service";
import type {
  ShortUrlsQueryParams,
  ShortUrlsResponse,
} from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useListShortUrls(params: ShortUrlsQueryParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery<ShortUrlsResponse>({
    queryKey: shortUrlKeys.list(params),
    queryFn: () => getListShortUrls(params),
    enabled: !!accessToken,
  });
}

export const useShortUrls = useListShortUrls;

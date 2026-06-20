import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getAdminListShortUrls } from "../services/admin-short-url.service";
import type {
  ShortUrlsQueryParams,
  ShortUrlsResponse,
} from "../types/short-url.type";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminListShortUrls(params: ShortUrlsQueryParams = {}) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery<ShortUrlsResponse>({
    queryKey: adminShortUrlKeys.list(params),
    queryFn: () => getAdminListShortUrls(params),
    enabled: !!accessToken,
  });
}

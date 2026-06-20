import { useQuery } from "@tanstack/react-query";
import { getAdminShortUrl } from "../services/admin-short-url.service";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminShortUrl(id: string, token: string) {
  return useQuery({
    queryKey: adminShortUrlKeys.detail(id),
    queryFn: () => getAdminShortUrl(id, token),
    enabled: !!id && !!token,
  });
}

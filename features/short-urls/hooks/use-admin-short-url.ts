import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getAdminShortUrl } from "../services/admin-short-url.service";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminShortUrl(id: string) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: adminShortUrlKeys.detail(id),
    queryFn: () => getAdminShortUrl(id),
    enabled: !!id && !!accessToken,
  });
}

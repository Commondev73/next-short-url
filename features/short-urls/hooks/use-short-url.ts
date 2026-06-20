import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { getShortUrl } from "../services/short-url.service";
import { shortUrlKeys } from "./query-keys";

export function useShortUrl(id: string) {
  const accessToken = useAuthStore((state) => state.accessToken);

  return useQuery({
    queryKey: shortUrlKeys.detail(id),
    queryFn: () => getShortUrl(id),
    enabled: !!id && !!accessToken,
  });
}

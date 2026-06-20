import { useQuery } from "@tanstack/react-query";
import { getShortUrl } from "../services/short-url.service";
import { shortUrlKeys } from "./query-keys";

export function useShortUrl(id: string, token: string) {
  return useQuery({
    queryKey: shortUrlKeys.detail(id),
    queryFn: () => getShortUrl(id, token),
    enabled: !!id && !!token,
  });
}

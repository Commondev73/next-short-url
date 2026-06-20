import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../services/short-url.service";
import type { CreateShortUrlDto } from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useCreateShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateShortUrlDto) => createShortUrl(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

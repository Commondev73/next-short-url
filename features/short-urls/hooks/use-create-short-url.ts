import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createShortUrl } from "../services/short-url.service";
import type { CreateShortUrlDto } from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useCreateShortUrl(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateShortUrlDto) => {
      if (!token) {
        throw new Error("Please login before creating a short URL.");
      }

      return createShortUrl(data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

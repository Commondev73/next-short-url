import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { createShortUrl } from "../services/short-url.service";
import type { CreateShortUrlDto } from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useCreateShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateShortUrlDto) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (!accessToken) {
        throw new Error("Please login before creating a short URL.");
      }

      return createShortUrl(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

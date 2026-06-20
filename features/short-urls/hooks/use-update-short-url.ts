import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { updateShortUrl } from "../services/short-url.service";
import type { UpdateShortUrlDto } from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useUpdateShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateShortUrlDto }) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (!accessToken) {
        throw new Error("Please login before updating a short URL.");
      }

      return updateShortUrl(id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

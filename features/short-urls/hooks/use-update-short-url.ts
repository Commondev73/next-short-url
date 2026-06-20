import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShortUrl } from "../services/short-url.service";
import type { UpdateShortUrlDto } from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useUpdateShortUrl(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateShortUrlDto }) => {
      if (!token) {
        throw new Error("Please login before updating a short URL.");
      }

      return updateShortUrl(id, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminShortUrl } from "../services/admin-short-url.service";
import type { UpdateShortUrlDto } from "../types/short-url.type";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminUpdateShortUrl(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateShortUrlDto }) => {
      if (!token) {
        throw new Error("Please login before updating a short URL.");
      }

      return updateAdminShortUrl(id, data, token);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminShortUrlKeys.lists() });
    },
  });
}

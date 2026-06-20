import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateAdminShortUrl } from "../services/admin-short-url.service";
import type { UpdateShortUrlDto } from "../types/short-url.type";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminUpdateShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShortUrlDto }) =>
      updateAdminShortUrl(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminShortUrlKeys.lists() });
    },
  });
}

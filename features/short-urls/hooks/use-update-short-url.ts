import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateShortUrl } from "../services/short-url.service";
import type { UpdateShortUrlDto } from "../types/short-url.type";
import { shortUrlKeys } from "./query-keys";

export function useUpdateShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateShortUrlDto }) =>
      updateShortUrl(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteShortUrl } from "../services/short-url.service";
import { shortUrlKeys } from "./query-keys";

export function useDeleteShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteShortUrl(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminShortUrl } from "../services/admin-short-url.service";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminDeleteShortUrl(token: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminShortUrl(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminShortUrlKeys.lists() });
    },
  });
}

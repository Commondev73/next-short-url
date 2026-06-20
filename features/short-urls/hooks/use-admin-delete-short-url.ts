import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteAdminShortUrl } from "../services/admin-short-url.service";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminDeleteShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteAdminShortUrl(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminShortUrlKeys.lists() });
    },
  });
}

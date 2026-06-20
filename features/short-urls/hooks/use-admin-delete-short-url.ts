import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { deleteAdminShortUrl } from "../services/admin-short-url.service";
import { adminShortUrlKeys } from "./query-keys";

export function useAdminDeleteShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (!accessToken) {
        throw new Error("Please login before deleting a short URL.");
      }

      return deleteAdminShortUrl(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: adminShortUrlKeys.lists() });
    },
  });
}

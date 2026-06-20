import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/features/auth/store/auth.store";
import { deleteShortUrl } from "../services/short-url.service";
import { shortUrlKeys } from "./query-keys";

export function useDeleteShortUrl() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => {
      const accessToken = useAuthStore.getState().accessToken;

      if (!accessToken) {
        throw new Error("Please login before deleting a short URL.");
      }

      return deleteShortUrl(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: shortUrlKeys.lists() });
    },
  });
}

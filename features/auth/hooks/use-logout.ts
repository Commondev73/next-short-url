import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../services/auth.service";
import { useAuthStore } from "../store/auth.store";

export function useLogout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => {
      const refreshToken = useAuthStore.getState().refreshToken;

      if (!refreshToken) {
        throw new Error("Please login before logging out.");
      }

      return logout(refreshToken);
    },
    onSuccess: () => {
      queryClient.clear();
    },
  });
}

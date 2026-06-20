import { useMutation, useQueryClient } from '@tanstack/react-query'
import { logout } from '../services/auth.service'

export function useLogout(accessToken: string, refreshToken: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: () => logout(accessToken, refreshToken),
    onSuccess: () => {
      queryClient.clear()
    },
  })
}

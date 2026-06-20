import { useMutation } from '@tanstack/react-query'
import { refresh } from '../services/auth.service'

export function useRefresh() {
  return useMutation({
    mutationFn: (refreshToken: string) => refresh(refreshToken),
  })
}

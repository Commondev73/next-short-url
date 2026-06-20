import { useMutation } from '@tanstack/react-query'
import { login } from '../services/auth.service'
import type { LoginDto } from '../types/auth.type'

export function useLogin() {
  return useMutation({
    mutationFn: (data: LoginDto) => login(data),
  })
}

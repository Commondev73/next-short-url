import { useMutation } from '@tanstack/react-query'
import { register } from '../services/auth.service'
import type { RegisterDto } from '../types/auth.type'

export function useRegister() {
  return useMutation({
    mutationFn: (data: RegisterDto) => register(data),
  })
}

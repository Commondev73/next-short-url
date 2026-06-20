import { http } from "@/lib/api/http";
import { endpoints } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/shared/types/common";
import type {
  AuthResponse,
  RegisterDto,
  LoginDto,
} from "@/features/auth/types/auth.type";

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const register = (data: RegisterDto) => {
  return http.post<ApiResponse<AuthResponse>>(endpoints.auth.register, data);
};

export const login = ({ emailOrUsername, password }: LoginDto) => {
  const payload = isEmail(emailOrUsername)
    ? { email: emailOrUsername, password }
    : { username: emailOrUsername, password };

  return http.post<ApiResponse<AuthResponse>>(endpoints.auth.login, payload);
};

export const refresh = (refreshToken: string) => {
  return http.post<ApiResponse<AuthResponse>>(
    endpoints.auth.refresh,
    { refresh_token: refreshToken },
  );
};

export const logout = (accessToken: string, refreshToken: string) => {
  return http.post<ApiResponse<null>>(
    endpoints.auth.logout,
    { refresh_token: refreshToken },
    accessToken,
  );
};

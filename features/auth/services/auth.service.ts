import { http } from "@/lib/api/http";
import { endpoints } from "@/lib/api/endpoints";
import type { ApiResponse } from "@/shared/types/common";
import type {
  AuthResponse,
  RegisterDto,
  LoginDto,
} from "@/features/auth/types/auth.type";

export const register = (data: RegisterDto) => {
  return http.post<ApiResponse<AuthResponse>>(endpoints.auth.register, data);
};

export const login = (data: LoginDto) => {
  return http.post<ApiResponse<AuthResponse>>(endpoints.auth.login, data);
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

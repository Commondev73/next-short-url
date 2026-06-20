import { AUTH_TOKEN_COOKIE } from "./constants";

export function setAuthTokenCookie(token: string) {
  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
}

export function clearAuthTokenCookie() {
  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0`;
}

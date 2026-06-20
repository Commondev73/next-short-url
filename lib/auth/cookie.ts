import { AUTH_ROLE_COOKIE, AUTH_TOKEN_COOKIE } from "./constants";

export function setAuthTokenCookie(token: string) {
  document.cookie = `${AUTH_TOKEN_COOKIE}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
}

export function setAuthRoleCookie(role: "user" | "admin") {
  document.cookie = `${AUTH_ROLE_COOKIE}=${encodeURIComponent(role)}; path=/; SameSite=Lax`;
}

export function clearAuthTokenCookie() {
  document.cookie = `${AUTH_TOKEN_COOKIE}=; path=/; max-age=0`;
}

export function clearAuthRoleCookie() {
  document.cookie = `${AUTH_ROLE_COOKIE}=; path=/; max-age=0`;
}

export function clearAuthCookies() {
  clearAuthTokenCookie();
  clearAuthRoleCookie();
}

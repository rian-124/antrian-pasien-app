import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import type { AuthUser, DecodedToken } from "@/types/auth";

const KEYS = {
  token: "access_token",
  user: "user",
  loket: "selectedLoket",
} as const;

const isBrowser = () => typeof window !== "undefined";

export function getToken(): string | null {
  return isBrowser() ? localStorage.getItem(KEYS.token) : null;
}

export function getDecodedUser(): DecodedToken | null {
  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch {
    return null;
  }
}

export function saveSession(user: AuthUser): void {
  Cookies.set(KEYS.token, user.token, { expires: 1 });
  localStorage.setItem(KEYS.token, user.token);
  localStorage.setItem(KEYS.user, JSON.stringify(user));

  if (user.loketId) {
    localStorage.setItem(KEYS.loket, String(user.loketId));
  }
}

export function clearSession(): void {
  if (!isBrowser()) return;

  localStorage.removeItem(KEYS.token);
  localStorage.removeItem(KEYS.user);
  localStorage.removeItem(KEYS.loket);
  Cookies.remove(KEYS.token);
}
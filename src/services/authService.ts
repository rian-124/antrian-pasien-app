import { jwtDecode } from "jwt-decode";
import type { AuthUser, DecodedToken } from "@/types/auth";
import { clearSession, getToken, saveSession } from "@/lib/authStorage";
import { API_URL } from "@/lib/utils";
import { mockAuth } from "@/mocks";

const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true";

function createMockToken(payload: Record<string, any>) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  const body = btoa(JSON.stringify(payload))
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
  return `${header}.${body}.mock-signature`;
}

export async function login(username: string, password: string): Promise<AuthUser> {
  if (USE_MOCK) {
    const uname = username.trim().toLowerCase();
    const found = (mockAuth as any)[uname];

    if (!found || found.password !== password) {
      throw new Error("Username atau password salah");
    }

    const token = createMockToken({
      username: found.username,
      role: found.role,
      outlet: found.outlet,
      outlet_id: found.outlet_id,
      loketId: found.loketId,
      role_id: found.role_id,
      user_id: uname === "admin" ? 1 : uname === "petugas1" ? 2 : 3,
    });

    const decoded = jwtDecode<DecodedToken>(token);

    const user: AuthUser = {
      token,
      username: decoded.username,
      role: decoded.role,
      outlet: decoded.outlet,
      loketId: decoded.loketId,
    };

    saveSession(user);
    return user;
  }

  const res = await fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: username.trim(), password }),
  });

  const body = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(body?.message || "Login failed");
  }

  const token = body?.data?.token;
  if (typeof token !== "string" || !token) {
    throw new Error("Invalid token received from backend");
  }

  const decoded = jwtDecode<DecodedToken>(token);

  const user: AuthUser = {
    token,
    username: decoded.username,
    role: decoded.role,
    outlet: decoded.outlet,
    loketId: decoded.loketId,
  };

  saveSession(user);
  return user;
}

export function logout(): void {
  clearSession();
}

export { getToken, saveSession, clearSession };

export const AuthService = {
  login,
  logout,
  getToken,
  saveSession,
  clearSession,
};

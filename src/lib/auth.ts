// Simple JWT-like auth utilities for the portfolio
// Uses base64 encoding for demo purposes (not production-grade)

export interface TokenPayload {
  userId: string;
  email: string;
  role: string;
  exp: number;
}

const SECRET = "prem-portfolio-os-secret-key-2025";

function base64Encode(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str).toString("base64url");
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

function base64Decode(str: string): string {
  if (typeof window === "undefined") {
    return Buffer.from(str, "base64url").toString();
  }
  const padded = str.replace(/-/g, "+").replace(/_/g, "/");
  return atob(padded);
}

export function signToken(payload: Omit<TokenPayload, "exp">): string {
  const header = base64Encode(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const exp = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  const body = base64Encode(JSON.stringify({ ...payload, exp }));
  const signature = base64Encode(SECRET + "." + header + "." + body);
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): TokenPayload | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const payload = JSON.parse(base64Decode(parts[1])) as TokenPayload;
    if (payload.exp < Date.now()) return null;
    return payload;
  } catch {
    return null;
  }
}

export function getTokenFromHeader(authHeader: string | null): string | null {
  if (!authHeader) return null;
  if (authHeader.startsWith("Bearer ")) {
    return authHeader.substring(7);
  }
  return null;
}

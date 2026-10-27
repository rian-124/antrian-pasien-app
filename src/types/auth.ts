export interface DecodedToken {
  sub: number;
  username: string;
  role: string;
  outlet: string;
  loketId: number;
  permission: string[];
  iat: number;
  exp: number;
}

export interface AuthUser {
  token: string;
  username: string;
  role: string;
  outlet: string;
  loketId: number;
}
export interface JwtPayload {
  sub: string; // ví dụ userId
  email: string;
  iat?: number;
  exp?: number;
}

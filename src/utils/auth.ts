import * as jwt from "jsonwebtoken";
export const APP_SECRET = "this-is-a-super-secret-text";

export interface AuthTokenPayload {
  userId: number;
}

// placed here instead of mutation because this is not performing any kind of mutations plus this is not a function user will directly interact with
export function decodeAuthHeader(authHeader: String): AuthTokenPayload {
  const token = authHeader.split(" ")[1];

  if (!token) {
    throw new Error("No token found");
  }
  return jwt.verify(token, APP_SECRET) as AuthTokenPayload;
}

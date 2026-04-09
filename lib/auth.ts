import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "az_session";
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "aprovazap-secret-change-in-prod"
);

export async function signToken() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(SECRET);
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch {
    return null;
  }
}

export { COOKIE_NAME };

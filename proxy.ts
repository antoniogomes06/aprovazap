import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const COOKIE_NAME = "az_session";
const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET ?? "aprovazap-secret-change-in-prod"
);

async function isAuthenticated(req: NextRequest): Promise<boolean> {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, SECRET);
    return true;
  } catch {
    return false;
  }
}

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const authed = await isAuthenticated(req);

  // Logado acessando /login ou / → vai pro dashboard
  if ((pathname === "/login" || pathname === "/") && authed) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Rota admin sem auth → redireciona para login
  if (pathname.startsWith("/admin") && !authed) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/admin/:path*", "/login"],
};

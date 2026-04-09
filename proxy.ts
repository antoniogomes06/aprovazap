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

  // Logado tentando acessar /login → dashboard
  if (pathname === "/login" && authed) {
    return NextResponse.redirect(new URL("/admin", req.url));
  }

  // Rota protegida sem auth → 404
  if (pathname.startsWith("/admin")) {
    if (!authed) {
      return NextResponse.rewrite(new URL("/not-found", req.url), { status: 404 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};

import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: any) {
  const jwt = request.cookies.get("jwtAuth");
  const jwtSecret = process.env.JWT_SECRET_KEY;
  const jwtApp = process.env.APP;

  if (!jwt) return NextResponse.redirect(new URL("/login", request.url));

  try {
    const { payload } = await jwtVerify(
      jwt.value,
      new TextEncoder().encode(`${jwtSecret}-${jwtApp}`),
    );
    return NextResponse.next();
  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/innovatube/favorites/:path*"],
};

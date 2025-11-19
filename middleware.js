// middleware.js
import { NextResponse } from "next/server";

export function middleware(req) {
  const res = NextResponse.next();

  // Best, safest way to forward the pathname into server components
  res.headers.set("x-pathname", req.nextUrl.pathname);

  return res;
}

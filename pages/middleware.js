import { getToken } from "next-auth/jwt";
//import { NextRequest, NextResponse } from "next/server";
export async function middleware(req, res) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ["/", "/admin"];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = res.next();
  if (isPathProtected) {
    const token = await getToken({ req });
    if (!token) {
      const url = new URL(`/account/login`, req.url);
      url.searchParams.set("callbackUrl", pathname);
      return res.redirect(url);
    }
  }
  return res;
}
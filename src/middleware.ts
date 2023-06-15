import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/",
};

export function middleware(_req: NextRequest) {
  return NextResponse.next();
}

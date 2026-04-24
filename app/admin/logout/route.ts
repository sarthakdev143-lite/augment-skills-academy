import { NextResponse } from "next/server";
import { clearAdminSession } from "@/app/admin/auth";

export async function GET() {
  return new NextResponse(null, {
    status: 302,
    headers: {
      Location: "/admin/login",
      "Set-Cookie": clearAdminSession(),
    },
  });
}

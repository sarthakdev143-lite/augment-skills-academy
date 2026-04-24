import { redirect } from "next/navigation";
import type { AppRole } from "@/types";

export function getSafeRedirectPath(
  next: string | null | undefined,
  fallback = "/",
) {
  if (!next) {
    return fallback;
  }

  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\") || next.includes("://")) {
    return fallback;
  }

  return next;
}

export async function requireAuth() {
  console.warn("Auth disabled: requireAuth redirected to home.");
  redirect("/");
}

export async function requireRole(roles: AppRole[]) {
  console.warn("Auth disabled: requireRole redirected to home.", roles);
  redirect("/");
}

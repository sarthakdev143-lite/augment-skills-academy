import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AppRole } from "@/types";

export function getSafeRedirectPath(
  next: string | null | undefined,
  fallback = "/dashboard",
) {
  if (!next) {
    return fallback;
  }

  if (!next.startsWith("/") || next.startsWith("//") || next.includes("\\") || next.includes("://")) {
    return fallback;
  }

  return next;
}

export async function getCurrentUser() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function requireAuth() {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}

export async function requireRole(roles: AppRole[]) {
  const user = await requireAuth();
  const role = (user.user_metadata.role ?? "student") as AppRole;
  if (!roles.includes(role)) {
    redirect("/dashboard");
  }
  return user;
}

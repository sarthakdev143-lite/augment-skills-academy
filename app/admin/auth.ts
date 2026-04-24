import { createHmac } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin123";
const COOKIE_NAME = "admin_session";

function hashPassword(value: string) {
  return createHmac("sha256", "augment-admin-session").update(value).digest("hex");
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  return session === hashPassword(ADMIN_PASSWORD);
}

export function createAdminSession() {
  return `${COOKIE_NAME}=${hashPassword(ADMIN_PASSWORD)}; Path=/; HttpOnly; SameSite=Lax`;
}

export function clearAdminSession() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; Max-Age=0; SameSite=Lax`;
}

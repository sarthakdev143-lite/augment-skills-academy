import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createAdminSession, isAdminAuthenticated, ADMIN_PASSWORD } from "@/app/admin/auth";

async function loginAction(formData: FormData) {
  "use server";

  const password = String(formData.get("password") ?? "");
  if (password !== ADMIN_PASSWORD) {
    redirect("/admin/login?error=Invalid password");
  }

  const cookieStore = await cookies();
  const serialized = createAdminSession().split(";")[0] ?? "";
  const [name, value] = serialized.split("=");
  cookieStore.set(name, value, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });
  redirect("/admin");
}

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminAuthenticated()) {
    redirect("/admin");
  }

  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-4xl border border-border bg-background p-8">
        <h1 className="text-3xl font-black text-foreground">Admin Login</h1>
        <p className="mt-3 text-sm leading-7 text-muted">Enter the admin password to access enrollment and contact submissions.</p>
        <form action={loginAction} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm"
            />
          </div>
          {params.error ? <p className="text-sm text-rose-400">{params.error}</p> : null}
          <button type="submit" className="w-full rounded-full bg-accent px-5 py-3 text-sm font-black text-white">
            Enter Admin
          </button>
        </form>
      </div>
    </main>
  );
}

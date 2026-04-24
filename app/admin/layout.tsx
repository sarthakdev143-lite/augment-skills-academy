import Link from "next/link";
import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/app/admin/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/80 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Augment Skills Academy - Admin</p>
            <p className="mt-1 text-lg font-semibold">Enrollment and contact overview</p>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-sm text-muted md:flex">
              <Link href="/admin">Enrollments</Link>
              <Link href="/admin#contact-messages">Contact Messages</Link>
            </nav>
            <Link href="/admin/logout" className="rounded-full border border-border px-4 py-2 text-sm font-medium">
              Sign out
            </Link>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const user = await requireRole(["admin"]);

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/80 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Admin portal</p>
            <p className="mt-1 text-lg font-semibold">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-sm text-muted md:flex">
              <Link href="/admin">Overview</Link>
              <Link href="/dashboard">Student view</Link>
            </nav>
            <form action={signOutAction}>
              <Button variant="secondary" type="submit">
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}

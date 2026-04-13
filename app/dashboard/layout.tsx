import Link from "next/link";
import type { ReactNode } from "react";
import { signOutAction } from "@/app/(auth)/actions";
import { NotificationBell } from "@/components/dashboard/notification-bell";
import { Button } from "@/components/ui/button";
import { requireAuth } from "@/lib/auth";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAuth();

  return (
    <div className="min-h-screen">
      <header className="border-b border-border/80 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4">
          <div>
            <p className="text-sm uppercase tracking-[0.18em] text-muted">Student dashboard</p>
            <p className="mt-1 text-lg font-semibold">{user.email}</p>
          </div>
          <div className="flex items-center gap-3">
            <nav className="hidden items-center gap-4 text-sm text-muted md:flex">
              <Link href="/dashboard">Overview</Link>
              <Link href="/courses">Explore courses</Link>
            </nav>
            <NotificationBell />
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

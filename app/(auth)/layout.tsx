import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="hidden rounded-[36px] border border-border bg-surface p-10 lg:block">
        <Link href="/" className="inline-flex items-center gap-4">
          <Image src="/brand-mark.svg" alt="Augment Skills Academy" width={56} height={56} />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Augment Skills Academy
            </p>
            <p className="text-lg font-semibold">Production-first technical education</p>
          </div>
        </Link>

        <div className="mt-12 max-w-lg">
          <p className="text-4xl font-semibold leading-tight text-balance">
            Learn through systems that feel like real engineering work.
          </p>
          <p className="mt-5 text-base leading-8 text-muted">
            Access guided courses, notes, certificates, and role-aware dashboards
            built for serious learners and scaling teams.
          </p>
        </div>

        <div className="mt-10 grid gap-4">
          {[
            "Email/password, Google OAuth, and magic link access",
            "Protected dashboards and role-gated admin routes",
            "Certificates, notes, bookmarks, and progress tracking",
          ].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-border/70 bg-white/35 px-4 py-4 text-sm text-muted dark:bg-white/5"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}

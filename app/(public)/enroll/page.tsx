import { Suspense } from "react";
import { EnrollPageClient } from "@/components/enroll/enroll-page-client";

function EnrollPageFallback() {
  return (
    <main className="mx-auto max-w-7xl px-6 py-16">
      <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
        <div className="rounded-4xl border border-border bg-surface p-8">
          <div className="h-6 w-24 rounded-full bg-border/60" />
          <div className="mt-6 h-12 w-3/4 rounded-2xl bg-border/60" />
          <div className="mt-4 h-4 w-full rounded-full bg-border/50" />
          <div className="mt-2 h-4 w-5/6 rounded-full bg-border/50" />
          <div className="mt-6 h-72 rounded-[28px] bg-border/40" />
        </div>
        <div className="rounded-[32px] border border-border bg-background p-8">
          <div className="space-y-4">
            <div className="h-11 rounded-xl bg-border/50" />
            <div className="h-11 rounded-xl bg-border/50" />
            <div className="h-11 rounded-xl bg-border/50" />
            <div className="h-28 rounded-2xl bg-border/40" />
            <div className="h-12 w-40 rounded-full bg-border/60" />
          </div>
        </div>
      </div>
    </main>
  );
}

export default function EnrollPage() {
  return (
    <Suspense fallback={<EnrollPageFallback />}>
      <EnrollPageClient />
    </Suspense>
  );
}

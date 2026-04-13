import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

type KpiCardProps = {
  label: string;
  value: string;
  hint: string;
  icon: ReactNode;
};

export function KpiCard({ label, value, hint, icon }: KpiCardProps) {
  return (
    <Card className="h-full">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-muted">{label}</p>
          <p className="mt-4 text-3xl font-semibold">{value}</p>
          <p className="mt-2 text-sm text-muted">{hint}</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border bg-white/40 dark:bg-white/6">
          {icon}
        </div>
      </div>
    </Card>
  );
}

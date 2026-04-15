import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/80 bg-white/78 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em] text-foreground/72 shadow-[0_10px_24px_rgba(19,34,56,0.08)] dark:bg-white/10 dark:text-white/74",
        className,
      )}
      {...props}
    />
  );
}

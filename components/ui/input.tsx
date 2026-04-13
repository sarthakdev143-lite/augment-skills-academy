import * as React from "react";
import { cn } from "@/lib/utils";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => (
  <input
    ref={ref}
    className={cn(
      "w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none",
      "placeholder:text-muted focus:border-accent/40 focus:bg-surface-strong focus:ring-2 focus:ring-accent/20",
      className,
    )}
    {...props}
  />
));

Input.displayName = "Input";

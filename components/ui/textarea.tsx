import * as React from "react";
import { cn } from "@/lib/utils";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(
      "min-h-32 w-full rounded-2xl border border-border bg-surface px-4 py-3 text-sm text-foreground outline-none",
      "placeholder:text-muted focus:border-accent/40 focus:bg-surface-strong focus:ring-2 focus:ring-accent/20",
      className,
    )}
    {...props}
  />
));

Textarea.displayName = "Textarea";

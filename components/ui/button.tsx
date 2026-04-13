"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const styles = {
  primary:
    "bg-accent text-white shadow-[0_12px_32px_rgba(91,77,247,0.35)] hover:-translate-y-0.5 hover:bg-[#4f41e9]",
  secondary:
    "border border-border bg-surface text-foreground hover:-translate-y-0.5 hover:bg-surface-strong",
  ghost: "text-muted hover:bg-white/5 hover:text-foreground dark:hover:bg-white/5",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, type = "button", variant = "primary", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        "disabled:cursor-not-allowed disabled:opacity-60",
        styles[variant],
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";

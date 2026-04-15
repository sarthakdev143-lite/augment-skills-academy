"use client";

import type { PropsWithChildren } from "react";
import { motion, useReducedMotion } from "framer-motion";

type RevealProps = PropsWithChildren<{
  delay?:     number;
  className?: string;
  /** Animation direction: default is up (y). Pass "none" for fade-only. */
  direction?: "up" | "down" | "left" | "right" | "none";
}>;

export function Reveal({
  children,
  delay     = 0,
  className,
  direction = "up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial = {
    opacity: 0,
    y: direction === "up"   ?  20 : direction === "down"  ? -20 : 0,
    x: direction === "left" ?  20 : direction === "right" ? -20 : 0,
  };

  const animate = { opacity: 1, y: 0, x: 0 };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

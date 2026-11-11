"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  className,
  delay = 0,
  y = 26,
  duration = 0.9,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  once?: boolean;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  delay = 0,
  gap = 0.09,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  gap?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  y = 24,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function LineMask({
  children,
  delay = 0,
  className,
  play = "inView",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  play?: "inView" | "mount";
}) {
  const reduce = useReducedMotion();
  const initial = reduce ? { y: "0%", opacity: 1 } : { y: "115%", opacity: 1 };

  return (
    <span className={cn("block overflow-hidden pb-[0.08em]", className)}>
      <motion.span
        className="block will-change-transform"
        initial={initial}
        {...(play === "mount"
          ? { animate: { y: "0%", opacity: 1 } }
          : { whileInView: { y: "0%", opacity: 1 }, viewport: { once: true } })}
        transition={{ duration: 1.15, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

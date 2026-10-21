"use client";

import { motion, type HTMLMotionProps, type Variants } from "motion/react";
import { EASE } from "@/lib/gsap";

const viewport = { once: true, margin: "0px 0px -10% 0px" };

/** Fade + 24px rise, once. */
export function Reveal({ delay = 0, ...props }: HTMLMotionProps<"div"> & { delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...props}
    />
  );
}

/** Staggers direct children that use `variants={revealItem}` by 0.06s. */
export function RevealGroup({ stagger = 0.06, ...props }: HTMLMotionProps<"div"> & { stagger?: number }) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      {...props}
    />
  );
}

export const revealItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

"use client";

import { motion, type Variants } from "motion/react";
import { EASE } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * Each line is a string; wrap the dark half in **double asterisks**.
 *   lines={["Selected **Work**"]}
 *   lines={["Simple steps,", "**extraordinary result.**"]}
 * Lines mask-reveal upward when the heading scrolls into view.
 */
type Props = {
  lines: string[];
  id?: string;
  as?: "h1" | "h2" | "h3";
  dark?: boolean;
  className?: string;
  /** Animate on mount instead of on scroll (hero). */
  immediate?: boolean;
  delay?: number;
};

const parent: Variants = { hidden: {}, show: {} };

export function TwoToneHeading({ lines, id, as = "h2", dark, className, immediate, delay = 0 }: Props) {
  const Tag = motion[as];
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag id={id} initial="hidden" {...trigger} variants={parent} className={cn("text-title font-medium text-balance", className)}>
      {lines.map((line, i) => (
        <span key={i} className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block"
            variants={{
              hidden: { y: "115%" },
              show: { y: "0%", transition: { duration: 0.95, ease: EASE, delay: delay + i * 0.08 } },
            }}
          >
            {line.split(/(\*\*.+?\*\*)/g).map((part, j) =>
              part.startsWith("**") ? (
                <span key={j} className={dark ? "text-white" : "text-ink"}>
                  {part.slice(2, -2)}
                </span>
              ) : (
                <span key={j} className={dark ? "text-night-muted" : "text-mute-2"}>
                  {part}
                </span>
              ),
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

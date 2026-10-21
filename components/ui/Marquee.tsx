import { cn } from "@/lib/cn";
import type { CSSProperties, ReactNode } from "react";

type MarqueeProps = {
  children: ReactNode;
  direction?: "left" | "right" | "up" | "down";
  /** Seconds per loop. */
  duration?: number;
  gap?: number;
  className?: string;
};

/** Infinite CSS marquee. Content renders twice and the track slides -50%. Pauses on hover. */
export function Marquee({ children, direction = "left", duration = 40, gap = 16, className }: MarqueeProps) {
  const vertical = direction === "up" || direction === "down";
  const reverse = direction === "right" || direction === "down";
  const copy = (hidden?: boolean) => (
    <div
      aria-hidden={hidden || undefined}
      inert={hidden || undefined}
      className={cn("flex shrink-0", vertical ? "flex-col" : "flex-row items-center")}
      style={vertical ? { gap, paddingBottom: gap } : { gap, paddingRight: gap }}
    >
      {children}
    </div>
  );

  return (
    <div className={cn("marquee overflow-hidden", className)}>
      <div
        className={cn("marquee-track flex", vertical ? "animate-marquee-y flex-col" : "w-max animate-marquee-x")}
        style={{ "--marquee-duration": `${duration}s`, animationDirection: reverse ? "reverse" : "normal" } as CSSProperties}
      >
        {copy()}
        {copy(true)}
      </div>
    </div>
  );
}

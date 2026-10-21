"use client";

import { useRef, useState } from "react";
import { process } from "@/lib/content";
import { gsap, ScrollTrigger, useIsoLayoutEffect } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Counter } from "@/components/ui/Counter";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

export function Process() {
  const trackRef = useRef<HTMLOListElement>(null);
  const [reached, setReached] = useState(-1);
  const steps = process.steps.length;

  // Scrubs --p from 0 → 1; the line fills and each node lights up as the fill passes it.
  useIsoLayoutEffect(() => {
    const el = trackRef.current!;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: el,
        start: "top 75%",
        end: "bottom 55%",
        scrub: true,
        onUpdate: ({ progress }) => {
          el.style.setProperty("--p", progress.toFixed(4));
          // Node i sits at i/steps along the track.
          setReached(progress < 0.01 ? -1 : Math.min(steps - 1, Math.floor(progress * steps)));
        },
      });
    });
    mm.add("(prefers-reduced-motion: reduce)", () => {
      el.style.setProperty("--p", "1");
      setReached(steps - 1);
    });
    return () => mm.revert();
  }, [steps]);

  return (
    <section id="process" aria-labelledby="process-title" className="relative z-10 -mt-10 rounded-t-slab bg-canvas">
      <div className="container-x section-y">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>{process.eyebrow}</Eyebrow>
            <TwoToneHeading id="process-title" lines={[process.titleMuted, `**${process.titleDark}**`]} className="mt-4" />
          </div>
        </div>

        <ol
          ref={trackRef}
          style={{ "--p": 0 } as React.CSSProperties}
          className="relative mt-16 grid gap-10 pl-10 md:mt-24 md:grid-cols-4 md:gap-6 md:pt-14 md:pl-0"
        >
          {/* Track: vertical on mobile, horizontal on desktop */}
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[11px] w-0.5 rounded-full bg-line md:top-[11px] md:right-0 md:bottom-auto md:left-0 md:h-0.5 md:w-auto"
          >
            <span className="absolute inset-0 origin-top scale-y-[var(--p)] rounded-full bg-gradient-to-b from-accent to-accent-2 md:origin-left md:scale-x-[var(--p)] md:scale-y-100 md:bg-gradient-to-r" />
          </span>

          {process.steps.map((step, i) => {
            const on = i <= reached;
            return (
              <li key={step.title} className="relative">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-1 -left-10 grid size-6 place-items-center rounded-full border-2 bg-white transition-colors duration-500 md:-top-14 md:left-0",
                    on ? "border-accent" : "border-line",
                  )}
                >
                  <span
                    className={cn("size-2 rounded-full transition-all duration-500", on ? "scale-100 bg-accent" : "scale-50 bg-line")}
                  />
                </span>
                <div className="flex items-baseline gap-3">
                  <span className={cn("font-mono text-[13px] transition-colors duration-500", on ? "text-accent" : "text-muted")}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-xs tracking-[0.06em] text-muted uppercase">{step.duration}</span>
                </div>
                <h3 className="mt-3 text-[28px] font-medium tracking-[-0.04em] md:text-[32px]">{step.title}</h3>
                <p className="mt-3 max-w-[300px] text-base leading-relaxed text-muted">{step.description}</p>
              </li>
            );
          })}
        </ol>

        <Reveal className="mt-20 grid overflow-hidden rounded-card bg-surface sm:grid-cols-3 md:mt-28">
          {process.stats.map((s, i) => (
            <div key={s.label} className={cn("px-8 py-10 md:px-10 md:py-12", i > 0 && "border-t border-line sm:border-t-0 sm:border-l")}>
              <Counter
                value={s.value}
                suffix={s.suffix}
                className="block font-mono text-[clamp(3rem,2rem+3vw,4.5rem)] leading-none font-medium tracking-[-0.06em] text-ink"
              />
              <p className="mt-4 text-[15px] text-muted">{s.label}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

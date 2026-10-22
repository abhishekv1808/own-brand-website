"use client";

import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useRef, useState } from "react";
import { services } from "@/lib/content";
import { EASE } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { ArrowUpRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pill } from "@/components/ui/Pill";
import { Reveal } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

// Description column ends ~630px in; the preview sits 64px right of x.
const PREVIEW_MIN_X = 580;

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [pointerInside, setPointerInside] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const spring = { stiffness: 260, damping: 28, mass: 0.6 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  return (
    <section id="services" aria-labelledby="services-title" className="section-y">
      <div className="container-x">
        <Eyebrow>{services.eyebrow}</Eyebrow>
        <TwoToneHeading id="services-title" lines={[`**${services.titleDark}**`, services.titleMuted]} className="mt-5 max-w-[760px]" />

        <div className="relative mt-14 md:mt-20">
          <ul
            ref={listRef}
            className="border-b border-line"
            onPointerEnter={(e) => e.pointerType === "mouse" && setPointerInside(true)}
            onPointerLeave={() => {
              setPointerInside(false);
              setActive(null);
            }}
            onPointerMove={(e) => {
              const r = listRef.current!.getBoundingClientRect();
              // Keep the preview right of the expanded description so it never covers the copy.
              x.set(Math.max(e.clientX - r.left, PREVIEW_MIN_X));
              y.set(e.clientY - r.top);
            }}
          >
            {services.items.map((item, i) => {
              const isActive = active === i;
              const dimmed = active !== null && !isActive;
              return (
                <li key={item.name} className="border-t border-line">
                  <button
                    type="button"
                    aria-expanded={isActive}
                    aria-controls={`service-${i}`}
                    onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)}
                    onFocus={() => setActive(i)}
                    onClick={() => setActive(isActive ? null : i)}
                    className="group grid w-full grid-cols-[auto_1fr_auto] items-start gap-x-5 py-7 text-left md:grid-cols-[80px_1fr_auto] md:gap-x-8 md:py-9"
                  >
                    <span className="label-mono pt-2 text-muted md:pt-5">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span
                        className={cn(
                          "block text-headline font-medium transition-[color,translate] duration-500 ease-out-expo",
                          dimmed ? "text-ink/25" : "text-ink",
                          isActive && "md:translate-x-3",
                        )}
                      >
                        {item.name}
                      </span>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.span
                            id={`service-${i}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease: EASE }}
                            className="block overflow-hidden md:translate-x-3"
                          >
                            <span className="block max-w-[520px] pt-4 text-body text-muted">{item.description}</span>
                            <span className="flex flex-wrap gap-2 pt-4">
                              {item.tags.map((t) => (
                                <span key={t} className="label-mono rounded-pill bg-surface px-3 py-1.5 text-[11px] text-ink-soft">
                                  {t}
                                </span>
                              ))}
                            </span>
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span
                      className={cn(
                        "mt-1 grid size-11 place-items-center rounded-full border transition-all duration-500 ease-out-expo md:mt-2 md:size-14",
                        isActive ? "rotate-45 border-accent bg-accent text-white" : "border-line text-ink",
                      )}
                    >
                      <ArrowUpRight size={20} />
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Floating preview that trails the cursor (desktop only) */}
          <motion.div aria-hidden style={{ x, y }} className="pointer-events-none absolute top-0 left-0 z-10 hidden lg:block">
            <motion.div
              initial={false}
              animate={{ scale: pointerInside && active !== null ? 1 : 0.6, opacity: pointerInside && active !== null ? 1 : 0, rotate: -4 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative -mt-[110px] ml-16 h-[220px] w-[320px] overflow-hidden rounded-[22px] bg-surface shadow-float"
            >
              {services.items.map((item, i) => (
                <Image
                  key={item.image + i}
                  src={item.image}
                  alt=""
                  fill
                  sizes="320px"
                  className={cn(
                    "object-cover transition-[opacity,scale] duration-500 ease-out-expo",
                    active === i ? "scale-100 opacity-100" : "scale-110 opacity-0",
                  )}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        <Reveal className="mt-14 flex flex-col gap-5 md:flex-row md:items-center md:gap-8">
          <span className="relative flex items-center gap-3 text-body font-medium text-ink">
            {services.growthLabel}
            <HandArrow />
          </span>
          <div className="flex flex-wrap gap-2.5">
            {services.growth.map((g) => (
              <Pill key={g} tone="accent" className="px-4 py-2 text-sm">
                {g}
              </Pill>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function HandArrow() {
  return (
    <svg viewBox="0 0 90 44" className="h-9 w-[72px] text-accent max-md:rotate-[70deg]" fill="none" aria-hidden>
      <motion.path
        d="M3 30C14 10 34 4 48 14c9 6 6 19-4 16-9-3-2-18 13-20 10-1 20 3 28 10"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
      />
      <motion.path
        d="M77 12l9 8-11 4"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease: EASE, delay: 1.3 }}
      />
    </svg>
  );
}

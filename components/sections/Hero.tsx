"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useRef } from "react";
import { brand, hero } from "@/lib/content";
import { EASE, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { Showreel } from "@/components/ui/Showreel";

// Tile shapes per column, and how far each column travels (× stage height) before the pin.
const ASPECTS = [
  ["aspect-[4/5]", "aspect-square", "aspect-[4/5]", "aspect-square"],
  ["aspect-square", "aspect-[16/11]", "aspect-[4/5]", "aspect-square"],
  ["aspect-[16/11]", "aspect-[4/5]", "aspect-square", "aspect-[4/5]"],
];
const SHIFTS = [-0.24, -0.1, -0.36];
const COL_OFFSET = ["mt-28", "mt-0", "-mt-12"];

const lineReveal = (i: number) => ({
  initial: { y: "115%" },
  animate: { y: "0%" },
  transition: { duration: 1, ease: EASE, delay: 0.15 + i * 0.09 },
});

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tileRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      const stage = stageRef.current!;
      const frame = frameRef.current!;
      const tile = tileRef.current!;
      const reel = reelRef.current!;
      const cols = colRefs.current as HTMLDivElement[];

      // 1. Parallax: columns drift at different speeds as the stage scrolls up to the top.
      // The reel layer rides along with the centre column so it stays glued to its tile.
      const drifting: [HTMLElement, number][] = [...cols.map((col, i) => [col, SHIFTS[i]] as [HTMLElement, number]), [reel, SHIFTS[1]]];
      drifting.forEach(([el, shift]) =>
        gsap.fromTo(
          el,
          { y: 0 },
          {
            y: () => shift * frame.clientHeight,
            ease: "none",
            scrollTrigger: { trigger: stage, start: "top bottom", end: "top top", scrub: true, invalidateOnRefresh: true },
          },
        ),
      );

      // Layout box of the centre tile, ignoring the column's current parallax offset.
      const tileBox = () => {
        const f = frame.getBoundingClientRect();
        const t = tile.getBoundingClientRect();
        const offset = gsap.getProperty(cols[1], "y") as number;
        return { top: t.top - f.top - offset, left: t.left - f.left, width: t.width, height: t.height };
      };

      const caption = reel.querySelector("[data-reel-caption]");
      gsap.set(reel, { autoAlpha: 1 });

      // 2. Pin, then grow the centre tile into a full-width showreel.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        })
        .fromTo(
          reel,
          {
            top: () => tileBox().top,
            left: () => tileBox().left,
            width: () => tileBox().width,
            height: () => tileBox().height,
            borderRadius: 20,
          },
          {
            top: 0,
            left: 0,
            width: () => frame.clientWidth,
            height: () => frame.clientHeight,
            borderRadius: 40,
            ease: "power2.inOut",
            duration: 1,
          },
          0,
        )
        .fromTo(reel, { y: () => SHIFTS[1] * frame.clientHeight }, { y: 0, ease: "power2.inOut", duration: 1, immediateRender: false }, 0)
        .to(cols[0], { xPercent: -25, autoAlpha: 0, ease: "power1.in", duration: 0.7 }, 0)
        .to(cols[2], { xPercent: 25, autoAlpha: 0, ease: "power1.in", duration: 0.7 }, 0)
        .fromTo(caption, { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.25 }, 0.8)
        .to({}, { duration: 0.2 });
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="top" aria-label="Introduction" className="relative pt-32 md:pt-40">
      <div className="container-x flex flex-col items-center text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }}>
          <Pill pulse>{hero.badge}</Pill>
        </motion.div>

        <h1 className="mt-7 max-w-[15ch] text-display font-medium md:max-w-[17ch]">
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <motion.span className="block" {...lineReveal(0)}>
              {hero.titleDark}{" "}
              <span className="bg-gradient-to-r from-accent to-accent-2 bg-clip-text pr-[0.06em] text-transparent">{hero.titleAccent}</span>
            </motion.span>
          </span>
          <span className="-mb-[0.12em] block overflow-hidden pb-[0.12em]">
            <motion.span className="block text-mute-2" {...lineReveal(1)}>
              {hero.titleMuted}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.4 }}
          className="mt-6 max-w-[640px] text-lede text-muted"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.5 }}
          className="mt-9 flex flex-wrap justify-center gap-3"
        >
          <Button href={brand.ctaHref} magnetic>
            {brand.cta}
          </Button>
          <Button href={hero.secondaryCta.href} variant="secondary" icon={false}>
            {hero.secondaryCta.label}
          </Button>
        </motion.div>
      </div>

      {/* Desktop: parallax masonry → showreel */}
      <div ref={stageRef} className="relative mt-16 hidden h-svh min-h-[620px] md:block md:motion-reduce:hidden">
        <div ref={frameRef} className="absolute inset-4">
          <div className="mask-fade-y absolute inset-0 overflow-hidden">
            <div className="mx-auto grid h-full max-w-[1248px] grid-cols-3 gap-4 px-6">
              {hero.columns.map((col, c) => (
                <div
                  key={c}
                  ref={(el) => {
                    colRefs.current[c] = el;
                  }}
                  className={cn("flex flex-col gap-4 will-change-transform", COL_OFFSET[c])}
                >
                  {col.map((src, t) => {
                    const isCentre = c === 1 && t === 1;
                    return (
                      <div
                        key={t}
                        ref={isCentre ? tileRef : undefined}
                        className={cn("relative overflow-hidden rounded-[20px] bg-surface", ASPECTS[c][t])}
                      >
                        <Image src={src} alt="" fill sizes="(min-width: 1280px) 400px, 33vw" className="object-cover" priority={isCentre} />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          <div
            ref={reelRef}
            className="invisible absolute z-10 overflow-hidden rounded-[20px] bg-night shadow-float"
            style={{ top: 0, left: 0, width: 0, height: 0 }}
          >
            <Showreel src={hero.showreel.src} poster={hero.showreel.poster} />
          </div>
        </div>
      </div>

      {/* Mobile & reduced motion: a plain showreel card */}
      <div className="container-x mt-12 md:hidden md:motion-reduce:block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-card bg-night md:aspect-[16/8] md:rounded-slab">
          <Showreel src={hero.showreel.src} poster={hero.showreel.poster} priority />
        </div>
      </div>
    </section>
  );
}

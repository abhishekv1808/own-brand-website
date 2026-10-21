"use client";

import { motion } from "motion/react";
import { brand, why } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { iconMap } from "@/components/ui/Icons";
import { revealItem } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

export function WhyUs() {
  return (
    <section aria-labelledby="why-title" className="grain relative mt-6 rounded-t-slab bg-night text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-slab">
        <div className="absolute -top-40 -left-40 size-[520px] rounded-full bg-accent/25 blur-[140px]" />
      </div>

      <div className="container-x section-y relative grid gap-14 pb-[calc(clamp(88px,6rem+4vw,160px)+40px)] md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <div className="md:sticky md:top-32">
            <Eyebrow dark>{why.eyebrow}</Eyebrow>
            <TwoToneHeading id="why-title" lines={[why.titleMuted, `**${why.titleDark}**`]} dark className="mt-4" />
            <p className="mt-6 max-w-[400px] text-lede text-night-muted">{why.body}</p>
            <div className="mt-9">
              <Button href={brand.ctaHref} magnetic>
                {brand.cta}
              </Button>
            </div>
          </div>
        </div>

        <ol className="border-b border-night-line md:col-span-7">
          {why.rows.map((row, i) => {
            const Icon = iconMap[row.icon];
            return (
              <motion.li
                key={row.title}
                variants={revealItem}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-3 border-t border-night-line py-10 sm:grid-cols-[112px_1fr_1.25fr] sm:gap-0 md:py-14"
              >
                <div className="row-span-2 flex flex-col gap-5 sm:row-span-1 sm:pr-6">
                  <span className="font-mono text-[13px] text-accent-2">{String(i + 1).padStart(2, "0")}</span>
                  <span className="grid size-12 place-items-center rounded-2xl bg-white/[0.06] text-white ring-1 ring-white/10">
                    <Icon size={22} />
                  </span>
                </div>
                <h3 className="text-[22px] leading-tight font-medium tracking-[-0.03em] sm:border-l sm:border-night-line sm:px-6 md:text-2xl">
                  {row.title}
                </h3>
                <p className="text-base leading-relaxed text-night-muted sm:border-l sm:border-night-line sm:pl-6">{row.description}</p>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { brand, pricing, type Plan } from "@/lib/content";
import { EASE } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";
import { Check } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

type Currency = "inr" | "usd";

const formatters: Record<Currency, Intl.NumberFormat> = {
  inr: new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }),
  usd: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }),
};

function CurrencyToggle({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex rounded-pill bg-surface p-1 ring-1 ring-line">
      {(["inr", "usd"] as const).map((c) => (
        <button
          key={c}
          type="button"
          role="radio"
          aria-checked={value === c}
          onClick={() => onChange(c)}
          className={cn(
            "label-mono relative rounded-pill px-5 py-2.5 transition-colors duration-300",
            value === c ? "text-white" : "text-muted hover:text-ink",
          )}
        >
          {value === c && (
            <motion.span
              layoutId="currency-pill"
              className="absolute inset-0 rounded-pill bg-ink shadow-cta"
              transition={{ type: "spring", stiffness: 420, damping: 34 }}
            />
          )}
          <span className="relative">{c === "inr" ? "₹ INR" : "$ USD"}</span>
        </button>
      ))}
    </div>
  );
}

function PlanCard({ plan, currency }: { plan: Plan; currency: Currency }) {
  const dark = !!plan.featured;
  const amount = formatters[currency].format(plan[currency]);

  return (
    <motion.article
      variants={revealItem}
      className={cn(
        "relative flex flex-col overflow-hidden rounded-[32px] p-8 md:p-10",
        dark ? "gradient-border grain text-white shadow-glow" : "border border-line bg-white shadow-soft",
      )}
    >
      {dark && (
        <>
          <span aria-hidden className="pointer-events-none absolute -top-32 -right-24 size-80 rounded-full bg-accent/40 blur-[100px]" />
          <span className="label-mono absolute top-7 -right-12 w-48 rotate-45 bg-gradient-to-r from-accent to-accent-2 py-1.5 text-center text-[11px] tracking-[0.12em] text-white shadow-cta">
            Most popular
          </span>
        </>
      )}

      <h3 className="relative text-subheading font-medium">{plan.name}</h3>
      <p className={cn("relative mt-3 max-w-[340px] text-small", dark ? "text-night-muted" : "text-muted")}>{plan.blurb}</p>

      <div className="relative mt-8 flex items-end gap-2">
        <span className="relative block overflow-hidden">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={amount}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-100%", opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="block text-figure font-medium tabular-nums"
            >
              {amount}
            </motion.span>
          </AnimatePresence>
        </span>
        <span className={cn("pb-1 text-small", dark ? "text-night-muted" : "text-muted")}>{plan.period}</span>
      </div>

      <ul className={cn("relative mt-8 flex flex-col gap-3.5 border-t pt-8", dark ? "border-night-line" : "border-line")}>
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-small">
            <span
              className={cn(
                "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
                dark ? "bg-accent text-white" : "bg-accent-tint text-accent-deep",
              )}
            >
              <Check size={13} strokeWidth={2.4} />
            </span>
            <span className={dark ? "text-white/90" : "text-ink-soft"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-10">
        <Button href={brand.ctaHref} variant={dark ? "primary" : "dark"} className="w-full justify-between">
          {plan.cta}
        </Button>
      </div>
    </motion.article>
  );
}

export function Pricing() {
  const [currency, setCurrency] = useState<Currency>("inr");

  return (
    <section id="pricing" aria-labelledby="pricing-title" className="section-y relative overflow-hidden">
      {/* Rendered via CSS content so it's purely decorative (not read or contrast-checked as text). */}
      <span
        aria-hidden
        data-watermark={pricing.watermark}
        className="pointer-events-none absolute top-[clamp(40px,5vw,96px)] left-1/2 -translate-x-1/2 text-[clamp(6rem,20vw,19rem)] leading-none font-semibold tracking-[-0.06em] whitespace-nowrap text-ink/[0.035] select-none before:content-[attr(data-watermark)]"
      />

      <div className="container-x relative">
        <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
          <Eyebrow>{pricing.eyebrow}</Eyebrow>
          <TwoToneHeading id="pricing-title" lines={[pricing.titleMuted, `**${pricing.titleDark}**`]} className="mt-5" />
          <div className="mt-9">
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </div>
        </div>

        <RevealGroup className="mx-auto mt-14 grid max-w-[980px] gap-5 md:mt-16 md:grid-cols-2">
          {pricing.plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} currency={currency} />
          ))}
        </RevealGroup>
        <p className="mt-8 text-center text-small text-muted">{pricing.note}</p>
      </div>
    </section>
  );
}

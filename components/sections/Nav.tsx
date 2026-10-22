"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { brand, nav } from "@/lib/content";
import { EASE } from "@/lib/gsap";
import { useLenis } from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Close, Menu, WhatsApp } from "@/components/ui/Icons";
import { LogoMark } from "@/components/ui/Logo";

export function Nav() {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lenis = useLenis();

  // Active link follows whichever section crosses the middle of the viewport.
  useEffect(() => {
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => (e.isIntersecting ? visible.add(e.target.id) : visible.delete(e.target.id)));
        setActive(nav.find((n) => visible.has(n.id))?.id ?? null);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  // Lock scroll while the mobile sheet is open.
  useEffect(() => {
    if (open) lenis?.stop();
    else lenis?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, lenis]);

  // Lenis is stopped while the sheet is open, so scroll manually after closing it.
  const goTo = (e: React.MouseEvent, hash: string) => {
    e.preventDefault();
    e.stopPropagation();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { force: true });
      else target.scrollIntoView();
    });
  };

  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4">
      <nav aria-label="Primary" className="mx-auto flex max-w-max items-center gap-2">
        <a
          href="#top"
          aria-label={`${brand.name} home`}
          className="grid size-[52px] place-items-center rounded-full bg-night text-white shadow-float ring-1 ring-white/10 transition-transform duration-300 hover:scale-105"
        >
          <LogoMark className="size-6" />
        </a>

        <ul className="hidden items-center gap-0.5 rounded-pill bg-night/80 p-1.5 shadow-float ring-1 ring-white/10 backdrop-blur-xl md:flex">
          {nav.map((item) => {
            const isActive = active === item.id;
            return (
              <li key={item.id} className="relative">
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-pill bg-white"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <a
                  href={`#${item.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-pill px-4 py-2.5 text-sm font-medium tracking-[-0.005em] transition-colors duration-300",
                    isActive ? "text-ink" : "text-white/75 hover:text-white",
                  )}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href={brand.ctaHref}
          aria-label={brand.cta}
          className="group hidden size-[52px] place-items-center rounded-full bg-accent text-white shadow-cta transition-transform duration-300 hover:scale-105 md:grid"
        >
          <ArrowUpRight size={20} className="transition-transform duration-500 ease-out-expo group-hover:rotate-45" />
        </a>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen(true)}
          className="grid size-[52px] place-items-center rounded-full bg-night text-white shadow-float ring-1 ring-white/10 md:hidden"
        >
          <Menu size={22} />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ clipPath: "inset(0 0 100% 0 round 0 0 40px 40px)" }}
            animate={{ clipPath: "inset(0 0 0% 0 round 0 0 0px 0px)" }}
            exit={{ clipPath: "inset(0 0 100% 0 round 0 0 40px 40px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="grain fixed inset-0 z-[60] flex flex-col bg-night px-6 pt-4 pb-8 text-white"
          >
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2.5 font-medium">
                <LogoMark className="size-6" /> {brand.name}
              </span>
              <button
                type="button"
                aria-label="Close menu"
                autoFocus
                onClick={() => setOpen(false)}
                className="grid size-[52px] place-items-center rounded-full bg-white/10"
              >
                <Close size={22} />
              </button>
            </div>
            <ul className="mt-14 flex flex-col">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: EASE }}
                  className="border-b border-night-line"
                >
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => goTo(e, `#${item.id}`)}
                    className="flex items-baseline justify-between py-4 text-title font-medium"
                  >
                    {item.label}
                    <span className="label-mono text-night-muted">0{i + 1}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3">
              <a
                href={brand.ctaHref}
                onClick={(e) => goTo(e, brand.ctaHref)}
                className="flex h-14 items-center justify-center gap-2 rounded-pill bg-accent font-medium shadow-cta"
              >
                {brand.cta} <ArrowUpRight size={18} />
              </a>
              <a
                href={brand.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-14 items-center justify-center gap-2 rounded-pill border border-white/20 font-medium"
              >
                <WhatsApp /> WhatsApp us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

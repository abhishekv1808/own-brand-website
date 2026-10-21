"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";
import { EASE } from "@/lib/gsap";
import { cn } from "@/lib/cn";
import { Plus } from "./Icons";

type Item = { q: string; a: string };

export function Accordion({ items, defaultOpen = 0 }: { items: readonly Item[]; defaultOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const id = useId();

  return (
    <ul className="flex flex-col gap-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <li
            key={item.q}
            className={cn(
              "rounded-[24px] transition-[background-color,box-shadow] duration-300",
              isOpen ? "bg-white shadow-soft" : "bg-white/60",
            )}
          >
            <h3>
              <button
                type="button"
                id={`${id}-q${i}`}
                aria-expanded={isOpen}
                aria-controls={`${id}-a${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 rounded-[24px] px-6 py-5 text-left text-[17px] font-medium tracking-[-0.01em] md:px-7 md:py-6 md:text-lg"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-9 shrink-0 place-items-center rounded-full transition-[rotate,background-color,color] duration-500 ease-out-expo",
                    isOpen ? "rotate-45 bg-accent text-white" : "bg-surface text-ink",
                  )}
                >
                  <Plus size={18} />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-a${i}`}
                  role="region"
                  aria-labelledby={`${id}-q${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className="max-w-[60ch] px-6 pb-6 text-base leading-relaxed text-muted md:px-7 md:pb-7">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ul>
  );
}

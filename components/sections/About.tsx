"use client";

import { useRef } from "react";
import { about } from "@/lib/content";
import { gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

const glyphs: Record<string, React.ReactNode> = {
  circle: <circle cx="12" cy="12" r="8" />,
  square: <rect x="4" y="4" width="16" height="16" rx="4" />,
  leaf: <path d="M5 19C5 10 10 5 19 5c0 9-5 14-14 14Z" />,
  drop: <path d="M12 3c4 5 6 8.5 6 11a6 6 0 0 1-12 0c0-2.5 2-6 6-11Z" />,
  ring: <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="3.5" />,
  spark: <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4Z" />,
  wave: <path d="M2 14c3-6 6-6 9 0s6 6 9 0v6H2Z" />,
  triangle: <path d="M12 4 21 20H3Z" />,
};

export function About() {
  const textRef = useRef<HTMLParagraphElement>(null);

  // Each word darkens from ghost-grey to ink as the paragraph scrolls through the viewport.
  useIsoLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const words = textRef.current!.querySelectorAll("[data-word]");
      gsap.fromTo(
        words,
        // 0.5 keeps unrevealed words at ~3:1 contrast (AA for large text).
        { opacity: 0.5 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: textRef.current, start: "top 78%", end: "bottom 42%", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section aria-labelledby="about-title" className="section-y">
      <div className="container-x">
        <Eyebrow>{about.eyebrow}</Eyebrow>
        <h2 id="about-title" className="sr-only">
          About us
        </h2>
        <p
          ref={textRef}
          className="mt-6 max-w-[1080px] text-[clamp(1.625rem,1.1rem+2vw,3rem)] leading-[1.22] font-medium tracking-[-0.035em] text-ink"
        >
          {about.paragraph.split(" ").map((word, i) => (
            <span key={i}>
              <span data-word>{word}</span>{" "}
            </span>
          ))}
        </p>
      </div>

      <Reveal className="mt-20 md:mt-28">
        <p className="container-x text-center font-mono text-xs tracking-[0.08em] text-muted uppercase">{about.logosLabel}</p>
        <Marquee className="mask-fade-x mt-8" duration={36} gap={72}>
          {about.logos.map((logo) => (
            <span
              key={logo.name}
              className="flex items-center gap-2.5 text-[26px] font-semibold tracking-[-0.04em] text-[#9a9a9a] grayscale"
            >
              <svg viewBox="0 0 24 24" className="size-7" fill="currentColor" aria-hidden>
                {glyphs[logo.glyph]}
              </svg>
              {logo.name}
            </span>
          ))}
        </Marquee>
      </Reveal>
    </section>
  );
}

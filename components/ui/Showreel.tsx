"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

type Props = { src: string | null; poster: string; className?: string; priority?: boolean };

/** Muted looping reel that only plays while on screen. Falls back to the poster when no src is set. */
export function Showreel({ src, poster, className, priority }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()), {
      threshold: 0.25,
    });
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const caption = (
    <div
      data-reel-caption
      className="label-mono pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 text-[11px] text-white/80 md:p-7 md:text-label"
    >
      <span>ITBIZone · Showreel 2026</span>
      <span>01:24</span>
    </div>
  );

  if (!src) {
    return (
      <>
        <Image src={poster} alt="ITBIZone showreel" fill priority={priority} sizes="100vw" className={cn("object-cover", className)} />
        {caption}
      </>
    );
  }

  return (
    <>
      <video
        ref={ref}
        className={cn("absolute inset-0 size-full object-cover", className)}
        src={src}
        poster={poster}
        preload="metadata"
        muted
        loop
        playsInline
        aria-label="ITBIZone showreel"
      />
      {caption}
    </>
  );
}

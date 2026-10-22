"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useState } from "react";
import { work, type Project } from "@/lib/content";
import { cn } from "@/lib/cn";
import { ArrowRight, ArrowUpRight } from "@/components/ui/Icons";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { RevealGroup, revealItem } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

const SPAN: Record<number, string> = { 4: "md:col-span-4", 6: "md:col-span-6", 8: "md:col-span-8" };

function ProjectCard({ project }: { project: Project }) {
  const [hover, setHover] = useState(false);
  const spring = { stiffness: 350, damping: 30, mass: 0.5 };
  const x = useSpring(useMotionValue(0), spring);
  const y = useSpring(useMotionValue(0), spring);

  return (
    <motion.article variants={revealItem} className={cn("col-span-1", SPAN[project.span])}>
      <a
        href={work.more.href}
        aria-label={`${project.title}: ${project.description}`}
        className="group relative block rounded-card bg-white p-2.5 shadow-soft transition-shadow duration-500 hover:shadow-float md:cursor-none"
        onPointerEnter={(e) => {
          if (e.pointerType !== "mouse") return;
          // Snap to the cursor first: entering by scrolling fires no pointermove.
          const r = e.currentTarget.getBoundingClientRect();
          x.jump(e.clientX - r.left);
          y.jump(e.clientY - r.top);
          setHover(true);
        }}
        onPointerLeave={() => setHover(false)}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set(e.clientX - r.left);
          y.set(e.clientY - r.top);
        }}
      >
        <div className="relative h-[260px] overflow-hidden rounded-inner bg-surface sm:h-[340px] lg:h-[420px]">
          <Image
            src={project.image}
            alt=""
            fill
            sizes={project.span === 8 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 50vw, 100vw"}
            className="object-cover transition-transform duration-[900ms] ease-out-expo group-hover:scale-[1.04]"
          />
        </div>
        <div className="flex flex-col-reverse gap-2 px-3 pt-5 pb-3 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h3 className="text-lg leading-tight font-medium tracking-[0.03em] uppercase">{project.title}</h3>
            <p className="mt-1.5 text-small text-muted sm:truncate">{project.description}</p>
          </div>
          <span className="label-mono shrink-0 text-muted sm:pt-1">{project.category}</span>
        </div>

        <motion.span
          aria-hidden
          style={{ x, y }}
          initial={false}
          animate={{ scale: hover ? 1 : 0, opacity: hover ? 1 : 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute top-0 left-0 z-10 hidden md:block"
        >
          <span className="flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 rounded-pill bg-ink px-4 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-float">
            View case <ArrowRight size={16} />
          </span>
        </motion.span>
      </a>
    </motion.article>
  );
}

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="slab mx-2 bg-surface md:mx-4">
      <div className="container-x section-y">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Eyebrow>{work.eyebrow}</Eyebrow>
            <TwoToneHeading id="work-title" lines={[`${work.titleMuted} **${work.titleDark}**`]} className="mt-5" />
          </div>
          <p className="max-w-[380px] text-lede text-muted">{work.intro}</p>
        </div>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:gap-5">
          {work.projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
          <motion.div variants={revealItem} className="col-span-1 md:col-span-6">
            <a
              href={work.more.href}
              className="grain group relative flex h-full min-h-[280px] flex-col justify-between overflow-hidden rounded-card bg-night p-8 text-white md:p-10"
            >
              <span
                aria-hidden
                className="absolute -right-24 -bottom-24 size-80 rounded-full bg-accent opacity-40 blur-[90px] transition-opacity duration-700 group-hover:opacity-70"
              />
              <span className="label-mono text-night-muted">{work.more.note}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="text-title leading-none font-medium">{work.more.label}</span>
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform duration-500 ease-out-expo group-hover:rotate-45">
                  <ArrowUpRight size={24} />
                </span>
              </span>
            </a>
          </motion.div>
        </RevealGroup>
      </div>
    </section>
  );
}

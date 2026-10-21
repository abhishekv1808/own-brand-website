import { testimonials } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkedIn } from "@/components/ui/Icons";
import { Marquee } from "@/components/ui/Marquee";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

type Item = (typeof testimonials.items)[number];

const AVATAR_TONES = ["from-accent to-accent-2", "from-[#1f1f2e] to-[#4b4b6a]", "from-accent-2 to-[#c9c2ff]"];

function Card({ item, index }: { item: Item; index: number }) {
  const initials = item.name
    .replace("Dr. ", "")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2);

  return (
    <figure className="rounded-card bg-white p-7 shadow-soft">
      <blockquote className="text-[17px] leading-relaxed text-ink">&ldquo;{item.quote}&rdquo;</blockquote>
      <figcaption className="mt-7 flex items-center gap-3.5">
        <span
          aria-hidden
          className={cn(
            "grid size-11 shrink-0 place-items-center rounded-full bg-gradient-to-br text-sm font-medium text-white",
            AVATAR_TONES[index % 3],
          )}
        >
          {initials}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-[15px] font-medium">{item.name}</span>
          <span className="block truncate text-sm text-muted">{item.role}</span>
        </span>
        <a href={item.linkedin} aria-label={`${item.name} on LinkedIn`} className="text-[#0A66C2] transition-opacity hover:opacity-70">
          <LinkedIn size={18} />
        </a>
      </figcaption>
    </figure>
  );
}

const DIRECTIONS = ["up", "down", "up"] as const;
const DURATIONS = [46, 54, 50];

/** Splits cards round-robin into `count` vertical marquees running in alternating directions. */
function Columns({ count, className }: { count: number; className: string }) {
  return (
    <div className={cn("mask-fade-y h-[680px] gap-5 overflow-hidden", className)}>
      {Array.from({ length: count }, (_, c) => (
        <Marquee key={c} direction={DIRECTIONS[c]} duration={DURATIONS[c] + (count === 1 ? 30 : 0)} gap={20} className="h-full">
          {testimonials.items
            .map((item, i) => ({ item, i }))
            .filter(({ i }) => i % count === c)
            .map(({ item, i }) => (
              <Card key={item.name} item={item} index={i} />
            ))}
        </Marquee>
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="slab mx-2 bg-surface md:mx-4">
      <div className="container-x section-y">
        <div className="mx-auto max-w-[720px] text-center">
          <Eyebrow>{testimonials.eyebrow}</Eyebrow>
          <TwoToneHeading id="reviews-title" lines={[testimonials.titleMuted, `**${testimonials.titleDark}**`]} className="mt-4" />
        </div>

        <div className="mt-14 md:mt-20">
          <Columns count={1} className="grid md:hidden" />
          <Columns count={2} className="hidden grid-cols-2 md:grid lg:hidden" />
          <Columns count={3} className="hidden grid-cols-3 lg:grid" />
        </div>
      </div>
    </section>
  );
}

import { brand, footer, nav } from "@/lib/content";
import { Button } from "@/components/ui/Button";
import { WhatsApp, Mail } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

export function Footer() {
  return (
    <footer id="contact" className="grain relative mt-6 overflow-hidden rounded-t-slab bg-night text-white">
      {/* Indigo → violet glow behind the closing CTA */}
      <div aria-hidden className="pointer-events-none absolute top-[8%] left-1/2 h-[560px] w-[min(1100px,140vw)] -translate-x-1/2">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(closest-side,rgb(79_70_255/0.55),rgb(155_140_255/0.22)_55%,transparent)] blur-3xl" />
      </div>

      <div className="container-x relative pt-[clamp(110px,8rem+4vw,200px)]">
        <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
          <TwoToneHeading as="h2" dark lines={[footer.lineMuted, `**${footer.lineDark}**`]} className="text-display" />
          <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${brand.email}?subject=New%20project%20enquiry`} variant="outline-light" magnetic>
              {footer.cta}
            </Button>
          </Reveal>
          <Reveal delay={0.1} className="mt-8 flex flex-col items-center gap-3 text-small text-night-muted sm:flex-row sm:gap-8">
            <a href={`mailto:${brand.email}`} className="flex items-center gap-2 transition-colors hover:text-white">
              <Mail size={18} /> {brand.email}
            </a>
            <a
              href={brand.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <WhatsApp size={17} /> {brand.whatsapp}
            </a>
          </Reveal>
        </div>

        <div className="mt-[clamp(80px,6rem+3vw,160px)] flex flex-col gap-8 border-t border-night-line pt-8 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Footer">
            <ul className="label-mono flex flex-wrap gap-x-6 gap-y-2">
              {nav.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="text-night-muted transition-colors hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul aria-label="Social links" className="label-mono flex flex-wrap gap-x-6 gap-y-2">
            {footer.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="text-white transition-colors hover:text-accent-2">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="mt-6 flex flex-col gap-1 text-small text-night-muted sm:flex-row sm:justify-between">
          <span>
            © {new Date().getFullYear()} {brand.name}. Made zone by zone in {brand.city}.
          </span>
          <span>{brand.founder}, Founder</span>
        </p>
      </div>

      {/* Huge cropped wordmark */}
      <div aria-hidden className="relative mt-10 h-[clamp(44px,13vw,220px)] overflow-hidden select-none">
        <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-b from-white/[0.16] to-white/0 bg-clip-text text-[clamp(64px,21vw,360px)] leading-[0.8] font-semibold tracking-[-0.07em] whitespace-nowrap text-transparent">
          {brand.wordmark}
        </span>
      </div>
    </footer>
  );
}

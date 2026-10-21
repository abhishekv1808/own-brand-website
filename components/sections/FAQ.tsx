import { brand, faq } from "@/lib/content";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { WhatsApp } from "@/components/ui/Icons";
import { Reveal } from "@/components/ui/Reveal";
import { TwoToneHeading } from "@/components/ui/TwoToneHeading";

export function FAQ() {
  return (
    <section id="faq" aria-labelledby="faq-title" className="slab mx-2 bg-surface md:mx-4">
      <div className="container-x section-y">
        <Eyebrow>{faq.eyebrow}</Eyebrow>
        <TwoToneHeading id="faq-title" lines={[`${faq.titleMuted} **${faq.titleDark}**`]} className="mt-4" />

        <div className="mt-14 grid gap-8 md:mt-20 lg:grid-cols-12 lg:gap-10">
          <Reveal className="lg:col-span-7">
            <Accordion items={faq.items} />
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-5">
            <aside aria-label="Book an intro call" className="rounded-[32px] bg-white p-8 shadow-soft md:p-10 lg:sticky lg:top-28">
              <div className="flex items-center gap-4">
                <span className="relative grid size-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-2 text-lg font-medium text-white">
                  {brand.founderInitials}
                  <span className="absolute right-0.5 bottom-0.5 size-3.5 rounded-full border-2 border-white bg-emerald-500" aria-hidden />
                </span>
                <div>
                  <p className="text-[17px] font-medium">{brand.founder}</p>
                  <p className="text-sm text-muted">{brand.founderRole}</p>
                </div>
              </div>

              <h3 className="mt-8 text-[28px] leading-tight font-medium tracking-[-0.04em]">{faq.card.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted">{faq.card.body}</p>

              <div className="mt-8">
                <Button href={brand.ctaHref} magnetic>
                  {faq.card.cta}
                </Button>
              </div>

              <a
                href={brand.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex items-center justify-between gap-4 rounded-[20px] bg-surface px-5 py-4 transition-colors hover:bg-accent-tint"
              >
                <span className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-full bg-[#25D366] text-white">
                    <WhatsApp size={18} />
                  </span>
                  <span>
                    <span className="block text-sm text-muted">{faq.card.whatsappLabel}</span>
                    <span className="block font-medium">{brand.whatsapp}</span>
                  </span>
                </span>
                <span className="font-mono text-xs tracking-[0.06em] text-accent uppercase transition-transform duration-300 group-hover:translate-x-1">
                  Chat →
                </span>
              </a>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

# Claude Code Prompt — Premium Studio/Agency Website (inspired by brixstudio.in, not a copy)

> Paste everything below into Claude Code at the root of an empty folder.
> Swap the values in **BRAND VARIABLES** first. Everything else is written so the result shares the *pattern and feel* of the reference but has its own identity.

---

## ROLE
You are a senior creative developer building an Awwwards-quality, conversion-focused agency website. Build it in **Next.js 15 (App Router) + TypeScript + Tailwind CSS v4 + Motion (Framer Motion) + GSAP ScrollTrigger + Lenis**. Deploy target: Vercel. Prioritise craft: spacing, type rhythm, micro-interactions, 60fps motion.

## BRAND VARIABLES (edit these)
- `BRAND_NAME`: ITBIZone
- `TAGLINE_METAPHOR`: "zone by zone" → the reference uses "brick by brick"; we use our own metaphor. Hero line: **"Building brands and products that *perform*."** with a second line in muted grey: **"zone by zone."**
- `FOUNDER`: Abhishek Venkatesh
- `CITY`: Bangalore, India
- `EMAIL`: abhishek@itbizone.com · `WHATSAPP`: +91 6360354678
- `ACCENT`: Electric indigo `#4F46FF` (reference uses orange `#FF5819` — **do not use orange**)
- `ACCENT_2` (glows/highlights): `#9B8CFF`
- `CTA_LABEL`: "Start a Project" (reference uses "Book a Free Call")

---

## 1. DESIGN DNA TO REPLICATE (the pattern)
These are the techniques that make the reference feel premium. Reproduce the *technique*, not the exact visuals.

1. **Light, airy canvas** — white `#FFFFFF` page, soft grey surfaces `#F5F5F5 / #F7F7F7`, near-black ink `#242424`, muted text `#8A8A8A`, faint text `#A9A9A9`.
2. **Two-tone headlines** — every section title splits into a muted-grey part and a dark part (e.g. "Selected **Work**", "Simple steps, / **extraordinary result.**"). Vary which half is dark per section.
3. **Mono eyebrow labels** — tiny uppercase monospace label in the accent colour above each heading (e.g. `HIGH QUALITY PROJECTS`, `HOW WE WORK`). Letter-spacing ~0.08em, 12–13px.
4. **Tight, large display type** — hero ~72px desktop, weight 500, letter-spacing **-0.05em**, line-height ~1.15. Body 18–20px, regular, muted grey.
5. **Sections as rounded "slabs"** — sections sit on rounded containers (radius 32–40px) that alternate light grey / white / near-black, so the page reads as stacked cards. The dark "Why us" section and the footer are full-bleed dark slabs with rounded top corners.
6. **Floating pill nav** — fixed, centred at top: circular logo button (left), dark glassy pill with nav links where the **active link sits in a white pill that slides** between items (Motion `layoutId`), circular icon button (right) for "book a call". Active state updates on scroll via IntersectionObserver.
7. **Pill CTAs with tactile shadow** — primary: accent fill, radius 40px, arrow icon, shadow `2px 2px 10px rgba(36,36,36,.1)` + inner highlight `inset 4px 4px 6px rgba(255,255,255,.25)`. Secondary: white with 1px border. On hover the arrow slides right and the label does a vertical text-roll (duplicate text that slides up).
8. **Scroll-driven word reveal** — the long "about" paragraph starts light grey and each word darkens to ink as you scroll (GSAP ScrollTrigger scrub, split by word).
9. **Infinite marquees** — client-logo strip (greyscale, fades at edges with mask-image gradient) and testimonial columns that auto-scroll vertically in opposite directions; pause on hover.
10. **Animated counters** — stats count up from 0 when they enter the viewport.
11. **Giant background wordmark** — huge, very faint section word behind a heading (reference: "PRICING") and a massive brand wordmark cropped at the bottom of the footer.
12. **Warm radial glow footer** — dark footer with a big blurred radial gradient glow behind the closing CTA (reference is red/orange — **ours is indigo → violet**).
13. **Generous whitespace** — section padding 120–160px desktop, max content width ~1200px, consistent 16–24px card gaps.

## 2. WHAT MUST BE DIFFERENT (so it's not a copy)
- **Colour**: indigo/violet accent system instead of orange/red. Add a subtle noise/grain texture overlay on dark slabs.
- **Typography**: reference uses Pangea Afrikan + Suisse Int'l + DM Mono. Use **"Geist" (display + body) or "Satoshi"** for headings/body and **"JetBrains Mono"** for eyebrows/numbers. Load via `next/font`.
- **Hero visual**: reference uses a static masonry collage of project screenshots that becomes a big orange showreel card. Ours: a **3-column masonry of project shots where columns scroll at different parallax speeds**, then on scroll the centre tile **scales up into a full-width rounded showreel video** (GSAP pin + scale).
- **Work grid**: reference uses a staggered 2-column grid with alternating wide/narrow cards. Ours: **bento grid (12-col) with mixed spans (8/4, 4/8, 6/6)**, and on hover a cursor-following "View case →" pill appears and the image zooms 1.04.
- **Services**: reference uses a 2×3 icon-card grid + "coming soon" doodle card. Ours: **interactive list** — large service names as rows; hovering a row reveals a floating preview image that follows the cursor + short description expands. Add a "Growth services" chip row (SEO, Google Ads, Social, Video) with a hand-drawn SVG arrow.
- **Why-us section**: keep the dark slab with numbered rows (01–04, icon, title, description in 3 columns separated by hairlines), but add a sticky left title while the rows scroll on the right.
- **Process**: 3 steps → make it a **horizontal step timeline with a progress line that fills on scroll** (Discover → Design → Develop → Deliver, 4 steps).
- **Pricing**: show in **INR with a USD toggle** (segmented switch with sliding pill). Dark featured card + light card, as the pattern, but add a "Most popular" ribbon and a subtle animated gradient border on the featured card.
- **Copy**: write all-original copy in a confident, plain-English voice. Do **not** reuse any reference text, client names, testimonials or numbers.

## 3. PAGE STRUCTURE (single long landing page, anchor-linked)
1. **Nav** (floating pill, as above). Links: Work · Services · Process · Reviews · Pricing · FAQ.
2. **Hero** — small badge pill with pulsing dot ("2 slots open this month"), two-tone H1, muted subline (1–2 lines, max-width 640px), primary + secondary CTA, then the parallax masonry → showreel transition.
3. **About + logos** — scroll-reveal paragraph, then greyscale logo marquee.
4. **Selected Work** — eyebrow + two-tone title, bento grid of 8–10 projects (title uppercase 18px, one-line description, image/mockup in a grey rounded inner frame), final "More work →" card.
5. **Services** — interactive list + growth chips.
6. **Why us** — dark slab, sticky title, 4 numbered rows.
7. **Process** — 4-step timeline + 3 animated stat counters (years, projects, repeat-client %).
8. **Testimonials** — two-tone title, 3 vertical marquee columns of cards (avatar, quote, name, role, LinkedIn icon). Mask top/bottom with fade gradients.
9. **Pricing** — giant faint "PRICING" word behind, two-tone title, currency toggle, 2 plan cards with check-list features + CTA.
10. **FAQ** — two-tone title; left: accordion (grey rounded rows, `+` rotates to `×`, height animates with Motion); right: sticky card "Book an intro call" with founder avatar, CTA, and WhatsApp row.
11. **Footer** — dark slab with radial indigo glow, big centred closing line, outline pill "Contact us", huge cropped brand wordmark, socials row (uppercase, small) + copyright.

## 4. MOTION SPEC
- Lenis smooth scroll (lerp 0.1) wired into GSAP ticker.
- Section entrances: fade + 24px rise, stagger 0.06s, ease `[0.22, 1, 0.36, 1]`, once.
- Headings: split by line, mask-reveal upward.
- Buttons: text-roll hover, magnetic pull (max 8px) on primary CTAs.
- Respect `prefers-reduced-motion` (disable parallax, marquees become static, counters show final value).

## 5. TECH & QUALITY REQUIREMENTS
- Folder structure: `app/`, `components/sections/*`, `components/ui/*` (Button, Pill, Eyebrow, TwoToneHeading, Marquee, Counter, Accordion), `lib/content.ts` holding ALL copy/data so it's editable in one place.
- Design tokens as CSS variables in `globals.css` via Tailwind v4 `@theme` (colors, radii `--radius-card: 28px; --radius-slab: 40px; --radius-pill: 999px`, shadows, fonts).
- Images via `next/image`, placeholders from `/public/work/*` (generate tasteful gradient placeholders if none exist).
- Fully responsive: mobile nav collapses to logo + menu button opening a full-screen sheet; hero H1 ~40px on mobile; bento becomes single column; marquees stay horizontal.
- Accessibility: semantic landmarks, focus-visible rings in accent, accordion with proper `aria-expanded`, contrast AA on all text.
- Performance: Lighthouse 90+; lazy-load below-fold media; showreel video `preload="metadata"` with poster.
- SEO: metadata, OG image, `Organization` + `LocalBusiness` JSON-LD for Bangalore.

## 6. BUILD ORDER
1. Scaffold project, fonts, tokens, Lenis provider.
2. UI primitives (Button, Eyebrow, TwoToneHeading, Marquee, Counter).
3. Nav → Hero → Work → Services → Why → Process → Testimonials → Pricing → FAQ → Footer.
4. Motion pass, then responsive pass, then a11y/perf pass.
5. After each section, run the dev server and self-review against sections 1–2 of this prompt before moving on.

Start by showing me the token file and component list, then build section by section.

/**
 * ALL site copy and data lives here.
 *
 * Anything marked PLACEHOLDER is illustrative and MUST be replaced with real
 * information before launch (testimonials, client logos, stats, projects).
 */

export const brand = {
  name: "ITBIZone",
  wordmark: "ITBIZONE",
  founder: "Abhishek Venkatesh",
  founderInitials: "AV",
  founderRole: "Founder & Creative Director",
  city: "Bangalore",
  region: "Karnataka",
  country: "IN",
  email: "abhishek@itbizone.com",
  whatsapp: "+91 6360354678",
  whatsappHref: "https://wa.me/916360354678",
  url: "https://itbizone.com",
  cta: "Start a Project",
  ctaHref: "#contact",
  description: "ITBIZone is a Bangalore design and development studio building brands, websites and digital products that perform.",
} as const;

export const nav = [
  { id: "work", label: "Work" },
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "reviews", label: "Reviews" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
] as const;

/* ───────── Hero ───────── */
export const hero = {
  badge: "2 slots open this month",
  titleDark: "Building brands and products that",
  titleAccent: "perform.",
  titleMuted: "zone by zone.",
  sub: "We’re a small senior team in Bangalore designing and engineering websites, apps and identities for founders who care how the details feel, and what they convert.",
  secondaryCta: { label: "See our work", href: "#work" },
  showreel: {
    // Drop a reel in /public (e.g. "/showreel.mp4") and set src; until then the poster shows.
    src: null as string | null,
    poster: "/work/showreel.webp",
  },
  // Three parallax columns; the middle item of column 2 becomes the showreel.
  columns: [
    ["/work/kora.webp", "/work/thali.webp", "/work/brightpath.webp", "/work/neel.webp"],
    ["/work/fieldnote.webp", "/work/showreel.webp", "/work/mitti.webp", "/work/orbit.webp"],
    ["/work/aranya.webp", "/work/pulse.webp", "/work/kora.webp", "/work/thali.webp"],
  ],
};

/* ───────── About + logos ───────── */
export const about = {
  eyebrow: "Who we are",
  paragraph:
    "ITBIZone is a design-led studio that treats every brand like a city: planned zone by zone, built to last, and designed for the people who move through it. We pair strategy, interface design and engineering under one roof, so the idea you sign off is the product that ships. No bloated teams, no endless decks. Just sharp work, honest timelines and websites that earn their keep.",
  logosLabel: "Trusted by teams who ship",
  // PLACEHOLDER — replace with real client names / SVG logos.
  logos: [
    { name: "Kora", glyph: "circle" },
    { name: "Fieldnote", glyph: "square" },
    { name: "Aranya", glyph: "leaf" },
    { name: "Mitti", glyph: "drop" },
    { name: "Orbit", glyph: "ring" },
    { name: "Brightpath", glyph: "spark" },
    { name: "Pulse", glyph: "wave" },
    { name: "Neel", glyph: "triangle" },
  ],
} as const;

/* ───────── Work ───────── */
export type Project = {
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  span: 4 | 6 | 8;
  year: string;
};

// PLACEHOLDER — sample projects; swap in real case studies + screenshots in /public/work.
export const work = {
  eyebrow: "High-craft projects",
  titleMuted: "Selected",
  titleDark: "Work",
  intro: "A few recent launches across fintech, hospitality, retail and SaaS.",
  projects: [
    {
      slug: "kora",
      title: "Kora Pay",
      category: "Fintech · App",
      description: "A rent-splitting app that makes paying flatmates feel like one tap.",
      image: "/work/kora.webp",
      span: 8,
      year: "2026",
    },
    {
      slug: "thali",
      title: "Thali & Co",
      category: "Brand · Web",
      description: "A warm identity and ordering site for a modern Kannadiga kitchen.",
      image: "/work/thali.webp",
      span: 4,
      year: "2026",
    },
    {
      slug: "fieldnote",
      title: "Fieldnote",
      category: "SaaS · Product",
      description: "Survey tooling for field teams, redesigned around offline-first flows.",
      image: "/work/fieldnote.webp",
      span: 4,
      year: "2025",
    },
    {
      slug: "aranya",
      title: "Aranya Retreats",
      category: "Hospitality · Web",
      description: "A booking site for forest stays that lifted direct bookings over OTAs.",
      image: "/work/aranya.webp",
      span: 8,
      year: "2025",
    },
    {
      slug: "mitti",
      title: "Mitti Studio",
      category: "E-commerce",
      description: "A headless store for hand-thrown ceramics with a tactile product page.",
      image: "/work/mitti.webp",
      span: 6,
      year: "2025",
    },
    {
      slug: "pulse",
      title: "Pulse Clinics",
      category: "Health · App",
      description: "Appointment booking and reports in one calm, accessible app.",
      image: "/work/pulse.webp",
      span: 6,
      year: "2025",
    },
    {
      slug: "orbit",
      title: "Orbit Freight",
      category: "Logistics · Dashboard",
      description: "Live shipment tracking that turned ten spreadsheets into one screen.",
      image: "/work/orbit.webp",
      span: 8,
      year: "2024",
    },
    {
      slug: "neel",
      title: "Studio Neel",
      category: "Architecture · Portfolio",
      description: "A quiet, image-first portfolio for an award-winning practice.",
      image: "/work/neel.webp",
      span: 4,
      year: "2024",
    },
    {
      slug: "brightpath",
      title: "Brightpath",
      category: "Edtech · Web App",
      description: "A learning platform for competitive-exam prep with streaks that stick.",
      image: "/work/brightpath.webp",
      span: 6,
      year: "2024",
    },
  ] satisfies Project[],
  more: { label: "More work", note: "Full case studies on request", href: "#contact" },
};

/* ───────── Services ───────── */
export const services = {
  eyebrow: "What we do",
  titleDark: "Everything a brand needs",
  titleMuted: "to launch and grow.",
  items: [
    {
      name: "Brand Identity",
      description: "Names, logos, type and colour systems that make you recognisable at a glance, and consistent everywhere you show up.",
      image: "/work/thali.webp",
      tags: ["Strategy", "Logo", "Guidelines"],
    },
    {
      name: "Websites & Web Apps",
      description: "Fast, conversion-led sites in Next.js. Built to rank, easy for your team to update, and measured from day one.",
      image: "/work/aranya.webp",
      tags: ["Next.js", "CMS", "SEO"],
    },
    {
      name: "Product Design",
      description:
        "Research-backed UI/UX for apps and SaaS, from the first user flow to a design system your engineers will thank you for.",
      image: "/work/fieldnote.webp",
      tags: ["UX research", "UI", "Design systems"],
    },
    {
      name: "Mobile Apps",
      description:
        "iOS and Android apps in React Native, shipped with analytics, crash reporting and a release process that doesn’t break.",
      image: "/work/kora.webp",
      tags: ["React Native", "iOS", "Android"],
    },
    {
      name: "E-commerce",
      description: "Shopify and headless stores tuned for speed and checkout conversion, so browsers become repeat buyers.",
      image: "/work/mitti.webp",
      tags: ["Shopify", "Headless", "CRO"],
    },
  ],
  growthLabel: "Plus growth services",
  growth: ["SEO", "Google Ads", "Social Media", "Video Production"],
};

/* ───────── Why us ───────── */
export const why = {
  eyebrow: "Why ITBIZone",
  titleMuted: "Less agency,",
  titleDark: "more partner.",
  body: "The way we work is built around one idea: you should always know what’s happening, who’s doing it, and why.",
  rows: [
    {
      icon: "user",
      title: "Senior people only",
      description: "You work directly with the people designing and building your product. No hand-offs to juniors after the pitch.",
    },
    {
      icon: "lock",
      title: "Fixed scope, fixed price",
      description: "Clear proposals with milestones and a firm number. Changes are priced up front, never sprung on you at invoice time.",
    },
    {
      icon: "bolt",
      title: "Built to perform",
      description:
        "Every page is tested for speed, accessibility and search before launch. We aim for 90+ Lighthouse, not just pretty mockups.",
    },
    {
      icon: "heart",
      title: "Here after launch",
      description: "30 days of free support, then optional care plans, so your site keeps improving instead of quietly ageing.",
    },
  ],
} as const;

/* ───────── Process ───────── */
export const process = {
  eyebrow: "How we work",
  titleMuted: "Four clear steps,",
  titleDark: "zero guesswork.",
  steps: [
    {
      title: "Discover",
      duration: "Week 1",
      description: "Workshops, audits and competitor research to agree on goals, audience and what success looks like.",
    },
    {
      title: "Design",
      duration: "Weeks 2–3",
      description: "Wireframes, then high-fidelity screens and prototypes you can click through before a line of code.",
    },
    {
      title: "Develop",
      duration: "Weeks 3–6",
      description: "Production build with weekly demos, a staging link you can share, and performance budgets enforced.",
    },
    {
      title: "Deliver",
      duration: "Week 6+",
      description: "QA, launch, analytics and a hand-over session, plus 30 days of support while you settle in.",
    },
  ],
  // PLACEHOLDER — replace with your real numbers.
  stats: [
    { value: 6, suffix: "+", label: "Years designing & building" },
    { value: 80, suffix: "+", label: "Projects launched" },
    { value: 72, suffix: "%", label: "Clients who come back" },
  ],
};

/* ───────── Testimonials ───────── */
// PLACEHOLDER — sample quotes for layout only. Replace with real, attributable
// client testimonials (and real LinkedIn URLs) before going live.
export const testimonials = {
  eyebrow: "Kind words",
  titleMuted: "Founders who",
  titleDark: "trust the process.",
  items: [
    {
      name: "Ananya Rao",
      role: "Co-founder, Kora Pay",
      quote:
        "They challenged our brief in the first call, and they were right. The app launched a week early and our onboarding drop-off halved.",
      linkedin: "#",
    },
    {
      name: "Rohan Mehta",
      role: "Head of Growth, Fieldnote",
      quote: "Rare to find a team that’s equally sharp in Figma and in code. The handover docs alone saved us a month.",
      linkedin: "#",
    },
    {
      name: "Priya Nair",
      role: "Owner, Aranya Retreats",
      quote: "Our new site finally looks like the place feels. Direct bookings went up and we stopped paying so much in OTA commission.",
      linkedin: "#",
    },
    {
      name: "Karthik S.",
      role: "Founder, Mitti Studio",
      quote: "Every product page feels handmade, just like the pottery. Customers literally email us about the website.",
      linkedin: "#",
    },
    {
      name: "Dr. Meera Iyer",
      role: "Director, Pulse Clinics",
      quote: "They made accessibility a priority without us asking. Our older patients book on their own now.",
      linkedin: "#",
    },
    {
      name: "Vikram Joshi",
      role: "CTO, Orbit Freight",
      quote: "Clean architecture, sensible choices, no gold-plating. Our engineers took over the codebase without a single panic.",
      linkedin: "#",
    },
    {
      name: "Sana Qureshi",
      role: "Principal, Studio Neel",
      quote: "Calm, thoughtful and fast. They understood that a portfolio should step back and let the work speak.",
      linkedin: "#",
    },
    {
      name: "Arjun Desai",
      role: "Founder, Brightpath",
      quote: "Weekly demos meant zero surprises. We always knew exactly where the project stood and what was next.",
      linkedin: "#",
    },
    {
      name: "Neha Kulkarni",
      role: "Marketing Lead, Thali & Co",
      quote: "The brand system is so complete our in-house designer can make new menus in minutes without breaking anything.",
      linkedin: "#",
    },
  ],
};

/* ───────── Pricing ───────── */
export type Plan = {
  name: string;
  blurb: string;
  inr: number;
  usd: number;
  period: string;
  featured?: boolean;
  features: string[];
  cta: string;
};

// PLACEHOLDER — confirm your real pricing.
export const pricing = {
  eyebrow: "Transparent pricing",
  watermark: "PRICING",
  titleMuted: "Simple plans,",
  titleDark: "serious results.",
  note: "Prices exclude GST. Custom scopes quoted within 48 hours.",
  plans: [
    {
      name: "Growth Partner",
      blurb: "A dedicated design + dev team on a monthly plan, for brands that ship constantly.",
      inr: 95000,
      usd: 1150,
      period: "/month",
      featured: true,
      features: [
        "Unlimited requests, one at a time",
        "Design and development in one team",
        "48-hour average turnaround",
        "SEO & performance monitoring",
        "Monthly strategy call",
        "Pause or cancel anytime",
      ],
      cta: "Become a partner",
    },
    {
      name: "Launch",
      blurb: "Everything a new brand needs to look established on day one.",
      inr: 149000,
      usd: 1790,
      period: "one-time",
      features: [
        "Custom website, up to 6 pages",
        "Brand starter kit: logo, colour, type",
        "Mobile-first Next.js build",
        "On-page SEO + analytics setup",
        "2 revision rounds per stage",
        "30 days post-launch support",
      ],
      cta: "Start your launch",
    },
  ] satisfies Plan[],
};

/* ───────── FAQ ───────── */
export const faq = {
  eyebrow: "Good questions",
  titleMuted: "Before you",
  titleDark: "ask.",
  items: [
    {
      q: "How long does a typical project take?",
      a: "Most websites go live in 4–6 weeks. Brand identities take 3–4 weeks and apps 8–12, depending on scope. You’ll get a dated timeline with your proposal.",
    },
    {
      q: "What do you need from me to get started?",
      a: "A 30-minute intro call, any existing brand assets, and a rough idea of goals and budget. We’ll turn that into a scoped proposal within 48 hours.",
    },
    {
      q: "Do you work with clients outside India?",
      a: "Yes. About half our clients are overseas. We work async-first with overlap hours for calls, and can invoice in USD.",
    },
    {
      q: "Who owns the design and the code?",
      a: "You do. Once the final invoice is paid, all source files, code repositories and licences transfer to you in full.",
    },
    {
      q: "Can you work with our existing brand or website?",
      a: "Absolutely. We regularly extend existing brands and rebuild legacy sites while keeping your SEO rankings and content intact.",
    },
    {
      q: "How do payments work?",
      a: "Project work is split 50% to start and 50% at launch. Partner plans are billed monthly in advance. We accept bank transfer, UPI and cards.",
    },
  ],
  card: {
    title: "Book a 30-minute intro call",
    body: "Talk through your idea with the founder. No pitch deck, no pressure, just a straight answer on whether we’re a fit.",
    cta: "Start a Project",
    whatsappLabel: "Prefer WhatsApp?",
  },
};

/* ───────── Footer ───────── */
export const footer = {
  lineMuted: "Got an idea worth building?",
  lineDark: "Let’s lay the first zone.",
  cta: "Contact us",
  // PLACEHOLDER — add your real profile URLs.
  socials: [
    { label: "Instagram", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Behance", href: "#" },
    { label: "Dribbble", href: "#" },
    { label: "X", href: "#" },
  ],
};

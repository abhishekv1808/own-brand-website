import type { Metadata, Viewport } from "next";
import { Geist, JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { brand } from "@/lib/content";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap", weight: ["400", "500"] });

const title = `${brand.name} | Brand, Web & Product Studio in ${brand.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: { default: title, template: `%s | ${brand.name}` },
  description: brand.description,
  keywords: [
    "design studio Bangalore",
    "web design agency Bangalore",
    "Next.js development",
    "branding agency India",
    "UI UX design",
    "mobile app development",
  ],
  authors: [{ name: brand.founder }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: brand.url,
    siteName: brand.name,
    title,
    description: brand.description,
    locale: "en_IN",
  },
  twitter: { card: "summary_large_image", title, description: brand.description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${brand.url}/#organization`,
      name: brand.name,
      url: brand.url,
      logo: `${brand.url}/icon.svg`,
      email: brand.email,
      founder: { "@type": "Person", name: brand.founder },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: brand.email,
        telephone: brand.whatsapp.replace(/\s/g, ""),
        areaServed: "Worldwide",
      },
    },
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "@id": `${brand.url}/#localbusiness`,
      name: brand.name,
      description: brand.description,
      url: brand.url,
      image: `${brand.url}/opengraph-image`,
      email: brand.email,
      telephone: brand.whatsapp.replace(/\s/g, ""),
      parentOrganization: { "@id": `${brand.url}/#organization` },
      address: { "@type": "PostalAddress", addressLocality: brand.city, addressRegion: brand.region, addressCountry: brand.country },
      areaServed: [
        { "@type": "City", name: brand.city },
        { "@type": "Country", name: "India" },
      ],
      priceRange: "₹₹",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${geist.variable} ${jetbrains.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded-pill bg-accent px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Skip to content
        </a>
        <SmoothScroll>{children}</SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Tiro_Devanagari_Hindi,
} from "next/font/google";
import "./globals.css";
import { site } from "@/content/site";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/smooth-scroll";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const sans = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

const devanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  weight: "400",
  variable: "--font-deva",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Prabhu Prem Mission — Love, Wisdom & Seva",
    template: "%s · Prabhu Prem Mission",
  },
  description: site.description,
  keywords: [
    "Prabhu Prem Mission",
    "spiritual mission",
    "bhakti",
    "seva",
    "Vrindavan",
    "Indian spirituality",
  ],
  openGraph: {
    type: "website",
    title: "Prabhu Prem Mission — Love, Wisdom & Seva",
    description: site.description,
    siteName: site.name,
    images: [{ url: "/images/hero.jpg", width: 1800, height: 1200 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prabhu Prem Mission",
    description: site.description,
    images: ["/images/hero.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${devanagari.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-charcoal focus:px-5 focus:py-3 focus:text-xs  focus:text-ivory"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Newsreader, Tajawal } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import { LenisProvider } from "@/components/layout/LenisProvider";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Cursor } from "@/components/layout/Cursor";

import "./globals.css";

/* ============================================================
   Fonts — bound to CSS custom properties consumed by globals.css.
   Newsreader fills the Untitled Serif slot (free, variable, literary).
   Geist Sans + Mono fill the Söhne / GT America slots.
   Tajawal handles Arabic until 29LT Bukra is wired via next/font/local.
   ============================================================ */
const newsreader = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
  variable: "--font-newsreader",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Epics · Bread that doesn't apologise",
    template: "%s · Epics",
  },
  description:
    "Wheat-free, sugar-free, PKU-safe baked goods. Engineered in 6th of October City. Certified to ISO 22000 and ISO 9001. Every loaf carries a lot number.",
  keywords: [
    "gluten-free",
    "sugar-free",
    "PKU",
    "Egypt",
    "Cairo",
    "coeliac",
    "phenylketonuria",
    "low-protein",
    "bakery",
  ],
  authors: [{ name: "Epics Group" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Epics",
    title: "Epics · Bread that doesn't apologise",
    description:
      "Wheat-free, sugar-free, PKU-safe baked goods. Engineered in 6th of October.",
  },
};

export const viewport: Viewport = {
  themeColor: "#F2EFE7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${tajawal.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <LenisProvider>{children}</LenisProvider>

        <GrainOverlay />
        <Cursor />
      </body>
    </html>
  );
}

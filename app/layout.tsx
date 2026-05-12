import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono, Tajawal } from "next/font/google";
import "./globals.css";

const serif = Newsreader({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

const arabic = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-arabic",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Epics — Bread that doesn't apologise. Gluten-free, sugar-free, PKU-safe.",
  description:
    "We bake food for bodies that don't negotiate. Wheat-free, sugar-free, PKU-safe — engineered in 6th of October City, certified to ISO 22000 and ISO 9001.",
  metadataBase: new URL("https://epics-group.com"),
  openGraph: {
    title: "Epics — Bread that doesn't apologise.",
    description:
      "Gluten-free, sugar-free, PKU-safe pantry staples. Made in 6th of October. ISO 22000.",
    type: "website",
    locale: "en_EG",
    alternateLocale: ["ar_EG"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${serif.variable} ${sans.variable} ${mono.variable} ${arabic.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}

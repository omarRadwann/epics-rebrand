"use client";

/**
 * Top navigation — bilingual, magnetic links, lot-numbered.
 * The hamburger collapses to mobile; on desktop the items are spaced
 * with the mono +8% tracking specimen-spec class.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Magnetic } from "@/components/motion/Magnetic";
import { StrikethroughTrio } from "@/components/ui/Strikethrough";

interface NavLink {
  href: string;
  label: string;
  labelAr: string;
  code: string;
}

const LINKS: NavLink[] = [
  { href: "/shop", label: "Shop", labelAr: "المتجر", code: "01" },
  { href: "/pku", label: "Crystal · PKU", labelAr: "كريستال · PKU", code: "02" },
  { href: "/journal", label: "Journal", labelAr: "المجلة", code: "03" },
  { href: "/about", label: "About", labelAr: "عن إيبكس", code: "04" },
];

export function Nav({ locale = "en" }: { locale?: "en" | "ar" }) {
  const pathname = usePathname();
  const isAr = locale === "ar";

  return (
    <header
      className="sticky top-0 z-50 border-b border-ink/15 bg-paper/80 backdrop-blur-sm"
      role="banner"
    >
      <nav
        className="mx-auto flex max-w-[1440px] items-center justify-between gap-6 px-6 py-4 sm:px-12 lg:px-24"
        aria-label={isAr ? "تنقل أساسي" : "Primary"}
      >
        <Magnetic strength={0.25}>
          <Link href={isAr ? "/ar" : "/"} className="inline-flex items-center gap-3 no-underline">
            <span className="font-display text-[28px] leading-none tracking-[-0.02em]">
              Epics
            </span>
            <span className="specimen-lot hidden text-ink/60 sm:inline">N°26</span>
          </Link>
        </Magnetic>

        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => {
            const localized = isAr ? `/ar${link.href}` : link.href;
            const active = pathname === localized;
            return (
              <li key={link.href}>
                <Magnetic strength={0.2}>
                  <Link
                    href={localized}
                    className={`specimen-spec inline-flex items-baseline gap-2 no-underline transition-colors hover:text-saffron ${
                      active ? "text-saffron" : "text-ink"
                    }`}
                  >
                    <span className="opacity-50">{link.code}</span>
                    <span>{isAr ? link.labelAr : link.label}</span>
                  </Link>
                </Magnetic>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-4">
          <span className="hidden text-ink/60 sm:inline">
            <StrikethroughTrio size={20} />
          </span>
          <Link
            href={isAr ? "/" : "/ar"}
            className="specimen-spec inline-flex items-center gap-1 border border-ink/30 px-3 py-1.5 no-underline transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            aria-label={isAr ? "Switch to English" : "التبديل إلى العربية"}
          >
            {isAr ? "EN" : "AR"}
          </Link>
        </div>
      </nav>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CartCount } from "./CartCount";
import { Logo } from "./Logo";

/**
 * Top navigation. Cream-paper surface with a hairline-bottom rule.
 *
 * Left:   Epics wordmark (serif display) + tiny lot indicator
 * Right:  Three text links (Shop / Recipes / About) + bilingual toggle + cart
 *
 * No mobile hamburger trickery — wraps cleanly. No dropdowns. No mega-menu.
 */

type NavLocale = "en" | "ar";

export function Nav({ locale = "en" }: { locale?: NavLocale }) {
  const pathname = usePathname() || "/";
  const isActive = (href: string) => {
    if (href === "/" || href === "/ar") return pathname === href;
    return pathname.startsWith(href);
  };

  const t =
    locale === "ar"
      ? {
          shop: "تسوّق",
          recipes: "وصفات",
          about: "عن إيپكس",
          pku: "كريستال · PKU",
          toggle: "EN",
          toggleHref: "/",
          home: "/ar",
        }
      : {
          shop: "Shop",
          recipes: "Recipes",
          about: "About",
          pku: "Crystal · PKU",
          toggle: "العربية",
          toggleHref: "/ar",
          home: "/",
        };

  const navLinkClass = (href: string) =>
    `font-sans-text text-[14px] underline-offset-4 decoration-[0.5px] transition-colors ${
      isActive(href)
        ? "text-[rgb(var(--ink-black))] underline decoration-[rgb(var(--saffron))] decoration-[1.5px]"
        : "text-[rgb(var(--ink-black))] hover:underline"
    }`;

  return (
    <nav
      className="w-full bg-[rgb(var(--cream-paper))] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 sm:px-12 lg:px-24 py-5">
        {/* Left: bespoke Quiver-drawn wordmark + lot */}
        <div className="flex items-baseline gap-4">
          <Link
            href={t.home}
            className="block text-[rgb(var(--ink-black))] no-underline"
            aria-label="Epics — home"
          >
            <Logo size={92} monochrome="currentColor" />
          </Link>
          <span className="specimen-lot hidden sm:inline">EST · 6 OCT · LOT 26-0001</span>
        </div>

        {/* Right: links + locale + cart */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href={locale === "ar" ? "/ar" : "/shop"}
            aria-current={isActive("/shop") || isActive("/gluten-free") || isActive("/sugar-free") ? "page" : undefined}
            className={navLinkClass("/shop")}
          >
            {t.shop}
          </Link>
          <Link
            href={locale === "ar" ? "/ar" : "/recipes"}
            aria-current={isActive("/recipes") || isActive("/journal") ? "page" : undefined}
            className={`${navLinkClass("/recipes")} hidden sm:inline`}
          >
            {t.recipes}
          </Link>
          <Link
            href={locale === "ar" ? "/ar/about" : "/about"}
            aria-current={isActive("/about") || isActive("/ar/about") ? "page" : undefined}
            className={`${navLinkClass("/about")} hidden md:inline`}
          >
            {t.about}
          </Link>
          <Link
            href={locale === "ar" ? "/ar/pku" : "/pku"}
            aria-current={isActive("/pku") || isActive("/ar/pku") ? "page" : undefined}
            className={`specimen-spec text-[rgb(var(--pomegranate))] underline-offset-4 decoration-[0.5px] hidden md:inline transition-colors ${
              isActive("/pku") || isActive("/ar/pku")
                ? "underline decoration-[rgb(var(--pomegranate))] decoration-[1.5px]"
                : "hover:underline"
            }`}
          >
            {t.pku}
          </Link>

          {/* Locale toggle */}
          <Link
            href={t.toggleHref}
            className="font-sans-text text-[14px] text-[rgb(var(--ink-black))] border border-[rgb(var(--ink-black))] rounded-none px-2.5 py-1 hover:bg-[rgb(var(--ink-black))] hover:text-[rgb(var(--cream-paper))] transition-colors"
            aria-label={locale === "ar" ? "تبديل إلى الإنجليزية" : "Switch to Arabic"}
          >
            {t.toggle}
          </Link>

          {/* Cart (live count from CartProvider) */}
          <CartCount locale={locale} />
        </div>
      </div>
    </nav>
  );
}

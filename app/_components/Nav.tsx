import Link from "next/link";

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

  return (
    <nav
      className="w-full bg-[rgb(var(--cream-paper))] border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px]"
      aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}
    >
      <div className="mx-auto max-w-[1440px] flex items-center justify-between px-6 sm:px-12 lg:px-24 py-5">
        {/* Left: wordmark + lot */}
        <div className="flex items-baseline gap-4">
          <Link
            href={t.home}
            className="font-serif-display text-[28px] leading-none text-[rgb(var(--ink-black))] no-underline tracking-tight"
          >
            {locale === "ar" ? "Epics" : "Epics"}
          </Link>
          <span className="specimen-lot hidden sm:inline">EST · 6 OCT · LOT 26-0001</span>
        </div>

        {/* Right: links + locale + cart */}
        <div className="flex items-center gap-6 sm:gap-8">
          <Link
            href={locale === "ar" ? "/ar" : "/"}
            className="font-sans-text text-[14px] text-[rgb(var(--ink-black))] hover:underline underline-offset-4 decoration-[0.5px]"
          >
            {t.shop}
          </Link>
          <Link
            href={locale === "ar" ? "/ar" : "/"}
            className="font-sans-text text-[14px] text-[rgb(var(--ink-black))] hover:underline underline-offset-4 decoration-[0.5px]"
          >
            {t.recipes}
          </Link>
          <Link
            href={locale === "ar" ? "/ar" : "/"}
            className="font-sans-text text-[14px] text-[rgb(var(--ink-black))] hover:underline underline-offset-4 decoration-[0.5px] hidden md:inline"
          >
            {t.about}
          </Link>
          <Link
            href={locale === "ar" ? "/ar" : "/"}
            className="specimen-spec text-[rgb(var(--pomegranate))] hover:underline underline-offset-4 decoration-[0.5px] hidden md:inline"
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

          {/* Cart */}
          <button
            className="font-sans-text text-[14px] text-[rgb(var(--ink-black))] hover:underline underline-offset-4 decoration-[0.5px]"
            aria-label={locale === "ar" ? "السلة" : "Cart"}
          >
            {locale === "ar" ? "السلة · 0" : "Cart · 0"}
          </button>
        </div>
      </div>
    </nav>
  );
}

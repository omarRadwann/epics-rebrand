/**
 * Arabic route locale wrapper.
 *
 * Sets dir="rtl" + lang="ar" on a wrapping element so Tailwind logical
 * properties (ms-/me-/ps-/pe-) flip naturally and Arabic typography
 * (--font-arabic / Tajawal in fallback, 29LT Bukra in production) is
 * applied across all /ar/* routes.
 *
 * 3D scenes inherit the RTL flag via a runtime check in usePerfTier or
 * an explicit prop in Phase 10 polish. For Phase 10 first ship the DOM
 * RTL flips correctly; mirror-flip the canvas in a follow-up.
 */
export default function ArabicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="ar" dir="rtl" className="font-arabic">
      {children}
    </div>
  );
}

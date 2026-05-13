/**
 * Footer — real Epics contact details, documentary tone.
 * Per brand-book §8 voice rules: archival, factual, "We answer the phone".
 */

export function Footer({ locale = "en" }: { locale?: "en" | "ar" }) {
  const isAr = locale === "ar";

  return (
    <footer
      className="border-t border-ink/40 bg-paper text-ink"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1440px] px-6 py-16 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Manifesto column */}
          <div className="md:col-span-5">
            <p className="specimen-lot mb-3 text-ink/60">F-01 · COLOPHON</p>
            <p className="font-display text-[32px] leading-[1.1] tracking-[-0.015em]">
              {isAr ? (
                <>نخبز طعامًا لأجساد لا تُساوم.</>
              ) : (
                <>Bread that doesn&rsquo;t apologise.</>
              )}
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-[1.55] text-ink/70">
              {isAr ? (
                <>
                  مُصنَّع في مدينة السادس من أكتوبر، الجيزة. مُعتمد على ISO 22000 وISO 9001.
                  نرد على الهاتف السبت إلى الأربعاء، 9 صباحًا إلى 4 عصرًا.
                </>
              ) : (
                <>
                  Engineered in 6th of October City, Giza. Certified to ISO 22000 and ISO 9001.
                  We answer the phone Saturday to Wednesday, 9 to 4.
                </>
              )}
            </p>
          </div>

          {/* Contact column */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="specimen-lot mb-3 text-ink/60">F-02 · CONTACT</p>
            <ul className="space-y-2 text-[14px] leading-[1.5]">
              <li>
                <span className="specimen-lot block text-ink/50">PHONE</span>
                <a href="tel:+201005005002" className="hover:text-saffron">
                  +20 100 500 5002
                </a>
              </li>
              <li>
                <span className="specimen-lot block text-ink/50">EMAIL</span>
                <a href="mailto:hello@epics-group.com" className="hover:text-saffron">
                  hello@epics-group.com
                </a>
              </li>
              <li>
                <span className="specimen-lot block text-ink/50">WHOLESALE</span>
                <a href="mailto:sales@epics-group.com" className="hover:text-saffron">
                  sales@epics-group.com
                </a>
              </li>
            </ul>
          </div>

          {/* Certifications column */}
          <div className="md:col-span-3 md:col-start-10">
            <p className="specimen-lot mb-3 text-ink/60">F-03 · CERTIFIED</p>
            <ul className="space-y-2 text-[14px] leading-[1.5]">
              <li>
                <span className="specimen-lot block text-ink/50">X-01-A</span>
                <span>ISO 22000:2018 · Bureau Veritas Egypt</span>
              </li>
              <li>
                <span className="specimen-lot block text-ink/50">X-01-B</span>
                <span>ISO 9001:2015 · Bureau Veritas Egypt</span>
              </li>
              <li>
                <span className="specimen-lot block text-ink/50">X-01-C</span>
                <span>Halal · EHA-2025-0061</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-12 border-ink/20" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="specimen-lot text-ink/50">
            EPICS · ISSUE 26 · LOT 0001 · MMXXVI · 6 OCTOBER CITY
          </p>
          <p className="specimen-lot text-ink/50">
            {isAr ? "© ٢٠٢٦ Epics Group" : "© 2026 Epics Group"}
          </p>
        </div>
      </div>
    </footer>
  );
}

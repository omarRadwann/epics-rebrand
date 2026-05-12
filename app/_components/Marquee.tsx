/**
 * CSS-only marquee. Items repeat indefinitely with a continuous horizontal
 * translation. Respects prefers-reduced-motion (we disable the animation
 * globally in globals.css via the @media query).
 *
 * Two variants:
 *   - "ticker" — small mono band (nav-strip, certifications, "Issue 26 ·")
 *   - "huge"   — giant serif band (product names, brand quotes)
 */

type Item = { content: React.ReactNode; key: string };

export function Marquee({
  items,
  variant = "ticker",
  speedSeconds = 35,
  bg = "ink-black",
  fg = "cream-paper",
  separator = "·",
  className = "",
}: {
  items: Item[];
  variant?: "ticker" | "huge";
  speedSeconds?: number;
  bg?: "ink-black" | "cream-paper" | "saffron" | "pomegranate" | "linen-mid";
  fg?: "ink-black" | "cream-paper" | "saffron" | "pomegranate";
  separator?: string;
  className?: string;
}) {
  const bgClass = `bg-[rgb(var(--${bg}))]`;
  const fgClass = `text-[rgb(var(--${fg}))]`;

  // Duplicate the items 4x so the seamless loop has enough buffer to never gap.
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className={`${bgClass} ${fgClass} overflow-hidden ${className}`}>
      <div
        className="flex items-center gap-12 whitespace-nowrap will-change-transform"
        style={{
          animation: `epicsMarquee ${speedSeconds}s linear infinite`,
          width: "max-content",
          paddingBlock: variant === "huge" ? "1.5rem" : "0.75rem",
        }}
      >
        {repeated.map((item, i) => (
          <span key={`${item.key}-${i}`} className="flex items-center gap-12">
            <span
              className={
                variant === "huge"
                  ? "font-serif-display text-[80px] sm:text-[120px] leading-[1] tracking-[-0.025em] italic"
                  : "specimen-lot"
              }
            >
              {item.content}
            </span>
            <span aria-hidden className={variant === "huge" ? "font-serif-display text-[80px] sm:text-[120px] opacity-30" : "specimen-lot opacity-30"}>
              {separator}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

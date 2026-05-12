/**
 * The brand's signature visual device: wheat-out / sugar-out / protein-out monograms.
 * Each is drawn as a hairline-weight SVG, ink-black on cream, treated as a numbered
 * specimen (S-01, S-02, S-03). Lives on packaging, badges, and product cards.
 *
 * NEVER recolor these to green-for-healthy. NEVER fill them. They are line art only.
 */

type Props = {
  variant: "wheat" | "sugar" | "protein";
  size?: number;
  className?: string;
  label?: boolean;
};

export function Strikethrough({ variant, size = 64, className = "", label = false }: Props) {
  const spec = {
    wheat:   { code: "S-01", label: "Gluten-Free",  fullLabel: "WHEAT · STRUCK · S-01" },
    sugar:   { code: "S-02", label: "Sugar-Free",   fullLabel: "SUGAR · STRUCK · S-02" },
    protein: { code: "S-03", label: "PKU-Safe",     fullLabel: "PROTEIN · STRUCK · S-03" },
  }[variant];

  return (
    <div className={`inline-flex flex-col items-center gap-2 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label={spec.fullLabel}
        role="img"
      >
        <circle cx="32" cy="32" r="30.5" stroke="currentColor" strokeWidth="0.5" />

        {variant === "wheat" && (
          <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round">
            {/* Wheat stalk */}
            <line x1="32" y1="14" x2="32" y2="50" />
            {/* Grains, paired */}
            {[18, 24, 30, 36, 42].map((y) => (
              <g key={y}>
                <path d={`M 32 ${y} Q 26 ${y + 2} 26 ${y + 5}`} />
                <path d={`M 32 ${y} Q 38 ${y + 2} 38 ${y + 5}`} />
              </g>
            ))}
            {/* Strikethrough diagonal */}
            <line x1="14" y1="14" x2="50" y2="50" strokeWidth="1" />
          </g>
        )}

        {variant === "sugar" && (
          <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
            {/* Sugar cube — isometric */}
            <path d="M 22 24 L 32 18 L 42 24 L 32 30 Z" />
            <path d="M 22 24 L 22 40 L 32 46 L 32 30" />
            <path d="M 42 24 L 42 40 L 32 46" />
            {/* Crystalline interior lines */}
            <line x1="22" y1="32" x2="32" y2="38" />
            <line x1="42" y1="32" x2="32" y2="38" />
            {/* Strikethrough */}
            <line x1="14" y1="14" x2="50" y2="50" strokeWidth="1" />
          </g>
        )}

        {variant === "protein" && (
          <g stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" strokeLinejoin="round">
            {/* Stylized PHE molecule — a ring with a small chain (phenylalanine signature) */}
            <polygon points="32,16 42,22 42,32 32,38 22,32 22,22" />
            {/* Side chain */}
            <line x1="32" y1="38" x2="32" y2="48" />
            <line x1="32" y1="48" x2="38" y2="50" />
            <line x1="32" y1="48" x2="26" y2="50" />
            {/* Strikethrough */}
            <line x1="14" y1="14" x2="50" y2="50" strokeWidth="1" />
          </g>
        )}
      </svg>

      {label && (
        <div className="flex flex-col items-center gap-0.5">
          <span className="specimen-spec text-ink-black">{spec.label}</span>
          <span className="specimen-lot">{spec.code}</span>
        </div>
      )}
    </div>
  );
}

/** Three-up specimen row — used in nav badges and as a brand mark anywhere. */
export function StrikethroughTrio({ size = 40 }: { size?: number }) {
  return (
    <div className="inline-flex items-center gap-3 text-ink-black">
      <Strikethrough variant="wheat" size={size} />
      <Strikethrough variant="sugar" size={size} />
      <Strikethrough variant="protein" size={size} />
    </div>
  );
}

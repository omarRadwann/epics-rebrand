/**
 * Subtle SVG noise overlay — gives the cream-paper surface a hand-set
 * paper grain instead of flat solid color. Server-rendered. Fixed
 * position, pointer-events:none so it doesn't interfere with anything.
 *
 * The feTurbulence + feColorMatrix combo produces a fine, warm-tinted
 * noise. The opacity is intentionally low (~0.05) so it reads as texture
 * rather than as grain.
 */
export function PaperTexture() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 w-full h-full opacity-[0.055] mix-blend-multiply"
      xmlns="http://www.w3.org/2000/svg"
    >
      <filter id="epicsGrain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" seed="3" />
        <feColorMatrix
          type="matrix"
          values="
            0 0 0 0 0.08
            0 0 0 0 0.07
            0 0 0 0 0.06
            0 0 0 0.8 0"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#epicsGrain)" />
    </svg>
  );
}

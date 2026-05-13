"use client";

/**
 * SpecimenSlide — Moon #3 product card.
 *
 * A glass-microscope-slide treatment for a single SKU. On hover the
 * slide lifts off the page, tilts toward the cursor (drei-like parallax
 * with FM springs), and the artwork picks up a subtle chromatic-
 * aberration + film-grain pass. The lot number scrambles in on enter-
 * viewport.
 *
 * Per Moonshot Brief §2 Moon #3 + brand-book §6 specimen language.
 */
import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Scramble } from "@/components/motion/Scramble";
import type { Product } from "@/lib/catalog";

interface Props {
  product: Product;
  href?: string;
  priority?: boolean;
}

export function SpecimenSlide({ product, href }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Tilt
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spx = useSpring(px, { stiffness: 220, damping: 28 });
  const spy = useSpring(py, { stiffness: 220, damping: 28 });
  const rotateX = useTransform(spy, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(spx, [-0.5, 0.5], [-6, 6]);
  // Slight perspective parallax on the inner content
  const innerX = useTransform(spx, [-0.5, 0.5], [-6, 6]);
  const innerY = useTransform(spy, [-0.5, 0.5], [-4, 4]);
  // Chromatic-aberration offset (only kicks in when hovered)
  const chromaR = useTransform(spx, [-0.5, 0.5], [-2.2, 2.2]);
  const chromaB = useTransform(spx, [-0.5, 0.5], [2.2, -2.2]);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce), (hover: none)").matches) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  }

  function onLeave() {
    px.set(0);
    py.set(0);
    setHovered(false);
  }

  const linkHref = href ?? `/products/${product.slug}`;
  const isCrystal = product.category === "pku";

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={onLeave}
      whileHover={{ y: -6, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      style={{
        perspective: 1100,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-full"
      data-cursor-hover
    >
      <Link
        href={linkHref}
        className="block h-full no-underline"
        aria-label={`${product.name} — ${product.loafNumber}`}
      >
        {/* Slide body — frosted glass plate */}
        <article
          className={`relative flex h-full flex-col overflow-hidden border bg-paper px-6 pb-6 pt-7 transition-shadow duration-300 ${
            isCrystal
              ? "border-stamp/30 hover:shadow-[0_14px_45px_-22px_rgba(122,46,31,0.45)]"
              : "border-ink/15 hover:shadow-[0_14px_45px_-22px_rgba(22,21,18,0.45)]"
          }`}
        >
          {/* Hairline rule + numbered "slide tab" at top — the
              microscope-slide motif. */}
          <span
            className={`absolute -top-px left-0 h-[2px] w-[42%] ${
              isCrystal ? "bg-stamp" : "bg-ink"
            } transition-all duration-500 group-hover:w-[58%]`}
          />
          <span className="specimen-lot absolute right-4 top-3 text-ink/45">
            №{product.loafNumber.replace(/[^\d]/g, "")}
          </span>

          {/* Inner content shifts on parallax — feels like the
              specimen is suspended slightly above the slide. */}
          <motion.div
            style={{ x: innerX, y: innerY, transform: "translateZ(20px)" }}
            className="flex h-full flex-col"
          >
            {/* Specimen art zone — gradient panel that holds the
                product silhouette. We don't have hires renders, so we
                fake the product with a typographic specimen frame.
                When real product images land, swap in <Image /> here
                with the chromatic-aberration overlay applied to it. */}
            <div
              className={`relative mb-5 aspect-[5/4] overflow-hidden border ${
                isCrystal ? "border-stamp/20" : "border-ink/12"
              }`}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: isCrystal
                    ? "radial-gradient(120% 80% at 30% 30%, #f7e9e6 0%, #f2efe7 45%, #ebd9d2 90%)"
                    : "radial-gradient(120% 80% at 30% 30%, #f8efd9 0%, #f2efe7 45%, #e4d9c0 90%)",
                }}
              />
              {/* Chromatic-aberration headline rendered as three
                  offset layers. Only the offset moves with hover; the
                  base layer stays sharp so the SKU is always legible. */}
              <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
                <span className="relative font-display text-[28px] leading-[1.05] tracking-[-0.015em] text-ink">
                  <motion.span
                    aria-hidden
                    style={{ x: hovered ? chromaR : 0, color: "#d94a3a" }}
                    className="pointer-events-none absolute inset-0 mix-blend-screen"
                  >
                    {product.name}
                  </motion.span>
                  <motion.span
                    aria-hidden
                    style={{ x: hovered ? chromaB : 0, color: "#2a78c7" }}
                    className="pointer-events-none absolute inset-0 mix-blend-screen"
                  >
                    {product.name}
                  </motion.span>
                  <span className="relative">{product.name}</span>
                </span>
              </div>
              {/* Film-grain overlay on hover */}
              <motion.span
                aria-hidden
                animate={{ opacity: hovered ? 0.12 : 0 }}
                transition={{ duration: 0.25 }}
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='0.45'/></svg>\")",
                  mixBlendMode: "multiply",
                }}
              />
            </div>

            {/* Metadata block */}
            <p className="specimen-lot text-ink/55">
              {product.loafNumber.toUpperCase()} · LOT{" "}
              <Scramble text={product.lot} />
            </p>
            <h3 className="mt-2 line-clamp-2 font-display text-[20px] leading-[1.2] tracking-[-0.01em]">
              {product.name}
            </h3>
            <p className="specimen-spec mt-2 text-ink/55">
              {product.weight.toUpperCase()} · ISO {product.iso}
            </p>

            <div className="mt-auto flex items-end justify-between pt-6">
              <span className="font-display text-[26px] leading-none">
                {product.priceEgp ? product.priceEgp : "—"}
                <span className="specimen-lot ml-1 align-baseline text-ink/60">
                  EGP
                </span>
              </span>
              <div className="flex gap-1">
                {product.freeFrom.map((code) => (
                  <span
                    key={code}
                    className={`specimen-lot rounded-sm border px-1.5 py-0.5 ${
                      isCrystal && code === "S-03"
                        ? "border-stamp/40 text-stamp"
                        : "border-ink/30"
                    }`}
                  >
                    {code}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Tilt-revealed underline on the bottom edge */}
          <span
            className={`absolute -bottom-px right-0 h-[2px] w-[28%] ${
              isCrystal ? "bg-stamp" : "bg-ink"
            } transition-all duration-500 group-hover:w-[44%]`}
          />
        </article>
      </Link>
    </motion.div>
  );
}

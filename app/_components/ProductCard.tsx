"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Product } from "@/lib/catalog";
import { asset } from "@/lib/asset";

/**
 * Product card — Framer Motion adds the hover lift + image scale and
 * the tap-to-press feedback. Real Crystal/Epics product photography on
 * a clean ivory card; cream-paper specimen band at the bottom.
 *
 * Variants:
 *   - "rail"  – fixed-width on homepage rails
 *   - "grid"  – fills its column on category / shop grids
 *   - "hero"  – wider 3:2 tile for category-page hero pair
 */

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "rail" | "grid" | "hero";
}) {
  const isCrystal = product.subBrand === "crystal";
  const aspect = variant === "hero" ? "aspect-[3/2]" : "aspect-[3/4]";

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block no-underline focus-visible:outline-none"
    >
      <motion.article
        className={`${aspect} relative overflow-hidden bg-white flex flex-col`}
        initial={{ y: 0 }}
        whileHover={{ y: -6 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 260, damping: 26 }}
        style={{
          boxShadow: "0 1px 0 rgba(20,17,15,0.08)",
        }}
      >
        {/* Accent rule at top for Crystal products */}
        {isCrystal && (
          <span aria-hidden className="absolute top-0 left-0 right-0 h-[3px] bg-[rgb(var(--pomegranate))] z-20" />
        )}

        {/* Free-from + lot chips */}
        <div className="absolute top-4 left-4 right-4 z-10 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="specimen-lot opacity-70">{product.loafNumber.toUpperCase()}</span>
            {isCrystal && (
              <span className="specimen-lot text-[rgb(var(--pomegranate))]">CRYSTAL · BY EPICS</span>
            )}
          </div>
          <div className="flex gap-1.5">
            {product.freeFrom.map((c) => (
              <span
                key={c}
                className="specimen-lot bg-[rgb(var(--cream-paper))] text-[rgb(var(--ink-black))] px-1.5 py-0.5 rounded-[1px]"
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* Product photo with hover scale */}
        <div className="absolute inset-0 flex items-center justify-center p-6 pt-16 pb-20">
          <motion.div
            className="w-full h-full flex items-center justify-center"
            initial={{ scale: 1 }}
            whileHover={{ scale: 1.06, rotate: -1 }}
            transition={{ type: "spring", stiffness: 220, damping: 20 }}
          >
            <Image
              src={asset(product.imageUrl)}
              alt={product.name}
              width={500}
              height={500}
              unoptimized
              priority={variant === "hero"}
              className={`object-contain ${
                variant === "hero" ? "max-h-[88%] max-w-[55%]" : "max-h-[85%] max-w-[80%]"
              }`}
            />
          </motion.div>
        </div>

        {/* Bottom band */}
        <div className="mt-auto relative z-10 bg-[rgb(var(--cream-paper))] border-t border-[rgb(var(--ink-black)/0.6)] border-t-[0.5px] px-4 py-3.5 flex items-baseline justify-between gap-3">
          <h3
            className={`font-serif-display tracking-[-0.005em] text-[rgb(var(--ink-black))] line-clamp-2 ${
              variant === "hero" ? "text-[22px] leading-[1.15]" : "text-[16px] leading-[1.15]"
            }`}
          >
            {product.name}
          </h3>
          <span className="specimen-spec text-[rgb(var(--ink-black))] tabular-nums shrink-0">
            {product.priceEgp != null ? `${product.priceEgp} EGP` : "WHOLESALE"}
          </span>
        </div>

        {/* Saffron stripe on hover */}
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 right-0 h-[3px] bg-[rgb(var(--saffron))] origin-left z-30"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.article>
    </Link>
  );
}

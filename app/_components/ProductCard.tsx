import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/catalog";
import { asset } from "@/lib/asset";

/**
 * Product card — real Crystal/Epics product photography on a clean ivory
 * card. The cream-paper Specimen Pantry plinth lives on the page surface;
 * cards are slightly lighter to let the white-background product mockups
 * sit cleanly without mix-blend tricks.
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
      <article
        className={`${aspect} relative overflow-hidden bg-white shadow-[0_1px_0_rgba(26,24,23,0.08)] hover:shadow-[0_8px_30px_-12px_rgba(26,24,23,0.18)] transition-shadow duration-300 flex flex-col`}
      >
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

        {/* Product photo — full bleed, centered */}
        <div className="absolute inset-0 flex items-center justify-center p-6 pt-16 pb-20">
          <Image
            src={asset(product.imageUrl)}
            alt={product.name}
            width={500}
            height={500}
            unoptimized
            priority={variant === "hero"}
            className={`object-contain transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
              variant === "hero" ? "max-h-[88%] max-w-[55%]" : "max-h-[85%] max-w-[80%]"
            }`}
          />
        </div>

        {/* Bottom band — name + price, ivory tint, hairline top */}
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
      </article>
    </Link>
  );
}

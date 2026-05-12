import Link from "next/link";
import type { Product } from "@/lib/catalog";

/**
 * Reusable product specimen card. Used on:
 *   - Homepage popular rail
 *   - Category grid (Gluten-Free, Sugar-Free, PKU)
 *   - PDP related products
 *
 * Variant: "rail" (fixed 260px), "grid" (fills column), "hero" (2x grid tile)
 */

export function ProductCard({
  product,
  variant = "grid",
}: {
  product: Product;
  variant?: "rail" | "grid" | "hero";
}) {
  const isCrystal = product.subBrand === "crystal";
  const surface = isCrystal
    ? "bg-[rgb(var(--pomegranate)/0.08)]"
    : "bg-[rgb(var(--linen-mid)/0.45)]";

  const aspect =
    variant === "hero" ? "aspect-[3/2]" : variant === "rail" ? "aspect-[3/4]" : "aspect-[3/4]";

  return (
    <Link href={`/products/${product.slug}`} className="block group no-underline">
      <article className={`${aspect} flex flex-col justify-between p-5 ${surface}`}>
        <header className="flex items-start justify-between">
          <p className="specimen-lot">{product.loafNumber.toUpperCase()}</p>
          <div className="flex gap-1">
            {product.freeFrom.map((c) => (
              <span key={c} className="specimen-lot opacity-60">
                {c}
              </span>
            ))}
          </div>
        </header>

        <div className="flex flex-col items-center text-center text-[rgb(var(--ink-black))]">
          {isCrystal ? (
            <div className="specimen-spec mb-2 text-[rgb(var(--pomegranate))]">CRYSTAL BY EPICS</div>
          ) : (
            <div className="specimen-spec mb-2 opacity-50">EPICS</div>
          )}
          <h3
            className={`font-serif-display tracking-[-0.01em] ${
              variant === "hero" ? "text-[32px] leading-[34px]" : "text-[22px] leading-[24px]"
            }`}
          >
            {product.name}
          </h3>
          <div className="specimen-lot mt-3 opacity-60">
            {product.weight.toUpperCase()} · LOT {product.lot}
          </div>
        </div>

        <footer className="flex items-baseline justify-between text-[rgb(var(--ink-black))]">
          <span className="specimen-spec">{product.priceEgp} EGP</span>
          <span className="specimen-spec group-hover:underline underline-offset-4 decoration-[0.5px]">
            SPECIMEN →
          </span>
        </footer>
      </article>
    </Link>
  );
}

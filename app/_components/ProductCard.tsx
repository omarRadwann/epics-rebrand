import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/catalog";

/**
 * Reusable product specimen card. Real product photography from the Epics
 * catalogue, presented on a cream-paper plinth with the specimen header
 * treatment (loaf number top-left, free-from codes top-right, price + SPECIMEN
 * link in the footer).
 *
 * Variant: "rail" (fixed-width on homepage rails), "grid" (fills column),
 * "hero" (wider 3:2 tile for category-page heroes).
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
    variant === "hero" ? "aspect-[3/2]" : "aspect-[3/4]";

  return (
    <Link href={`/products/${product.slug}`} className="block group no-underline">
      <article className={`${aspect} flex flex-col justify-between p-5 ${surface} relative overflow-hidden`}>
        <header className="flex items-start justify-between relative z-10">
          <div className="flex flex-col gap-0.5">
            <p className="specimen-lot">{product.loafNumber.toUpperCase()}</p>
            {isCrystal && <p className="specimen-lot text-[rgb(var(--pomegranate))]">CRYSTAL · BY EPICS</p>}
          </div>
          <div className="flex gap-1">
            {product.freeFrom.map((c) => (
              <span key={c} className="specimen-lot opacity-60">
                {c}
              </span>
            ))}
          </div>
        </header>

        {/* Real product photo */}
        <div className="absolute inset-0 flex items-center justify-center px-6 py-12 pointer-events-none">
          <Image
            src={product.imageUrl}
            alt={`${product.name} package`}
            width={400}
            height={500}
            unoptimized
            className={`object-contain mix-blend-multiply ${
              variant === "hero" ? "max-w-[45%] max-h-[88%]" : "max-w-[70%] max-h-[72%]"
            }`}
          />
        </div>

        <footer className="flex items-baseline justify-between text-[rgb(var(--ink-black))] relative z-10">
          <span className="specimen-spec">
            {product.priceEgp != null ? `${product.priceEgp} EGP` : "WHOLESALE"}
          </span>
          <span className="specimen-spec group-hover:underline underline-offset-4 decoration-[0.5px]">
            SPECIMEN →
          </span>
        </footer>
      </article>
    </Link>
  );
}

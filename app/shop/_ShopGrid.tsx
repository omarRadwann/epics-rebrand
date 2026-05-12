"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "../_components/ProductCard";
import { products, type Product } from "@/lib/catalog";

type Filter = "all" | "gluten-free" | "sugar-free" | "pku";

const FILTERS: { id: Filter; label: string; code: string }[] = [
  { id: "all",          label: "All",            code: "F-00" },
  { id: "gluten-free",  label: "Gluten-Free",    code: "F-01" },
  { id: "sugar-free",   label: "Sugar-Free",     code: "F-02" },
  { id: "pku",          label: "Crystal · PKU",  code: "F-03" },
];

export function ShopGrid() {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo<Product[]>(() => {
    if (filter === "all") return products;
    return products.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <>
      {/* Filter bar */}
      <section className="border-b border-[rgb(var(--ink-black)/0.6)] border-b-[0.5px] sticky top-0 bg-[rgb(var(--cream-paper))] z-10">
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="specimen-lot opacity-60">FILTER · F-00</p>
          {FILTERS.map((f) => {
            const active = filter === f.id;
            const isPku = f.id === "pku";
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`font-sans-text text-[14px] py-1.5 border-b transition-colors ${
                  active
                    ? isPku
                      ? "border-[rgb(var(--pomegranate))] text-[rgb(var(--pomegranate))]"
                      : "border-[rgb(var(--ink-black))] text-[rgb(var(--ink-black))]"
                    : "border-transparent text-[rgb(var(--charcoal-sub))] hover:text-[rgb(var(--ink-black))] hover:border-[rgb(var(--ink-black))]"
                }`}
              >
                {f.label}{" "}
                <span className="specimen-lot opacity-60 ml-1">
                  ({filterCount(f.id)})
                </span>
              </button>
            );
          })}
          <span className="ml-auto specimen-lot opacity-60">SORT · BY LOT NUMBER</span>
        </div>
      </section>

      {/* Grid */}
      <section>
        <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-24 py-16">
          {filtered.length === 0 ? (
            <p className="font-serif-display italic text-[24px] text-center py-20 text-[rgb(var(--charcoal-sub))]">
              No specimens on this shelf yet.
            </p>
          ) : (
            <>
              <p className="specimen-lot opacity-60 mb-6">
                {filtered.length} {filtered.length === 1 ? "specimen" : "specimens"} · sorted by lot number
              </p>
              <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 list-none p-0">
                {filtered.map((p) => (
                  <li key={p.slug}>
                    <ProductCard product={p} variant="grid" />
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </>
  );
}

function filterCount(id: Filter): number {
  if (id === "all") return products.length;
  return products.filter((p) => p.category === id).length;
}

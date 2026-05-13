"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { products } from "@/lib/catalog";
import { recipes } from "@/lib/recipes";
import { journal } from "@/lib/journal";
import { asset } from "@/lib/asset";

/**
 * Full-screen Cmd+K (or Ctrl+K) search overlay. Indexes products,
 * recipes, and journal articles. Keyboard nav with ↑/↓ and Enter.
 * Escape or backdrop click closes.
 *
 * Trigger: Cmd/Ctrl + K anywhere on the site, OR the small "Search"
 * button in the Nav.
 */

type Hit =
  | { kind: "product";  slug: string; title: string; subtitle: string; image: string; href: string }
  | { kind: "recipe";   slug: string; title: string; subtitle: string; image: string; href: string }
  | { kind: "journal";  slug: string; title: string; subtitle: string; image?: undefined; href: string };

const index: Hit[] = [
  ...products.map((p): Hit => ({
    kind: "product",
    slug: p.slug,
    title: p.name,
    subtitle: `${p.loafNumber.toUpperCase()} · ${p.weight.toUpperCase()} · ${p.priceEgp ?? "—"} EGP`,
    image: p.imageUrl,
    href: `/products/${p.slug}/`,
  })),
  ...recipes.map((r): Hit => ({
    kind: "recipe",
    slug: r.slug,
    title: r.title,
    subtitle: `${r.code} · ${r.time.toUpperCase()} · ${r.yield.toUpperCase()}`,
    image: r.imageUrl,
    href: `/recipes/${r.slug}/`,
  })),
  ...journal.map((j): Hit => ({
    kind: "journal",
    slug: j.slug,
    title: j.title,
    subtitle: `${j.code} · ${j.category.toUpperCase()} · ${j.read.toUpperCase()} READ`,
    href: `/journal/${j.slug}/`,
  })),
];

function score(hit: Hit, q: string): number {
  if (!q) return 0;
  const t = hit.title.toLowerCase();
  const s = hit.subtitle.toLowerCase();
  if (t.startsWith(q)) return 100;
  if (t.includes(q)) return 80;
  if (s.includes(q)) return 50;
  // Token match — give partial credit
  const tokens = q.split(/\s+/).filter(Boolean);
  let sc = 0;
  for (const tok of tokens) {
    if (t.includes(tok)) sc += 25;
    if (s.includes(tok)) sc += 10;
  }
  return sc;
}

export function SearchOverlay() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Global Cmd+K / Ctrl+K
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Focus on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  const lowerQ = q.trim().toLowerCase();
  const results = useMemo(() => {
    if (!lowerQ) {
      // Featured defaults when query empty
      return index.slice(0, 8);
    }
    return index
      .map((h) => ({ h, s: score(h, lowerQ) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s)
      .slice(0, 12)
      .map((x) => x.h);
  }, [lowerQ]);

  // Wrap-around keyboard nav over results
  useEffect(() => {
    setActive(0);
  }, [lowerQ]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(1, results.length));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
      } else if (e.key === "Enter" && results[active]) {
        e.preventDefault();
        const target = results[active].href;
        setOpen(false);
        // SPA navigation
        window.location.href = target;
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, active, results]);

  // Lock body scroll while open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <SearchTrigger onClick={() => setOpen(true)} />

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[200]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-[rgb(var(--ink-black)/0.55)] backdrop-blur-sm" />

            {/* Panel */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[6vh] w-[min(900px,92vw)] bg-[rgb(var(--cream-paper))] shadow-[0_30px_80px_-20px_rgba(20,17,15,0.45)]"
              initial={{ opacity: 0, y: -24, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.98 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Input row */}
              <div className="border-b border-[rgb(var(--ink-black)/0.15)] border-b-[0.5px] px-6 py-5 flex items-center gap-4">
                <span className="specimen-lot opacity-60">SEARCH</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Type a product, recipe, or journal entry…"
                  className="flex-1 bg-transparent font-serif-display text-[24px] sm:text-[32px] leading-[1.15] tracking-[-0.005em] outline-none placeholder:text-[rgb(var(--charcoal-sub)/0.5)]"
                  aria-label="Search"
                  spellCheck={false}
                  autoComplete="off"
                />
                <button
                  onClick={() => setOpen(false)}
                  className="specimen-lot opacity-60 hover:opacity-100 hover:underline underline-offset-4 decoration-[0.5px]"
                  aria-label="Close search"
                >
                  ESC
                </button>
              </div>

              {/* Results */}
              <ol className="max-h-[68vh] overflow-y-auto list-none p-0 m-0">
                {results.length === 0 ? (
                  <li className="px-6 py-12 text-center">
                    <p className="font-serif-display italic text-[22px] text-[rgb(var(--charcoal-sub))]">
                      No matches in the catalogue.
                    </p>
                    <p className="specimen-lot opacity-60 mt-3">Try “brownies” or “PKU” or “sugar-free”.</p>
                  </li>
                ) : (
                  results.map((r, i) => (
                    <li key={`${r.kind}-${r.slug}`}>
                      <Link
                        href={r.href}
                        onClick={() => setOpen(false)}
                        onMouseEnter={() => setActive(i)}
                        className={`flex items-center gap-5 px-6 py-4 no-underline border-b border-[rgb(var(--ink-black)/0.08)] border-b-[0.5px] transition-colors ${
                          i === active
                            ? "bg-[rgb(var(--linen-mid)/0.55)]"
                            : "hover:bg-[rgb(var(--linen-mid)/0.35)]"
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-12 h-12 shrink-0 bg-white flex items-center justify-center overflow-hidden">
                          {r.kind === "journal" ? (
                            <span className="specimen-lot text-[rgb(var(--saffron))]">J</span>
                          ) : (
                            <Image
                              src={asset(r.image)}
                              alt=""
                              width={48}
                              height={48}
                              unoptimized
                              className="object-contain w-full h-full"
                            />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-serif-display text-[18px] leading-[1.15] tracking-[-0.005em] text-[rgb(var(--ink-black))] truncate">
                            {r.title}
                          </h3>
                          <p className="specimen-lot opacity-60 mt-0.5 truncate">{r.subtitle}</p>
                        </div>
                        <span className="specimen-spec text-[rgb(var(--saffron))] hidden sm:inline">
                          {r.kind === "product" ? "PRODUCT" : r.kind === "recipe" ? "RECIPE" : "JOURNAL"}
                        </span>
                        <span className={`specimen-lot opacity-60 transition-transform ${i === active ? "translate-x-1" : ""}`}>→</span>
                      </Link>
                    </li>
                  ))
                )}
              </ol>

              {/* Hint footer */}
              <div className="border-t border-[rgb(var(--ink-black)/0.15)] border-t-[0.5px] px-6 py-3 flex flex-wrap items-center gap-x-6 gap-y-1">
                <p className="specimen-lot opacity-60">↑ ↓ NAVIGATE</p>
                <p className="specimen-lot opacity-60">↵ OPEN</p>
                <p className="specimen-lot opacity-60">ESC CLOSE</p>
                <p className="specimen-lot opacity-60 ml-auto">⌘K / CTRL+K · ANYWHERE</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SearchTrigger({ onClick }: { onClick: () => void }) {
  // This is rendered into the page DOM, but the actual placement is via
  // a fixed pill in the bottom-right. The Nav also calls setOpen via the
  // shared keyboard shortcut, so we don't need a Nav-embedded button.
  return (
    <button
      onClick={onClick}
      aria-label="Open search (⌘K)"
      className="fixed bottom-6 right-6 z-[60] bg-[rgb(var(--ink-black))] text-[rgb(var(--cream-paper))] px-4 py-3 specimen-spec hover:bg-[rgb(var(--saffron))] hover:text-[rgb(var(--ink-black))] transition-colors shadow-[0_8px_30px_-10px_rgba(20,17,15,0.45)] flex items-center gap-3"
    >
      {/* Crafted magnifying-glass — circle + 45° handle. Replaces the
          Unicode ⌕ which renders inconsistently across fonts and was being
          mistaken for a cursor on some browsers. */}
      <svg
        aria-hidden="true"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      >
        <circle cx="6" cy="6" r="4.2" />
        <line x1="9.2" y1="9.2" x2="12.5" y2="12.5" />
      </svg>
      SEARCH
      <span className="specimen-lot opacity-60 border border-current px-1.5 py-0.5">⌘K</span>
    </button>
  );
}

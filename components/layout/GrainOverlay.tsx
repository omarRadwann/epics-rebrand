"use client";

/**
 * Persistent animated grain overlay — opacity ~4%, mix-blend-mode multiply,
 * fixed across the whole viewport. Disabled on prefers-reduced-motion via
 * CSS rule in globals.css.
 *
 * Renders a tiny offscreen tile, scaled up via CSS so we never pay for
 * full-viewport pixel writes. The grain frames are PRE-BAKED once at
 * mount into a small pool of tiles, then cycled with a cheap drawImage.
 * The old version regenerated a 128×128 ImageData — 16k Math.random()
 * calls + a fresh allocation — every single frame; that was pure waste.
 */
import { useEffect, useRef } from "react";

const TILE = 128; // offscreen grain canvas size (square)
const TILE_COUNT = 8; // pre-baked frames cycled for animation
const FRAME_INTERVAL = 1000 / 24; // 24fps cycle — invisible at higher rates

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return; // CSS class handles visual hiding; skip RAF entirely

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = TILE;
    canvas.height = TILE;

    // Pre-bake the grain pool ONCE. Each tile is an offscreen canvas
    // filled with random monochrome noise — generated here, never again.
    const tiles: HTMLCanvasElement[] = [];
    for (let f = 0; f < TILE_COUNT; f++) {
      const tile = document.createElement("canvas");
      tile.width = TILE;
      tile.height = TILE;
      const tctx = tile.getContext("2d");
      if (!tctx) continue;
      const image = tctx.createImageData(TILE, TILE);
      const data = image.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 255;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 255;
      }
      tctx.putImageData(image, 0, 0);
      tiles.push(tile);
    }
    if (tiles.length === 0) return;

    let raf = 0;
    let last = 0;
    let frame = 0;

    const paint = (now: number) => {
      if (now - last >= FRAME_INTERVAL) {
        // Cheap: blit a pre-baked tile. No allocation, no RNG loop.
        const tile = tiles[frame % tiles.length]!;
        ctx.drawImage(tile, 0, 0);
        frame++;
        last = now;
      }
      raf = requestAnimationFrame(paint);
    };

    raf = requestAnimationFrame(paint);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="grain-overlay"
      // No `imageRendering: pixelated` — letting the browser bilinear-
      // scale the 128px tile gives soft FILM grain. Pixelated made the
      // whole page read as chunky low-fi noise.
      style={{
        width: "100vw",
        height: "100dvh",
      }}
      aria-hidden="true"
    />
  );
}

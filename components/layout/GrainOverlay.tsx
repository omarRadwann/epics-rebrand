"use client";

/**
 * Persistent animated grain overlay — opacity ~4%, mix-blend-mode multiply,
 * fixed across the whole viewport. Disabled on prefers-reduced-motion via
 * CSS rule in globals.css.
 *
 * Renders into a small offscreen canvas, then scales up via CSS so we never
 * pay for full-viewport pixel writes per frame.
 */
import { useEffect, useRef } from "react";

const TILE = 128;                          // offscreen grain canvas size (square)
const FRAME_INTERVAL = 1000 / 24;          // 24fps update — invisible at higher rates

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) return;          // CSS class handles visual hiding; skip RAF entirely

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    canvas.width = TILE;
    canvas.height = TILE;

    let raf = 0;
    let last = 0;

    const paint = (now: number) => {
      if (now - last >= FRAME_INTERVAL) {
        const image = ctx.createImageData(TILE, TILE);
        const data = image.data;
        for (let i = 0; i < data.length; i += 4) {
          const v = Math.random() * 255;
          data[i] = v;
          data[i + 1] = v;
          data[i + 2] = v;
          data[i + 3] = 255;
        }
        ctx.putImageData(image, 0, 0);
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
      style={{
        width: "100vw",
        height: "100dvh",
        imageRendering: "pixelated",
      }}
      aria-hidden="true"
    />
  );
}

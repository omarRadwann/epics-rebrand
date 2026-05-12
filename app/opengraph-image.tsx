import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Epics — Bread that doesn't apologise. Gluten-free, sugar-free, PKU-safe.";
export const runtime = "edge";

/**
 * Default OG image for the brand. Composed at edge with next/og.
 * Cream paper, serif headline, lot codes — the Specimen Pantry treatment in 1200×630.
 */
export default async function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#F5EFE2",
          color: "#1A1817",
          fontFamily: "Georgia, serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 64,
          position: "relative",
        }}
      >
        {/* Top band — lot codes */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "ui-monospace, Menlo, Consolas, monospace",
            fontSize: 18,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "#4A4641",
          }}
        >
          <span>EPICS · BRAND BOOK · LOT 26-0001</span>
          <span>ISO 22000:2018</span>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 160,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#1A1817",
            }}
          >
            Bread that
          </div>
          <div
            style={{
              fontSize: 160,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#1A1817",
            }}
          >
            doesn&rsquo;t
          </div>
          <div
            style={{
              fontSize: 160,
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
              color: "#1A1817",
              fontStyle: "italic",
            }}
          >
            apologise.
          </div>
        </div>

        {/* Bottom band — territory + saffron rule */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ width: 200, height: 2, background: "#D4801B" }} />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              fontFamily: "ui-monospace, Menlo, Consolas, monospace",
              fontSize: 18,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#1A1817",
            }}
          >
            <span>THE SPECIMEN PANTRY · APOTHECARY, BUT APPETIZING</span>
            <span style={{ color: "#8E2A2A" }}>CRYSTAL · BY EPICS · PKU</span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

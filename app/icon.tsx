import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";
export const runtime = "edge";

/**
 * Favicon — a serif "E" on cream paper. Generated at build/request time
 * via next/og so it stays in sync with brand tokens.
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#F5EFE2",
          color: "#1A1817",
          fontFamily: "Georgia, serif",
          fontSize: 28,
          fontWeight: 400,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          paddingBottom: 3,
        }}
      >
        E
      </div>
    ),
    { ...size }
  );
}

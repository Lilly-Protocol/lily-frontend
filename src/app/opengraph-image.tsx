import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#f7f7f5",
          color: "#111827",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Lily Protocol
        </div>
        <div
          style={{
            fontSize: 36,
            color: "#0f766e",
            fontWeight: 500,
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.4,
          }}
        >
          Contributor-ready frontend foundation for issue-driven development
        </div>
      </div>
    ),
    { ...size }
  );
}

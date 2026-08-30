import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Lily Protocol - Contributor-ready frontend foundation";
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
          backgroundColor: "#0f172a",
          color: "#f8fafc",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            marginBottom: 24,
          }}
        >
          Lily Protocol
        </div>
        <div
          style={{
            fontSize: 32,
            fontWeight: 400,
            opacity: 0.8,
            textAlign: "center",
            maxWidth: 900,
            lineHeight: 1.4,
          }}
        >
          Contributor-ready frontend foundation for issue-driven UI and product development.
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 24,
            opacity: 0.6,
          }}
        >
          lilyprotocol.dev
        </div>
      </div>
    ),
    { ...size }
  );
}

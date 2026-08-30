import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          background: "#06b6d4",
          borderRadius: "25%",
          color: "white",
          fontSize: 96,
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}

import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
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
          fontSize: 20,
          fontWeight: 700,
        }}
      >
        L
      </div>
    ),
    { ...size }
  );
}

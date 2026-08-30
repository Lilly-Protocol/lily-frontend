import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 180 180"
        fill="none"
        width="180"
        height="180"
      >
        <rect width="180" height="180" rx="36" fill="#06b6d4" />
        <path
          d="M56 124V56h22v46h34v22H56Z"
          fill="#fff"
        />
      </svg>
    ),
    { ...size },
  );
}

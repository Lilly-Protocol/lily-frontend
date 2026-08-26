"use client";

import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full`}
    >
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f7f7f5",
          color: "#111827",
          fontFamily: "var(--font-space-grotesk), sans-serif",
        }}
      >
        <div
          style={{
            maxWidth: "32rem",
            padding: "2rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.75rem",
            background: "#ffffff",
            boxShadow: "0 16px 40px rgba(17,24,39,0.06)",
            textAlign: "center",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#4b5563",
              marginBottom: "0.75rem",
            }}
          >
            Unexpected error
          </p>
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 600,
              margin: "0 0 0.75rem",
            }}
          >
            Something went wrong
          </h1>
          <p
            style={{
              color: "#4b5563",
              margin: "0 0 1.5rem",
              lineHeight: 1.6,
            }}
          >
            An unexpected error occurred while loading the application. Please try again.
          </p>
          {error.digest && (
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-mono), monospace",
                fontSize: "0.75rem",
                color: "#4b5563",
                marginBottom: "1.5rem",
              }}
            >
              Reference: {error.digest}
            </p>
          )}
          <button
            type="button"
            onClick={() => reset()}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0.625rem 1.25rem",
              borderRadius: "0.5rem",
              border: "none",
              background: "#0f766e",
              color: "#ffffff",
              fontFamily: "var(--font-space-grotesk), sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}

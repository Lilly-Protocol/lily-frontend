import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import { createSiteMetadata } from "@/config/site";

import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata = createSiteMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full bg-(--color-surface) text-(--color-ink)">
        {children}
      </body>
    </html>
  );
}

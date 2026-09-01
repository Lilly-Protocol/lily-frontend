 import type { Viewport } from "next";
 import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

import { createOrganizationJsonLd, createSiteMetadata } from "@/config/site";

import './globals.css';

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f7f5",
  colorScheme: "light",
};

export const metadata = createSiteMetadata();

const jsonLd = createOrganizationJsonLd();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationJsonLd = serializeJsonLd(createOrganizationJsonLd());

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full bg-[var(--color-surface)] text-[var(--color-ink)]">
        <script
          dangerouslySetInnerHTML={{ __html: organizationJsonLd }}
          id="organization-json-ld"
          type="application/ld+json"
        />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}


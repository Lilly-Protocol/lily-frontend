import type { NextConfig } from 'next';

export const legacyRedirects = [
  {
    source: '/dash',
    destination: '/app',
    permanent: true,
  },
  {
    source: '/sign-up',
    destination: '/signup',
    permanent: true,
  },
] as const;

const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'Content-Security-Policy',
    value:
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none'; base-uri 'self'; form-action 'self'",
  },
];

const nextConfig: NextConfig = {
  output: 'standalone',
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: '**.lillyprotocol.dev',
      },
      {
        protocol: 'https',
        hostname: 'cdn.lillyprotocol.dev',
      },
    ],
  },
  async redirects() {
    return [...legacyRedirects];
  },
};

let configExport: NextConfig = nextConfig;
try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const withSerwistInit = require('@serwist/next').default;
  const withSerwist = withSerwistInit({
    swSrc: 'app/sw.ts',
    swDest: 'public/sw.js',
    disable: process.env.NODE_ENV !== 'production',
  });
  configExport = withSerwist(nextConfig);
} catch {
  // Fallback to nextConfig when running outside of build environment
}

export default configExport;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.lillyprotocol.dev",
      },
      {
        protocol: "https",
        hostname: "cdn.lillyprotocol.dev",
      },
    ],
  },
};

export default nextConfig;

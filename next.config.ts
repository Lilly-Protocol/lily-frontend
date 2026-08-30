import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.lillyprotocol.com",
      },
      {
        protocol: "https",
        hostname: "**.superteam.fun",
      },
    ],
  },
};

export default nextConfig;

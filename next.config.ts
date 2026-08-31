import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.example.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "*.cdn.example.com",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;

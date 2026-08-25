import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "opengraph.example.com",
        port: "",
        pathname: "/og/**",
      },
      {
        protocol: "https",
        hostname: "assets.example.com",
        port: "",
        pathname: "/lily/**",
      },
    ],
  },
};

export default nextConfig;

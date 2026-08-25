import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  // Production (`next build` / `next start`) omits X-Powered-By when this is false.
  poweredByHeader: false,
};

export default nextConfig;

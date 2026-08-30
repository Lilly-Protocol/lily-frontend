import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typedRoutes: true,
  async redirects() {
    return [
      // Legacy dashboard routes → new app shell
      { source: "/dash/:path*", destination: "/app/:path*", permanent: true },
      { source: "/dashboard/:path*", destination: "/app/:path*", permanent: true },

      // Auth route normalization
      { source: "/sign-up", destination: "/signup", permanent: true },
      { source: "/sign-in", destination: "/signin", permanent: true },
      { source: "/log-in", destination: "/signin", permanent: true },
      { source: "/login", destination: "/signin", permanent: true },

      // Legacy domain aliases (agent-lily.online → lilyprotocol.dev canonical paths)
      { source: "/agents/:id", destination: "/app/agents/:id", permanent: true },
      { source: "/payments/:path*", destination: "/app/payments/:path*", permanent: true },
      { source: "/wallets/:path*", destination: "/app/wallets/:path*", permanent: true },
      { source: "/activity", destination: "/app/activity", permanent: true },
      { source: "/settings/:path*", destination: "/app/settings/:path*", permanent: true },
      { source: "/developers", destination: "/app/developers", permanent: true },
    ];
  },
};

export default nextConfig;

import type { NextConfig } from "next";

 const securityHeaders = [
   {
     key: "Permissions-Policy",
     value: "camera=(), microphone=(), geolocation=()",
   },
   {
     key: "Referrer-Policy",
     value: "strict-origin-when-cross-origin",
   },
 ];

 const nextConfig: NextConfig = {
   typedRoutes: true,
   async headers() {
     return [
       {
         source: "/(.*)",
         headers: securityHeaders,
       },
     ];
   },
 };

export default nextConfig;

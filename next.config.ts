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
         hostname: "**.gravatar.com",
       },
       {
         protocol: "https",
         hostname: "**.twimg.com",
       },
       {
         protocol: "https",
         hostname: "**.cloudinary.com",
       },
       {
         protocol: "https",
         hostname: "**.unsplash.com",
       },
     ],
   },
 };

export default nextConfig;

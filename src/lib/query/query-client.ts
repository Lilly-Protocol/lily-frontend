 "use client";

 import { QueryClient } from "@tanstack/react-query";

 function makeQueryClient(): QueryClient {
   return new QueryClient({
     defaultOptions: {
       queries: {
         staleTime: 60 * 1000,
         refetchOnWindowFocus: false,
         retry: 1,
       },
     },
   });
 }

 let browserQueryClient: QueryClient | undefined;

 export function getQueryClient(): QueryClient {
   if (typeof window === "undefined") {
     // Server: always create a new client to avoid leaking data between requests.
     return makeQueryClient();
   }

   // Browser: reuse a singleton so navigations don't reset the cache.
   if (!browserQueryClient) {
     browserQueryClient = makeQueryClient();
   }
   return browserQueryClient;
 }

 const requiredPublicVars = ["NEXT_PUBLIC_SITE_URL"] as const;
 
 type PublicEnvKey = (typeof requiredPublicVars)[number];
 
 function getRequiredEnv(key: PublicEnvKey): string {
   const value = process.env[key];
   if (!value) {
     throw new Error(
       `Missing required environment variable: ${key}. Please copy .env.example to .env.local and populate all NEXT_PUBLIC_* values.`,
     );
   }
   return value;
 }
 
 export const env = {
   siteUrl: getRequiredEnv("NEXT_PUBLIC_SITE_URL"),
 } as const satisfies Record<string, string>;

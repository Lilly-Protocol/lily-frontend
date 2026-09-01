import type { MetadataRoute } from 'next';

import { siteConfig } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  return {
    host: siteConfig.url,
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/app", "/app/"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}


import type { MetadataRoute } from 'next';

import { getAbsoluteUrl, siteConfig } from '@/config/site';

// Stable build timestamp to prevent unnecessary sitemap churn on every deploy
const BUILD_TIME = new Date("2026-08-30T00:00:00.000Z");

export default function sitemap(): MetadataRoute.Sitemap {
  return siteConfig.pages.map((page) => ({
    url: getAbsoluteUrl(page.path),
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }));
}

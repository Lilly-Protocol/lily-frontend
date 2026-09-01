import type { MetadataRoute } from 'next';

import { getAbsoluteUrl, siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return siteConfig.pages.map((page) => ({
    url: getAbsoluteUrl(page.path),
    lastModified,
    changeFrequency: 'weekly',
    priority: page.priority,
  }));
}

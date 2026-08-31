import { MetadataRoute } from 'next';
import { ALL_TOOLS_CATALOG } from '@/lib/allToolsList';
import { SITE_CONFIG } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const now = new Date();

  // Root & Hub pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/document-tools`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/dev-tools`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/api-hub`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/seo-keywords`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/developer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // Map all tools from the master catalog
  const toolPages: MetadataRoute.Sitemap = ALL_TOOLS_CATALOG.map((tool) => ({
    url: `${baseUrl}${tool.href}`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: tool.isPopular ? 0.9 : 0.8,
  }));

  // Deduplicate URLs in case of shared hub links
  const urlSet = new Set<string>();
  const combinedSitemap: MetadataRoute.Sitemap = [];

  for (const page of [...staticPages, ...toolPages]) {
    if (!urlSet.has(page.url)) {
      urlSet.add(page.url);
      combinedSitemap.push(page);
    }
  }

  return combinedSitemap;
}

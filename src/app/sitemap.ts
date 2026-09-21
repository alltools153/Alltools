import { MetadataRoute } from 'next';
import { TOOLS_REGISTRY } from '@/lib/tools-registry';
import { TOOLS as DOCUMENT_TOOLS } from '@/lib/docforge/tools-config';
import { SITE_CONFIG } from '@/lib/seo';

const CONTENT_UPDATED = new Date('2026-09-21T00:00:00.000Z');

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1.0, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/document-tools`, changeFrequency: 'daily', priority: 0.9, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/dev-tools`, changeFrequency: 'weekly', priority: 0.85, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/seo-keywords`, changeFrequency: 'weekly', priority: 0.8, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/api-hub`, changeFrequency: 'monthly', priority: 0.8, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/developer`, changeFrequency: 'monthly', priority: 0.7, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'monthly', priority: 0.6, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/terms`, changeFrequency: 'monthly', priority: 0.6, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'monthly', priority: 0.5, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/disclaimer`, changeFrequency: 'monthly', priority: 0.5, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/dmca`, changeFrequency: 'monthly', priority: 0.5, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/editorial-policy`, changeFrequency: 'monthly', priority: 0.5, lastModified: CONTENT_UPDATED },
    { url: `${baseUrl}/affiliate-disclosure`, changeFrequency: 'monthly', priority: 0.5, lastModified: CONTENT_UPDATED },
  ];

  const programmaticToolPages: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: CONTENT_UPDATED,
  }));

  const documentToolPages: MetadataRoute.Sitemap = DOCUMENT_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    lastModified: CONTENT_UPDATED,
  }));

  const urlSet = new Set<string>();
  const combinedSitemap: MetadataRoute.Sitemap = [];

  for (const page of [...staticPages, ...programmaticToolPages, ...documentToolPages]) {
    if (!urlSet.has(page.url)) {
      urlSet.add(page.url);
      combinedSitemap.push(page);
    }
  }

  return combinedSitemap;
}

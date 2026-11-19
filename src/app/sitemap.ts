import { MetadataRoute } from 'next';
import { TOOLS_REGISTRY } from '@/lib/tools-registry';
import { TOOLS as DOCUMENT_TOOLS } from '@/lib/docforge/tools-config';
import { SITE_CONFIG } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, changeFrequency: 'daily', priority: 1.0 },
    { url: `${baseUrl}/document-tools`, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/dev-tools`, changeFrequency: 'weekly', priority: 0.85 },
    { url: `${baseUrl}/seo-keywords`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/api-hub`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/developer`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy-policy`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/terms`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/cookie-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/disclaimer`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/dmca`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/editorial-policy`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/affiliate-disclosure`, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const programmaticToolPages: MetadataRoute.Sitemap = TOOLS_REGISTRY.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const documentToolPages: MetadataRoute.Sitemap = DOCUMENT_TOOLS.map((tool) => ({
    url: `${baseUrl}/tools/${tool.slug}`,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
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

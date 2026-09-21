import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  const apiDisallow = ['/api/', '/api/private/', '/api/py/debug'];

  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/api/og'],
        disallow: apiDisallow,
      },
      {
        userAgent: ['Googlebot', 'Googlebot-Image', 'Bingbot', 'DuckDuckBot', 'Applebot'],
        allow: ['/', '/api/og'],
        disallow: apiDisallow,
      },
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'ClaudeBot',
          'Claude-Web',
          'PerplexityBot',
          'Google-Extended',
          'Applebot-Extended',
        ],
        allow: ['/', '/llms.txt', '/api/og'],
        disallow: apiDisallow,
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
    host: SITE_CONFIG.url,
  };
}

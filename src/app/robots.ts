import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/py/debug', '/api/private/'],
    },
    sitemap: [
      'https://alltoolss.com/sitemap.xml',
      'https://alltoolss.in/sitemap.xml',
    ],
  };
}

import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/py/debug'],
    },
    sitemap: 'https://alltools.local/sitemap.xml',
  };
}

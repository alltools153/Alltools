import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'AllTools',
  title: 'AllTools — Enterprise Developer, Security, PDF, Finance & AI Utilities',
  description: 'Production-ready suite of 40+ high-performance tools: JSON Formatter, Regex Tester, JWT Decoder, AI SQL Generator, SSL & DNS Checker, 25+ PDF Tools, GST & SIP Wealth Calculators.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://alltools.dev',
  ogImage: '/og-image.png',
  author: 'AllTools Engineering Team',
  twitterHandle: '@alltools_dev',
};

export interface ToolSeoOptions {
  title: string;
  description: string;
  path: string;
  category?: string;
  keywords?: string[];
}

export function constructToolMetadata({
  title,
  description,
  path,
  category = 'Utilities',
  keywords = [],
}: ToolSeoOptions): Metadata {
  const canonicalUrl = `${SITE_CONFIG.url}${path}`;
  const fullTitle = `${title} — ${SITE_CONFIG.name}`;

  return {
    title: fullTitle,
    description,
    keywords: [
      'online tools',
      'developer utilities',
      'security scanner',
      'pdf studio',
      category.toLowerCase(),
      ...keywords,
    ],
    authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
    creator: SITE_CONFIG.author,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: SITE_CONFIG.ogImage,
          width: 1200,
          height: 630,
          alt: `${title} on ${SITE_CONFIG.name}`,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SITE_CONFIG.ogImage],
      creator: SITE_CONFIG.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generates Schema.org SoftwareApplication JSON-LD
 */
export function generateSoftwareAppJsonLd(name: string, description: string, path: string, category: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    applicationCategory: category,
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  };
}

/**
 * Generates Schema.org FAQPage JSON-LD
 */
export function generateFaqJsonLd(faqs: Array<{ q: string; a: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };
}

/**
 * Generates Schema.org BreadcrumbList JSON-LD
 */
export function generateBreadcrumbJsonLd(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

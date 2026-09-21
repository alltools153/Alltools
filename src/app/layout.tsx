import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FooterDirectory from '@/components/FooterDirectory';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import GoogleAdSense from '@/components/GoogleAdSense';
import CookieConsentBanner from '@/components/CookieConsentBanner';
import { SITE_CONFIG } from '@/lib/seo';
import { TOOLS_REGISTRY } from '@/lib/tools-registry';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'AllToolss — Enterprise Developer, Security, PDF, Finance & AI Utilities',
    template: '%s | AllToolss',
  },
  description:
    'AllToolss is a production-ready suite of 40+ high-performance tools: JSON Formatter, Regex Tester, JWT Decoder, AI SQL Generator, Resume ATS Scanner, SSL & DNS Checker, 25+ PDF Tools, GST & SIP Wealth Calculators.',
  keywords: [
    'alltoolss',
    'alltoolss online',
    'alltoolss suite',
    'alltoolss developer utilities',
    'all tools online free',
    'developer utilities',
    'json formatter',
    'jwt decoder',
    'regex tester',
    'vapt scanner',
    'resume ats checker',
    'pdf tools online',
    'age calculator',
    'bengali calendar 1431 1432',
    'sip calculator',
    'gst calculator',
    'stock market live',
  ],
  applicationName: SITE_CONFIG.name,
  category: 'technology',
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  publisher: 'AllToolss Platform',
  icons: {
    icon: [{ url: '/icon', type: 'image/png', sizes: '32x32' }],
    apple: [{ url: '/apple-icon', type: 'image/png', sizes: '180x180' }],
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'x-default': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'AllToolss — Enterprise Developer, Security, PDF, Finance & AI Utilities',
    description:
      'Unified suite of 40+ high-performance online developer, security, PDF, and finance tools. 100% in-server execution, fast & private.',
    images: [
      {
        url: `${SITE_CONFIG.url}/api/og?title=AllToolss%20Multi-Tool%20Suite&desc=Enterprise%20Developer%2C%20Security%2C%20PDF%2C%20Finance%20%26%20AI%20Utilities&cat=Production%20SaaS`,
        width: 1200,
        height: 630,
        alt: 'AllToolss Multi-Tool Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllToolss — Enterprise Developer, Security, PDF, Finance & AI Utilities',
    description:
      'Unified suite of 40+ high-performance online developer, security, PDF, and finance tools. 100% in-server execution, fast & private.',
    images: [`${SITE_CONFIG.url}/api/og?title=AllToolss%20Multi-Tool%20Suite&desc=Enterprise%20Developer%2C%20Security%2C%20PDF%2C%20Finance%20%26%20AI%20Utilities&cat=Production%20SaaS`],
    creator: SITE_CONFIG.twitterHandle,
    site: SITE_CONFIG.twitterHandle,
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
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION &&
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION !== 'google-site-verification-placeholder' && {
        google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      }),
    ...(process.env.NEXT_PUBLIC_YANDEX_VERIFICATION && {
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    }),
    ...(process.env.NEXT_PUBLIC_BING_VERIFICATION &&
      process.env.NEXT_PUBLIC_BING_VERIFICATION !== 'bing-verification-placeholder' && {
        other: {
          'msvalidate.01': [process.env.NEXT_PUBLIC_BING_VERIFICATION],
        },
      }),
  },
};

const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${SITE_CONFIG.url}/#organization`,
  name: 'AllToolss',
  url: SITE_CONFIG.url,
  logo: `${SITE_CONFIG.url}/apple-icon`,
  founder: {
    '@type': 'Person',
    name: 'Santanu Batabyal',
    jobTitle: 'Principal Application Security Architect',
    url: `${SITE_CONFIG.url}/developer`,
  },
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'alltools153@gmail.com',
    contactType: 'customer support',
    availableLanguage: ['English', 'Bengali', 'Hindi'],
  },
  sameAs: [
    'https://twitter.com/alltools_dev',
  ],
};

const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'AllToolss',
  url: SITE_CONFIG.url,
  inLanguage: 'en-US',
  publisher: {
    '@id': `${SITE_CONFIG.url}/#organization`,
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_CONFIG.url}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const TOOLS_ITEMLIST_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AllToolss online tools',
  itemListOrder: 'https://schema.org/ItemListOrderAscending',
  numberOfItems: TOOLS_REGISTRY.length,
  itemListElement: TOOLS_REGISTRY.map((tool, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: tool.name,
    url: `${SITE_CONFIG.url}/tools/${tool.slug}`,
  })),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics & Google AdSense Scripts */}
        <GoogleAnalytics />
        <GoogleAdSense />

        {/* Structured Data / JSON-LD for SEO & Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ORGANIZATION_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(WEBSITE_SCHEMA),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(TOOLS_ITEMLIST_SCHEMA),
          }}
        />
      </head>
      <body className="antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <FooterDirectory />
          <Footer />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}

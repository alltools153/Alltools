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

const DEFAULT_OG_IMAGE = `${SITE_CONFIG.url}/api/og?title=${encodeURIComponent(
  SITE_CONFIG.title
)}&desc=${encodeURIComponent(SITE_CONFIG.description)}&cat=Free%20Online%20Tools`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: SITE_CONFIG.title,
    template: '%s | AllToolss',
  },
  description: SITE_CONFIG.description,
  keywords: [
    'alltoolss',
    'free online tools',
    'online developer tools',
    'online security tools',
    'free PDF tools',
    'json formatter',
    'regex tester',
    'jwt decoder',
    'PDF converter',
    'age calculator',
    'sip calculator',
    'gst calculator',
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
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [{
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt: SITE_CONFIG.title,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_CONFIG.title,
    description: SITE_CONFIG.description,
    images: [DEFAULT_OG_IMAGE],
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

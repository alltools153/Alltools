import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO_JSON_LD } from '@/lib/seoKeywords';

import { SITE_CONFIG } from '@/lib/seo';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: 'AllTools — Enterprise Developer, Security, PDF, Finance & AI Utilities',
    template: '%s | AllTools',
  },
  description:
    'AllTools is a production-ready suite of 40+ high-performance tools: JSON Formatter, Regex Tester, JWT Decoder, AI SQL Generator, SSL & DNS Checker, 25+ PDF Tools, GST & SIP Wealth Calculators.',
  keywords: [
    'all tools online free',
    'developer utilities',
    'json formatter',
    'jwt decoder',
    'regex tester',
    'vapt scanner',
    'pdf tools online',
    'age calculator',
    'bengali calendar 1431 1432',
    'sip calculator',
    'gst calculator',
    'stock market live',
  ],
  authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
  creator: SITE_CONFIG.author,
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: 'AllTools — Enterprise Developer, Security, PDF, Finance & AI Utilities',
    description:
      'Unified suite of 40+ high-performance online developer, security, PDF, and finance tools. 100% in-server execution, fast & private.',
    images: [
      {
        url: `${SITE_CONFIG.url}/api/og?title=AllTools%20Multi-Tool%20Suite&desc=Enterprise%20Developer%2C%20Security%2C%20PDF%2C%20Finance%20%26%20AI%20Utilities&cat=Production%20SaaS`,
        width: 1200,
        height: 630,
        alt: 'AllTools Multi-Tool Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllTools — Enterprise Developer, Security, PDF, Finance & AI Utilities',
    description:
      'Unified suite of 40+ high-performance online developer, security, PDF, and finance tools. 100% in-server execution, fast & private.',
    images: [`${SITE_CONFIG.url}/api/og?title=AllTools%20Multi-Tool%20Suite&desc=Enterprise%20Developer%2C%20Security%2C%20PDF%2C%20Finance%20%26%20AI%20Utilities&cat=Production%20SaaS`],
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Structured Data / JSON-LD for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO_JSON_LD.webApp),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(SEO_JSON_LD.faqPage),
          }}
        />
      </head>
      <body className="antialiased selection:bg-primary selection:text-primary-foreground min-h-screen flex flex-col font-sans">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

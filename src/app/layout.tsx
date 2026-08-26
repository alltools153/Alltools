import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { SEO_JSON_LD } from '@/lib/seoKeywords';

export const metadata: Metadata = {
  metadataBase: new URL('https://alltools.local'),
  title: {
    default: 'AllTools - Multi-Tool Suite | Age Calculator, VAPT Scanner & Bengali Panjika',
    template: '%s | AllTools Multi-Project Suite',
  },
  description:
    'AllTools is a unified multi-project suite featuring High-Precision Chronological & Planetary Age Calculator, Website VAPT Security Scanner & OWASP Engine, and Authentic Bengali Calendar & Panjika (বাংলা পঞ্জিকা). Powered by Next.js and Python FastAPI with 7 themes.',
  keywords: [
    'all tools online free',
    'multi tool web app',
    'age calculator online',
    'website vapt scanner',
    'bengali calendar 1431 1432 1433',
    'বাংলা পঞ্জিকা তিথি নক্ষত্র',
    'owasp api security audit',
    'chronological age calculator',
    'http security headers check',
    'fastapi nextjs developer suite',
  ],
  authors: [{ name: 'Santanu Batabyal', url: 'https://github.com/alltools153/Alltools' }],
  creator: 'Santanu Batabyal',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://alltools.local',
    siteName: 'AllTools Multi-Project Suite',
    title: 'AllTools - Multi-Tool Hub (Age Calculator, VAPT Scanner, Bengali Calendar)',
    description:
      'High-precision Age & Planetary Milestone Calculator, OWASP VAPT Security Scanner, and Authentic Bengali Calendar with Live Bengali Clock.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AllTools - Unified Multi-Tool Suite',
    description:
      'High-precision Age & Planetary Calculator, VAPT Security Scanner, and Bengali Calendar powered by Next.js & Python.',
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

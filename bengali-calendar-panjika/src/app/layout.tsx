import type { Metadata } from 'next';
import { hindSiliguri, notoSansBengali, notoSerifBengali, tiroBangla } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'বাংলা ক্যালেন্ডার ও পঞ্জিকা – Bengali Calendar & Panjika (১৪৩৩ বঙ্গাব্দ / 2026)',
  description:
    'ঐতিহ্যবাহী খাঁটি বাংলা ক্যালেন্ডার ও পঞ্জিকা। রচয়িতা: শান্তনু বটব্যাল, কুচিয়াকোল, বাঁকুড়া। আজকের নির্ভুল তিথি, নক্ষত্র, অমৃতযোগ, রাহুকাল, শুভ বিবাহ লগ্ন ১৪৩৩, দুর্গাপূজা ২০২৬ সময়সূচী, একাদশী তালিকা ও রাশিফল। সূর্যসিদ্ধান্ত ও বিশুদ্ধ সিদ্ধান্ত সম্মত।',
  keywords: [
    'Santanu Batabyal',
    'Kuchiakol Bankura',
    'Bengali calendar 2026',
    'Bangla calendar 1433',
    'Bengali panjika today',
    'Bengali marriage dates 1433',
    'Subho Bibaho dates',
    'Bangla calendar with tithi',
    'Durga Puja 2026 date bengali calendar',
    'বাংলা ক্যালেন্ডার ২০২৬',
    'আজকের পঞ্জিকা',
    'শুভ বিবাহের দিন ও লগ্ন',
    'একাদশী তালিকা',
    '১৪৩৩ বঙ্গাব্দ পঞ্জিকা',
    'শান্তনু বটব্যাল',
    'বাঁকুড়া পঞ্জিকা'
  ],
  authors: [{ name: 'Santanu Batabyal, Kuchiakol, Bankura' }],
  alternates: {
    canonical: 'https://bengali-calendar-panjika.vercel.app',
  },
  openGraph: {
    title: 'বাংলা ক্যালেন্ডার ও পঞ্জিকা – Bengali Calendar & Panjika (১৪৩৩ বঙ্গাব্দ)',
    description: 'খাঁটি বাংলা দিনপঞ্জি, নির্ভুল তিথি, শুভ বিবাহ লগ্ন ও শাস্ত্রীয় অমৃতযোগ নির্ঘণ্ট। রচয়িতা: শান্তনু বটব্যাল, কুচিয়াকোল, বাঁকুড়া।',
    url: 'https://bengali-calendar-panjika.vercel.app',
    siteName: 'বাংলা পঞ্জিকা ও ক্যালেন্ডার',
    locale: 'bn_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'বাংলা ক্যালেন্ডার ও পঞ্জিকা (Bengali Panjika 1433)',
    description: '১৪৩৩ বঙ্গাব্দের খাঁটি সনাতন বাংলা দিনপঞ্জি ও শুভ লগ্ন সময়সূচী। শান্তনু বটব্যাল, কুচিয়াকোল, বাঁকুড়া।',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLdWebApp = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'বাংলা ক্যালেন্ডার ও পঞ্জিকা (Bengali Calendar & Panjika)',
    author: {
      '@type': 'Person',
      name: 'Santanu Batabyal',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Kuchiakol',
        addressRegion: 'Bankura',
        addressCountry: 'India',
      },
    },
    url: 'https://bengali-calendar-panjika.vercel.app',
    applicationCategory: 'LifestyleApplication',
    operatingSystem: 'All',
    description:
      'Interactive Bengali Calendar and Panjika for Bongabdo 1433 / 2026 created by Santanu Batabyal, Kuchiakol, Bankura with live tithi, auspicious muhurats, marriage dates, and horoscope.',
    inLanguage: ['bn', 'en'],
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'INR',
    },
  };

  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`scroll-smooth ${hindSiliguri.variable} ${notoSansBengali.variable} ${notoSerifBengali.variable} ${tiroBangla.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebApp) }}
        />
      </head>
      <body
        suppressHydrationWarning
        className="royal-canvas-bg min-h-screen flex flex-col justify-between antialiased selection:bg-[#D4AF37] selection:text-[#1A0E17] font-sans"
      >
        {children}
      </body>
    </html>
  );
}

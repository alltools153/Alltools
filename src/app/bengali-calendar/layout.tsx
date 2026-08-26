import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'বাংলা পঞ্জিকা ও ক্যালেন্ডার ১৪৩১-১৪৩৩ (Bengali Calendar & Panjika) | AllTools',
  description:
    'আজকের বাংলা পঞ্জিকা, শুভ মুহূর্ত, তিথি ও নক্ষত্র, ইংরেজি থেকে বাংলা তারিখ কনভার্টার এবং দুর্গাপূজা ও উৎসবের সম্পূর্ণ নির্ঘণ্ট। Authentic Bengali Calendar & Panjika Almanac.',
  keywords: [
    'bengali calendar 1431 1432 1433',
    'বাংলা ক্যালেন্ডার',
    'bengali panjika today',
    'আজকের তিথি ও নক্ষত্র',
    'english to bengali date converter',
    'durga puja 2026 calendar',
    'amrita yoga mahendra yoga today',
    'subho bibaho lagnam',
    'live bengali clock',
  ],
  openGraph: {
    title: 'বাংলা পঞ্জিকা ও ক্যালেন্ডার ১৪৩১-১৪৩৩ | AllTools',
    description: 'Live Bengali Clock, Authentic Panjika Limbs, Date Converter, and Festival Almanac.',
    type: 'website',
  },
};

export default function BengaliCalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}

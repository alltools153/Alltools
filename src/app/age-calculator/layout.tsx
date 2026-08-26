import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Age Milestone & Cosmic Planetary Calculator | AllTools',
  description:
    'Calculate exact chronological age in years, months, days, hours, minutes, and seconds. Discover planetary age on Mars and Jupiter, biological milestones, and Chinese zodiac with leap year precision.',
  keywords: [
    'age calculator online',
    'chronological age calculator',
    'calculate exact age',
    'planetary age calculator',
    'how old am i today',
    'next birthday countdown',
    'biological milestone calculator',
    'chinese zodiac calculator',
    'date of birth calculator',
  ],
  openGraph: {
    title: 'Age Milestone & Cosmic Calculator | AllTools',
    description:
      'High-precision Chronological Age, Planetary Ages (Mercury to Pluto), Next Birthday Countdown, and Biological Life Stats.',
    type: 'website',
  },
};

export default function AgeCalculatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}

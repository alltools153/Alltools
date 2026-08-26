import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SEO Intelligence & Keywords Master Center | AllTools',
  description:
    'Comprehensive curated SEO keyword catalog for AllTools, Age Calculator, Website VAPT Security Scanner, and Bengali Calendar with search intent, volume tier metrics, and meta tag generators.',
  keywords: [
    'alltools seo keywords',
    'developer tools seo directory',
    'bengali calendar seo keywords',
    'vapt scanner seo tags',
    'age calculator search volume keywords',
  ],
};

export default function SeoKeywordsLayout({ children }: { children: React.ReactNode }) {
  return children;
}

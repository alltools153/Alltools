import type { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'SEO Keywords & Knowledge Graph Index — Search Matrix',
  description: 'Explore the high-intent keyword index and semantic knowledge graph mapping across AllToolss developer, security, PDF, and financial calculator utilities.',
  path: '/seo-keywords',
  category: 'Platform & Docs',
  keywords: ['seo keywords', 'knowledge graph', 'alltoolss sitemap keywords', 'search index'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

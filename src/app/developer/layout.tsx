import type { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Santanu Batabyal — Principal Security & Systems Architect',
  description: 'Profile of Santanu Batabyal, creator of AllToolss multi-tool platform. Discover the in-server architecture philosophy, security paradigms, and engineering principles.',
  path: '/developer',
  category: 'Platform & Docs',
  keywords: ['santanu batabyal', 'systems architect', 'application security', 'alltoolss creator'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

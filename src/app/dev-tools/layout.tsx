import type { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Developer Micro-Tool Suite — JSON, Regex & JWT Inspector',
  description: 'Unified workspace for developer utilities: JSON Formatter, Interactive Regex Tester, and JWT Token Decoder with 100% in-browser security.',
  path: '/dev-tools',
  category: 'Developer Utilities',
  keywords: ['developer tools', 'json formatter', 'regex tester', 'jwt decoder', 'client side dev tools'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from 'next';
import { getBlueprintMetadata } from '@/lib/seo';

export const metadata: Metadata = getBlueprintMetadata('document-tools');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

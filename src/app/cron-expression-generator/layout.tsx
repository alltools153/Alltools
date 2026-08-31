import type { Metadata } from 'next';
import { getBlueprintMetadata } from '@/lib/seo';

export const metadata: Metadata = getBlueprintMetadata('cron-expression-generator');

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

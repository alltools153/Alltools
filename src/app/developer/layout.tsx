import type { Metadata } from 'next';
import { constructToolMetadata, TOOLS_METADATA_CONFIG } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata(TOOLS_METADATA_CONFIG['developer']);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

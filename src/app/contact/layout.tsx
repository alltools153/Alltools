import type { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Contact Us — Support & Engineering Feedback',
  description: 'Get in touch with the AllToolss team and lead systems architect for technical support, feature requests, or partnership inquiries.',
  path: '/contact',
  category: 'Support & Docs',
  keywords: ['contact alltoolss', 'developer support', 'customer feedback', 'partnership inquiries'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

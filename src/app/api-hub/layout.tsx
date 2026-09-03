import type { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'API Hub & OpenAPI Reference — In-Server Microservices',
  description: 'Interactive API documentation and schema explorer for AllToolss FastAPI microservices: VAPT security engine, Panjika ephemeris, Age calculations, and PDF processors.',
  path: '/api-hub',
  category: 'Platform & Docs',
  keywords: ['alltoolss api', 'rest api documentation', 'openapi json', 'fastapi endpoints'],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

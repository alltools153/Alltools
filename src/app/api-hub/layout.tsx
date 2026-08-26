import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Unified REST API Documentation & Interactive Explorer | AllTools',
  description:
    'Complete interactive REST API documentation for AllTools Python FastAPI and Next.js backend services. Explore Age Calculation API, Website VAPT Security Scanner API, and Bengali Panjika Almanac endpoints with code generators.',
  keywords: [
    'alltools api documentation',
    'fastapi age calculator endpoint',
    'vapt scanner rest api',
    'bengali panjika rest api',
    'developer api documentation',
    'swagger ui redoc fast api',
  ],
};

export default function ApiHubLayout({ children }: { children: React.ReactNode }) {
  return children;
}

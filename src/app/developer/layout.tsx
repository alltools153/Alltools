import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lead Architect & Developer Profile | Santanu Batabyal | AllTools',
  description:
    'Meet Santanu Batabyal — Principal Application Security Architect & Full-Stack Engineer. Creator and Lead Architect of AllTools, Age Milestone Calculator, Website VAPT Security Scanner, and Bengali Calendar.',
  keywords: [
    'santanu batabyal',
    'principal security architect',
    'full stack engineer',
    'alltools creator',
    'nextjs fastapi developer',
    'vapt application security engineer',
  ],
};

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return children;
}

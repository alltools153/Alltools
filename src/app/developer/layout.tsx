import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Developer Profiles | AllTools',
  description:
    'Meet the developers behind AllTools: Santanu Batabyal, Lead Architect, and Saikat Samanta, Full Stack Developer specializing in ReactJS, Node.js, Python, and MongoDB.',
  keywords: [
    'santanu batabyal',
    'principal security architect',
    'full stack engineer',
    'alltools creator',
    'nextjs fastapi developer',
    'vapt application security engineer',
    'saikat samanta',
    'reactjs nodejs python mongodb developer',
  ],
};

export default function DeveloperLayout({ children }: { children: React.ReactNode }) {
  return children;
}

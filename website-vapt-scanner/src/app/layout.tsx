import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VAPT-99 // 1980s Retro Website Security Scanner & OWASP Engine',
  description:
    'High-precision in-server passive vulnerability assessment and penetration testing scanner with 1980s MS-DOS terminal and continuous dot-matrix tractor-feed printout reports.',
  keywords: [
    'VAPT',
    'Security Scanner',
    'OWASP',
    'Headers Scanner',
    'SSL TLS Checker',
    'Retro UI',
    'MS-DOS Terminal',
    'Dot Matrix Paper',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0c100c] text-[#33ff33] antialiased selection:bg-[#33ff33] selection:text-[#0c100c]">
        {children}
      </body>
    </html>
  );
}

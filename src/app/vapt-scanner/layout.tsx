import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Website VAPT Security Scanner & OWASP API Top 10 Auditor | AllTools',
  description:
    'Perform instant passive web application vulnerability assessment & penetration testing (VAPT). Audit HTTP security headers (HSTS, CSP, XFO), SSL/TLS ciphers, DNS CAA/SPF/DMARC records, and OWASP API Top 10 compliance.',
  keywords: [
    'website vapt scanner',
    'free vulnerability assessment tool',
    'http security headers check',
    'hsts csp x-frame-options audit',
    'ssl tls certificate inspector',
    'owasp api security top 10 checklist',
    'dns spf dmarc caa lookup',
    'web penetration testing tool free',
    'ssrf protection check',
  ],
  openGraph: {
    title: 'Website VAPT Security Scanner | AllTools',
    description:
      'Audit HTTP Security Headers, SSL/TLS Ciphers, DNS Records, and OWASP API Top 10 vectors with instant report generation.',
    type: 'website',
  },
};

export default function VaptScannerLayout({ children }: { children: React.ReactNode }) {
  return children;
}

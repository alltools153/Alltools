import React from 'react';
import Link from 'next/link';
import { FileCheck2, ShieldAlert, Scale, ArrowLeft, Mail, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Terms of Service — Acceptable Use & Legal Agreement',
  description:
    'Terms of Service for AllToolss. Outlines acceptable use policies, intellectual property rights, security scanner authorizations, and liability disclaimers.',
  path: '/terms',
  category: 'Legal & Policy',
  keywords: ['terms of service', 'user agreement', 'legal disclaimer', 'alltoolss terms'],
});

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-b border-border pb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Legal &amp; Policy</span>
          <span>/</span>
          <span className="text-primary font-bold">Terms of Service</span>
        </div>

        {/* Header Title */}
        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Scale className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold">
              User Agreement &amp; Acceptable Use
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Terms of Service</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Effective Date: September 2, 2026 | Last Updated: September 2026
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">1. Acceptance of Terms</h2>
            <p>
              By accessing and using <strong>AllToolss</strong> (accessible at alltoolss.com and alltoolss.in), you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service, our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link>, and our <Link href="/disclaimer" className="text-primary underline">Legal Disclaimer</Link>. If you do not agree with any part of these terms, you must discontinue using our services immediately.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">2. Permitted &amp; Acceptable Use Policy</h2>
            <p>
              AllToolss grants you a personal, non-exclusive, non-transferable license to use our web-based developer tools, document tools, calculators, and cybersecurity auditors for lawful personal, educational, and professional purposes.
            </p>
            <p>You strictly agree <strong>NOT</strong> to:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Use the Website VAPT Security Scanner or N-Map Port Audit against any server, hostname, or IP address that you do not own or lack explicit written authorization to test.</li>
              <li>Launch automated denial-of-service (DoS/DDoS) attacks or automated scraping bots that degrade server availability.</li>
              <li>Attempt to reverse-engineer, exploit, or bypass rate-limiting controls on our Next.js or Python backend APIs.</li>
              <li>Upload malicious code, viruses, malware, or illicit documents through our file conversion or OCR tools.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">3. Security Audit &amp; Penetration Testing Tools</h2>
            <p>
              Our VAPT scanner, DNS inspector, SSL checker, and email security tools perform purely passive, non-invasive HTTP header and DNS reconnaissance. They do not inject exploits, bypass access controls, or damage target infrastructure. You are solely responsible for ensuring compliance with applicable cybersecurity and cybercrime laws (including the US CFAA, UK Computer Misuse Act, and India IT Act 2000).
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">4. Intellectual Property &amp; Open Standards</h2>
            <p>
              All original visual assets, branding, logos, layout architectures, and algorithmic implementations on AllToolss are the intellectual property of Santanu Batabyal and AllToolss. Open-source libraries (e.g. PDF.js, Mammoth, Lucide Icons, Tesseract) remain the property of their respective copyright holders under MIT / Apache 2.0 licenses.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">5. Disclaimer of Warranties &amp; Limitation of Liability</h2>
            <p>
              ALL TOOLS AND SERVICES ON ALLTOOLSS ARE PROVIDED ON AN <strong>&quot;AS IS&quot;</strong> AND <strong>&quot;AS AVAILABLE&quot;</strong> BASIS WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
            </p>
            <p>
              IN NO EVENT SHALL ALLTOOLSS, ITS DEVELOPERS, OR ITS HOSTING PROVIDERS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR EXEMPLARY DAMAGES (INCLUDING LOSS OF PROFITS, DATA, OR BUSINESS INTERRUPTION) ARISING FROM YOUR USE OF OR INABILITY TO USE OUR TOOLS.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">6. Contact Information</h2>
            <p>
              For legal inquiries, copyright notices, or questions regarding these Terms of Service, please contact us at:
            </p>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border font-mono text-xs text-foreground space-y-1">
              <p><strong>Entity:</strong> AllToolss Suite Legal Administration</p>
              <p><strong>Official Email:</strong> <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a></p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

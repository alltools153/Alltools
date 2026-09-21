import React from 'react';
import Link from 'next/link';
import { AlertTriangle, ShieldAlert, Scale, ArrowLeft, TrendingUp, ShieldCheck, FileCheck2 } from 'lucide-react';
import { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Legal Disclaimer — Financial, Security & Conversion Disclaimers',
  description:
    'Legal disclaimers for AllToolss regarding financial calculations, cybersecurity auditing tools, ATS resume recommendations, and document conversions.',
  path: '/disclaimer',
  category: 'Legal & Policy',
  keywords: ['legal disclaimer', 'financial calculator disclaimer', 'vapt scan disclaimer', 'alltoolss terms'],
});

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-b border-border pb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Legal</span>
          <span>/</span>
          <span className="text-primary font-bold">Disclaimer</span>
        </div>

        {/* Header Title */}
        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <AlertTriangle className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono font-bold">
              General &amp; Technical Disclaimers
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Legal Disclaimer</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last Updated: September 2026 | Verified Contact: <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">1. General Information Disclaimer</h2>
            <p>
              The information and calculations provided on <strong>AllToolss</strong> (<a href="https://alltoolss.com" className="text-primary underline">alltoolss.com</a>) are for general educational, computational, and technical assistance purposes only. While we make every effort to maintain accurate and up-to-date mathematical and computational algorithms, AllToolss makes no representations or warranties of any kind regarding completeness, accuracy, reliability, or suitability.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>2. Financial &amp; Investment Calculations Disclaimer</span>
            </h2>
            <p>
              Tools such as the <strong>GST Calculator</strong>, <strong>SIP Wealth Calculator</strong>, and <strong>Indian Stock Market Live Ticker</strong> are intended strictly for hypothetical illustration and estimation.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Calculations do not constitute financial, investment, taxation, or accounting advice.</li>
              <li>Market indices (Sensex, Nifty 50) and returns projections are subject to market volatility.</li>
              <li>Always consult a certified financial planner, chartered accountant, or SEBI-registered investment advisor before making financial decisions.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-indigo-400" />
              <span>3. Cybersecurity &amp; VAPT Scanner Disclaimer</span>
            </h2>
            <p>
              The <strong>Website VAPT Security Scanner</strong> and <strong>DNS Record Inspector</strong> perform passive, non-intrusive reconnaissance checks.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Users are strictly authorized to scan only websites and infrastructure that they personally own or have received formal authorization to audit.</li>
              <li>AllToolss disclaims all liability for unauthorized scans or misuse of security diagnostic tools.</li>
              <li>A passing VAPT scan does not guarantee complete immunity from all zero-day vulnerabilities or security exploits.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-cyan-400" />
              <span>4. Resume ATS Checker &amp; Hiring Disclaimer</span>
            </h2>
            <p>
              The <strong>Resume ATS Compatibility Checker</strong> provides algorithmic scoring and keyword recommendations based on industry parser patterns. AllToolss does not guarantee job interviews, employment offers, or specific recruiter outcomes, as individual corporate hiring decisions depend on human evaluation and company-specific requirements.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">5. Contact for Questions</h2>
            <p>
              If you have any questions or require further clarification regarding these disclaimers, please contact us at <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

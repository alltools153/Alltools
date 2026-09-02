import React from 'react';
import Link from 'next/link';
import { Award, BookOpen, CheckCircle2, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Editorial Policy — Accuracy & Verification Standards',
  description:
    'Editorial standards and computational verification practices of AllToolss. Details how we maintain precision across all developer and scientific calculators.',
};

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-b border-border pb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Editorial</span>
          <span>/</span>
          <span className="text-primary font-bold">Editorial Policy</span>
        </div>

        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <BookOpen className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold">
              E-E-A-T Quality Commitment
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Editorial &amp; Verification Policy</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last Updated: September 2026 &bull; Verified Contact: <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">1. Algorithmic Integrity &amp; Verification Standards</h2>
            <p>
              At <strong>AllToolss</strong>, computational accuracy is our highest priority. Every mathematical model, cryptographic algorithm, date conversion formula, and security audit pattern is rigorously tested against verified international standards:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Cryptographic Standards:</strong> Password entropy and hashing tools follow NIST Special Publication 800-63 guidelines.</li>
              <li><strong>Security Audits:</strong> VAPT scanner checks follow OWASP Application Security Verification Standards (ASVS).</li>
              <li><strong>Astrological &amp; Solar Algorithms:</strong> Bengali Panjika calculations are verified against traditional Surya Siddhanta astronomical positions.</li>
              <li><strong>Taxation &amp; Finance:</strong> GST formulas adhere to the Goods and Services Tax Council of India statutory provisions.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">2. Independent Editorial Independence</h2>
            <p>
              AllToolss does not accept paid endorsements to artificially alter tool outputs, calculation results, or security rankings. Advertisements served via Google AdSense are clearly delineated from core tool functionality and do not influence tool algorithms.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">3. Error Reporting &amp; Correction Protocol</h2>
            <p>
              If you detect any discrepancy, calculation error, or algorithm edge-case in any of our tools, we encourage immediate reporting to <a href="mailto:alltools153@gmail.com" className="text-primary underline font-medium">alltools153@gmail.com</a>. Corrections are patched into production within 48 business hours after technical verification.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

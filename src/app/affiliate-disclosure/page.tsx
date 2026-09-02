import React from 'react';
import Link from 'next/link';
import { DollarSign, ShieldCheck, ArrowLeft, HeartHandshake } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Affiliate & Advertising Disclosure — FTC Transparency',
  description:
    'Affiliate and monetization disclosure for AllToolss adhering to FTC guidelines, Google AdSense policies, and transparent reader disclosure.',
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-b border-border pb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">Legal</span>
          <span>/</span>
          <span className="text-primary font-bold">Affiliate &amp; Advertising Disclosure</span>
        </div>

        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <HeartHandshake className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold">
              16 CFR § 255 &amp; FTC Transparency
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Affiliate &amp; Advertising Disclosure</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last Updated: September 2026 &bull; Verified Contact: <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">1. Commitment to Reader Transparency</h2>
            <p>
              In compliance with the Federal Trade Commission (FTC) guidelines and international advertising transparency laws, <strong>AllToolss</strong> discloses that we may monetize portions of our web platform through:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li><strong>Display Advertisements:</strong> Contextual and programmatic advertisements served through Google AdSense and accredited ad exchanges.</li>
              <li><strong>Affiliate Partnerships:</strong> Links to recommended developer, cloud hosting, domain registrar, or cybersecurity services where we may earn a modest commission at zero additional cost to you.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">2. Zero Influence on Computational Output</h2>
            <p>
              Monetization partnerships have <strong>zero influence</strong> over calculation results, algorithmic security scores, or tool functionality. We never recommend products or software that have not been tested or that contradict our privacy-first philosophy.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">3. Questions or Inquiries</h2>
            <p>
              If you have any questions regarding our monetization policies or partner relationships, please contact us at <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import { Cookie, Shield, Lock, Eye, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Cookie Policy — Cookie Usage & AdSense Opt-Out',
  description:
    'Detailed Cookie Policy for AllToolss explaining essential operational cookies, analytics, Google AdSense advertising cookies, and opt-out controls.',
  path: '/cookie-policy',
  category: 'Legal & Policy',
  keywords: ['cookie policy', 'cookie preferences', 'adsense cookies', 'opt out cookies'],
});

export default function CookiePolicyPage() {
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
          <span className="text-primary font-bold">Cookie Policy</span>
        </div>

        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Cookie className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold">
              GDPR &amp; ePrivacy Compliant
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Cookie Policy</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Effective Date: September 2, 2026 | Last Updated: September 2026
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">1. What Are Cookies?</h2>
            <p>
              Cookies are small text files placed on your device by web browsers when you visit a website. They help maintain user preferences (like your selected AllToolss theme), ensure essential utility functions operate smoothly, and provide anonymous performance analytics.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">2. Categories of Cookies We Use</h2>
            
            <div className="space-y-4 pt-2">
              <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
                <h3 className="font-bold text-foreground text-xs uppercase text-primary">A. Strictly Necessary &amp; Preference Cookies</h3>
                <p className="text-xs">
                  These cookies remember your selected theme (Cyberpunk, Matrix, Modern Dark) and your cookie consent choice. They do not store personal data and cannot be switched off in our systems.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
                <h3 className="font-bold text-foreground text-xs uppercase text-indigo-400">B. Performance &amp; Analytics Cookies</h3>
                <p className="text-xs">
                  We use Google Analytics with anonymized IP addresses to count visits and traffic sources so we can measure and improve the performance of our multi-tool platform.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
                <h3 className="font-bold text-foreground text-xs uppercase text-amber-400">C. Advertising &amp; Targeting Cookies (Google AdSense)</h3>
                <p className="text-xs">
                  These cookies may be set through our site by Google AdSense and third-party ad partners. They are used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device.
                </p>
              </div>
            </div>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">3. How You Can Control or Opt Out of Cookies</h2>
            <p>
              You can adjust your browser settings to refuse or delete cookies at any time:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>Manage Google ad personalization: <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">Google Ads Settings</a></li>
              <li>Network Advertising Initiative Opt-Out: <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-primary underline">optout.networkadvertising.org</a></li>
              <li>Digital Advertising Alliance Consumer Choice: <a href="https://optout.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-primary underline">optout.aboutads.info</a></li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">4. Inquiries</h2>
            <p>
              For questions regarding our Cookie Policy, reach out to us at <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}

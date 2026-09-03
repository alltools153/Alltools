import React from 'react';
import Link from 'next/link';
import { Shield, Lock, Eye, CheckCircle2, ArrowLeft, Mail, Globe, Server, FileText } from 'lucide-react';
import { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'Privacy Policy — In-Server Privacy & AdSense Compliance',
  description:
    'Comprehensive Privacy Policy for AllToolss. Details our zero-telemetry in-server processing, Google AdSense DoubleClick cookie disclosure, and GDPR/CCPA data rights.',
  path: '/privacy-policy',
  category: 'Legal & Policy',
  keywords: ['privacy policy', 'gdpr compliance', 'adsense compliance', 'zero telemetry'],
});

export default function PrivacyPolicyPage() {
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
          <span className="text-primary font-bold">Privacy Policy</span>
        </div>

        {/* Header Title */}
        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Shield className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold">
              Zero-Telemetry Architecture
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">Privacy Policy</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Effective Date: September 2, 2026 | Last Updated: September 2026 | Verified Contact: <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>
          </p>
        </div>

        {/* Content Body */}
        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Server className="w-5 h-5 text-primary" />
              <span>1. Introduction &amp; Core Privacy Philosophy</span>
            </h2>
            <p>
              Welcome to <strong>AllToolss</strong> (accessible at <Link href="/" className="text-primary underline">alltools.com</Link>, <Link href="/" className="text-primary underline">alltools.in</Link>, and <Link href="/" className="text-primary underline">alltools.dev</Link>). We respect your privacy and are committed to protecting any data processed through our online utility platform.
            </p>
            <p>
              AllToolss is engineered under a strict <strong>100% In-Server Execution Philosophy</strong>: all developer tools (JSON Formatter, Regex Tester, JWT Decoder), document tools (PDF conversion, DOCX parsing, compression), security checks (VAPT scanner, DNS lookup), and wealth calculators execute in volatile memory and are immediately cleared. <strong>We do not save, index, sell, or inspect user files or inputs.</strong>
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-400" />
              <span>2. Google AdSense &amp; Third-Party Advertising Disclosures</span>
            </h2>
            <p>
              To maintain our tools as 100% free and open to the public, we partner with <strong>Google AdSense</strong> and authorized third-party ad networks to display contextual and interest-based advertisements.
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>DoubleClick DART Cookies:</strong> Google, as a third-party vendor, uses cookies to serve ads on AllToolss. Google&apos;s use of the DART cookie enables it to serve ads to users based on their visit to AllToolss and other sites on the Internet.
              </li>
              <li>
                <strong>Opt-Out Options:</strong> Users may opt out of the use of the DART cookie by visiting the <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">Google Ad and Content Network Privacy Policy</a>.
              </li>
              <li>
                <strong>Third-Party Ad Servers:</strong> Third-party ad servers or ad networks use technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on AllToolss, which are sent directly to users&apos; browsers. They automatically receive your IP address when this occurs.
              </li>
              <li>
                You can opt out of personalized advertising from participating networks at <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">www.aboutads.info/choices</a> or <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium">www.youronlinechoices.com</a>.
              </li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-400" />
              <span>3. Information We Collect &amp; How It Is Used</span>
            </h2>
            <p>
              We do not require account registration, passwords, or personal identity verification to use any of our 40+ utilities. The only data processed includes:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Temporary File/Text Processing:</strong> Resumes, PDF documents, JSON strings, or cryptographic keys submitted to our tools are processed in memory for the duration of the HTTP transaction and deleted immediately upon request completion.</li>
              <li><strong>Standard Server Logs:</strong> Like most web servers, our edge infrastructure logs anonymous metadata (IP address, browser type, referral URL, timestamp) solely for DDoS mitigation, rate-limiting, and operational monitoring.</li>
              <li><strong>Anonymous Web Analytics:</strong> Aggregated, privacy-focused traffic counts (e.g. pageviews, top visited tools) via Google Analytics with IP anonymization enabled.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <FileText className="w-5 h-5 text-cyan-400" />
              <span>4. GDPR, CCPA &amp; CPRA Data Rights</span>
            </h2>
            <p>
              Depending on your jurisdiction (including the European Economic Area under GDPR and California under CCPA/CPRA), you are entitled to specific rights regarding your personal data:
            </p>
            <ul className="list-disc pl-5 space-y-1.5">
              <li><strong>Right to Know &amp; Access:</strong> You may request disclosure of any log information we retain.</li>
              <li><strong>Right to Deletion:</strong> You may request immediate deletion of any operational logs referencing your IP address.</li>
              <li><strong>Right to Non-Discrimination:</strong> AllToolss provides identical tool access and functionality regardless of your privacy preferences or cookie selections.</li>
              <li><strong>Do Not Sell My Personal Information:</strong> AllToolss does not sell, rent, or trade personal data to third parties under any circumstances.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Eye className="w-5 h-5 text-amber-400" />
              <span>5. Children&apos;s Online Privacy Protection Act (COPPA)</span>
            </h2>
            <p>
              AllToolss does not knowingly collect any personally identifiable information from children under the age of 13. If a parent or guardian believes that AllToolss has logged such information, please contact us immediately at <a href="mailto:alltools153@gmail.com" className="text-primary underline font-medium">alltools153@gmail.com</a>, and we will promptly remove such records.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Mail className="w-5 h-5 text-primary" />
              <span>6. Contact Us Regarding Privacy Inquiries</span>
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please reach out directly:
            </p>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1 font-mono text-xs text-foreground">
              <p><strong>Platform:</strong> AllToolss Multi-Tool Suite</p>
              <p><strong>Lead Architect:</strong> Santanu Batabyal</p>
              <p><strong>Official Email:</strong> <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a></p>
              <p><strong>Response Time SLA:</strong> Within 24–48 business hours</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

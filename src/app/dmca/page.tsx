import React from 'react';
import Link from 'next/link';
import { Scale, ShieldAlert, ArrowLeft, Mail, FileText } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'DMCA & Copyright Policy — Intellectual Property Compliance',
  description:
    'DMCA Notice and Copyright Policy for AllToolss. Guidelines for submitting copyright infringement notifications and takedown requests.',
};

export default function DmcaPage() {
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
          <span className="text-primary font-bold">DMCA &amp; Copyright</span>
        </div>

        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <Scale className="w-6 h-6" />
            </span>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold">
              17 U.S.C. § 512 &amp; International IP Compliance
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">DMCA &amp; Copyright Policy</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Last Updated: September 2026 &bull; Designated Agent: <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a>
          </p>
        </div>

        <div className="prose prose-invert max-w-none space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">1. Commitment to Intellectual Property Rights</h2>
            <p>
              <strong>AllToolss</strong> respects the intellectual property rights of creators, authors, and developers worldwide. It is our policy to respond promptly to clear notices of alleged copyright infringement that comply with the Digital Millennium Copyright Act (DMCA) and international copyright conventions.
            </p>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">2. Submitting a DMCA Infringement Notice</h2>
            <p>
              If you believe that any material or tool content on AllToolss infringes your copyrighted work, please submit a formal written notice containing:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-xs">
              <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              <li>Identification of the copyrighted work claimed to have been infringed.</li>
              <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed, along with the specific URL.</li>
              <li>Your contact details: Name, physical address, telephone number, and email address.</li>
              <li>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
              <li>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the copyright owner.</li>
            </ul>
          </section>

          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">3. Designated Copyright Agent</h2>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border font-mono text-xs text-foreground space-y-1">
              <p><strong>DMCA Designated Agent:</strong> Santanu Batabyal / AllToolss Legal Team</p>
              <p><strong>Email Address:</strong> <a href="mailto:alltools153@gmail.com" className="text-primary underline">alltools153@gmail.com</a></p>
              <p><strong>Response Time:</strong> Within 24–48 business hours upon receipt of complete notice.</p>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}

import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Shield,
  Cpu,
  Server,
  Zap,
  CheckCircle2,
  Award,
  ArrowRight,
  Globe,
  Lock,
  Heart,
  User,
  ArrowLeft,
} from 'lucide-react';
import { Metadata } from 'next';
import { constructToolMetadata } from '@/lib/seo';

export const metadata: Metadata = constructToolMetadata({
  title: 'About Us — Mission, Architecture & E-E-A-T Standards',
  description:
    'Learn about AllToolss: Our architectural mission, in-server privacy philosophy, zero third-party telemetry, and engineering lead Santanu Batabyal.',
  path: '/about',
  category: 'Platform & Docs',
  keywords: ['about alltoolss', 'santanu batabyal', 'in-server tools', 'developer utility suite'],
});

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground border-b border-border pb-4">
          <Link href="/" className="hover:text-primary transition-colors flex items-center gap-1">
            <ArrowLeft className="w-3.5 h-3.5" /> Home
          </Link>
          <span>/</span>
          <span className="text-foreground font-semibold">About</span>
          <span>/</span>
          <span className="text-primary font-bold">Platform Overview</span>
        </div>

        {/* Header Title */}
        <div className="space-y-2 border-b border-border pb-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-black font-bold shadow-glow-primary">
              <Wrench className="w-5 h-5 text-black" />
            </div>
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-mono font-bold">
              Engineering Mission &amp; Philosophy
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight">About AllToolss</h1>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
            A unified, high-performance web utility suite engineered for developers, security professionals, finance analysts, and document workers worldwide.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-8 text-sm text-muted-foreground leading-relaxed">
          
          {/* Mission */}
          <section className="p-6 sm:p-8 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" /> Our Core Mission
            </h2>
            <p>
              The modern web is filled with utility websites that are bloated with paywalls, aggressive pop-ups, forced signups, and third-party trackers that harvest private data.
            </p>
            <p>
              <strong>AllToolss was built to solve this.</strong> Our mission is to provide an enterprise-grade, lightning-fast, 100% free multi-tool platform where every developer, student, and professional can format JSON, test regular expressions, audit website security, parse resumes for ATS, convert PDFs, and compute compound wealth without compromising privacy.
            </p>
          </section>

          {/* Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="p-5 rounded-3xl border border-border bg-card space-y-2" style={{ backgroundColor: 'var(--card)' }}>
              <div className="p-2.5 rounded-xl bg-primary/10 text-primary w-fit">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">100% In-Server Execution</h3>
              <p className="text-muted-foreground">
                All computations execute in volatile server memory with zero external cloud SaaS APIs. Your files and code strings are cleared instantly.
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-border bg-card space-y-2" style={{ backgroundColor: 'var(--card)' }}>
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 w-fit">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Zero Telemetry &amp; Privacy</h3>
              <p className="text-muted-foreground">
                We do not track keystrokes, sell analytics data, or maintain user tracking databases. Complete transparency by design.
              </p>
            </div>

            <div className="p-5 rounded-3xl border border-border bg-card space-y-2" style={{ backgroundColor: 'var(--card)' }}>
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 w-fit">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-foreground">Sub-Second Performance</h3>
              <p className="text-muted-foreground">
                Built on Next.js 14 App Router and Python FastAPI, delivering sub-100ms TTFB, 0 layout shifts, and mobile-first responsiveness.
              </p>
            </div>
          </div>

          {/* Leadership & E-E-A-T */}
          <section className="p-6 sm:p-8 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-foreground">Leadership &amp; Technical Expertise (E-E-A-T)</h2>
            </div>
            <p>
              AllToolss is architected and maintained by <strong>Santanu Batabyal</strong>, a Principal Application Security Architect and Full-Stack Systems Engineer specializing in cloud infrastructure, OWASP security methodologies, and high-concurrency web engines.
            </p>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <User className="w-4 h-4 text-primary" /> Santanu Batabyal
                </div>
                <div className="text-[11px] text-muted-foreground font-mono">
                  Lead Systems Architect &bull; Contact: <a href="mailto:alltools153@gmail.com" className="text-primary hover:underline">alltools153@gmail.com</a>
                </div>
              </div>
              <Link
                href="/developer"
                className="py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold shadow-glow-primary hover:opacity-90 transition-opacity flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>View Architect Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </section>

          {/* Standards & Transparency */}
          <section className="p-6 rounded-3xl border border-border bg-card space-y-3" style={{ backgroundColor: 'var(--card)' }}>
            <h2 className="text-lg font-bold text-foreground">Algorithmic Precision &amp; Standards</h2>
            <ul className="list-disc pl-5 space-y-2 text-xs">
              <li><strong>Bengali Calendar &amp; Panjika:</strong> Follows traditional Surya Siddhanta astronomical solar calculation standards with authentic Tithi, Nakshatra, and Muhurat calculations for IST.</li>
              <li><strong>VAPT Security Audits:</strong> Follows OWASP Top 10 guidelines, verifying RFC-compliant HTTP security headers (HSTS, CSP, X-Frame-Options), SSL cipher suites, and DNS hygiene.</li>
              <li><strong>ATS Resume Parser:</strong> Tests against modern Applicant Tracking System standards (Workday, Greenhouse, Lever, Taleo) analyzing section headers, power action verbs, and keyword density.</li>
            </ul>
          </section>

        </div>

      </div>
    </div>
  );
}

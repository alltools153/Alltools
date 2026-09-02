'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Code2,
  Shield,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  ExternalLink,
  Award,
  Globe,
  Lock,
  Calculator,
  Calendar,
  CheckCircle2,
  Mail,
  Linkedin,
  Heart,
  FileCode2,
  Server,
  Zap,
  ArrowRight,
} from 'lucide-react';

export default function DeveloperPage() {
  const [activeConsoleTab, setActiveConsoleTab] = useState<'stack' | 'arch' | 'cli'>('stack');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* 1. DEVELOPER HERO BANNER */}
      <section className="p-8 sm:p-10 rounded-3xl border border-border bg-gradient-to-br from-card via-card to-primary/5 shadow-lg relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -top-16 w-80 h-80 bg-secondary/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary text-xs font-semibold uppercase tracking-wider shadow-glow-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lead Architect & Full-Stack Engineer</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground tracking-tight">
              Santanu Batabyal
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Principal Application Security Architect & Full-Stack Systems Engineer specializing in{' '}
              <strong className="text-foreground">Next.js 14 App Router</strong>,{' '}
              <strong className="text-foreground">Python FastAPI</strong> microservices, passive{' '}
              <strong className="text-foreground">VAPT Security Auditing</strong>, and high-precision astronomical algorithms.
            </p>

            <div className="flex flex-wrap items-center gap-2.5 pt-2">
              <span className="text-xs px-3 py-1 rounded-lg border border-border bg-muted/60 text-foreground font-medium">
                🛡️ AppSec & VAPT
              </span>
              <span className="text-xs px-3 py-1 rounded-lg border border-border bg-muted/60 text-foreground font-medium">
                ⚛️ Next.js 14 / TypeScript
              </span>
              <span className="text-xs px-3 py-1 rounded-lg border border-border bg-muted/60 text-foreground font-medium">
                🐍 Python FastAPI
              </span>
              <span className="text-xs px-3 py-1 rounded-lg border border-border bg-muted/60 text-foreground font-medium">
                🎨 7 Multi-Theme Design
              </span>
            </div>
          </div>

          {/* Quick Metrics Badge Card */}
          <div className="grid grid-cols-2 gap-3.5 w-full lg:w-72">
            <div className="p-4 rounded-2xl border border-border bg-card/80 backdrop-blur text-center space-y-1">
              <div className="text-2xl font-black text-primary">3 Flagship</div>
              <div className="text-[11px] text-muted-foreground">Architected Tools</div>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card/80 backdrop-blur text-center space-y-1">
              <div className="text-2xl font-black text-secondary">7 Themes</div>
              <div className="text-[11px] text-muted-foreground">Custom UI Modes</div>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card/80 backdrop-blur text-center space-y-1">
              <div className="text-2xl font-black text-accent">100+ SEO</div>
              <div className="text-[11px] text-muted-foreground">Keywords Matrix</div>
            </div>
            <div className="p-4 rounded-2xl border border-border bg-card/80 backdrop-blur text-center space-y-1">
              <div className="text-2xl font-black text-emerald-400">100% Zero</div>
              <div className="text-[11px] text-muted-foreground">Tracking / Privacy</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. DEVELOPER PROFILES */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-secondary">Developer Profiles</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">People behind the build</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-6 rounded-2xl border border-secondary/40 bg-card space-y-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-secondary">Full Stack Developer</p>
                <h4 className="mt-1 text-2xl font-bold text-foreground">Saikat Samanta</h4>
              </div>
              <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                <Code2 className="w-5 h-5" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Full Stack Developer focused on building reliable, scalable web applications across the frontend, backend, and data layer.
            </p>

            <div className="flex flex-wrap gap-2">
              {['ReactJS', 'Node.js', 'Python', 'MongoDB'].map((technology) => (
                <span key={technology} className="px-3 py-1.5 rounded-lg border border-border bg-muted/60 text-xs font-semibold text-foreground">
                  {technology}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL EXPERTISE MATRIX */}
      <section className="space-y-6">
        <div className="space-y-1">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">Core Competencies</h2>
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Engineering & Architecture Matrix</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Frontend */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:border-primary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Code2 className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Full-Stack Frontend</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, Lucide icons, responsive glassmorphism, dynamic theme provider with zero-flicker CSS variables.
            </p>
          </div>

          {/* Card 2: Backend */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:border-secondary/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
              <Server className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Python & Microservices</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Python 3.10+, FastAPI, Pydantic type validation, asynchronous HTTP clients (`httpx`), CORS architecture, and modular REST route handlers.
            </p>
          </div>

          {/* Card 3: Security & VAPT */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:border-accent/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Shield className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Application Security (VAPT)</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              OWASP API Security Top 10 (2023), TLS/SSL handshake analysis, HSTS/CSP security header enforcement, SSRF loopback filtering, and DNS security (CAA/SPF/DMARC).
            </p>
          </div>

          {/* Card 4: Algorithmic */}
          <div className="p-6 rounded-2xl border border-border bg-card space-y-3 hover:border-emerald-500/40 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-foreground">Algorithmic Systems</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Surya Siddhanta & Bengali Academy ephemeris calculations, Julian day astronomical positions, planetary orbital mechanics, and leap year compensation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. ARCHITECTURE PHILOSOPHY & FLAGSHIPS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 sm:p-8 rounded-2xl border border-border bg-card space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Architectural Philosophy behind AllToolss</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Built on three foundational principles: Zero Tracking, High-Precision Computing, and Universal Accessibility.
            </p>
          </div>

          <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="text-foreground">1. Zero External Surveillance:</strong> Every calculation (whether chronological age, planetary positions, or Bengali panjika) executes locally with deterministic algorithms. The VAPT security scanner conducts purely non-destructive passive inspections with zero exploitation payloads.
            </p>
            <p>
              <strong className="text-foreground">2. Modular Polyglot Architecture:</strong> Next.js 14 delivers an ultra-fast client-side reactive experience with responsive UI and dynamic themes, while Python FastAPI handles intensive security analysis, cryptography, and backend microservices.
            </p>
            <p>
              <strong className="text-foreground">3. Search Visibility & Structured Microdata:</strong> Built-in Schema.org JSON-LD microdata, dynamic sitemaps, and bilingual keywords guarantee high crawlability for search engines while providing a seamless user experience.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-2">
            <Link
              href="/age-calculator"
              className="px-3.5 py-2 rounded-xl bg-muted/60 border border-border hover:border-primary/40 text-foreground text-xs font-semibold flex items-center gap-1.5"
            >
              <Calculator className="w-3.5 h-3.5 text-primary" />
              <span>Age Calculator</span>
            </Link>
            <Link
              href="/vapt-scanner"
              className="px-3.5 py-2 rounded-xl bg-muted/60 border border-border hover:border-secondary/40 text-foreground text-xs font-semibold flex items-center gap-1.5"
            >
              <Shield className="w-3.5 h-3.5 text-secondary" />
              <span>VAPT Scanner</span>
            </Link>
            <Link
              href="/bengali-calendar"
              className="px-3.5 py-2 rounded-xl bg-muted/60 border border-border hover:border-accent/40 text-foreground text-xs font-semibold flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-accent" />
              <span>বাংলা পঞ্জিকা</span>
            </Link>
          </div>
        </div>

        {/* Developer Terminal Console */}
        <div className="p-6 rounded-2xl border border-border bg-card space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-border">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-foreground">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>dev-console://santanu</span>
              </div>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400">
                ONLINE
              </span>
            </div>

            <div className="p-3.5 rounded-xl bg-black/90 font-mono text-xs text-emerald-400 space-y-1.5">
              <div>$ alltoolss --version</div>
              <div className="text-white">AllToolss Suite v1.0.0 (Production)</div>
              <div>$ whoami</div>
              <div className="text-white">Santanu Batabyal (Lead Architect)</div>
              <div>$ git status</div>
              <div className="text-emerald-300">branch: main (All systems active)</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-border">
            <div className="text-xs font-semibold text-foreground">System Documentation:</div>
            <Link
              href="/api-hub"
              className="w-full py-2 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-semibold flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90"
            >
              <span>Explore In-Server APIs &amp; Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

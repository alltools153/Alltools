'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Calculator,
  ShieldCheck,
  Calendar,
  Sparkles,
  ArrowRight,
  Zap,
  Globe,
  Lock,
  Palette,
  CheckCircle2,
  Cpu,
  User,
  ChevronRight,
  Shield,
  Layers,
  PlusCircle,
  FileJson,
  Code2,
  KeyRound,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { THEMES_LIST } from '@/lib/themeConfig';
import { getBengaliDate } from '@/lib/bengaliEngine';
import { calculateChronologicalAge } from '@/lib/ageEngine';

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  // Quick interactive demo states for the tools
  const [demoDob, setDemoDob] = useState('1998-08-15');
  const [demoUrl, setDemoUrl] = useState('https://github.com');
  const [quickAgeResult, setQuickAgeResult] = useState<any>(null);
  const [bengaliToday, setBengaliToday] = useState<any>(null);

  useEffect(() => {
    setQuickAgeResult(calculateChronologicalAge(demoDob));
    setBengaliToday(getBengaliDate(new Date()));
  }, [demoDob]);

  return (
    <div className="space-y-16 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-border/50 bg-gradient-to-b from-primary/5 via-background to-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* In-Server Privacy Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md">
            <Lock className="w-3.5 h-3.5" />
            <span>100% In-Server & Client-Side Engine • Zero Third-Party APIs</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-4xl mx-auto leading-[1.1]">
            One Unified Hub.{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Neat, Fast & In-Server.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            All calculations, security audits, and developer micro-utilities run directly in server/browser memory with zero external third-party API calls,
            zero data leakage, and lightning-fast execution across 7 customizable themes.
          </p>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/json-formatter"
              className="px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center gap-2 shadow-glow-primary hover:opacity-95 transition-all transform hover:-translate-y-0.5 text-sm"
            >
              <FileJson className="w-4 h-4" />
              <span>JSON Formatter</span>
            </Link>

            <Link
              href="/regex-tester"
              className="px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center gap-2 hover:opacity-95 transition-all transform hover:-translate-y-0.5 text-sm"
            >
              <Code2 className="w-4 h-4" />
              <span>Regex Tester</span>
            </Link>

            <Link
              href="/jwt-decoder"
              className="px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-semibold flex items-center gap-2 hover:opacity-95 transition-all transform hover:-translate-y-0.5 text-sm"
            >
              <KeyRound className="w-4 h-4" />
              <span>JWT Decoder</span>
            </Link>

            <Link
              href="/vapt-scanner"
              className="px-5 py-2.5 rounded-xl border border-border bg-card hover:bg-muted text-foreground font-semibold flex items-center gap-2 transition-all text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>VAPT & N-Map Scanner</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. THE 6 STANDALONE CORE TOOLS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">Active Applications</h2>
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Flagship In-Server & Client Tools</h3>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            6 Standalone Tools • 100% In-Server
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* TOOL 1: JSON Formatter & Schema Builder */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-[#00f0ff]/50 transition-all shadow-sm hover:shadow-glow-primary group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#00f0ff]/10 border border-[#00f0ff]/30 flex items-center justify-center text-[#00f0ff]">
                <FileJson className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">JSON Formatter</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#00f0ff]/20 text-[#00f0ff] border border-[#00f0ff]/30">
                    Client-Side
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Side-by-side split editor, 2/4-space beautify & minify, exact syntax error offset callouts, and interactive object tree.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Interactive Object Tree</span>
                </div>
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Text / Description to JSON</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/json-formatter"
                className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity"
              >
                <span>Open JSON Formatter</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 2: Regex Tester & Cheat Sheet */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-[#f72585]/50 transition-all shadow-sm hover:shadow-glow-primary group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#f72585]/10 border border-[#f72585]/30 flex items-center justify-center text-[#f72585]">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">Regex Tester</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#f72585]/20 text-[#f72585] border border-[#f72585]/30">
                    Live Engine
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Real-time inline visual match highlighting, flag toggles (g, i, m, s), capture group table, and RFC templates library.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 text-[#f72585]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Live Visual Highlighting</span>
                </div>
                <div className="flex items-center gap-1.5 text-purple-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Pre-Built Example Library</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/regex-tester"
                className="w-full py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity"
              >
                <span>Open Regex Tester</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 3: JWT Decoder & Expiry Inspector */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-[#a855f7]/50 transition-all shadow-sm hover:shadow-glow-accent group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-[#a855f7]/10 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7]">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">JWT Decoder</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#a855f7]/20 text-[#a855f7] border border-[#a855f7]/30">
                    Zero Server Calls
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Color-coded visual token segmentation (Header.Payload.Signature), RFC 7519 registered claims, and live expiry countdown.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-1.5 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-1.5 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Color-Coded Segments</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#a855f7]">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Claims Expiry Simulator</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/jwt-decoder"
                className="w-full py-2 rounded-xl bg-accent text-accent-foreground font-semibold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity"
              >
                <span>Open JWT Decoder</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 4: Age Milestone Calculator */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-sm hover:shadow-glow-primary group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">Age Calculator</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                    High-Precision
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Chronological age, planetary orbits (Mercury to Pluto), biological milestones, and Chinese zodiac.
                </p>
              </div>

              {/* Quick Test Demo */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                <label className="text-[11px] font-semibold text-muted-foreground block">
                  Quick Date Picker
                </label>
                <input
                  type="date"
                  value={demoDob}
                  onChange={(e) => setDemoDob(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs focus:outline-none focus:border-primary"
                />
                {quickAgeResult && (
                  <div className="grid grid-cols-3 gap-1.5 text-center pt-1 text-xs">
                    <div className="p-1.5 rounded bg-card border border-border">
                      <div className="font-bold text-primary">{quickAgeResult.years}</div>
                      <div className="text-[9px] text-muted-foreground">Years</div>
                    </div>
                    <div className="p-1.5 rounded bg-card border border-border">
                      <div className="font-bold text-primary">{quickAgeResult.months}</div>
                      <div className="text-[9px] text-muted-foreground">Months</div>
                    </div>
                    <div className="p-1.5 rounded bg-card border border-border">
                      <div className="font-bold text-primary">{quickAgeResult.days}</div>
                      <div className="text-[9px] text-muted-foreground">Days</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/age-calculator"
                className="w-full py-2 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity"
              >
                <span>Launch Age Calculator</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 5: Website VAPT & N-Map Scanner */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-secondary/50 transition-all shadow-sm hover:shadow-glow-accent group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-secondary/10 border border-secondary/30 flex items-center justify-center text-secondary">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">VAPT & N-Map Scanner</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-secondary/20 text-secondary border border-secondary/30">
                    In-Server
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Passive HTTP security headers audit, TLS/SSL handshake analysis, and in-server N-Map port exposure checks.
                </p>
              </div>

              {/* Quick Test Demo */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-2">
                <label className="text-[11px] font-semibold text-muted-foreground block">
                  Quick Target Preset
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={demoUrl}
                    onChange={(e) => setDemoUrl(e.target.value)}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-border bg-card text-foreground text-xs focus:outline-none focus:border-secondary"
                  />
                </div>
                <div className="text-[10px] text-muted-foreground pt-1 flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-400" />
                  <span>100% In-Server Passive TCP Socket Connect</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/vapt-scanner"
                className="w-full py-2 rounded-xl bg-secondary text-secondary-foreground font-semibold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity"
              >
                <span>Launch VAPT Scanner</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 6: Bengali Calendar & Panjika */}
          <div className="rounded-2xl border border-border bg-card p-6 flex flex-col justify-between hover:border-accent/50 transition-all shadow-sm hover:shadow-glow-accent group">
            <div className="space-y-4">
              <div className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-lg font-bold text-foreground">বাংলা পঞ্জিকা ও ক্যালেন্ডার</h4>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                    ১৪৩১-১৪৩৩
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Surya Siddhanta & Bengali Academy astronomical calendar, live 6-period Bengali time, and festivals.
                </p>
              </div>

              {/* Quick Date Preview */}
              <div className="p-3 rounded-xl bg-muted/40 border border-border/80 space-y-1.5">
                <div className="text-[11px] font-semibold text-muted-foreground">আজকের বাংলা তারিখ</div>
                {bengaliToday ? (
                  <div className="p-2 rounded bg-card border border-border text-center space-y-0.5">
                    <div className="text-xs font-bold text-accent">{bengaliToday.formattedBn}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {bengaliToday.periodBn} কাল • তিথি: {bengaliToday.tithiBn}
                    </div>
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground">পঞ্জিকা লোড হচ্ছে...</div>
                )}
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/bengali-calendar"
                className="w-full py-2 rounded-xl bg-accent text-accent-foreground font-semibold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity"
              >
                <span>Open Bengali Calendar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FUTURE TOOLS & MODULAR EXPANSION PIPELINE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
              <Layers className="w-4 h-4 text-primary" />
              <span>Future Tools Pipeline</span>
            </h3>
            <p className="text-xs text-muted-foreground">
              Modular categories prepared for seamless addition of multiple in-server utilities.
            </p>
          </div>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-muted text-muted-foreground">
            Modular Framework
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-dashed border-border bg-card/50 space-y-1.5 opacity-80">
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-primary" />
              <span>Unit & Currency Converter</span>
            </div>
            <p className="text-xs text-muted-foreground">Scientific, metric, and financial exchange converters.</p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-border bg-card/50 space-y-1.5 opacity-80">
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-secondary" />
              <span>Markdown & PDF Studio</span>
            </div>
            <p className="text-xs text-muted-foreground">Client-side document format converter with PDF export.</p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-border bg-card/50 space-y-1.5 opacity-80">
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-accent" />
              <span>Image & Media Optimizer</span>
            </div>
            <p className="text-xs text-muted-foreground">In-browser image compression, WebP conversion, and resizing.</p>
          </div>

          <div className="p-4 rounded-xl border border-dashed border-border bg-card/50 space-y-1.5 opacity-80">
            <div className="font-bold text-sm text-foreground flex items-center gap-1.5">
              <PlusCircle className="w-4 h-4 text-emerald-400" />
              <span>Diff & Code Comparer</span>
            </div>
            <p className="text-xs text-muted-foreground">Side-by-side text diff, patch generator, and line checker.</p>
          </div>
        </div>
      </section>

      {/* 4. DEVELOPER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border bg-gradient-to-r from-card via-muted/30 to-card p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold">
              <User className="w-3.5 h-3.5" />
              <span>Lead Architect & Full-Stack Engineer</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Engineered by Santanu Batabyal
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Designed from Bankura, West Bengal with a strict architectural philosophy: <strong>100% In-Server processing</strong>, zero external API dependencies, and high-performance multi-theme UI.
            </p>
          </div>

          <Link
            href="/developer"
            className="px-6 py-3 rounded-2xl bg-foreground text-background font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap"
          >
            <span>View Developer Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}

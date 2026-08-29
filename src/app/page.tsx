'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
  FileJson,
  Code2,
  KeyRound,
  FileText,
  Search,
  Check,
  Copy,
  Terminal,
  Radio,
  Clock,
  ExternalLink,
  Sliders,
} from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { THEMES_LIST } from '@/lib/themeConfig';
import { ALL_TOOLS_CATALOG, TOOL_CATEGORIES, ToolItem } from '@/lib/allToolsList';
import { getBengaliDate } from '@/lib/bengaliEngine';
import { calculateChronologicalAge } from '@/lib/ageEngine';

export default function HomePage() {
  const { theme, setTheme } = useTheme();

  // Search state in Hero
  const [heroSearch, setHeroSearch] = useState('');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // Quick interactive demo states for tools
  const [demoDob, setDemoDob] = useState('1998-08-15');
  const [demoRegex, setDemoRegex] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [demoRegexText, setDemoRegexText] = useState('Contact us at contact@alltools.local or support@domain.com');
  const [demoJson, setDemoJson] = useState('{"tool":"AllTools","version":"2.4","inServer":true,"status":"Active"}');
  const [jsonIndent, setJsonIndent] = useState<2 | 4 | 'min'>(2);
  const [quickAgeResult, setQuickAgeResult] = useState<any>(null);
  const [bengaliToday, setBengaliToday] = useState<any>(null);

  // Compute live calculations for demos
  useEffect(() => {
    setQuickAgeResult(calculateChronologicalAge(demoDob));
    setBengaliToday(getBengaliDate(new Date()));
  }, [demoDob]);

  // JSON formatter quick demo
  const formattedJsonDemo = useMemo(() => {
    try {
      const parsed = JSON.parse(demoJson);
      if (jsonIndent === 'min') return JSON.stringify(parsed);
      return JSON.stringify(parsed, null, jsonIndent);
    } catch {
      return demoJson;
    }
  }, [demoJson, jsonIndent]);

  // Regex quick demo
  const regexMatches = useMemo(() => {
    try {
      const re = new RegExp(demoRegex, 'g');
      const matches = demoRegexText.match(re);
      return matches || [];
    } catch {
      return [];
    }
  }, [demoRegex, demoRegexText]);

  // Filter tools for the Catalog section
  const filteredCatalog = useMemo(() => {
    let list = ALL_TOOLS_CATALOG;

    if (activeCategoryFilter !== 'all') {
      list = list.filter((t) => t.categorySlug === activeCategoryFilter);
    }

    if (heroSearch.trim()) {
      const q = heroSearch.trim().toLowerCase();
      list = list.filter(
        (t) =>
          t.name.toLowerCase().includes(q) ||
          t.tagline.toLowerCase().includes(q) ||
          t.keywords.some((k) => k.toLowerCase().includes(q))
      );
    }

    return list;
  }, [activeCategoryFilter, heroSearch]);

  return (
    <div className="space-y-16 sm:space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-16 lg:pt-20 lg:pb-24 border-b border-border/80 bg-gradient-to-b from-primary/10 via-background to-background">
        {/* Ambient Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[36rem] sm:w-[50rem] h-80 bg-gradient-to-r from-primary/15 via-accent/15 to-secondary/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8">
          
          {/* Privacy & In-Server Guarantee Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 text-xs font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Lock className="w-3.5 h-3.5" />
            <span>100% In-Server & Client-Side Engine • Zero External Third-Party APIs</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-foreground max-w-5xl mx-auto leading-[1.15]">
            One Unified Multi-Tool Suite.{' '}
            <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
              Fast, Clean & In-Server.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            All calculations, security audits, developer utilities, and PDF operations execute directly inside local browser and server memory with zero data leakage, zero external tracking, and instantaneous speed across 7 handcrafted themes.
          </p>

          {/* Instant Hero Search Bar */}
          <div className="max-w-2xl mx-auto relative pt-2">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-primary" />
              <input
                type="text"
                value={heroSearch}
                onChange={(e) => setHeroSearch(e.target.value)}
                placeholder="Search 30+ in-server tools (e.g. 'merge pdf', 'jwt', 'vapt', 'age', 'panjika', 'json')..."
                className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl border border-border bg-card text-foreground text-sm sm:text-base shadow-lg placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                style={{ backgroundColor: 'var(--card)' }}
              />
              {heroSearch && (
                <button
                  type="button"
                  onClick={() => setHeroSearch('')}
                  className="absolute right-4 text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground hover:text-foreground"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Live Search Quick Results Popup if user is typing */}
            {heroSearch.trim() && (
              <div
                className="absolute left-0 right-0 mt-2 rounded-2xl border border-border bg-card shadow-2xl p-2 z-30 max-h-72 overflow-y-auto text-left space-y-1 animate-in fade-in zoom-in-95 duration-150"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                  Matching Tools ({filteredCatalog.length})
                </div>
                {filteredCatalog.length === 0 ? (
                  <p className="p-3 text-xs text-muted-foreground">No tools found matching &quot;{heroSearch}&quot;</p>
                ) : (
                  filteredCatalog.slice(0, 6).map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted/70 transition-colors"
                    >
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-semibold text-foreground truncate">{tool.name}</div>
                        <p className="text-[11px] text-muted-foreground truncate">{tool.tagline}</p>
                      </div>
                      <span className="text-[10px] text-primary font-mono ml-2 flex-shrink-0">Launch →</span>
                    </Link>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Quick Launch Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <Link
              href="/json-formatter"
              className="px-3.5 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold flex items-center gap-1.5 text-xs hover:bg-cyan-500/20 transition-colors"
            >
              <FileJson className="w-3.5 h-3.5" />
              <span>JSON Formatter</span>
            </Link>

            <Link
              href="/regex-tester"
              className="px-3.5 py-1.5 rounded-xl bg-pink-500/10 border border-pink-500/30 text-pink-400 font-semibold flex items-center gap-1.5 text-xs hover:bg-pink-500/20 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Regex Tester</span>
            </Link>

            <Link
              href="/jwt-decoder"
              className="px-3.5 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 font-semibold flex items-center gap-1.5 text-xs hover:bg-purple-500/20 transition-colors"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>JWT Decoder</span>
            </Link>

            <Link
              href="/vapt-scanner"
              className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold flex items-center gap-1.5 text-xs hover:bg-emerald-500/20 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>VAPT Scanner</span>
            </Link>

            <Link
              href="/age-calculator"
              className="px-3.5 py-1.5 rounded-xl bg-primary/10 border border-primary/30 text-primary font-semibold flex items-center gap-1.5 text-xs hover:bg-primary/20 transition-colors"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Age Calculator</span>
            </Link>

            <Link
              href="/bengali-calendar"
              className="px-3.5 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 font-semibold flex items-center gap-1.5 text-xs hover:bg-amber-500/20 transition-colors"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>বাংলা পঞ্জিকা</span>
            </Link>

            <Link
              href="/document-tools"
              className="px-3.5 py-1.5 rounded-xl bg-violet-500/10 border border-violet-500/30 text-violet-400 font-semibold flex items-center gap-1.5 text-xs hover:bg-violet-500/20 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>PDF Studio (25+)</span>
            </Link>
          </div>

          {/* Key Metrics Strip */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-4xl mx-auto pt-6 text-center">
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-primary">30+</div>
              <div className="text-[11px] text-muted-foreground">In-Server Utilities</div>
            </div>
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-secondary">7 Themes</div>
              <div className="text-[11px] text-muted-foreground">Zero-Flicker Palettes</div>
            </div>
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">100% Zero</div>
              <div className="text-[11px] text-muted-foreground">External Tracking</div>
            </div>
            <div className="p-3.5 rounded-2xl border border-border bg-card/60 backdrop-blur shadow-sm">
              <div className="text-xl sm:text-2xl font-black text-accent">&lt; 1.2ms</div>
              <div className="text-[11px] text-muted-foreground">Local Memory Latency</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE FLAGSHIP TOOLS SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Live Demos</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground mt-1">
              Flagship In-Server & Client Tools
            </h2>
          </div>
          <span className="text-xs text-muted-foreground font-mono">
            Direct Interactive Testing • Zero Latency
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* TOOL 1: JSON Formatter & Schema Builder */}
          <div
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-cyan-500/50 transition-all shadow-md group"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-sm">
                  <FileJson className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  Client-Side
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">JSON Formatter & Tree</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Split editor, 2/4-space beautify & minify, syntax error locator, and text-to-JSON engine.
                </p>
              </div>

              {/* Interactive Demo Box */}
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
                  <span>Quick Format Tester:</span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setJsonIndent(2)}
                      className={`px-1.5 py-0.5 rounded text-[10px] ${jsonIndent === 2 ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}`}
                    >
                      2sp
                    </button>
                    <button
                      type="button"
                      onClick={() => setJsonIndent(4)}
                      className={`px-1.5 py-0.5 rounded text-[10px] ${jsonIndent === 4 ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}`}
                    >
                      4sp
                    </button>
                    <button
                      type="button"
                      onClick={() => setJsonIndent('min')}
                      className={`px-1.5 py-0.5 rounded text-[10px] ${jsonIndent === 'min' ? 'bg-primary text-primary-foreground font-bold' : 'hover:bg-muted'}`}
                    >
                      Min
                    </button>
                  </div>
                </div>

                <pre className="text-[11px] font-mono bg-black/60 p-2.5 rounded-xl text-cyan-300 overflow-x-auto max-h-24 no-scrollbar border border-white/5">
                  {formattedJsonDemo}
                </pre>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/json-formatter"
                className="w-full py-2.5 rounded-xl bg-cyan-500 text-black font-bold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Launch JSON Formatter</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 2: Regex Tester & VM */}
          <div
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-pink-500/50 transition-all shadow-md group"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400 shadow-sm">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-pink-500/20 text-pink-400 border border-pink-500/30">
                  Live VM
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">Regex Tester & Cheat Sheet</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Real-time visual match highlighting, flag toggles, capture group table, and RFC library.
                </p>
              </div>

              {/* Interactive Demo Box */}
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-2">
                <div className="text-[11px] font-mono text-pink-400 truncate">
                  Pattern: <span className="text-foreground">{demoRegex}</span>
                </div>
                <div className="text-[11px] font-mono bg-black/60 p-2.5 rounded-xl text-slate-300 overflow-x-auto max-h-24 no-scrollbar border border-white/5 space-y-1">
                  <div className="text-[10px] text-muted-foreground">Matches Found: {regexMatches.length}</div>
                  <div className="text-emerald-400">{regexMatches.join(', ') || 'No match'}</div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/regex-tester"
                className="w-full py-2.5 rounded-xl bg-pink-500 text-white font-bold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Launch Regex Tester</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 3: JWT Decoder & Expiry Inspector */}
          <div
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-purple-500/50 transition-all shadow-md group"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shadow-sm">
                  <KeyRound className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                  Zero Network
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">JWT Decoder & Inspector</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Color-coded token segmentation, RFC 7519 registered claims, and live expiry countdown.
                </p>
              </div>

              {/* Segment Demo Box */}
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-2">
                <div className="text-[11px] font-semibold text-muted-foreground">Color-Coded Token Structure:</div>
                <div className="text-[11px] font-mono bg-black/60 p-2.5 rounded-xl break-all border border-white/5 leading-relaxed">
                  <span className="text-cyan-400">eyJhbGciOiJIUzI1NiJ9</span>
                  <span className="text-white font-bold">.</span>
                  <span className="text-pink-400">eyJzdWIiOiIxNTMiLCJ1c2VyIjoiU2FudGFudSJ9</span>
                  <span className="text-white font-bold">.</span>
                  <span className="text-purple-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/jwt-decoder"
                className="w-full py-2.5 rounded-xl bg-purple-500 text-white font-bold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Launch JWT Decoder</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 4: Chronological & Planetary Age Calculator */}
          <div
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-primary/50 transition-all shadow-md group"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shadow-sm">
                  <Calculator className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-primary/20 text-primary border border-primary/30">
                  Planetary Engine
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">Age & Planetary Calculator</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Chronological age, 9 planetary orbits (Mercury to Pluto), life in weeks, and biological milestones.
                </p>
              </div>

              {/* Quick Test Demo */}
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground">
                  <span>Interactive Birthdate:</span>
                  <input
                    type="date"
                    value={demoDob}
                    onChange={(e) => setDemoDob(e.target.value)}
                    className="px-2 py-1 rounded-lg border border-border bg-card text-foreground text-xs focus:outline-none focus:border-primary"
                    style={{ backgroundColor: 'var(--card)' }}
                  />
                </div>

                {quickAgeResult && (
                  <div className="grid grid-cols-3 gap-1.5 text-center text-xs pt-1">
                    <div className="p-1.5 rounded-xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
                      <div className="font-bold text-primary">{quickAgeResult.years}</div>
                      <div className="text-[9px] text-muted-foreground">Years</div>
                    </div>
                    <div className="p-1.5 rounded-xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
                      <div className="font-bold text-primary">{quickAgeResult.months}</div>
                      <div className="text-[9px] text-muted-foreground">Months</div>
                    </div>
                    <div className="p-1.5 rounded-xl bg-card border border-border" style={{ backgroundColor: 'var(--card)' }}>
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
                className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Launch Age Calculator</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 5: Website VAPT & N-Map Scanner */}
          <div
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-emerald-500/50 transition-all shadow-md group"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  In-Server VAPT
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">Website VAPT & N-Map</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Passive HTTP security headers, TLS/SSL handshake ciphers, and in-server TCP port audits.
                </p>
              </div>

              {/* Demo Info Box */}
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1.5">
                <div className="text-[11px] font-semibold text-muted-foreground flex items-center justify-between">
                  <span>Target Preset:</span>
                  <span className="text-emerald-400 font-mono text-[10px]">https://github.com</span>
                </div>
                <div className="p-2 rounded-xl bg-card border border-border text-[10px] text-muted-foreground space-y-1" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>HSTS &amp; CSP Defense Inspection</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-cyan-400">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Non-Destructive In-Server TCP Socket</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <Link
                href="/vapt-scanner"
                className="w-full py-2.5 rounded-xl bg-emerald-500 text-black font-bold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Launch VAPT Scanner</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* TOOL 6: Authentic Bengali Calendar & Panjika */}
          <div
            className="rounded-3xl border border-border bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-amber-500/50 transition-all shadow-md group"
            style={{ backgroundColor: 'var(--card)' }}
          >
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="w-11 h-11 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-sm">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  ১৪৩১-১৪৩৩
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-foreground">বাংলা পঞ্জিকা ও ক্যালেন্ডার</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Surya Siddhanta & Bengali Academy ephemeris, live 6-period Bengali clock, and festivals.
                </p>
              </div>

              {/* Date Preview Box */}
              <div className="p-3 rounded-2xl bg-muted/40 border border-border space-y-1.5">
                <div className="text-[11px] font-semibold text-muted-foreground">আজকের বাংলা তারিখ:</div>
                {bengaliToday ? (
                  <div className="p-2 rounded-xl bg-card border border-border text-center space-y-0.5" style={{ backgroundColor: 'var(--card)' }}>
                    <div className="text-xs font-bold text-amber-400">{bengaliToday.formattedBn}</div>
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
                className="w-full py-2.5 rounded-xl bg-amber-500 text-black font-bold flex items-center justify-center gap-1.5 text-xs hover:opacity-95 transition-opacity shadow-sm"
              >
                <span>Open Bengali Calendar</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. DOCUMENT TOOLS & PDF STUDIO HIGHLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl border border-border bg-gradient-to-br from-card via-card to-violet-500/10 p-6 sm:p-10 shadow-lg relative overflow-hidden"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-xs font-semibold uppercase tracking-wider">
                <FileText className="w-3.5 h-3.5" />
                <span>DocForge PDF Studio</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-extrabold text-foreground tracking-tight">
                25+ In-Server PDF &amp; Document Tools
              </h2>

              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Convert Word, Excel, PPTX, JPG, and PNG to PDF. Merge, split, compress, crop, watermark, OCR, password protect, and unlock documents directly in-server with automatic temporary file cleanup.
              </p>

              {/* Popular PDF Badges */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[
                  { name: 'Merge PDF', href: '/document-tools/merge-pdf' },
                  { name: 'Split PDF', href: '/document-tools/split-pdf' },
                  { name: 'Compress PDF', href: '/document-tools/compress-pdf' },
                  { name: 'Word to PDF', href: '/document-tools/word-to-pdf' },
                  { name: 'Excel to PDF', href: '/document-tools/excel-to-pdf' },
                  { name: 'OCR PDF', href: '/document-tools/ocr-pdf' },
                  { name: 'Protect PDF', href: '/document-tools/protect-pdf' },
                  { name: 'Watermark PDF', href: '/document-tools/watermark-pdf' },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="px-3 py-1.5 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
              <Link
                href="/document-tools"
                className="px-6 py-3.5 rounded-2xl bg-violet-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-violet-500 transition-colors shadow-lg"
              >
                <span>Open Complete PDF Studio</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/document-tools/merge-pdf"
                className="px-6 py-3.5 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
                style={{ backgroundColor: 'var(--card)' }}
              >
                <span>Merge PDF Fast</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPLETE ALL TOOLS DIRECTORY MATRIX */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-foreground flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <span>Complete Tools Directory</span>
            </h2>
            <p className="text-xs text-muted-foreground">
              Browse all 30+ in-server & client-side micro-applications by category.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
            <button
              type="button"
              onClick={() => setActiveCategoryFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                activeCategoryFilter === 'all'
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'bg-muted/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              All Tools ({ALL_TOOLS_CATALOG.length})
            </button>
            {TOOL_CATEGORIES.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                onClick={() => setActiveCategoryFilter(cat.slug)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                  activeCategoryFilter === cat.slug
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'bg-muted/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredCatalog.map((tool) => (
            <Link
              key={tool.id}
              href={tool.href}
              className="p-4 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {tool.name}
                  </h4>
                  {tool.badge && (
                    <span
                      className={`text-[9px] uppercase font-mono px-1.5 py-0.5 rounded border flex-shrink-0 ${
                        tool.badgeColor || 'bg-muted text-muted-foreground border-border'
                      }`}
                    >
                      {tool.badge}
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                  {tool.tagline}
                </p>
              </div>

              <div className="pt-3 mt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span className="text-[10px] font-mono">{tool.category}</span>
                <span className="text-primary font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                  Launch →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. IN-SERVER ARCHITECTURE & PRIVACY COMPARISON */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-semibold uppercase tracking-wider">
            <Shield className="w-3.5 h-3.5" />
            <span>Architecture Standards</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground">
            Why In-Server Processing Matters
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Unlike commercial cloud tools that transmit your data to third-party ad networks, AllTools is built on zero-data-retention principles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm" style={{ backgroundColor: 'var(--card)' }}>
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">100% Client & In-Server Memory</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your sensitive tokens, passwords, document data, and birthdates are processed within browser RAM or isolated FastAPI process memory without database logging.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm" style={{ backgroundColor: 'var(--card)' }}>
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">Zero Third-Party APIs</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every ephemeris formula, regex match engine, JWT decoder, and VAPT header audit runs natively without depending on external cloud SaaS APIs.
            </p>
          </div>

          <div className="p-6 rounded-3xl border border-border bg-card space-y-3 shadow-sm" style={{ backgroundColor: 'var(--card)' }}>
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent">
              <Palette className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-foreground">7 Handcrafted Themes</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Dynamic CSS variable theming supporting Cyberpunk Neon, Retro Matrix, Modern Dark, Clean Light, Royal Bengali Gold, Sunset Amber, and Midnight AMOLED.
            </p>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE THEME SHOWCASE STRIP */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                <Palette className="w-5 h-5 text-primary" />
                <span>Live Theme Switcher</span>
              </h3>
              <p className="text-xs text-muted-foreground">
                Click any palette below to instantly switch the entire application look.
              </p>
            </div>
            <span className="text-xs font-mono text-muted-foreground">Current: {THEMES_LIST.find((t) => t.id === theme)?.name}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {THEMES_LIST.map((t) => {
              const isSelected = t.id === theme;
              return (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setTheme(t.id)}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isSelected
                      ? 'border-primary bg-primary/15 shadow-sm'
                      : 'border-border bg-muted/30 hover:border-primary/40 hover:bg-muted/60'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className="w-6 h-6 rounded-lg border border-white/20 flex items-center justify-center shadow-inner"
                      style={{ backgroundColor: t.previewBg }}
                    >
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.previewAccent }} />
                    </div>
                    {isSelected && <Check className="w-3.5 h-3.5 text-primary" />}
                  </div>
                  <div>
                    <div className="text-xs font-bold text-foreground truncate">{t.name}</div>
                    <div className="text-[10px] text-muted-foreground truncate">{t.isDark ? 'Dark Mode' : 'Light Mode'}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. LEAD ARCHITECT & DEVELOPER SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl border border-border bg-gradient-to-r from-card via-muted/30 to-card p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md"
          style={{ backgroundColor: 'var(--card)' }}
        >
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-mono font-bold">
              <User className="w-3.5 h-3.5" />
              <span>Lead Architect &amp; Systems Engineer</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-foreground">
              Engineered by Santanu Batabyal
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Designed from Bankura, West Bengal with a strict architectural philosophy: <strong>100% In-Server processing</strong>, zero external API dependencies, and high-performance polyglot UI (Next.js 14 + Python FastAPI).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/developer"
              className="px-6 py-3 rounded-2xl bg-foreground text-background font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity shadow-lg whitespace-nowrap"
            >
              <span>Developer Profile</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://github.com/alltools153/Alltools.git"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-2xl border border-border bg-card hover:bg-muted text-foreground font-semibold text-sm flex items-center gap-2 transition-colors whitespace-nowrap"
              style={{ backgroundColor: 'var(--card)' }}
            >
              <span>GitHub Source</span>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

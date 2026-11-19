import React from 'react';
import Link from 'next/link';
import { Wrench, Shield, Heart, User, CheckCircle2, Lock, Cpu, Sparkles, Layers } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-border bg-card text-muted-foreground pt-12 pb-8 transition-colors mt-auto"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Column 1: Brand & Architect */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-black font-bold shadow-glow-primary">
                <Wrench className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-foreground">AllToolss Suite</span>
            </div>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md">
              A clean, unified multi-tool web platform delivering high-precision chronological & planetary age calculations,
              passive in-server website VAPT security audits, authentic Bengali Calendar & Panjika almanac, developer micro-tools, and a complete 25+ PDF studio.
            </p>
            <div className="pt-1 text-xs flex items-center gap-2 text-foreground font-medium">
              <span>Lead Architect:</span>
              <Link href="/developer" className="text-primary font-semibold hover:underline flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Santanu Batabyal
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs pt-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% In-Server
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Zero 3rd-Party APIs
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                7 Multi-Themes
              </span>
            </div>
          </div>

          {/* Column 2: Flagship & Security Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Security &amp; Calculators
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/vapt-scanner" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🛡️ Website VAPT Scanner</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/nmap-audit" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>📡 N-Map Port Audit</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/age-calculator" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🧮 Age &amp; Planetary Calc</span>
                </Link>
              </li>
              <li>
                <Link href="/tools/bengali-calendar" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>📅 বাংলা পঞ্জিকা ১৪৩১-১৪৩৩</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Developer & PDF Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Dev &amp; PDF Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/tools/json-formatter" className="hover:text-primary transition-colors">
                  ⚡ JSON Formatter &amp; Tree
                </Link>
              </li>
              <li>
                <Link href="/tools/regex-tester" className="hover:text-primary transition-colors">
                  🔍 Regex Tester &amp; VM
                </Link>
              </li>
              <li>
                <Link href="/tools/jwt-decoder" className="hover:text-primary transition-colors">
                  🔑 JWT Decoder &amp; Claims
                </Link>
              </li>
              <li>
                <Link href="/tools/merge-pdf" className="hover:text-primary transition-colors">
                  📄 Merge &amp; Split PDF
                </Link>
              </li>
              <li>
                <Link href="/tools/compress-pdf" className="hover:text-primary transition-colors">
                  🗜️ Compress PDF
                </Link>
              </li>
              <li>
                <Link href="/document-tools" className="hover:text-primary transition-colors font-semibold text-primary">
                  📁 Explore 25+ PDF Tools →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Architecture Standards */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Architecture &amp; Docs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/api-hub" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>⚡ REST API Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/seo-keywords" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🌐 SEO Keywords Index</span>
                </Link>
              </li>
              <li>
                <Link href="/developer" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>👨‍💻 Developer Profile</span>
                </Link>
              </li>
              <li className="pt-1 text-[11px] text-muted-foreground flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Telemetry Policy</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Lead Credits */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AllToolss Suite. Built with Next.js 14, TypeScript &amp; Python FastAPI.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>by</span>
            <Link href="/developer" className="text-foreground font-semibold hover:underline">
              Santanu Batabyal with Saikat
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

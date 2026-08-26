import React from 'react';
import Link from 'next/link';
import { Wrench, Shield, Heart, User, CheckCircle2, Lock, Cpu } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-border bg-card/60 backdrop-blur text-muted-foreground pt-12 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Architect */}
          <div className="lg:col-span-2 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-glow-primary">
                <Wrench className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-foreground">AllTools</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
              A clean, modular web utility suite delivering high-precision chronological & planetary age calculations,
              passive in-server website VAPT security audits, and authentic Bengali Calendar & Panjika almanac.
            </p>
            <div className="pt-1 text-xs flex items-center gap-2 text-foreground font-medium">
              <span>Lead Architect:</span>
              <Link href="/developer" className="text-primary font-semibold hover:underline flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Santanu Batabyal
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> 100% In-Server Engine
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center gap-1">
                <Lock className="w-3 h-3" /> Zero 3rd-Party APIs
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                7 Multi-Themes
              </span>
            </div>
          </div>

          {/* Column 2: Tools Directory */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Current Tools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/age-calculator" className="hover:text-primary transition-colors">
                  🧮 Age & Milestone Calculator
                </Link>
              </li>
              <li>
                <Link href="/vapt-scanner" className="hover:text-primary transition-colors">
                  🛡️ Website VAPT Scanner
                </Link>
              </li>
              <li>
                <Link href="/bengali-calendar" className="hover:text-primary transition-colors">
                  📅 বাংলা পঞ্জিকা ও ক্যালেন্ডার
                </Link>
              </li>
              <li>
                <Link href="/developer" className="hover:text-primary transition-colors">
                  👨‍💻 Lead Architect Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: In-Server Guarantees */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Architecture Standards
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> 100% In-Server Processing
              </li>
              <li className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" /> Zero 3rd-Party API Calls
              </li>
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent" /> Zero Tracking & Privacy First
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-secondary" /> Extensible for Future Tools
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright & Lead Credits */}
        <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AllTools Suite. Built with Next.js 14, TypeScript & Python.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>by</span>
            <Link href="/developer" className="text-foreground font-semibold hover:underline">
              Santanu Batabyal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

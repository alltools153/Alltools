import React from 'react';
import Link from 'next/link';
import {
  Wrench,
  Shield,
  Heart,
  User,
  CheckCircle2,
  Lock,
  Cpu,
  Sparkles,
  Layers,
  Scale,
  Mail,
  FileText,
  Cookie,
  HelpCircle,
} from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="w-full border-t border-border bg-card text-muted-foreground pt-12 pb-8 transition-colors mt-auto"
      style={{ backgroundColor: 'var(--card)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Column 1: Brand & Architecture */}
          <div className="lg:col-span-1 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-black font-bold shadow-glow-primary">
                <Wrench className="w-5 h-5 text-black" />
              </div>
              <span className="text-xl font-bold text-foreground">AllToolss</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Unified high-performance multi-tool SaaS platform delivering 100% in-server developer utilities, security scanners, ATS resume parsers, and PDF tools.
            </p>
            <div className="pt-1 text-xs flex items-center gap-1.5 text-foreground font-medium">
              <span>Lead Architect:</span>
              <Link href="/developer" className="text-primary font-semibold hover:underline flex items-center gap-1">
                <User className="w-3.5 h-3.5" /> Santanu Batabyal
              </Link>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 text-[11px] pt-1">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1 font-mono">
                <CheckCircle2 className="w-3 h-3" /> 100% In-Server
              </span>
              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/30 flex items-center gap-1 font-mono">
                <Lock className="w-3 h-3" /> Zero Telemetry
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
                <Link href="/vapt-scanner" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🛡️ Website VAPT Scanner</span>
                </Link>
              </li>
              <li>
                <Link href="/resume-ats-checker" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>📄 Resume ATS Checker</span>
                </Link>
              </li>
              <li>
                <Link href="/age-calculator" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>🧮 Age &amp; Planetary Calc</span>
                </Link>
              </li>
              <li>
                <Link href="/bengali-calendar" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>📅 বাংলা পঞ্জিকা ১৪৩১-১৪৩৩</span>
                </Link>
              </li>
              <li>
                <Link href="/stock-market" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <span>📈 Indian Stock Market</span>
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
                <Link href="/json-formatter" className="hover:text-primary transition-colors">
                  ⚡ JSON Formatter &amp; Tree
                </Link>
              </li>
              <li>
                <Link href="/regex-tester" className="hover:text-primary transition-colors">
                  🔍 Regex Tester &amp; VM
                </Link>
              </li>
              <li>
                <Link href="/jwt-decoder" className="hover:text-primary transition-colors">
                  🔑 JWT Decoder &amp; Claims
                </Link>
              </li>
              <li>
                <Link href="/sql-generator" className="hover:text-primary transition-colors">
                  🤖 AI SQL Generator
                </Link>
              </li>
              <li>
                <Link href="/document-tools/compress-pdf" className="hover:text-primary transition-colors">
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

          {/* Column 4: Platform & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">
              Platform &amp; Docs
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  🏢 About AllToolss
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  📬 Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/developer" className="hover:text-primary transition-colors">
                  👨‍💻 Systems Architect Profile
                </Link>
              </li>
              <li>
                <Link href="/api-hub" className="hover:text-primary transition-colors">
                  ⚡ REST API Hub &amp; Docs
                </Link>
              </li>
              <li>
                <Link href="/seo-keywords" className="hover:text-primary transition-colors">
                  🌐 SEO Keywords Index
                </Link>
              </li>
              <li className="pt-1 text-[11px] text-muted-foreground flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-primary" />
                <a href="mailto:alltools153@gmail.com" className="hover:underline">
                  alltools153@gmail.com
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5: Legal, AdSense & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-indigo-400" />
              <span>Legal &amp; Policies</span>
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary transition-colors font-medium">
                  🔒 Privacy Policy (GDPR/AdSense)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-primary transition-colors">
                  📜 Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-primary transition-colors">
                  ⚠️ Legal Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-primary transition-colors">
                  🍪 Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/editorial-policy" className="hover:text-primary transition-colors">
                  ✍️ Editorial &amp; Verification
                </Link>
              </li>
              <li>
                <Link href="/dmca" className="hover:text-primary transition-colors">
                  ⚖️ DMCA &amp; Copyright
                </Link>
              </li>
              <li>
                <Link href="/affiliate-disclosure" className="hover:text-primary transition-colors">
                  📢 Advertising Disclosure
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <p>© {new Date().getFullYear()} AllToolss Suite. Built with Next.js 14, TypeScript &amp; Python FastAPI.</p>
            <span className="hidden sm:inline text-muted-foreground/50">•</span>
            <Link href="/privacy-policy" className="hover:underline text-[11px]">Privacy</Link>
            <Link href="/terms" className="hover:underline text-[11px]">Terms</Link>
            <Link href="/contact" className="hover:underline text-[11px]">Contact</Link>
            <Link href="/disclaimer" className="hover:underline text-[11px]">Disclaimer</Link>
          </div>
          <div className="flex items-center gap-1">
            <span>Engineered with</span>
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

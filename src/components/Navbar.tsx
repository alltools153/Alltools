'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import { QuickSearchModal } from './QuickSearchModal';
import {
  Wrench,
  Calculator,
  ShieldCheck,
  Calendar,
  User,
  Menu,
  X,
  Code2,
  FileJson,
  KeyRound,
  FileText,
  ChevronDown,
  Layers,
  Search,
  Sparkles,
  Terminal,
  Server,
  Radio,
  Lock,
  ArrowRight,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Database,
  FileCode,
  Mail,
  QrCode,
  Image as ImageIcon,
  Shield,
  LayoutGrid,
  Binary,
  Fingerprint,
  Clock,
  Globe2,
  FileSearch,
  Receipt,
  Coins,
  FileCheck2,
  PiggyBank,
} from 'lucide-react';
import { ALL_TOOLS_CATALOG } from '@/lib/allToolsList';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>('developer');

  const navContainerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut for search (Ctrl+K or Cmd+K)
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click outside listener to close desktop dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navContainerRef.current && !navContainerRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Mobile search filtering
  const filteredMobileTools = React.useMemo(() => {
    const q = mobileSearchQuery.trim().toLowerCase();
    if (!q) return null;
    return ALL_TOOLS_CATALOG.filter(
      (t) =>
        t.name.toLowerCase().includes(q) ||
        t.tagline.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.toLowerCase().includes(q))
    );
  }, [mobileSearchQuery]);

  // Live indices state
  const [liveIndices, setLiveIndices] = useState([
    { name: 'SENSEX', value: '76,878.98', change: '-385.53', percent: '-0.50%', positive: false },
    { name: 'NIFTY 50', value: '24,068.85', change: '-106.80', percent: '-0.44%', positive: false },
  ]);

  // Polling for Nifty & Sensex indices
  useEffect(() => {
    let isMounted = true;
    const fetchLiveTicker = async () => {
      try {
        const res = await fetch('/api/market-live', { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (isMounted && data?.marketSnapshots?.length) {
          const sensex = data.marketSnapshots.find((s: any) => s.name?.toUpperCase().includes('SENSEX'));
          const nifty = data.marketSnapshots.find((s: any) => s.name?.toUpperCase().includes('NIFTY 50') || s.name?.toUpperCase() === 'NIFTY');
          const list = [];
          if (sensex) list.push(sensex);
          if (nifty) list.push(nifty);
          if (list.length > 0) {
            setLiveIndices(list);
          }
        }
      } catch {
        // silent fallback
      }
    };
    fetchLiveTicker();
    const interval = setInterval(fetchLiveTicker, 3000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <header
        ref={navContainerRef}
        className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-xl transition-colors shadow-sm"
        style={{ backgroundColor: 'var(--card)' }}
      >
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-black font-bold shadow-glow-primary group-hover:scale-105 transition-transform duration-200">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
                <span>AllToolss</span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden xs:inline">
                  In-Server
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground hidden xl:block leading-none">
                Unified Multi-Tool Suite
              </p>
            </div>
          </Link>

          {/* Center: Categorized Desktop Navigation Menu */}
          <nav className="hidden lg:flex flex-1 items-center justify-start gap-1 xl:gap-1.5 min-w-0 pl-2">
            
            {/* 1. All Tools Menu Dropdown (Replaces Home Button) */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'all_tools_menu' ? null : 'all_tools_menu')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'all_tools_menu'
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'bg-primary/10 text-primary hover:bg-primary/20 border border-primary/25'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                <span>Menu</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'all_tools_menu' ? 'rotate-180' : ''}`} />
              </button>

              {activeDropdown === 'all_tools_menu' && (
                <div
                  className="absolute left-0 mt-2 w-[840px] max-w-[95vw] rounded-3xl border border-border bg-card shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-4"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-primary/15 text-primary flex items-center justify-center">
                        <Wrench className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">All Tools Directory</h3>
                        <p className="text-[11px] text-muted-foreground">Select any tool from our unified suite</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveDropdown(null);
                        setIsSearchOpen(true);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-muted hover:bg-muted/80 text-[11px] font-mono text-muted-foreground flex items-center gap-1.5 cursor-pointer"
                    >
                      <Search className="w-3 h-3 text-primary" />
                      <span>Search with ⌘K</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-4 gap-5 text-xs max-h-[75vh] overflow-y-auto pr-1">
                    {/* Col 1: Developer Tools */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Developer Tools</span>
                      </div>
                      <div className="space-y-0.5">
                        <Link href="/regex-tester" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          Regex Tester &amp; VM
                        </Link>
                        <Link href="/json-formatter" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          JSON Formatter &amp; Tree
                        </Link>
                        <Link href="/jwt-decoder" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          JWT Decoder &amp; Claims
                        </Link>
                        <Link href="/base64-encoder-decoder" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Base64 Encoder / Decoder
                        </Link>
                        <Link href="/uuid-generator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ UUID v4 Generator
                        </Link>
                        <Link href="/cron-expression-generator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Cron Expression Generator
                        </Link>
                        <Link href="/sql-generator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ AI SQL Generator
                        </Link>
                        <Link href="/gitignore-generator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Git Ignore Generator
                        </Link>
                        <Link href="/dev-tools" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted text-[11px] text-muted-foreground">
                          Unified Dev Hub →
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Security Tools */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Security Tools</span>
                      </div>
                      <div className="space-y-0.5">
                        <Link href="/vapt-scanner" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          Website VAPT Scanner
                        </Link>
                        <Link href="/vapt-scanner" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          Nmap Port Audit
                        </Link>
                        <Link href="/ssl-certificate-checker" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ SSL Certificate Checker
                        </Link>
                        <Link href="/dns-lookup" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ DNS Records Lookup
                        </Link>
                        <Link href="/whois-lookup" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ WHOIS / RDAP Lookup
                        </Link>
                        <Link href="/email-security" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ SPF / DKIM / DMARC
                        </Link>
                        <Link href="/password-generator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Password Generator
                        </Link>
                        <Link href="/password-strength-checker" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Password Strength Checker
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Utility Tools */}
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Calculator className="w-3.5 h-3.5" />
                        <span>Utility Tools</span>
                      </div>
                      <div className="space-y-0.5">
                        <Link href="/bengali-calendar" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          বাংলা পঞ্জিকা ও ক্যালেন্ডার
                        </Link>
                        <Link href="/age-calculator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-medium text-foreground">
                          Age &amp; Planetary Calculator
                        </Link>
                        <Link href="/resume-ats-checker" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Resume ATS Checker
                        </Link>
                        <Link href="/qr-generator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ QR Code Generator
                        </Link>
                        <Link href="/image-compressor" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                          ✨ Image Compressor
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Finance & PDF Studio */}
                    <div className="space-y-3">
                      <div className="space-y-1.5">
                        <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider flex items-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>Finance Tools</span>
                        </div>
                        <div className="space-y-0.5">
                          <Link href="/stock-market" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-foreground">
                            📈 Sensex &amp; Nifty Live
                          </Link>
                          <Link href="/gst-calculator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                            ✨ GST Calculator
                          </Link>
                          <Link href="/sip-calculator" onClick={() => setActiveDropdown(null)} className="block p-1.5 rounded-lg hover:bg-muted font-semibold text-primary">
                            ✨ SIP Wealth Calculator
                          </Link>
                        </div>
                      </div>

                      <div className="space-y-1.5 pt-2 border-t border-border">
                        <div className="text-[11px] font-bold text-violet-400 uppercase tracking-wider flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5" />
                          <span>PDF Studio</span>
                        </div>
                        <div className="space-y-0.5">
                          <Link href="/document-tools/merge-pdf" onClick={() => setActiveDropdown(null)} className="block p-1 rounded hover:bg-muted text-[11px] text-muted-foreground">
                            Merge PDF
                          </Link>
                          <Link href="/document-tools/split-pdf" onClick={() => setActiveDropdown(null)} className="block p-1 rounded hover:bg-muted text-[11px] text-muted-foreground">
                            Split PDF
                          </Link>
                          <Link href="/document-tools/compress-pdf" onClick={() => setActiveDropdown(null)} className="block p-1 rounded hover:bg-muted text-[11px] text-muted-foreground">
                            Compress PDF
                          </Link>
                          <Link href="/document-tools" onClick={() => setActiveDropdown(null)} className="block p-1 rounded font-semibold text-primary text-[11px]">
                            All 25+ PDF Tools →
                          </Link>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* 2. Developer Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'dev' ? null : 'dev')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'dev' || pathname.startsWith('/json') || pathname.startsWith('/regex') || pathname.startsWith('/jwt') || pathname.startsWith('/sql') || pathname.startsWith('/gitignore') || pathname.startsWith('/base64') || pathname.startsWith('/uuid') || pathname.startsWith('/cron') || pathname.startsWith('/dev-tools')
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                <span>Developer</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'dev' ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
              </button>

              {activeDropdown === 'dev' && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 max-h-[80vh] overflow-y-auto"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1">
                    Developer Suite
                  </div>
                  <Link
                    href="/regex-tester"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-pink-500/15 text-pink-400">
                      <Code2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Regex Tester &amp; VM</div>
                      <div className="text-[10px] text-muted-foreground">Pattern matching &amp; groups</div>
                    </div>
                  </Link>

                  <Link
                    href="/json-formatter"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <FileJson className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">JSON Formatter &amp; Tree</div>
                      <div className="text-[10px] text-muted-foreground">Split editor &amp; validator</div>
                    </div>
                  </Link>

                  <Link
                    href="/jwt-decoder"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">JWT Decoder &amp; Claims</div>
                      <div className="text-[10px] text-muted-foreground">Color token claims &amp; expiry</div>
                    </div>
                  </Link>

                  <Link
                    href="/base64-encoder-decoder"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <Binary className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>Base64 Encoder / Decoder</span>
                        <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Text &amp; file encoder/decoder</div>
                    </div>
                  </Link>

                  <Link
                    href="/uuid-generator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-purple-500/15 text-purple-400">
                      <Fingerprint className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>UUID v4 Generator</span>
                        <span className="text-[8px] bg-purple-500/20 text-purple-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Batch RFC 4122 v4 IDs</div>
                    </div>
                  </Link>

                  <Link
                    href="/cron-expression-generator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>Cron Generator</span>
                        <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Visual cron schedule builder</div>
                    </div>
                  </Link>

                  <Link
                    href="/sql-generator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">AI SQL Generator</div>
                      <div className="text-[10px] text-muted-foreground">Natural language to SQL</div>
                    </div>
                  </Link>

                  <Link
                    href="/gitignore-generator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-blue-500/15 text-blue-400">
                      <FileCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Git Ignore Generator</div>
                      <div className="text-[10px] text-muted-foreground">Multi-stack .gitignore builder</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 3. Security Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'sec' ? null : 'sec')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'sec' || pathname.startsWith('/vapt') || pathname.startsWith('/email-security') || pathname.startsWith('/ssl') || pathname.startsWith('/dns') || pathname.startsWith('/whois') || pathname.startsWith('/password')
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Security</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'sec' ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
              </button>

              {activeDropdown === 'sec' && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 max-h-[80vh] overflow-y-auto"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1">
                    Security &amp; Audit Tools
                  </div>
                  <Link
                    href="/vapt-scanner"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Website VAPT Scanner</div>
                      <div className="text-[10px] text-muted-foreground">OWASP Top 10 &amp; header audit</div>
                    </div>
                  </Link>

                  <Link
                    href="/ssl-certificate-checker"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>SSL Certificate Checker</span>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">TLS handshake &amp; expiry</div>
                    </div>
                  </Link>

                  <Link
                    href="/dns-lookup"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <Globe2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>DNS Records Lookup</span>
                        <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">A, AAAA, MX, TXT, NS records</div>
                    </div>
                  </Link>

                  <Link
                    href="/whois-lookup"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                      <FileSearch className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>WHOIS / RDAP Lookup</span>
                        <span className="text-[8px] bg-amber-500/20 text-amber-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Domain registrar &amp; dates</div>
                    </div>
                  </Link>

                  <Link
                    href="/email-security"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-violet-500/15 text-violet-400">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">SPF / DKIM / DMARC</div>
                      <div className="text-[10px] text-muted-foreground">DNS email security &amp; score</div>
                    </div>
                  </Link>

                  <Link
                    href="/password-generator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>Password Generator</span>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">High-entropy random generator</div>
                    </div>
                  </Link>

                  <Link
                    href="/password-strength-checker"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>Password Strength</span>
                        <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Entropy &amp; GPU crack time</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 4. Utility Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'util' ? null : 'util')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'util' || pathname.startsWith('/age') || pathname.startsWith('/bengali') || pathname.startsWith('/qr') || pathname.startsWith('/image') || pathname.startsWith('/resume')
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <Calculator className="w-3.5 h-3.5 text-amber-400" />
                <span>Utility Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'util' ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
              </button>

              {activeDropdown === 'util' && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1 max-h-[80vh] overflow-y-auto"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1">
                    Utility &amp; Calculation Suite
                  </div>
                  <Link
                    href="/bengali-calendar"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">বাংলা পঞ্জিকা ও ক্যালেন্ডার</div>
                      <div className="text-[10px] text-muted-foreground">Tithi, Muhurat &amp; festivals</div>
                    </div>
                  </Link>

                  <Link
                    href="/age-calculator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-primary/15 text-primary">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Age &amp; Planetary Calc</div>
                      <div className="text-[10px] text-muted-foreground">9 Planetary orbits &amp; milestones</div>
                    </div>
                  </Link>

                  <Link
                    href="/resume-ats-checker"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-indigo-500/15 text-indigo-400">
                      <FileCheck2 className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>Resume ATS Checker</span>
                        <span className="text-[8px] bg-indigo-500/20 text-indigo-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">ATS score &amp; keyword audit</div>
                    </div>
                  </Link>

                  <Link
                    href="/qr-generator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-violet-500/15 text-violet-400">
                      <QrCode className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">QR Code Generator</div>
                      <div className="text-[10px] text-muted-foreground">Text, WiFi, URL, PNG &amp; SVG</div>
                    </div>
                  </Link>

                  <Link
                    href="/image-compressor"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <ImageIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Image Compressor</div>
                      <div className="text-[10px] text-muted-foreground">JPG, PNG, WEBP batch optimizer</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* 5. PDF Studio Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'pdf' ? null : 'pdf')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'pdf' || pathname.startsWith('/document-tools')
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-violet-400" />
                <span>PDF Studio (25+)</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'pdf' ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
              </button>

              {activeDropdown === 'pdf' && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1">
                    <span>PDF Forge (25+ Tools)</span>
                    <Link href="/document-tools" onClick={() => setActiveDropdown(null)} className="text-primary hover:underline">
                      View All →
                    </Link>
                  </div>
                  <Link
                    href="/document-tools/merge-pdf"
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground font-semibold"
                  >
                    Merge PDF Documents
                  </Link>
                  <Link
                    href="/document-tools/split-pdf"
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground font-semibold"
                  >
                    Split PDF Pages
                  </Link>
                  <Link
                    href="/document-tools/compress-pdf"
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground font-semibold"
                  >
                    Compress &amp; Optimize PDF
                  </Link>
                  <Link
                    href="/document-tools/word-to-pdf"
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground font-semibold"
                  >
                    Word to PDF (DOCX)
                  </Link>
                  <Link
                    href="/document-tools/ocr-pdf"
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground font-semibold"
                  >
                    OCR &amp; Searchable PDF
                  </Link>
                  <Link
                    href="/document-tools"
                    onClick={() => setActiveDropdown(null)}
                    className="block p-2 text-center rounded-xl bg-primary/10 hover:bg-primary/20 text-xs font-bold text-primary transition-colors mt-2"
                  >
                    Open Full PDF Studio (25+ Tools) →
                  </Link>
                </div>
              )}
            </div>

            {/* 6. Finance Tools Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setActiveDropdown(activeDropdown === 'fin' ? null : 'fin')}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  activeDropdown === 'fin' || pathname.startsWith('/stock-market') || pathname.startsWith('/gst') || pathname.startsWith('/sip')
                    ? 'bg-primary/15 text-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Finance</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'fin' ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
              </button>

              {activeDropdown === 'fin' && (
                <div
                  className="absolute left-0 mt-2 w-72 rounded-2xl border border-border bg-card shadow-2xl p-3 z-50 animate-in fade-in zoom-in-95 duration-150 space-y-1"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground px-2.5 py-1">
                    Financial Calculators
                  </div>
                  <Link
                    href="/stock-market"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Sensex &amp; Nifty 50 Live</div>
                      <div className="text-[10px] text-muted-foreground">Real-time market view</div>
                    </div>
                  </Link>

                  <Link
                    href="/gst-calculator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                      <Receipt className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>GST Calculator</span>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Exclusive/inclusive tax slabs</div>
                    </div>
                  </Link>

                  <Link
                    href="/sip-calculator"
                    onClick={() => setActiveDropdown(null)}
                    className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-muted text-xs transition-colors"
                  >
                    <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                      <Coins className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground flex items-center gap-1">
                        <span>SIP Wealth Calculator</span>
                        <span className="text-[8px] bg-cyan-500/20 text-cyan-400 px-1 py-0.2 rounded font-bold">NEW</span>
                      </div>
                      <div className="text-[10px] text-muted-foreground">Mutual fund compound returns</div>
                    </div>
                  </Link>
                </div>
              )}
            </div>

            {/* Developer link */}
            <Link
              href="/developer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all whitespace-nowrap ${
                pathname === '/developer'
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <User className="w-4 h-4 text-sky-400 flex-shrink-0" />
              <span>Developer</span>
            </Link>
          </nav>

          {/* Right Action Section: Nifty/Sensex Badge, Search, Theme Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Live Sensex & Nifty Index Indicator (Pure Informative Display - No Hyperlink / Zero Collision) */}
            <div
              className="hidden 2xl:flex items-center gap-1.5 rounded-xl border border-border bg-muted/20 px-2.5 py-1 select-none"
              title="Real-Time Indian Stock Market Indices"
            >
              <div className="flex items-center gap-1 pr-1 border-r border-border/70">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Live</span>
              </div>
              {liveIndices.map((item) => (
                <div key={item.name} className="flex items-center gap-1 rounded-lg bg-card/90 px-1.5 py-0.5 border border-border/50">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground">
                    {item.name === 'NIFTY 50' ? 'NIFTY' : item.name}
                  </span>
                  <span className="text-[10px] font-bold font-mono text-foreground">{item.value}</span>
                  <span
                    className={`inline-flex items-center text-[9px] font-bold font-mono ${
                      item.positive ? 'text-emerald-400' : 'text-red-400'
                    }`}
                  >
                    {item.positive ? <ArrowUpRight className="h-2.5 w-2.5" /> : <ArrowDownRight className="h-2.5 w-2.5" />}
                    {item.percent}
                  </span>
                </div>
              ))}
            </div>

            {/* Quick Theme Switcher Button */}
            <ThemeSwitcher />

            {/* Quick Search Button */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl border border-border bg-card hover:border-primary/50 text-muted-foreground hover:text-foreground transition-all text-xs cursor-pointer shadow-sm"
              style={{ backgroundColor: 'var(--card)' }}
              aria-label="Search all tools (Ctrl+K)"
            >
              <Search className="w-4 h-4 text-primary flex-shrink-0" />
              <span className="hidden md:inline font-medium">Search...</span>
              <kbd className="hidden lg:inline px-1.5 py-0.5 rounded bg-muted border border-border text-[9px] font-mono text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border border-border bg-card text-foreground hover:bg-muted cursor-pointer transition-colors shadow-sm"
              style={{ backgroundColor: 'var(--card)' }}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile-Only Live Sensex & Nifty Sub-Ticker Strip */}
        <div className="md:hidden flex items-center justify-between px-3 py-1 bg-muted/30 border-t border-border/50 text-[10px] font-mono">
          <div className="flex items-center gap-1 text-muted-foreground">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
            </span>
            <span className="font-bold uppercase tracking-wider text-[9px]">Live Indices</span>
          </div>
          <div className="flex items-center gap-1.5">
            {liveIndices.map((item) => (
              <div
                key={item.name}
                className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-card/80 border border-border/60 text-[10px]"
              >
                <span className="font-bold text-muted-foreground text-[9px]">
                  {item.name === 'NIFTY 50' ? 'NIFTY' : item.name}
                </span>
                <span className="font-bold font-mono text-foreground">{item.value}</span>
                <span
                  className={`inline-flex items-center text-[9px] font-bold font-mono ${
                    item.positive ? 'text-emerald-400' : 'text-red-400'
                  }`}
                >
                  {item.positive ? '+' : ''}
                  {item.percent}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE SLIDE-OUT DRAWER MENU */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-b border-border bg-card shadow-2xl px-4 pt-3 pb-8 space-y-4 animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4rem)] overflow-y-auto"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {/* Mobile Search Bar */}
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search all tools (e.g. QR, SQL, SPF, PDF)..."
                className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-border bg-muted/60 text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
              {mobileSearchQuery && (
                <button
                  type="button"
                  onClick={() => setMobileSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Filtered Search Results on Mobile */}
            {filteredMobileTools ? (
              <div className="space-y-1 pt-1 pb-2 border-b border-border">
                <div className="text-[11px] font-bold text-primary uppercase tracking-wider px-2">
                  Matching Tools ({filteredMobileTools.length})
                </div>
                {filteredMobileTools.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">No matching tools found</p>
                ) : (
                  filteredMobileTools.map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-muted/40 hover:bg-muted text-xs"
                    >
                      <div className="font-semibold text-foreground">{tool.name}</div>
                      <span className="text-[10px] text-muted-foreground">{tool.category}</span>
                    </Link>
                  ))
                )}
              </div>
            ) : (
              /* Categorized Drawer Accordions */
              <div className="space-y-3">
                
                {/* 1. Developer Tools */}
                <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'developer' ? null : 'developer')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>Developer Tools (8)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedCat === 'developer' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedCat === 'developer' && (
                    <div className="p-2 pt-0 space-y-1 border-t border-border/60">
                      <Link href="/regex-tester" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        Regex Tester &amp; VM
                      </Link>
                      <Link href="/json-formatter" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        JSON Formatter &amp; Tree
                      </Link>
                      <Link href="/jwt-decoder" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        JWT Decoder &amp; Claims
                      </Link>
                      <Link href="/base64-encoder-decoder" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Base64 Encoder / Decoder
                      </Link>
                      <Link href="/uuid-generator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ UUID v4 Generator
                      </Link>
                      <Link href="/cron-expression-generator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Cron Expression Generator
                      </Link>
                      <Link href="/sql-generator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ AI SQL Generator
                      </Link>
                      <Link href="/gitignore-generator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Git Ignore Generator
                      </Link>
                    </div>
                  )}
                </div>

                {/* 2. Security Tools */}
                <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'security' ? null : 'security')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Security &amp; Domain Tools (8)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedCat === 'security' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedCat === 'security' && (
                    <div className="p-2 pt-0 space-y-1 border-t border-border/60">
                      <Link href="/vapt-scanner" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        Website VAPT Testing &amp; Port Audit
                      </Link>
                      <Link href="/ssl-certificate-checker" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ SSL Certificate Checker
                      </Link>
                      <Link href="/dns-lookup" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ DNS Records Lookup
                      </Link>
                      <Link href="/whois-lookup" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ WHOIS / RDAP Lookup
                      </Link>
                      <Link href="/email-security" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ SPF / DKIM / DMARC Checker
                      </Link>
                      <Link href="/password-generator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Password Generator
                      </Link>
                      <Link href="/password-strength-checker" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Password Strength Checker
                      </Link>
                    </div>
                  )}
                </div>

                {/* 3. Utility Tools */}
                <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'utility' ? null : 'utility')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <Calculator className="w-4 h-4 text-amber-400" />
                      <span>Utility &amp; Calculation Suite (5)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedCat === 'utility' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedCat === 'utility' && (
                    <div className="p-2 pt-0 space-y-1 border-t border-border/60">
                      <Link href="/bengali-calendar" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        বাংলা পঞ্জিকা ১৪৩১-১৪৩৩
                      </Link>
                      <Link href="/age-calculator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        Age Milestone &amp; Planetary Calc
                      </Link>
                      <Link href="/resume-ats-checker" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Resume ATS Checker
                      </Link>
                      <Link href="/qr-generator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ QR Code Generator
                      </Link>
                      <Link href="/image-compressor" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ Image Compressor
                      </Link>
                    </div>
                  )}
                </div>

                {/* 4. PDF Studio */}
                <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'pdf' ? null : 'pdf')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-400" />
                      <span>PDF Studio (25+ Tools)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedCat === 'pdf' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedCat === 'pdf' && (
                    <div className="p-2 pt-0 space-y-1 border-t border-border/60">
                      <Link href="/document-tools/merge-pdf" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        Merge PDF
                      </Link>
                      <Link href="/document-tools/split-pdf" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        Split PDF
                      </Link>
                      <Link href="/document-tools/compress-pdf" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        Compress PDF
                      </Link>
                      <Link href="/document-tools/ocr-pdf" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        OCR PDF
                      </Link>
                      <Link href="/document-tools" onClick={() => setMobileMenuOpen(false)} className="block p-2 text-center rounded-xl bg-primary/10 text-xs font-bold text-primary mt-1">
                        Explore All 25+ PDF Tools →
                      </Link>
                    </div>
                  )}
                </div>

                {/* 5. Finance Tools */}
                <div className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setMobileExpandedCat(mobileExpandedCat === 'finance' ? null : 'finance')}
                    className="w-full p-3 flex items-center justify-between text-xs font-bold text-foreground cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-amber-400" />
                      <span>Finance &amp; Wealth (3)</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileExpandedCat === 'finance' ? 'rotate-180' : ''}`} />
                  </button>
                  {mobileExpandedCat === 'finance' && (
                    <div className="p-2 pt-0 space-y-1 border-t border-border/60">
                      <Link href="/stock-market" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-medium text-foreground">
                        📈 Indian Stock Market Live (Sensex &amp; Nifty)
                      </Link>
                      <Link href="/gst-calculator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ GST Tax Calculator
                      </Link>
                      <Link href="/sip-calculator" onClick={() => setMobileMenuOpen(false)} className="block p-2 rounded-lg hover:bg-muted text-xs font-semibold text-primary">
                        ✨ SIP Wealth Calculator
                      </Link>
                    </div>
                  )}
                </div>

                {/* Developer Profile Link */}
                <Link
                  href="/developer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between p-3.5 rounded-2xl border border-border bg-muted/30 hover:bg-muted text-xs font-semibold text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-sky-400" />
                    <span>Lead Architect &amp; Developer</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
                </Link>
              </div>
            )}
          </div>
        )}
      </header>

      {/* Global Quick Search Modal (Ctrl+K) */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

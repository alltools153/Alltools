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
  FileSpreadsheet,
  FileStack,
  Lock,
  ArrowRight,
} from 'lucide-react';
import { ALL_TOOLS_CATALOG, TOOL_CATEGORIES } from '@/lib/allToolsList';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toolsMegaMenuOpen, setToolsMegaMenuOpen] = useState(false);
  const [docToolsOpen, setDocToolsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState('');
  const [mobileExpandedCat, setMobileExpandedCat] = useState<string | null>('flagship');

  const megaMenuRef = useRef<HTMLDivElement>(null);
  const docMenuRef = useRef<HTMLDivElement>(null);

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

  // Click outside listener for desktop dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setToolsMegaMenuOpen(false);
      }
      if (docMenuRef.current && !docMenuRef.current.contains(event.target as Node)) {
        setDocToolsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setToolsMegaMenuOpen(false);
    setDocToolsOpen(false);
  }, [pathname]);

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

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/95 backdrop-blur-xl transition-colors shadow-sm" style={{ backgroundColor: 'var(--card)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-primary via-accent to-secondary flex items-center justify-center text-black font-bold shadow-glow-primary group-hover:scale-105 transition-transform duration-200">
              <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-foreground flex items-center gap-1.5">
                <span>AllTools</span>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hidden xs:inline">
                  In-Server
                </span>
              </div>
              <p className="text-[10px] text-muted-foreground hidden lg:block leading-none">
                Zero 3rd-Party APIs • 100% Privacy
              </p>
            </div>
          </Link>

          {/* Center: Desktop Navigation & Mega Menubar */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            
            {/* 1. ALL TOOLS MEGA MENU TRIGGER */}
            <div className="relative" ref={megaMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setToolsMegaMenuOpen(!toolsMegaMenuOpen);
                  setDocToolsOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer ${
                  toolsMegaMenuOpen
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'text-foreground hover:bg-muted/80'
                }`}
                aria-expanded={toolsMegaMenuOpen}
              >
                <Layers className="w-4 h-4 text-primary" />
                <span>All Tools</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${toolsMegaMenuOpen ? 'rotate-180 text-primary-foreground' : 'text-muted-foreground'}`} />
              </button>

              {/* MEGA MENU DROPDOWN PANEL */}
              {toolsMegaMenuOpen && (
                <div
                  className="absolute left-0 mt-2 w-[52rem] rounded-2xl border border-border bg-card shadow-2xl p-5 z-50 animate-in fade-in zoom-in-95 duration-150"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <div className="flex items-center justify-between pb-3 mb-4 border-b border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary">
                        <Sparkles className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-foreground">AllTools Unified Suite Directory</h3>
                        <p className="text-[11px] text-muted-foreground">30+ in-server & client-side utilities across 5 categories</p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setToolsMegaMenuOpen(false);
                        setIsSearchOpen(true);
                      }}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-muted/50 hover:bg-muted text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    >
                      <Search className="w-3.5 h-3.5 text-primary" />
                      <span>Search All Tools</span>
                      <kbd className="px-1.5 py-0.5 rounded bg-card border border-border text-[9px] font-mono">⌘K</kbd>
                    </button>
                  </div>

                  {/* 4 Categorized Columns */}
                  <div className="grid grid-cols-4 gap-4">
                    
                    {/* Col 1: Developer Suite */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-wider">
                        <Code2 className="w-3.5 h-3.5" />
                        <span>Developer</span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/json-formatter"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>JSON Formatter</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Split editor & tree</p>
                        </Link>
                        <Link
                          href="/regex-tester"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Regex Tester</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Live match highlighter</p>
                        </Link>
                        <Link
                          href="/jwt-decoder"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>JWT Decoder</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Claims & expiry timer</p>
                        </Link>
                        <Link
                          href="/dev-tools"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Developer Hub</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">3-in-1 unified suite</p>
                        </Link>
                      </div>
                    </div>

                    {/* Col 2: Security & VAPT */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>Security & VAPT</span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/vapt-scanner"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Website VAPT Scanner</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">OWASP & header audit</p>
                        </Link>
                        <Link
                          href="/vapt-scanner"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>N-Map Port Audit</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">In-server TCP sockets</p>
                        </Link>
                        <Link
                          href="/vapt-scanner"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>SSL/TLS Inspector</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Handshake & ciphers</p>
                        </Link>
                      </div>
                    </div>

                    {/* Col 3: Calculators & Panjika */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Time & Panjika</span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/age-calculator"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Age & Planets Calc</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">9 Planetary orbits & bio</p>
                        </Link>
                        <Link
                          href="/bengali-calendar"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>বাংলা পঞ্জিকা ১৪৩১-১৪৩৩</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Tithi, clock & festivals</p>
                        </Link>
                        <Link
                          href="/bengali-calendar"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Durga Puja & Muhurat</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Subho muhurat & dates</p>
                        </Link>
                      </div>
                    </div>

                    {/* Col 4: Document & PDF Studio */}
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400 uppercase tracking-wider">
                        <FileText className="w-3.5 h-3.5" />
                        <span>PDF Studio</span>
                      </div>
                      <div className="space-y-1">
                        <Link
                          href="/document-tools/merge-pdf"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Merge & Split PDF</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Combine or divide pages</p>
                        </Link>
                        <Link
                          href="/document-tools/compress-pdf"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Compress PDF</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Reduce PDF file size</p>
                        </Link>
                        <Link
                          href="/document-tools/word-to-pdf"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>Convert to/from PDF</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Word, Excel, JPG, PPT</p>
                        </Link>
                        <Link
                          href="/document-tools/ocr-pdf"
                          className="group block p-2 rounded-lg hover:bg-muted/70 transition-colors"
                        >
                          <div className="text-xs font-semibold text-foreground group-hover:text-primary flex items-center gap-1">
                            <span>OCR & Security</span>
                          </div>
                          <p className="text-[11px] text-muted-foreground line-clamp-1">Extract text & protect</p>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Mega Menu Bottom Bar */}
                  <div className="mt-4 pt-3 border-t border-border flex items-center justify-between bg-muted/30 -mx-5 -mb-5 px-5 py-3 rounded-b-2xl">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <Lock className="w-3.5 h-3.5" /> 100% In-Server Memory
                      </span>
                      <span>•</span>
                      <span>Zero Tracking</span>
                      <span>•</span>
                      <span>7 Multi-Themes</span>
                    </div>
                    <Link
                      href="/document-tools"
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      <span>Explore 25+ PDF Tools</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Direct Tool Links */}
            <Link
              href="/vapt-scanner"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                pathname === '/vapt-scanner'
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>VAPT Scanner</span>
            </Link>

            <Link
              href="/age-calculator"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                pathname === '/age-calculator'
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <Calculator className="w-4 h-4 text-primary" />
              <span>Age Calc</span>
            </Link>

            <Link
              href="/bengali-calendar"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                pathname === '/bengali-calendar'
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <Calendar className="w-4 h-4 text-amber-400" />
              <span>বাংলা পঞ্জিকা</span>
            </Link>

            {/* PDF Suite Dropdown */}
            <div className="relative" ref={docMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setDocToolsOpen(!docToolsOpen);
                  setToolsMegaMenuOpen(false);
                }}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all cursor-pointer ${
                  pathname?.startsWith('/document-tools')
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <FileText className="w-4 h-4 text-violet-400" />
                <span>PDF Suite</span>
                <ChevronDown className="w-3 h-3 text-muted-foreground" />
              </button>

              {docToolsOpen && (
                <div
                  className="absolute left-0 mt-2 w-64 rounded-2xl border border-border bg-card shadow-2xl p-2.5 z-50 space-y-1 animate-in fade-in zoom-in-95 duration-150"
                  style={{ backgroundColor: 'var(--card)' }}
                >
                  <Link
                    href="/document-tools"
                    className="flex items-center justify-between p-2 rounded-lg hover:bg-muted text-xs font-bold text-foreground"
                  >
                    <span>All 25+ PDF Tools</span>
                    <ArrowRight className="w-3.5 h-3.5 text-primary" />
                  </Link>
                  <div className="border-t border-border my-1" />
                  <Link
                    href="/document-tools/merge-pdf"
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground"
                  >
                    Merge PDF
                  </Link>
                  <Link
                    href="/document-tools/split-pdf"
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground"
                  >
                    Split PDF
                  </Link>
                  <Link
                    href="/document-tools/compress-pdf"
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground"
                  >
                    Compress PDF
                  </Link>
                  <Link
                    href="/document-tools/word-to-pdf"
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground"
                  >
                    Word to PDF
                  </Link>
                  <Link
                    href="/document-tools/ocr-pdf"
                    className="block p-2 rounded-lg hover:bg-muted text-xs text-foreground"
                  >
                    OCR PDF
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/developer"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs xl:text-sm font-medium transition-all ${
                pathname === '/developer'
                  ? 'bg-primary text-primary-foreground shadow-glow-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
              }`}
            >
              <User className="w-4 h-4 text-sky-400" />
              <span>Developer</span>
            </Link>
          </nav>

          {/* Right Action Section: Search Button, Theme Switcher & Mobile Menu Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            
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

            {/* Theme Switcher with Solid Opaque Background */}
            <ThemeSwitcher />

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

        {/* MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-b border-border bg-card shadow-2xl px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-150 max-h-[calc(100vh-4rem)] overflow-y-auto"
            style={{ backgroundColor: 'var(--card)' }}
          >
            {/* Mobile Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={mobileSearchQuery}
                onChange={(e) => setMobileSearchQuery(e.target.value)}
                placeholder="Search 30+ tools..."
                className="w-full pl-9 pr-8 py-2 rounded-xl border border-border bg-muted/60 text-foreground text-xs placeholder:text-muted-foreground focus:outline-none focus:border-primary"
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
            {filteredMobileTools && (
              <div className="space-y-1 pt-1 pb-2 border-b border-border">
                <div className="text-[11px] font-bold text-primary uppercase tracking-wider px-2">
                  Matching Tools ({filteredMobileTools.length})
                </div>
                {filteredMobileTools.length === 0 ? (
                  <p className="text-xs text-muted-foreground px-2 py-2">No matching tools found</p>
                ) : (
                  filteredMobileTools.slice(0, 8).map((tool) => (
                    <Link
                      key={tool.id}
                      href={tool.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/40 hover:bg-muted text-xs"
                    >
                      <div className="font-semibold text-foreground">{tool.name}</div>
                      <span className="text-[10px] text-muted-foreground">{tool.category}</span>
                    </Link>
                  ))
                )}
              </div>
            )}

            {/* Categorized Tool Sections */}
            <div className="space-y-2 pt-1">
              
              {/* Category 1: Flagship Tools */}
              <div>
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 pb-1">
                  Flagship Tools
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    href="/vapt-scanner"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                    <span className="truncate">VAPT Scanner</span>
                  </Link>

                  <Link
                    href="/age-calculator"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    <Calculator className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="truncate">Age Calc</span>
                  </Link>

                  <Link
                    href="/bengali-calendar"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    <Calendar className="w-4 h-4 text-amber-400 flex-shrink-0" />
                    <span className="truncate">বাংলা পঞ্জিকা</span>
                  </Link>

                  <Link
                    href="/document-tools"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-2 p-2.5 rounded-xl border border-border bg-muted/30 hover:bg-muted text-xs font-semibold text-foreground"
                  >
                    <FileText className="w-4 h-4 text-violet-400 flex-shrink-0" />
                    <span className="truncate">PDF Studio</span>
                  </Link>
                </div>
              </div>

              {/* Category 2: Developer Suite */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 pb-1">
                  Developer Micro-Tools
                </div>
                <div className="space-y-1">
                  <Link
                    href="/json-formatter"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted text-xs text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <FileJson className="w-4 h-4 text-cyan-400" />
                      <span>JSON Formatter & Schema</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Client-Side</span>
                  </Link>

                  <Link
                    href="/regex-tester"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted text-xs text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-pink-400" />
                      <span>Regex Tester & Cheat Sheet</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Live VM</span>
                  </Link>

                  <Link
                    href="/jwt-decoder"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted text-xs text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <KeyRound className="w-4 h-4 text-purple-400" />
                      <span>JWT Decoder & Expiry Inspector</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground">Zero Server</span>
                  </Link>

                  <Link
                    href="/dev-tools"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-muted text-xs text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-indigo-400" />
                      <span>All Dev Tools Suite</span>
                    </div>
                    <span className="text-[10px] text-primary font-bold">Unified</span>
                  </Link>
                </div>
              </div>

              {/* Category 3: Document & PDF Studio */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider px-2 pb-1">
                  Document & PDF Studio (25+ Tools)
                </div>
                <div className="grid grid-cols-2 gap-1.5">
                  <Link
                    href="/document-tools/merge-pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-muted/20 hover:bg-muted text-xs text-foreground"
                  >
                    Merge PDF
                  </Link>
                  <Link
                    href="/document-tools/split-pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-muted/20 hover:bg-muted text-xs text-foreground"
                  >
                    Split PDF
                  </Link>
                  <Link
                    href="/document-tools/compress-pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-muted/20 hover:bg-muted text-xs text-foreground"
                  >
                    Compress PDF
                  </Link>
                  <Link
                    href="/document-tools/word-to-pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-muted/20 hover:bg-muted text-xs text-foreground"
                  >
                    Word to PDF
                  </Link>
                  <Link
                    href="/document-tools/ocr-pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-muted/20 hover:bg-muted text-xs text-foreground"
                  >
                    OCR PDF
                  </Link>
                  <Link
                    href="/document-tools/protect-pdf"
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2 rounded-lg bg-muted/20 hover:bg-muted text-xs text-foreground"
                  >
                    Protect PDF
                  </Link>
                </div>
                <Link
                  href="/document-tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 block text-center py-2 rounded-xl bg-primary/10 text-primary text-xs font-bold hover:bg-primary/20 transition-colors"
                >
                  View All 25+ PDF Tools →
                </Link>
              </div>

              {/* Category 4: System & Resources */}
              <div className="pt-2 border-t border-border flex items-center justify-between">
                <Link
                  href="/api-hub"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground p-1"
                >
                  <Server className="w-3.5 h-3.5" />
                  <span>API Hub</span>
                </Link>
                <Link
                  href="/seo-keywords"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground p-1"
                >
                  <span>SEO Index</span>
                </Link>
                <Link
                  href="/developer"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-1.5 text-xs text-primary font-semibold hover:underline p-1"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Developer</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Global Quick Search Modal */}
      <QuickSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}

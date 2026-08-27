'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeSwitcher from './ThemeSwitcher';
import {
  Wrench,
  Calculator,
  ShieldCheck,
  Calendar,
  User,
  Menu,
  X,
  PlusCircle,
  Code2,
  FileJson,
  KeyRound,
  FileText,
} from 'lucide-react';

const NAV_LINKS = [
  { href: '/age-calculator', label: 'Age Calculator', icon: Calculator },
  { href: '/vapt-scanner', label: 'VAPT Scanner', icon: ShieldCheck },
  { href: '/bengali-calendar', label: 'বাংলা পঞ্জিকা', icon: Calendar },
  { href: '/json-formatter', label: 'JSON Formatter', icon: FileJson },
  { href: '/regex-tester', label: 'Regex Tester', icon: Code2 },
  { href: '/jwt-decoder', label: 'JWT Decoder', icon: KeyRound },
  { href: '/document-tools', label: 'Document Tools', icon: FileText },
  { href: '/developer', label: 'Developer', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/80 bg-background/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground shadow-glow-primary group-hover:scale-105 transition-transform duration-200">
            <Wrench className="w-5 h-5" />
          </div>
          <div>
            <div className="text-lg font-bold tracking-tight text-foreground flex items-center gap-1.5">
              <span>AllTools</span>
              <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                In-Server
              </span>
            </div>
            <p className="text-[11px] text-muted-foreground hidden sm:block">Zero 3rd-Party APIs • Neat & Fast</p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-glow-primary'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Theme Switcher & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeSwitcher />

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-border text-foreground hover:bg-muted/50"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-border bg-card/95 backdrop-blur-xl px-4 pt-2 pb-4 space-y-1.5 animate-in slide-in-from-top-2 duration-150">
          {NAV_LINKS.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{link.label}</span>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

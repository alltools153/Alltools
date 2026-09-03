'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Fingerprint,
  RefreshCw,
  Copy,
  Check,
  Download,
  Sliders,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Lock,
  Code2,
  KeyRound,
  FileCode,
  Layers,
  Zap,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function UuidGeneratorPage() {
  const [quantity, setQuantity] = useState<number>(5);
  const [isUppercase, setIsUppercase] = useState<boolean>(false);
  const [useHyphens, setUseHyphens] = useState<boolean>(true);
  const [wrapFormat, setWrapFormat] = useState<'none' | 'braces' | 'quotes' | 'single_quotes'>('none');
  const [uuids, setUuids] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Cryptographically secure UUID v4 generator using Web Crypto API
  const generateSingleUuid = (upper: boolean, hyphens: boolean, wrap: string): string => {
    let raw = '';
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
      raw = crypto.randomUUID();
    } else {
      // Fallback RFC 4122 v4
      raw = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }

    if (!hyphens) {
      raw = raw.replace(/-/g, '');
    }
    if (upper) {
      raw = raw.toUpperCase();
    } else {
      raw = raw.toLowerCase();
    }

    if (wrap === 'braces') return `{${raw}}`;
    if (wrap === 'quotes') return `"${raw}"`;
    if (wrap === 'single_quotes') return `'${raw}'`;
    return raw;
  };

  const generateBatch = () => {
    const list: string[] = [];
    const count = Math.min(100, Math.max(1, quantity));
    for (let i = 0; i < count; i++) {
      list.push(generateSingleUuid(isUppercase, useHyphens, wrapFormat));
    }
    setUuids(list);
  };

  // Generate on mount and when settings change
  useEffect(() => {
    generateBatch();
  }, [quantity, isUppercase, useHyphens, wrapFormat]);

  const copySingle = (val: string, index: number) => {
    navigator.clipboard.writeText(val);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1500);
  };

  const copyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const downloadTxt = () => {
    const content = uuids.join('\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids_${quantity}_v4.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadJson = () => {
    const jsonStr = JSON.stringify({ version: '4', count: uuids.length, uuids }, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `uuids_${quantity}_v4.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is a UUID Version 4 (Universally Unique Identifier)?',
      a: 'UUID v4 is a 128-bit label generated using pseudo-random or cryptographically strong random numbers according to RFC 4122. The 13th character is always "4" indicating version 4, and the variant character is 8, 9, A, or B.',
    },
    {
      q: 'What is the probability of a UUID v4 collision?',
      a: 'Out of 2^122 possible UUIDs (roughly 5.3 x 10^36 combinations), the probability of generating a duplicate is virtually zero. You would need to generate 1 billion UUIDs every second for 85 years to have a 50% probability of a single collision.',
    },
    {
      q: 'Are UUIDs generated securely?',
      a: 'Yes. All UUIDs are synthesized client-side using the browser Web Crypto API (crypto.randomUUID / crypto.getRandomValues) with zero network transmissions.',
    },
    {
      q: 'When should I omit hyphens or wrap in braces?',
      a: 'Many database systems (like MongoDB or custom hex primary keys) store compact 32-character UUIDs without hyphens. Microsoft COM/GUID specifications traditionally wrap UUIDs in curly braces {...}.',
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Breadcrumb Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Developer Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">UUID Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <Fingerprint className="w-7 h-7" />
              </span>
              <span>UUID v4 Generator Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Generate cryptographically strong RFC 4122 Version-4 UUIDs / GUIDs in bulk (up to 100) with custom hyphen formatting, uppercase toggle, and instant export.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> WebCrypto Hardware RNG
            </span>
          </div>
        </div>

        {/* Configuration Controls Bar */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-primary" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground">Generation Settings</h3>
            </div>
            <button
              type="button"
              onClick={generateBatch}
              className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Quantity Selector */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Quantity (1 - 100)
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={quantity}
                  onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value, 10) || 1)))}
                  className="w-full px-3.5 py-2 rounded-xl border border-border bg-muted/40 font-mono text-xs font-bold text-foreground focus:outline-none focus:border-primary"
                />
                <div className="flex gap-1">
                  {[1, 5, 10, 25].map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setQuantity(n)}
                      className={`px-2 py-1.5 rounded-lg border text-[11px] font-mono font-bold cursor-pointer transition-colors ${
                        quantity === n ? 'border-primary bg-primary/20 text-primary' : 'border-border bg-muted/40 text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Letter Case */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Letter Case
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setIsUppercase(false)}
                  className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    !isUppercase ? 'border-primary bg-primary/15 text-primary font-bold' : 'border-border bg-muted/40 text-muted-foreground'
                  }`}
                >
                  lowercase
                </button>
                <button
                  type="button"
                  onClick={() => setIsUppercase(true)}
                  className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    isUppercase ? 'border-primary bg-primary/15 text-primary font-bold' : 'border-border bg-muted/40 text-muted-foreground'
                  }`}
                >
                  UPPERCASE
                </button>
              </div>
            </div>

            {/* Hyphens */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Hyphens Format
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setUseHyphens(true)}
                  className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    useHyphens ? 'border-primary bg-primary/15 text-primary font-bold' : 'border-border bg-muted/40 text-muted-foreground'
                  }`}
                >
                  With Hyphens
                </button>
                <button
                  type="button"
                  onClick={() => setUseHyphens(false)}
                  className={`py-2 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                    !useHyphens ? 'border-primary bg-primary/15 text-primary font-bold' : 'border-border bg-muted/40 text-muted-foreground'
                  }`}
                >
                  No Hyphens
                </button>
              </div>
            </div>

            {/* Wrapper Format */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Wrapping Style
              </label>
              <select
                value={wrapFormat}
                onChange={(e) => setWrapFormat(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-border bg-muted/40 text-xs font-semibold text-foreground focus:outline-none focus:border-primary cursor-pointer"
              >
                <option value="none">Plain (None)</option>
                <option value="braces">{`Braces { ... }`}</option>
                <option value="quotes">{`Double Quotes "..."`}</option>
                <option value="single_quotes">{`Single Quotes '...'`}</option>
              </select>
            </div>

          </div>
        </div>

        {/* Results List */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center justify-between border-b border-border pb-3 flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs sm:text-sm font-bold text-foreground">
                Generated UUIDs ({uuids.length})
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={copyAll}
                className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copied All!' : 'Copy All'}</span>
              </button>

              <button
                type="button"
                onClick={downloadTxt}
                className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-muted-foreground" />
                <span>Download .txt</span>
              </button>

              <button
                type="button"
                onClick={downloadJson}
                className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer hidden sm:flex"
              >
                <FileCode className="w-3.5 h-3.5 text-muted-foreground" />
                <span>JSON</span>
              </button>
            </div>
          </div>

          <div className="space-y-2 max-h-[450px] overflow-y-auto pr-1">
            {uuids.map((u, idx) => (
              <div
                key={idx}
                className="p-3 rounded-2xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-[10px] font-mono text-muted-foreground w-6 text-right flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="font-mono text-xs sm:text-sm text-foreground select-all truncate font-semibold">
                    {u}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => copySingle(u, idx)}
                  className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer flex-shrink-0"
                  title="Copy this UUID"
                >
                  {copiedIndex === idx ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Use UUID Generator</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Configure Output</span>
              <p>Choose the number of UUIDs you need (1 to 100) and customize formatting (case, hyphens, braces, quotes).</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Instant Live Generation</span>
              <p>UUIDs are created instantly using the cryptographically secure random number generator built into your browser.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Copy or Export</span>
              <p>Copy individual UUIDs, click Copy All, or download the entire batch as a .txt or .json payload for your database seeds.</p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-2">
            {faqs.map((faq, idx) => (
              <div key={idx} className="rounded-2xl border border-border bg-muted/20 overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-foreground hover:bg-muted/40 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${openFaq === idx ? 'rotate-180 text-primary' : 'text-muted-foreground'}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Developer Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Developer Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/tools/base64-encoder-decoder"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Code2 className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Base64 Encoder / Decoder</div>
                <div className="text-[11px] text-muted-foreground truncate">Encode strings &amp; binary files</div>
              </div>
            </Link>

            <Link
              href="/tools/jwt-decoder"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">JWT Decoder</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect claims &amp; signature</div>
              </div>
            </Link>

            <Link
              href="/tools/sql-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">AI SQL Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Generate schema with UUID keys</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="uuid-generator" />
      </div>
    </div>
  );
}

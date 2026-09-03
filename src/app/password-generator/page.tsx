'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  KeyRound,
  RefreshCw,
  Copy,
  Check,
  ShieldCheck,
  Sliders,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Lock,
  Eye,
  EyeOff,
  Zap,
  Layers,
  Shield,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

export default function PasswordGeneratorPage() {
  const [length, setLength] = useState<number>(16);
  const [useUppercase, setUseUppercase] = useState<boolean>(true);
  const [useLowercase, setUseLowercase] = useState<boolean>(true);
  const [useNumbers, setUseNumbers] = useState<boolean>(true);
  const [useSymbols, setUseSymbols] = useState<boolean>(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('');
  const [batchCount, setBatchCount] = useState<number>(1);
  const [batchPasswords, setBatchPasswords] = useState<string[]>([]);
  const [copied, setCopied] = useState<boolean>(false);
  const [copiedBatchIndex, setCopiedBatchIndex] = useState<number | null>(null);
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Character sets
  const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBER_CHARS = '0123456789';
  const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const AMBIGUOUS_CHARS = /[0Oo1lI|]/g;

  // Generate a single secure password using Web Crypto API
  const generatePasswordString = useCallback((): string => {
    let charset = '';
    let requiredChars: string[] = [];

    let upper = UPPERCASE_CHARS;
    let lower = LOWERCASE_CHARS;
    let nums = NUMBER_CHARS;
    let syms = SYMBOL_CHARS;

    if (excludeAmbiguous) {
      upper = upper.replace(AMBIGUOUS_CHARS, '');
      lower = lower.replace(AMBIGUOUS_CHARS, '');
      nums = nums.replace(AMBIGUOUS_CHARS, '');
      syms = syms.replace(AMBIGUOUS_CHARS, '');
    }

    if (useUppercase) {
      charset += upper;
      requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
    }
    if (useLowercase) {
      charset += lower;
      requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);
    }
    if (useNumbers) {
      charset += nums;
      requiredChars.push(nums[Math.floor(Math.random() * nums.length)]);
    }
    if (useSymbols) {
      charset += syms;
      requiredChars.push(syms[Math.floor(Math.random() * syms.length)]);
    }

    if (!charset) {
      charset = lower;
      requiredChars = [lower[0]];
    }

    const randomValues = new Uint32Array(length);
    if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
      crypto.getRandomValues(randomValues);
    } else {
      for (let i = 0; i < length; i++) {
        randomValues[i] = Math.floor(Math.random() * 4294967296);
      }
    }

    let resultChars: string[] = [...requiredChars];
    for (let i = resultChars.length; i < length; i++) {
      const idx = randomValues[i] % charset.length;
      resultChars.push(charset[idx]);
    }

    // Shuffle array using Fisher-Yates
    for (let i = resultChars.length - 1; i > 0; i--) {
      const j = randomValues[i] % (i + 1);
      [resultChars[i], resultChars[j]] = [resultChars[j], resultChars[i]];
    }

    return resultChars.join('');
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous]);

  const generateAll = useCallback(() => {
    const main = generatePasswordString();
    setPassword(main);

    if (batchCount > 1) {
      const list: string[] = [main];
      for (let i = 1; i < batchCount; i++) {
        list.push(generatePasswordString());
      }
      setBatchPasswords(list);
    } else {
      setBatchPasswords([]);
    }
  }, [generatePasswordString, batchCount]);

  useEffect(() => {
    generateAll();
  }, [generateAll]);

  // Calculate password strength score
  const calculateStrength = (pwd: string): { label: string; score: number; color: string; bg: string } => {
    if (!pwd) return { label: 'None', score: 0, color: 'text-muted-foreground', bg: 'bg-muted' };

    let score = 0;
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 20;
    if (pwd.length >= 16) score += 20;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 10;

    if (score < 40) return { label: 'Weak', score: 25, color: 'text-red-400', bg: 'bg-red-500' };
    if (score < 60) return { label: 'Medium', score: 50, color: 'text-amber-400', bg: 'bg-amber-500' };
    if (score < 80) return { label: 'Strong', score: 75, color: 'text-cyan-400', bg: 'bg-cyan-500' };
    return { label: 'Very Strong', score: 100, color: 'text-emerald-400', bg: 'bg-emerald-500' };
  };

  const strength = calculateStrength(password);

  const copyPassword = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyBatchItem = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedBatchIndex(index);
    setTimeout(() => setCopiedBatchIndex(null), 1500);
  };

  const faqs = [
    {
      q: 'What makes a strong password?',
      a: 'A strong password is at least 14 to 16 characters long and combines uppercase letters, lowercase letters, numbers, and unpredictable special characters. It should not contain dictionary words, names, or birthdates.',
    },
    {
      q: 'Are passwords generated with this tool stored anywhere?',
      a: 'No. All passwords are synthesized client-side in your local browser memory using the cryptographically secure Web Crypto API (crypto.getRandomValues). Nothing is ever sent to or stored on any server.',
    },
    {
      q: 'Why should I exclude ambiguous characters?',
      a: 'Characters like uppercase "O" vs number "0", and lowercase "l" vs uppercase "I" or number "1" can easily be misread when typing passwords manually on mobile devices or printed cards.',
    },
    {
      q: 'How often should I change my passwords?',
      a: 'Security standards (including NIST guidelines) recommend using unique, high-entropy passwords for every service and storing them in a trusted password manager, changing them immediately if a service breach occurs.',
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
              <span className="text-foreground font-semibold">Security Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">Password Generator</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <KeyRound className="w-7 h-7" />
              </span>
              <span>Secure Password Generator Studio</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Create high-entropy, cryptographically random passwords with customizable length, symbols, numbers, ambiguous character filters, and live strength scoring.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% Cryptographically Secure
            </span>
          </div>
        </div>

        {/* Primary Password Display Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Generated Secure Password
            </span>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold font-mono px-2.5 py-0.5 rounded-full border border-border bg-muted/40 ${strength.color}`}>
                {strength.label}
              </span>
            </div>
          </div>

          {/* Password Readout Box */}
          <div className="p-4 sm:p-5 rounded-2xl border border-border bg-black/80 flex items-center justify-between gap-3 shadow-inner">
            <div className="min-w-0 flex-1 font-mono text-base sm:text-2xl font-bold tracking-wide select-all text-emerald-400 truncate">
              {showPassword ? password : '••••••••••••••••••••••••'}
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="p-2 rounded-xl border border-border bg-card/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>

              <button
                type="button"
                onClick={generateAll}
                className="p-2 rounded-xl border border-border bg-card/80 text-muted-foreground hover:text-foreground transition-colors cursor-pointer hover:rotate-180 duration-300"
                title="Generate new password"
              >
                <RefreshCw className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => copyPassword(password)}
                className="py-2 px-4 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer whitespace-nowrap"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Strength Bar Meter */}
          <div className="space-y-1.5 pt-1">
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className={`h-full ${strength.bg} transition-all duration-500 rounded-full`}
                style={{ width: `${strength.score}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-muted-foreground font-mono">
              <span>Entropy Length: {length} chars</span>
              <span>Strength Rating: <strong className={strength.color}>{strength.label}</strong></span>
            </div>
          </div>
        </div>

        {/* Customization Settings Grid */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-6" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2 border-b border-border pb-3">
            <Sliders className="w-4 h-4 text-primary" />
            <h3 className="text-xs sm:text-sm font-bold text-foreground">Password Parameters</h3>
          </div>

          <div className="space-y-6">
            
            {/* 1. Length Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-muted-foreground uppercase tracking-wider">Password Length</span>
                <span className="px-2.5 py-0.5 rounded-lg bg-primary/15 text-primary font-mono text-sm font-black">
                  {length} characters
                </span>
              </div>
              <input
                type="range"
                min={6}
                max={64}
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[10px] text-muted-foreground font-mono">
                <span>Minimum (6)</span>
                <span>Recommended (16 - 24)</span>
                <span>Maximum (64)</span>
              </div>
            </div>

            {/* 2. Character Set Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {[
                { label: 'Uppercase (A-Z)', checked: useUppercase, set: setUseUppercase, sample: 'ABC' },
                { label: 'Lowercase (a-z)', checked: useLowercase, set: setUseLowercase, sample: 'abc' },
                { label: 'Numbers (0-9)', checked: useNumbers, set: setUseNumbers, sample: '123' },
                { label: 'Symbols (!@#$%)', checked: useSymbols, set: setUseSymbols, sample: '#$&' },
              ].map((opt, i) => (
                <label
                  key={i}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    opt.checked
                      ? 'border-primary bg-primary/10 shadow-sm ring-1 ring-primary/30'
                      : 'border-border bg-muted/20 hover:bg-muted/40'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-foreground">{opt.label}</div>
                    <div className="text-[10px] font-mono text-muted-foreground">e.g. {opt.sample}</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={opt.checked}
                    onChange={(e) => opt.set(e.target.checked)}
                    className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                  />
                </label>
              ))}
            </div>

            {/* 3. Extra Options & Batch Generation */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border">
              <label className="p-3.5 rounded-2xl border border-border bg-muted/20 hover:bg-muted/40 flex items-center justify-between cursor-pointer">
                <div>
                  <div className="text-xs font-bold text-foreground">Exclude Ambiguous Characters</div>
                  <div className="text-[10px] text-muted-foreground">Avoid confusing characters (0, O, o, 1, l, I)</div>
                </div>
                <input
                  type="checkbox"
                  checked={excludeAmbiguous}
                  onChange={(e) => setExcludeAmbiguous(e.target.checked)}
                  className="w-4 h-4 rounded border-border accent-primary cursor-pointer"
                />
              </label>

              <div className="p-3.5 rounded-2xl border border-border bg-muted/20 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-foreground">Batch Generation Count</div>
                  <div className="text-[10px] text-muted-foreground">Generate multiple passwords at once</div>
                </div>
                <select
                  value={batchCount}
                  onChange={(e) => setBatchCount(Number(e.target.value))}
                  className="px-3 py-1.5 rounded-xl border border-border bg-card text-xs font-bold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value={1}>1 Password</option>
                  <option value={5}>5 Passwords</option>
                  <option value={10}>10 Passwords</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        {/* Batch Results Panel */}
        {batchCount > 1 && batchPasswords.length > 0 && (
          <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" />
                <h3 className="text-xs sm:text-sm font-bold text-foreground">
                  Batch Passwords ({batchPasswords.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(batchPasswords.join('\n'));
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="text-xs font-bold text-primary hover:underline cursor-pointer"
              >
                Copy All Passwords
              </button>
            </div>

            <div className="space-y-2">
              {batchPasswords.map((pwd, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl border border-border bg-muted/30 hover:bg-muted/60 transition-colors flex items-center justify-between gap-3"
                >
                  <span className="font-mono text-xs sm:text-sm text-foreground select-all truncate font-semibold">
                    {pwd}
                  </span>
                  <button
                    type="button"
                    onClick={() => copyBatchItem(pwd, idx)}
                    className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copiedBatchIndex === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Use Password Generator</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Select Length</span>
              <p>Adjust the slider to your desired character length (we recommend 16+ characters for maximum security).</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Pick Character Types</span>
              <p>Toggle uppercase, lowercase, numbers, and symbols to match your target system&apos;s password policy.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Copy &amp; Secure</span>
              <p>Click Copy to instantly paste your password into your account or password manager.</p>
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

        {/* Related Security Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Security Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/password-strength-checker"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Password Strength Checker</div>
                <div className="text-[11px] text-muted-foreground truncate">Analyze entropy &amp; crack time</div>
              </div>
            </Link>

            <Link
              href="/vapt-scanner"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">VAPT Security Scanner</div>
                <div className="text-[11px] text-muted-foreground truncate">OWASP Top 10 header audits</div>
              </div>
            </Link>

            <Link
              href="/uuid-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">UUID v4 Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Generate random 128-bit IDs</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="password-generator" />
      </div>
    </div>
  );
}

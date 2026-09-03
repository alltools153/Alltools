'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Shield,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Lock,
  Zap,
  KeyRound,
  Cpu,
  Clock,
  Layers,
} from 'lucide-react';
import ToolSeoFooter from '@/components/seo/ToolSeoFooter';

interface AnalysisResult {
  score: number; // 0 to 100
  label: 'Weak' | 'Medium' | 'Strong' | 'Very Strong';
  color: string;
  bgColor: string;
  entropyBits: number;
  crackTimeEstimate: string;
  checks: {
    title: string;
    passed: boolean;
    hint: string;
  }[];
  suggestions: string[];
}

export default function PasswordStrengthCheckerPage() {
  const [password, setPassword] = useState<string>('P@ssw0rdSecure2026!');
  const [showPassword, setShowPassword] = useState<boolean>(true);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Common dictionary patterns to flag
  const COMMON_PATTERNS = [
    'password', '123456', '12345678', 'qwerty', 'admin', 'welcome', 'login', 'abc123',
    'letmein', 'football', 'monkey', 'master', 'dragon', 'iloveyou', 'sunshine', 'princess'
  ];

  const analysis: AnalysisResult = useMemo(() => {
    if (!password) {
      return {
        score: 0,
        label: 'Weak',
        color: 'text-muted-foreground',
        bgColor: 'bg-muted',
        entropyBits: 0,
        crackTimeEstimate: '0 seconds',
        checks: [],
        suggestions: ['Enter a password above to begin security analysis.'],
      };
    }

    let score = 0;
    const suggestions: string[] = [];

    // 1. Length Points (Max 35)
    const len = password.length;
    if (len >= 16) score += 35;
    else if (len >= 12) score += 25;
    else if (len >= 8) score += 15;
    else score += 5;

    if (len < 12) {
      suggestions.push('Increase length to at least 14-16 characters for exponential resistance against brute-force attacks.');
    }

    // 2. Character Variety (Max 40)
    const hasUpper = /[A-Z]/.test(password);
    const hasLower = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSymbols = /[^A-Za-z0-9]/.test(password);

    let charsetPoolSize = 0;
    if (hasLower) { score += 10; charsetPoolSize += 26; }
    else suggestions.push('Add lowercase letters (a-z).');

    if (hasUpper) { score += 10; charsetPoolSize += 26; }
    else suggestions.push('Add uppercase letters (A-Z).');

    if (hasNumbers) { score += 10; charsetPoolSize += 10; }
    else suggestions.push('Include numbers (0-9).');

    if (hasSymbols) { score += 10; charsetPoolSize += 33; }
    else suggestions.push('Include special symbols (!@#$%^&*).');

    // 3. Pattern / Repeat / Sequence Deductions (Max -30)
    const lowerPwd = password.toLowerCase();
    let hasCommonWord = false;
    for (const pattern of COMMON_PATTERNS) {
      if (lowerPwd.includes(pattern)) {
        hasCommonWord = true;
        score -= 20;
        suggestions.push(`Avoid common dictionary word/pattern "${pattern}".`);
        break;
      }
    }

    const hasRepeated = /(.)\1{2,}/.test(password);
    if (hasRepeated) {
      score -= 10;
      suggestions.push('Avoid repeating identical characters consecutively (e.g. "aaa", "111").');
    }

    const hasSequence = /(?:abc|bcd|cde|def|efg|fgh|ghi|hij|ijk|jkl|klm|lmn|mno|nop|opq|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz|012|123|234|345|456|567|678|789)/i.test(password);
    if (hasSequence) {
      score -= 10;
      suggestions.push('Avoid sequential alphabetical or numerical runs (e.g. "abc", "123").');
    }

    score = Math.min(100, Math.max(5, score));

    // Calculate Entropy: E = L * log2(R)
    const entropy = charsetPoolSize > 0 ? Math.round(len * Math.log2(charsetPoolSize)) : 0;

    // Crack time estimation based on 100 Billion guesses/second (modern GPU cluster)
    let crackTime = '< 1 millisecond';
    const combinations = Math.pow(charsetPoolSize || 1, len);
    const seconds = combinations / 1e11;

    if (seconds > 31536000 * 1000000) crackTime = 'Trillions of years';
    else if (seconds > 31536000 * 1000) crackTime = 'Centuries';
    else if (seconds > 31536000) crackTime = `${Math.round(seconds / 31536000)} years`;
    else if (seconds > 86400 * 30) crackTime = `${Math.round(seconds / (86400 * 30))} months`;
    else if (seconds > 86400) crackTime = `${Math.round(seconds / 86400)} days`;
    else if (seconds > 3600) crackTime = `${Math.round(seconds / 3600)} hours`;
    else if (seconds > 60) crackTime = `${Math.round(seconds / 60)} minutes`;
    else if (seconds > 1) crackTime = `${Math.round(seconds)} seconds`;

    let label: AnalysisResult['label'] = 'Weak';
    let color = 'text-red-400';
    let bgColor = 'bg-red-500';

    if (score >= 80) {
      label = 'Very Strong';
      color = 'text-emerald-400';
      bgColor = 'bg-emerald-500';
    } else if (score >= 60) {
      label = 'Strong';
      color = 'text-cyan-400';
      bgColor = 'bg-cyan-500';
    } else if (score >= 40) {
      label = 'Medium';
      color = 'text-amber-400';
      bgColor = 'bg-amber-500';
    }

    const checks = [
      { title: 'Length (12+ Characters)', passed: len >= 12, hint: `${len} characters` },
      { title: 'Uppercase Letters (A-Z)', passed: hasUpper, hint: hasUpper ? 'Present' : 'Missing' },
      { title: 'Lowercase Letters (a-z)', passed: hasLower, hint: hasLower ? 'Present' : 'Missing' },
      { title: 'Numbers (0-9)', passed: hasNumbers, hint: hasNumbers ? 'Present' : 'Missing' },
      { title: 'Special Symbols (!@#$)', passed: hasSymbols, hint: hasSymbols ? 'Present' : 'Missing' },
      { title: 'No Common Patterns or Words', passed: !hasCommonWord && !hasRepeated && !hasSequence, hint: hasCommonWord ? 'Word matched' : 'Passed' },
    ];

    return {
      score,
      label,
      color,
      bgColor,
      entropyBits: entropy,
      crackTimeEstimate: crackTime,
      checks,
      suggestions: suggestions.length > 0 ? suggestions : ['Great job! Your password meets NIST and OWASP high-entropy standards.'],
    };
  }, [password]);

  const faqs = [
    {
      q: 'What is Password Entropy?',
      a: 'Password entropy measures the unpredictable randomness of a password in bits. Higher entropy means a password is mathematically harder for brute-force cracking algorithms to guess.',
    },
    {
      q: 'Is it safe to test my real password on this page?',
      a: 'Yes, this checker runs 100% locally inside your browser client memory. No characters or keystrokes are transmitted across the internet or stored anywhere.',
    },
    {
      q: 'How are brute-force crack times calculated?',
      a: 'Crack times are calculated assuming an attacker with dedicated GPU rigs attempting 100 billion hash guesses per second across the total search space combinations (PoolSize^Length).',
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
              <span className="text-primary font-bold">Password Strength Checker</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <ShieldCheck className="w-7 h-7" />
              </span>
              <span>Password Strength &amp; Entropy Analyzer</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Inspect password complexity, calculate mathematical Shannon entropy in bits, estimate brute-force cracking times, and identify vulnerable sequence patterns in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> 100% In-Browser Privacy
            </span>
          </div>
        </div>

        {/* Input & Scoreboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Password Input & Complexity Checklist */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Input Box */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Enter Password to Analyze
                </label>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {password.length} chars
                </span>
              </div>

              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Type a password to test strength..."
                  className="w-full pl-4 pr-12 py-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-sm sm:text-base focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1.5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>

              {/* Live Strength Bar */}
              <div className="space-y-1.5 pt-1">
                <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full ${analysis.bgColor} transition-all duration-500 rounded-full`}
                    style={{ width: `${analysis.score}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-muted-foreground">Security Rating:</span>
                  <span className={`font-bold ${analysis.color}`}>{analysis.label} ({analysis.score}/100)</span>
                </div>
              </div>
            </div>

            {/* Checklist Matrix */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
                Security Complexity Matrix
              </h3>
              <div className="space-y-2">
                {analysis.checks.map((c, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-muted/20 border border-border text-xs"
                  >
                    <div className="flex items-center gap-2">
                      {c.passed ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      )}
                      <span className={c.passed ? 'text-foreground font-semibold' : 'text-muted-foreground'}>
                        {c.title}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono font-bold ${c.passed ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                      {c.hint}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Scorecard & Crack Time Metrics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Metric Cards */}
            <div className="p-6 rounded-3xl border border-border bg-card shadow-lg space-y-5" style={{ backgroundColor: 'var(--card)' }}>
              
              {/* Big Score Header */}
              <div className="text-center p-5 rounded-2xl bg-muted/20 border border-border space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Overall Protection Level
                </div>
                <div className={`text-4xl sm:text-5xl font-black font-mono ${analysis.color}`}>
                  {analysis.label}
                </div>
                <div className="text-xs text-muted-foreground font-mono">
                  Score: {analysis.score} of 100 Points
                </div>
              </div>

              {/* Entropy & Crack Time Stats */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Cpu className="w-3.5 h-3.5 text-cyan-400" />
                    <span className="text-[10px] uppercase font-bold">Entropy</span>
                  </div>
                  <div className="text-base font-black font-mono text-foreground">
                    {analysis.entropyBits} bits
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-muted/30 border border-border space-y-1">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="text-[10px] uppercase font-bold">Crack Time</span>
                  </div>
                  <div className="text-sm font-black font-mono text-emerald-400 truncate" title={analysis.crackTimeEstimate}>
                    {analysis.crackTimeEstimate}
                  </div>
                </div>
              </div>

              {/* Improvement Suggestions */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="text-xs font-bold text-foreground flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <span>Actionable Suggestions</span>
                </div>
                <ul className="space-y-1.5 text-xs text-muted-foreground">
                  {analysis.suggestions.map((s, idx) => (
                    <li key={idx} className="flex items-start gap-2 bg-muted/20 p-2 rounded-xl border border-border/50">
                      <span className="text-primary font-bold">•</span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

          </div>

        </div>

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Test Password Strength</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Type or Paste</span>
              <p>Enter any password or passphrase into the input field to evaluate its security posture.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Inspect Entropy &amp; Crack Time</span>
              <p>Review real-time mathematical entropy bits and estimated time required for high-speed GPU clusters to brute force.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Follow Suggestions</span>
              <p>Apply recommendations like removing dictionary words, adding special symbols, and extending character length.</p>
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
              href="/password-generator"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <KeyRound className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Password Generator</div>
                <div className="text-[11px] text-muted-foreground truncate">Generate 64-char random passwords</div>
              </div>
            </Link>

            <Link
              href="/email-security"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">SPF / DKIM / DMARC</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect domain email security</div>
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
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Website VAPT Scanner</div>
                <div className="text-[11px] text-muted-foreground truncate">Passive OWASP security audit</div>
              </div>
            </Link>
          </div>
        </div>

        {/* Master SEO Blueprint & Structured Data Schema Footer */}
        <ToolSeoFooter toolSlug="password-strength-checker" />
      </div>
    </div>
  );
}

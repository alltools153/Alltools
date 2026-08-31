'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ShieldAlert,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  Globe,
  Calendar,
  Key,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronDown,
  RefreshCw,
  Copy,
  Check,
  Server,
  ArrowRight,
} from 'lucide-react';

interface SslResult {
  domain: string;
  isValid: boolean;
  isExpired: boolean;
  isExpiringSoon: boolean;
  daysRemaining: number;
  grade: string;
  subject: {
    commonName: string;
    organization: string;
    country: string;
  };
  issuer: {
    commonName: string;
    organization: string;
    country: string;
  };
  validFrom: string;
  validTo: string;
  sans: string[];
  sanCount: number;
  serialNumber: string;
  fingerprint256: string;
  protocol: string;
  cipherName: string;
  authorizationError: string | null;
}

export default function SslCertificateCheckerPage() {
  const [domainInput, setDomainInput] = useState('google.com');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SslResult | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleScan = async (targetDomain?: string) => {
    const target = (targetDomain || domainInput).trim();
    if (!target) return;

    setLoading(true);
    setErrorMsg(null);
    setResult(null);

    try {
      const res = await fetch('/api/ssl-check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: target }),
      });

      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || 'Failed to inspect SSL certificate.');
      }

      setResult(data);
    } catch (err: any) {
      setErrorMsg(err.message || 'Network error occurred while fetching certificate.');
    } finally {
      setLoading(false);
    }
  };

  const copyResults = () => {
    if (!result) return;
    const summary = `SSL Certificate Audit for ${result.domain}\nGrade: ${result.grade}\nIssuer: ${result.issuer.organization} (${result.issuer.commonName})\nValid To: ${result.validTo}\nDays Remaining: ${result.daysRemaining}\nProtocol: ${result.protocol} | Cipher: ${result.cipherName}\nFingerprint SHA-256: ${result.fingerprint256}`;
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const faqs = [
    {
      q: 'Why is checking SSL certificate expiration important?',
      a: 'An expired SSL/TLS certificate triggers severe browser security warnings ("Your connection is not private"), breaking user trust, destroying search engine rankings, and disrupting automated API workflows.',
    },
    {
      q: 'What is the recommended timeframe to renew an SSL certificate?',
      a: 'Industry best practices recommend renewing SSL/TLS certificates at least 30 days prior to their expiration date to allow sufficient time for DNS validation, CAA checking, and automated ACME renewals.',
    },
    {
      q: 'What are Subject Alternative Names (SANs)?',
      a: 'SANs allow a single SSL certificate to secure multiple domain names (e.g. example.com, www.example.com, api.example.com) under one unified cryptographic identity.',
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
              <span className="text-primary font-bold">SSL Certificate Checker</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                <Lock className="w-7 h-7" />
              </span>
              <span>SSL / TLS Certificate Inspector</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Verify SSL certificate validity, issuer authority, expiration countdown, SAN hostnames, TLS protocol version, and cryptographic cipher strength for any public domain.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5" /> Direct TLS 443 Handshake
            </span>
          </div>
        </div>

        {/* Domain Search Input Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleScan();
            }}
            className="space-y-3"
          >
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Enter Domain or Hostname to Inspect
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="e.g. google.com, github.com, cloudflare.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-sm font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !domainInput.trim()}
                className="py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Inspecting TLS...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check SSL</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Preset Domains */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] text-muted-foreground font-mono">Sample Domains:</span>
            {['google.com', 'github.com', 'cloudflare.com', 'wikipedia.org'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setDomainInput(sample);
                  handleScan(sample);
                }}
                className="px-2.5 py-1 rounded-lg border border-border bg-muted/20 hover:bg-muted text-[11px] font-mono text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-3">
            <XCircle className="w-5 h-5 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results Panel */}
        {result && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Scorecard Banner */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Target Domain
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono text-foreground flex items-center gap-2">
                    <span>{result.domain}</span>
                    {result.isValid ? (
                      <span className="p-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold font-sans flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Valid SSL
                      </span>
                    ) : (
                      <span className="p-1 rounded-lg bg-red-500/15 text-red-400 text-xs font-bold font-sans flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Invalid / Expired
                      </span>
                    )}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-center p-3 sm:p-4 rounded-2xl border border-border bg-muted/20">
                    <div className="text-[10px] uppercase font-bold text-muted-foreground">Security Grade</div>
                    <div className={`text-2xl sm:text-3xl font-black font-mono ${result.grade.startsWith('A') ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {result.grade}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={copyResults}
                    className="py-2.5 px-4 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy Report'}</span>
                  </button>
                </div>
              </div>

              {/* Countdown & Expiry Progress Bar */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-muted-foreground uppercase tracking-wider">
                    Expiration Countdown
                  </span>
                  <span className={result.isExpiringSoon ? 'text-amber-400 font-mono font-bold' : 'text-emerald-400 font-mono font-bold'}>
                    {result.daysRemaining > 0 ? `${result.daysRemaining} days remaining` : 'Certificate Expired!'}
                  </span>
                </div>

                <div className="h-3 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 rounded-full ${
                      result.daysRemaining > 30 ? 'bg-emerald-500' : result.daysRemaining > 0 ? 'bg-amber-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(100, Math.max(5, (result.daysRemaining / 365) * 100))}%` }}
                  />
                </div>

                {result.isExpiringSoon && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                    <span>Warning: This certificate expires within 30 days. Plan renewal immediately.</span>
                  </div>
                )}
              </div>

              {/* Technical Grid Matrix */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                
                {/* 1. Issuer Authority */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Issued By (CA)</div>
                  <div className="font-bold text-foreground truncate">{result.issuer.organization}</div>
                  <div className="text-[11px] font-mono text-muted-foreground truncate">{result.issuer.commonName}</div>
                </div>

                {/* 2. Validity Dates */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Valid Period</div>
                  <div className="font-mono text-foreground text-[11px]">To: {new Date(result.validTo).toLocaleDateString()}</div>
                  <div className="text-[10px] font-mono text-muted-foreground">From: {new Date(result.validFrom).toLocaleDateString()}</div>
                </div>

                {/* 3. Protocol & Cipher */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">Protocol &amp; Cipher</div>
                  <div className="font-bold text-emerald-400">{result.protocol}</div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate">{result.cipherName}</div>
                </div>

                {/* 4. Subject Alt Names (SAN) */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground">SAN Domains</div>
                  <div className="font-bold text-foreground">{result.sanCount} hostnames</div>
                  <div className="text-[10px] font-mono text-muted-foreground truncate">
                    {result.sans.slice(0, 2).join(', ')}...
                  </div>
                </div>

              </div>

              {/* Certificate Details Drawer */}
              <div className="space-y-3 pt-2 border-t border-border text-xs">
                <div className="font-bold text-foreground flex items-center gap-1.5">
                  <Key className="w-4 h-4 text-primary" />
                  <span>Certificate Cryptographic Fingerprints</span>
                </div>
                
                <div className="p-3 rounded-xl bg-black/80 border border-border space-y-1.5 font-mono text-[11px]">
                  <div className="text-muted-foreground">SHA-256 Fingerprint:</div>
                  <div className="text-cyan-300 select-all break-all">{result.fingerprint256}</div>
                  <div className="text-muted-foreground pt-1">Serial Number:</div>
                  <div className="text-muted-foreground select-all">{result.serialNumber}</div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Check SSL / TLS Certificates</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Enter Domain</span>
              <p>Type any website hostname (e.g. google.com or subdomains like api.github.com) into the search box.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Live Handshake</span>
              <p>Our server establishes a direct TLS connection on port 443 to inspect the live peer certificate chain.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Review Health Grade</span>
              <p>Inspect certificate expiry days, CA issuer authenticity, SAN hostnames, and protocol security grades.</p>
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
            Related Security &amp; Domain Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/email-security"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">SPF / DKIM / DMARC</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect email security DNS</div>
              </div>
            </Link>

            <Link
              href="/vapt-scanner"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Server className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Website VAPT Scanner</div>
                <div className="text-[11px] text-muted-foreground truncate">OWASP Top 10 header audits</div>
              </div>
            </Link>

            <Link
              href="/password-strength-checker"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">Password Strength Checker</div>
                <div className="text-[11px] text-muted-foreground truncate">Entropy &amp; crack time analysis</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

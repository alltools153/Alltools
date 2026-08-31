'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileSearch,
  Search,
  RefreshCw,
  Copy,
  Check,
  Download,
  Server,
  Calendar,
  Shield,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Globe,
  Building,
  CheckCircle2,
  Lock,
  Zap,
} from 'lucide-react';

interface WhoisData {
  domain: string;
  registrar: string;
  createdDate: string;
  expiresDate: string;
  updatedDate: string;
  status: string[];
  nameServers: string[];
  dnssec: boolean;
  rawText: string;
}

export default function WhoisLookupPage() {
  const [domain, setDomain] = useState('google.com');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<WhoisData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleLookup = async (targetDomain?: string) => {
    const d = (targetDomain || domain).trim();
    if (!d) return;

    setLoading(true);
    setErrorMsg(null);
    setData(null);

    try {
      const res = await fetch('/api/whois-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: d }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'WHOIS lookup failed.');
      }

      setData(json);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to query domain registration data.');
    } finally {
      setLoading(false);
    }
  };

  const copyRaw = () => {
    if (!data) return;
    navigator.clipboard.writeText(data.rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (iso: string) => {
    if (!iso || iso === 'N/A') return 'N/A';
    try {
      return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } catch {
      return iso;
    }
  };

  const faqs = [
    {
      q: 'What is WHOIS / RDAP lookup?',
      a: 'WHOIS and Registration Data Access Protocol (RDAP) are internet directory services used to look up registration details, registrar ownership, creation dates, expiration dates, and authoritative name servers for domain names.',
    },
    {
      q: 'Why are personal contact details hidden in WHOIS?',
      a: 'Due to global privacy regulations such as GDPR and ICANN privacy proxies, personal registrant names, emails, and phone numbers are typically redacted by registrars to protect domain owners from spam and harassment.',
    },
    {
      q: 'What does "clientTransferProhibited" status mean?',
      a: 'It is a security lock placed on the domain by the registrar to prevent unauthorized domain transfers or domain hijacking attempts.',
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
              <span className="text-foreground font-semibold">Security &amp; Network</span>
              <span>/</span>
              <span className="text-primary font-bold">WHOIS Lookup</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <FileSearch className="w-7 h-7" />
              </span>
              <span>WHOIS &amp; RDAP Domain Inspector</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Inspect domain name ownership, ICANN accredited registrar, creation date, expiration schedule, DNSSEC status, and transfer safety locks.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Lock className="w-3.5 h-3.5" /> ICANN RDAP Protocol
            </span>
          </div>
        </div>

        {/* Domain Search Input Card */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="space-y-3"
          >
            <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Enter Domain Name for Registration Records
            </label>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Globe className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. google.com, github.com, openai.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-sm font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              <button
                type="submit"
                disabled={loading || !domain.trim()}
                className="py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Querying RDAP...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>WHOIS Lookup</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Quick Preset Domains */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] text-muted-foreground font-mono">Sample Domains:</span>
            {['google.com', 'github.com', 'wikipedia.org', 'cloudflare.com'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setDomain(sample);
                  handleLookup(sample);
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
          <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
            <Server className="w-4 h-4 flex-shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Results Overview */}
        {data && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            {/* Top Scorecard Banner */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-6" style={{ backgroundColor: 'var(--card)' }}>
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
                <div className="space-y-1">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                    Domain Overview
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-mono text-foreground flex items-center gap-2">
                    <span>{data.domain}</span>
                    <span className="p-1 rounded-lg bg-emerald-500/15 text-emerald-400 text-xs font-bold font-sans flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Registered
                    </span>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={copyRaw}
                    className="py-2.5 px-4 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied RDAP' : 'Copy JSON'}</span>
                  </button>
                </div>
              </div>

              {/* Key Registration Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                
                {/* 1. Registrar */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                    <Building className="w-3 h-3 text-cyan-400" />
                    <span>Registrar</span>
                  </div>
                  <div className="font-bold text-foreground truncate">{data.registrar}</div>
                </div>

                {/* 2. Registered On */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                    <Calendar className="w-3 h-3 text-emerald-400" />
                    <span>Created On</span>
                  </div>
                  <div className="font-mono font-bold text-foreground">{formatDate(data.createdDate)}</div>
                </div>

                {/* 3. Expires On */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                    <Calendar className="w-3 h-3 text-amber-400" />
                    <span>Expires On</span>
                  </div>
                  <div className="font-mono font-bold text-amber-400">{formatDate(data.expiresDate)}</div>
                </div>

                {/* 4. DNSSEC */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1">
                  <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-muted-foreground">
                    <Shield className="w-3 h-3 text-violet-400" />
                    <span>DNSSEC</span>
                  </div>
                  <div className={`font-bold ${data.dnssec ? 'text-emerald-400' : 'text-muted-foreground'}`}>
                    {data.dnssec ? 'Signed (Active)' : 'Unsigned'}
                  </div>
                </div>

              </div>

              {/* Status Codes & Name Servers Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 text-xs pt-2">
                
                {/* Domain Status */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-2">
                  <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Domain Status Codes
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {data.status.map((st, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-md bg-muted text-foreground font-mono text-[11px] border border-border">
                        {st}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Name Servers */}
                <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-2">
                  <div className="font-bold uppercase tracking-wider text-muted-foreground text-[10px]">
                    Authoritative Name Servers
                  </div>
                  <div className="space-y-1 font-mono text-[11px] text-foreground">
                    {data.nameServers.length > 0 ? (
                      data.nameServers.map((ns, idx) => (
                        <div key={idx} className="truncate">• {ns}</div>
                      ))
                    ) : (
                      <div className="text-muted-foreground">No name servers returned</div>
                    )}
                  </div>
                </div>

              </div>

              {/* Raw RDAP JSON Panel */}
              <div className="space-y-2 pt-2 border-t border-border">
                <div className="text-xs font-bold text-foreground">
                  Raw RDAP / WHOIS Response
                </div>
                <textarea
                  readOnly
                  rows={8}
                  value={data.rawText}
                  className="w-full p-4 rounded-2xl border border-border bg-black/80 text-emerald-400 font-mono text-xs focus:outline-none resize-y select-all"
                />
              </div>

            </div>

          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Use WHOIS Lookup</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Enter Domain</span>
              <p>Type any top-level domain name (e.g. google.com, amazon.co.uk).</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Inspect Registration</span>
              <p>Review creation dates, expiration schedules, ICANN registrar, and active domain status codes.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Copy Output</span>
              <p>Instantly copy the full RDAP JSON response to document registrar info or domain verification audit trails.</p>
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

        {/* Related Tools */}
        <div className="pt-2">
          <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
            Related Domain &amp; Network Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/dns-lookup"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                <Globe className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">DNS Lookup</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect A, MX, TXT records</div>
              </div>
            </Link>

            <Link
              href="/ssl-certificate-checker"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <Lock className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">SSL Certificate Checker</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect SSL validity &amp; issuer</div>
              </div>
            </Link>

            <Link
              href="/email-security"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Shield className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">SPF / DKIM / DMARC</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect email security DNS</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

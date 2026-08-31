'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldAlert,
  ShieldCheck,
  Search,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mail,
  Key,
  Shield,
  Server,
  RefreshCw,
  Copy,
  Check,
  Lock,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Info,
} from 'lucide-react';

interface AuditResult {
  domain: string;
  timestamp: string;
  overallGrade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  score: number;
  riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
  spf: {
    found: boolean;
    rawRecord: string | null;
    version: string | null;
    mechanisms: string[];
    allQualifier: string | null;
    qualifierStatus: string;
    dnsLookupCount: number;
    lookupLimitExceeded: boolean;
    status: 'valid' | 'warning' | 'invalid' | 'missing';
    summary: string;
  };
  dkim: {
    found: boolean;
    selector: string | null;
    rawRecord: string | null;
    version: string | null;
    keyType: string | null;
    publicKey: string | null;
    keyLengthEstimate: string | null;
    status: 'valid' | 'warning' | 'missing';
    summary: string;
  };
  dmarc: {
    found: boolean;
    rawRecord: string | null;
    policy: 'reject' | 'quarantine' | 'none' | 'missing';
    subdomainPolicy: string | null;
    percentage: number;
    ruaEmail: string | null;
    rufEmail: string | null;
    alignmentSpf: string;
    alignmentDkim: string;
    status: string;
    summary: string;
  };
  mxRecords: string[];
  recommendations: { title: string; description: string; severity: 'high' | 'medium' | 'low' | 'info' }[];
  executionTimeMs: number;
}

export default function EmailSecurityCheckerPage() {
  const [domainInput, setDomainInput] = useState('google.com');
  const [selectorInput, setSelectorInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<AuditResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'spf' | 'dkim' | 'dmarc' | 'mx'>('all');

  const runAudit = async (targetDomain?: string) => {
    const domainToScan = (targetDomain || domainInput).trim();
    if (!domainToScan) return;

    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/email-security', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          domain: domainToScan,
          selector: selectorInput.trim() || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to inspect DNS email security records');
      }

      setResult(data);
    } catch (err: any) {
      setError(err.message || 'DNS resolution failed. Please verify the domain name.');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'A':
        return 'text-emerald-400 border-emerald-500/40 bg-emerald-500/10';
      case 'B':
        return 'text-cyan-400 border-cyan-500/40 bg-cyan-500/10';
      case 'C':
        return 'text-amber-400 border-amber-500/40 bg-amber-500/10';
      case 'D':
        return 'text-orange-400 border-orange-500/40 bg-orange-500/10';
      default:
        return 'text-red-400 border-red-500/40 bg-red-500/10';
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header Breadcrumb & Title */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-border pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-semibold">Security Tools</span>
              <span>/</span>
              <span className="text-primary font-bold">SPF / DKIM / DMARC Checker</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-primary/10 text-primary border border-primary/20">
                <ShieldCheck className="w-7 h-7" />
              </span>
              <span>SPF, DKIM &amp; DMARC Security Inspector</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Audit email authentication DNS records, detect spoofing vulnerabilities, verify DKIM cryptographic signatures, and analyze DMARC enforcement policies in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-primary/30 bg-primary/10 text-primary text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Shield className="w-3.5 h-3.5" /> RFC 7208 / 7489 Compliant
            </span>
          </div>
        </div>

        {/* Search & Target Input Box */}
        <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              runAudit();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-8 relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={domainInput}
                  onChange={(e) => setDomainInput(e.target.value)}
                  placeholder="Enter target domain (e.g. google.com, github.com, paypal.com)..."
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div className="md:col-span-4 relative">
                <Key className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  value={selectorInput}
                  onChange={(e) => setSelectorInput(e.target.value)}
                  placeholder="DKIM Selector (optional)"
                  className="w-full pl-10 pr-4 py-3 rounded-2xl border border-border bg-muted/40 text-foreground text-sm font-mono focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              {/* Quick Sample Domain Buttons */}
              <div className="flex items-center gap-1.5 flex-wrap">
                <span className="text-[11px] font-bold text-muted-foreground uppercase mr-1">Sample Domains:</span>
                {['google.com', 'github.com', 'microsoft.com', 'paypal.com', 'cloudflare.com'].map((dom) => (
                  <button
                    key={dom}
                    type="button"
                    onClick={() => {
                      setDomainInput(dom);
                      runAudit(dom);
                    }}
                    className="px-2.5 py-1 rounded-lg border border-border bg-muted/30 hover:bg-muted text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {dom}
                  </button>
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading || !domainInput.trim()}
                className="w-full sm:w-auto py-3 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 whitespace-nowrap"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Resolving DNS Records...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Inspect Email Security</span>
                  </>
                )}
              </button>
            </div>
          </form>

          {error && (
            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Results Overview & Score Card */}
        {result && (
          <div className="space-y-8 animate-in fade-in duration-300">
            
            {/* 1. Scorecard Hero */}
            <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg relative overflow-hidden" style={{ backgroundColor: 'var(--card)' }}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                
                {/* Grade Badge */}
                <div className="lg:col-span-4 flex flex-col items-center justify-center text-center p-6 rounded-2xl border bg-muted/20 space-y-2">
                  <div className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Email Security Grade
                  </div>
                  <div className={`text-6xl font-black font-mono px-6 py-2 rounded-2xl border-2 shadow-md ${getGradeColor(result.overallGrade)}`}>
                    {result.overallGrade}
                  </div>
                  <div className="text-sm font-bold text-foreground">
                    Score: {result.score}/100 • Risk: <span className={result.riskLevel === 'Low' ? 'text-emerald-400' : result.riskLevel === 'Moderate' ? 'text-amber-400' : 'text-red-400'}>{result.riskLevel}</span>
                  </div>
                  <div className="text-[11px] text-muted-foreground font-mono">
                    Audited {result.domain} in {result.executionTimeMs}ms
                  </div>
                </div>

                {/* 3 Pillars Summary */}
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  
                  {/* SPF Pillar */}
                  <div className="p-4 rounded-2xl border border-border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">1. SPF Record</span>
                      {result.spf.found ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-foreground">
                      {result.spf.found ? result.spf.allQualifier : 'Missing'}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {result.spf.summary}
                    </p>
                  </div>

                  {/* DKIM Pillar */}
                  <div className="p-4 rounded-2xl border border-border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">2. DKIM Signature</span>
                      {result.dkim.found ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-foreground">
                      {result.dkim.found ? `Selector: ${result.dkim.selector}` : 'Not Detected'}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {result.dkim.summary}
                    </p>
                  </div>

                  {/* DMARC Pillar */}
                  <div className="p-4 rounded-2xl border border-border bg-muted/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-foreground">3. DMARC Policy</span>
                      {result.dmarc.policy === 'reject' ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      ) : result.dmarc.found ? (
                        <AlertTriangle className="w-4 h-4 text-amber-400" />
                      ) : (
                        <XCircle className="w-4 h-4 text-red-400" />
                      )}
                    </div>
                    <div className="text-xs font-semibold text-foreground uppercase">
                      Policy: {result.dmarc.policy}
                    </div>
                    <p className="text-[11px] text-muted-foreground line-clamp-2">
                      {result.dmarc.summary}
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* 2. Detailed Technical Breakdown Tabs */}
            <div className="space-y-4">
              
              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-card border border-border overflow-x-auto no-scrollbar">
                {[
                  { id: 'all', label: 'All Records' },
                  { id: 'spf', label: 'SPF Details' },
                  { id: 'dkim', label: 'DKIM Signatures' },
                  { id: 'dmarc', label: 'DMARC Rules' },
                  { id: 'mx', label: 'MX Mail Servers' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActiveTab(t.id as any)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      activeTab === t.id
                        ? 'bg-primary text-primary-foreground shadow-glow-primary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/60'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* SPF Details Card */}
              {(activeTab === 'all' || activeTab === 'spf') && (
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-emerald-500/15 text-emerald-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">Sender Policy Framework (SPF)</h3>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-muted border border-border text-[11px] font-mono font-bold">
                      {result.spf.dnsLookupCount}/10 Lookups
                    </span>
                  </div>

                  {result.spf.found ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-muted/40 border border-border font-mono text-xs text-foreground break-all flex items-start justify-between gap-2">
                        <span>{result.spf.rawRecord}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(result.spf.rawRecord || '', 'spf')}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0"
                          title="Copy record"
                        >
                          {copiedKey === 'spf' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Qualifier</div>
                          <div className="font-bold text-foreground mt-0.5">{result.spf.allQualifier}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Mechanisms</div>
                          <div className="font-bold text-foreground mt-0.5">{result.spf.mechanisms.length} entries</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">DNS Lookups</div>
                          <div className={`font-bold mt-0.5 ${result.spf.lookupLimitExceeded ? 'text-red-400' : 'text-emerald-400'}`}>
                            {result.spf.dnsLookupCount} / 10 limit
                          </div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Status</div>
                          <div className="font-bold text-emerald-400 mt-0.5 capitalize">{result.spf.status}</div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">{result.spf.summary}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      No SPF record published at root TXT. Threat actors can send unauthorized emails spoofing your domain.
                    </div>
                  )}
                </div>
              )}

              {/* DKIM Details Card */}
              {(activeTab === 'all' || activeTab === 'dkim') && (
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-cyan-500/15 text-cyan-400">
                        <Key className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">DomainKeys Identified Mail (DKIM)</h3>
                    </div>
                    {result.dkim.found && (
                      <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-mono font-bold">
                        {result.dkim.keyLengthEstimate}
                      </span>
                    )}
                  </div>

                  {result.dkim.found ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-muted/40 border border-border font-mono text-xs text-foreground break-all flex items-start justify-between gap-2">
                        <span>{result.dkim.rawRecord}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(result.dkim.rawRecord || '', 'dkim')}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0"
                          title="Copy record"
                        >
                          {copiedKey === 'dkim' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Selector</div>
                          <div className="font-bold text-foreground mt-0.5">{result.dkim.selector}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Key Type</div>
                          <div className="font-bold text-foreground mt-0.5">{result.dkim.keyType}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Public Key</div>
                          <div className="font-bold text-foreground mt-0.5 truncate">{result.dkim.publicKey}</div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">{result.dkim.summary}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs">
                      No DKIM record was found on tested selectors ({result.dkim.selector || 'default, google, mail, k1'}). If you use a custom selector, enter it in the input field above.
                    </div>
                  )}
                </div>
              )}

              {/* DMARC Details Card */}
              {(activeTab === 'all' || activeTab === 'dmarc') && (
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-violet-500/15 text-violet-400">
                        <Shield className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">Domain-based Message Authentication (DMARC)</h3>
                    </div>
                    {result.dmarc.found && (
                      <span className={`px-2.5 py-0.5 rounded-full border text-[11px] font-mono font-bold uppercase ${
                        result.dmarc.policy === 'reject' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                      }`}>
                        p={result.dmarc.policy} ({result.dmarc.percentage}%)
                      </span>
                    )}
                  </div>

                  {result.dmarc.found ? (
                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-muted/40 border border-border font-mono text-xs text-foreground break-all flex items-start justify-between gap-2">
                        <span>{result.dmarc.rawRecord}</span>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(result.dmarc.rawRecord || '', 'dmarc')}
                          className="p-1 text-muted-foreground hover:text-foreground cursor-pointer flex-shrink-0"
                          title="Copy record"
                        >
                          {copiedKey === 'dmarc' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Main Policy</div>
                          <div className="font-bold text-foreground mt-0.5 uppercase">{result.dmarc.policy}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Enforcement</div>
                          <div className="font-bold text-foreground mt-0.5">{result.dmarc.percentage}%</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">RUA Reports</div>
                          <div className="font-bold text-foreground mt-0.5 truncate">{result.dmarc.ruaEmail || 'Not Configured'}</div>
                        </div>
                        <div className="p-2.5 rounded-xl bg-muted/20 border border-border">
                          <div className="text-[10px] text-muted-foreground uppercase">Alignment</div>
                          <div className="font-bold text-foreground mt-0.5">SPF: {result.dmarc.alignmentSpf}</div>
                        </div>
                      </div>

                      <p className="text-xs text-muted-foreground leading-relaxed">{result.dmarc.summary}</p>
                    </div>
                  ) : (
                    <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                      No DMARC record found at `_dmarc.{result.domain}`. Email receivers have no instruction on how to handle failed SPF/DKIM checks.
                    </div>
                  )}
                </div>
              )}

              {/* MX Records Card */}
              {(activeTab === 'all' || activeTab === 'mx') && (
                <div className="p-6 rounded-3xl border border-border bg-card shadow-sm space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                  <div className="flex items-center justify-between border-b border-border pb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-amber-500/15 text-amber-400">
                        <Server className="w-4 h-4" />
                      </div>
                      <h3 className="text-sm font-bold text-foreground">Configured MX Mail Servers</h3>
                    </div>
                    <span className="text-xs font-mono text-muted-foreground">
                      {result.mxRecords.length} Mail Servers Found
                    </span>
                  </div>

                  {result.mxRecords.length > 0 ? (
                    <div className="space-y-1.5">
                      {result.mxRecords.map((mx, idx) => (
                        <div key={idx} className="p-2.5 rounded-xl bg-muted/30 border border-border text-xs font-mono text-foreground flex items-center justify-between">
                          <span>{mx}</span>
                          <span className="text-[10px] text-muted-foreground font-sans">Active MX Gateway</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-muted-foreground">No MX records returned for {result.domain}.</p>
                  )}
                </div>
              )}

            </div>

            {/* 3. Security Recommendations Panel */}
            {result.recommendations.length > 0 && (
              <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-lg space-y-4" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-2 border-b border-border pb-3">
                  <Sparkles className="w-5 h-5 text-primary" />
                  <h3 className="text-base font-bold text-foreground">Actionable Security Recommendations</h3>
                </div>

                <div className="space-y-3">
                  {result.recommendations.map((rec, idx) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-2xl border text-xs space-y-1.5 ${
                        rec.severity === 'high'
                          ? 'border-red-500/30 bg-red-500/10 text-red-300'
                          : rec.severity === 'medium'
                          ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                          : 'border-cyan-500/30 bg-cyan-500/10 text-cyan-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 font-bold text-foreground">
                        <span className={`px-2 py-0.5 rounded text-[9px] uppercase font-mono ${
                          rec.severity === 'high' ? 'bg-red-500/20 text-red-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          {rec.severity} Priority
                        </span>
                        <span>{rec.title}</span>
                      </div>
                      <p className="leading-relaxed opacity-90">{rec.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}

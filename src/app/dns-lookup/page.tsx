'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Globe2,
  Search,
  RefreshCw,
  Copy,
  Check,
  Download,
  Server,
  Layers,
  Sparkles,
  HelpCircle,
  ChevronDown,
  Mail,
  FileText,
  ShieldCheck,
  Zap,
  ArrowRight,
  Database,
} from 'lucide-react';

interface DnsData {
  domain: string;
  recordType: string;
  records: {
    A: { ip: string; ttl?: number }[];
    AAAA: { ip: string; ttl?: number }[];
    MX: { exchange: string; priority: number }[];
    TXT: { text: string }[];
    NS: { host: string }[];
    CNAME: { target: string }[];
    SOA: any[];
  };
  totalCount: number;
  timestamp: string;
}

export default function DnsLookupPage() {
  const [domain, setDomain] = useState('google.com');
  const [recordType, setRecordType] = useState('ALL');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DnsData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleLookup = async (targetDomain?: string, type?: string) => {
    const d = (targetDomain || domain).trim();
    const t = type || recordType;
    if (!d) return;

    setLoading(true);
    setErrorMsg(null);
    setData(null);

    try {
      const res = await fetch('/api/dns-lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain: d, recordType: t }),
      });

      const json = await res.json();
      if (!res.ok || json.error) {
        throw new Error(json.error || 'DNS query failed.');
      }

      setData(json);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to query DNS servers.');
    } finally {
      setLoading(false);
    }
  };

  const copyJson = () => {
    if (!data) return;
    navigator.clipboard.writeText(JSON.stringify(data.records, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadRecordsTxt = () => {
    if (!data) return;
    let txt = `; DNS Records for ${data.domain}\n; Generated at ${data.timestamp}\n\n`;

    data.records.A.forEach((r) => (txt += `${data.domain}.\tIN\tA\t${r.ip}\n`));
    data.records.AAAA.forEach((r) => (txt += `${data.domain}.\tIN\tAAAA\t${r.ip}\n`));
    data.records.MX.forEach((r) => (txt += `${data.domain}.\tIN\tMX\t${r.priority}\t${r.exchange}\n`));
    data.records.NS.forEach((r) => (txt += `${data.domain}.\tIN\tNS\t${r.host}\n`));
    data.records.CNAME.forEach((r) => (txt += `${data.domain}.\tIN\tCNAME\t${r.target}\n`));
    data.records.TXT.forEach((r) => (txt += `${data.domain}.\tIN\tTXT\t"${r.text}"\n`));

    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${data.domain}_dns_records.zone.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const faqs = [
    {
      q: 'What is a DNS Lookup?',
      a: 'A Domain Name System (DNS) lookup queries authoritative name servers to resolve human-friendly domain names (e.g. google.com) into machine-readable IP addresses (A/AAAA records), mail servers (MX), or text validation strings (TXT).',
    },
    {
      q: 'What are the main DNS record types?',
      a: '• A: IPv4 Address\n• AAAA: IPv6 Address\n• MX: Mail Exchange server with routing priority\n• TXT: Arbitrary text data used for SPF, DKIM, DMARC, and domain ownership verification\n• NS: Authoritative Name Server delegator\n• CNAME: Canonical Name alias pointing one hostname to another.',
    },
    {
      q: 'Why do DNS records take time to propagate?',
      a: 'DNS records are cached by recursive resolvers and ISPs according to their Time-To-Live (TTL) value (typically 300 to 86400 seconds). Changes can take up to 24-48 hours to propagate globally.',
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
              <span className="text-primary font-bold">DNS Lookup</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight flex items-center gap-3">
              <span className="p-2 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                <Globe2 className="w-7 h-7" />
              </span>
              <span>Global DNS Record Inspector</span>
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-2xl">
              Query global DNS zone records across A, AAAA, MX, TXT, NS, CNAME, and SOA with dual-stack authoritative resolver lookup.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-3 py-1.5 rounded-xl border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-bold font-mono flex items-center gap-1.5 shadow-sm">
              <Zap className="w-3.5 h-3.5" /> High-Speed DNS Resolver
            </span>
          </div>
        </div>

        {/* Input & Filter Controls */}
        <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-sm space-y-5" style={{ backgroundColor: 'var(--card)' }}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup();
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-8 relative">
                <Globe2 className="w-4 h-4 text-muted-foreground absolute left-4 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="e.g. google.com, apple.com, microsoft.com"
                  className="w-full pl-11 pr-4 py-3.5 rounded-2xl border border-border bg-muted/40 text-foreground font-mono text-sm font-semibold focus:outline-none focus:border-primary"
                />
              </div>

              <div className="sm:col-span-4 flex gap-2">
                <select
                  value={recordType}
                  onChange={(e) => setRecordType(e.target.value)}
                  className="w-full px-3.5 py-3.5 rounded-2xl border border-border bg-muted/40 text-xs font-bold text-foreground focus:outline-none focus:border-primary cursor-pointer"
                >
                  <option value="ALL">ALL Records</option>
                  <option value="A">A (IPv4)</option>
                  <option value="AAAA">AAAA (IPv6)</option>
                  <option value="MX">MX (Mail Servers)</option>
                  <option value="TXT">TXT (SPF / Verification)</option>
                  <option value="NS">NS (Name Servers)</option>
                  <option value="CNAME">CNAME (Aliases)</option>
                </select>

                <button
                  type="submit"
                  disabled={loading || !domain.trim()}
                  className="py-3.5 px-6 rounded-2xl bg-primary text-primary-foreground font-bold text-xs flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  {loading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  <span>Lookup</span>
                </button>
              </div>
            </div>
          </form>

          {/* Quick Presets */}
          <div className="flex items-center gap-2 flex-wrap pt-1">
            <span className="text-[11px] text-muted-foreground font-mono">Popular Domains:</span>
            {['google.com', 'apple.com', 'cloudflare.com', 'amazon.com'].map((sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => {
                  setDomain(sample);
                  handleLookup(sample, recordType);
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

        {/* Results Tables */}
        {data && (
          <div className="space-y-6 animate-in fade-in duration-300">
            
            <div className="flex items-center justify-between border-b border-border pb-4 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <Server className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg sm:text-xl font-bold font-mono text-foreground">
                  {data.domain} ({data.totalCount} records found)
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={copyJson}
                  className="py-1.5 px-3 rounded-xl bg-primary text-primary-foreground text-xs font-bold flex items-center gap-1.5 shadow-glow-primary hover:opacity-90 transition-opacity cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied JSON' : 'Copy JSON'}</span>
                </button>

                <button
                  type="button"
                  onClick={downloadRecordsTxt}
                  className="py-1.5 px-3 rounded-xl border border-border bg-muted/60 hover:bg-muted text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-muted-foreground" />
                  <span>Download Zone File</span>
                </button>
              </div>
            </div>

            {/* 1. A Records (IPv4) */}
            {data.records.A.length > 0 && (
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-border pb-2">
                  <span>A Records (IPv4 Addresses)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-cyan-500/15 text-cyan-400 font-mono">
                    {data.records.A.length}
                  </span>
                </div>
                <div className="divide-y divide-border/60 font-mono text-xs">
                  {data.records.A.map((r, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <span className="text-foreground font-semibold">{r.ip}</span>
                      <span className="text-muted-foreground text-[11px]">TTL: {r.ttl || 'Default'}s</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. AAAA Records (IPv6) */}
            {data.records.AAAA.length > 0 && (
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400 border-b border-border pb-2">
                  <span>AAAA Records (IPv6 Addresses)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/15 text-indigo-400 font-mono">
                    {data.records.AAAA.length}
                  </span>
                </div>
                <div className="divide-y divide-border/60 font-mono text-xs">
                  {data.records.AAAA.map((r, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <span className="text-foreground font-semibold break-all">{r.ip}</span>
                      <span className="text-muted-foreground text-[11px]">TTL: {r.ttl || 'Default'}s</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. MX Records */}
            {data.records.MX.length > 0 && (
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-400 border-b border-border pb-2">
                  <Mail className="w-3.5 h-3.5" />
                  <span>MX Records (Mail Servers)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-500/15 text-amber-400 font-mono">
                    {data.records.MX.length}
                  </span>
                </div>
                <div className="divide-y divide-border/60 font-mono text-xs">
                  {data.records.MX.map((r, i) => (
                    <div key={i} className="py-2.5 flex items-center justify-between">
                      <span className="text-foreground font-semibold">{r.exchange}</span>
                      <span className="text-amber-400 font-bold">Priority: {r.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. TXT Records */}
            {data.records.TXT.length > 0 && (
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 border-b border-border pb-2">
                  <FileText className="w-3.5 h-3.5" />
                  <span>TXT Records (SPF, Verification, DMARC)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-500/15 text-emerald-400 font-mono">
                    {data.records.TXT.length}
                  </span>
                </div>
                <div className="space-y-2 font-mono text-xs">
                  {data.records.TXT.map((r, i) => (
                    <div key={i} className="p-3 rounded-xl bg-muted/30 border border-border text-foreground break-all select-all">
                      &quot;{r.text}&quot;
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 5. NS Records */}
            {data.records.NS.length > 0 && (
              <div className="p-5 rounded-3xl border border-border bg-card shadow-sm space-y-3" style={{ backgroundColor: 'var(--card)' }}>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400 border-b border-border pb-2">
                  <span>NS Records (Authoritative Name Servers)</span>
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-400 font-mono">
                    {data.records.NS.length}
                  </span>
                </div>
                <div className="divide-y divide-border/60 font-mono text-xs">
                  {data.records.NS.map((r, i) => (
                    <div key={i} className="py-2 flex items-center justify-between">
                      <span className="text-foreground font-semibold">{r.host}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* How To Use Guide */}
        <div className="p-6 rounded-3xl border border-border bg-card space-y-4" style={{ backgroundColor: 'var(--card)' }}>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-base font-bold text-foreground">How to Query DNS Records</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-muted-foreground">
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">01. Specify Domain</span>
              <p>Type any domain name or subdomain (e.g. google.com or mail.yahoo.com).</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">02. Filter Record Types</span>
              <p>Select specific types (A, MX, TXT, NS) or query ALL records at once.</p>
            </div>
            <div className="p-4 rounded-2xl bg-muted/20 border border-border space-y-1.5">
              <span className="font-mono font-bold text-primary">03. Export &amp; Analyze</span>
              <p>Copy JSON payloads or download standard RFC zone text files for your server configs.</p>
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
                  <div className="p-4 pt-0 text-xs text-muted-foreground leading-relaxed border-t border-border/50 whitespace-pre-line">
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
            Related Network &amp; Security Tools:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              href="/ssl-certificate-checker"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">SSL Certificate Checker</div>
                <div className="text-[11px] text-muted-foreground truncate">Inspect TLS &amp; expiry countdown</div>
              </div>
            </Link>

            <Link
              href="/email-security"
              className="p-3.5 rounded-2xl border border-border bg-card hover:border-primary/50 transition-all flex items-center gap-3 group"
            >
              <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400">
                <Mail className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-bold text-foreground group-hover:text-primary transition-colors">SPF / DKIM / DMARC</div>
                <div className="text-[11px] text-muted-foreground truncate">Audit domain email authentication</div>
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
                <div className="text-[11px] text-muted-foreground truncate">Audit web server security headers</div>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

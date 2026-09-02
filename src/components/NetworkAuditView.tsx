'use client';

import React, { useState, useEffect } from 'react';
import { retroSound } from '@/lib/retroAudio';
import {
  Terminal,
  Shield,
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Play,
  Copy,
  Check,
  RefreshCw,
  Server,
  Lock,
  Globe,
  Radio,
  Cpu,
  ArrowLeft,
  CheckCircle2,
  KeyRound,
  FileCheck,
  Clock,
} from 'lucide-react';

export type AuditTheme = 'dos-green' | 'dos-amber' | 'paper-matrix' | 'dark-slate';

export interface DefensiveHardeningRule {
  id: string;
  category: 'HTTP/HTTPS' | 'Banner Exposure' | 'TLS Hygiene' | 'Network Isolation';
  title: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW' | 'PASSED';
  description: string;
  remediationSnippet: string;
  configType: 'Nginx' | 'Apache' | 'Express / Node' | 'UFW / Firewall' | 'Redis / DB';
}

export interface NetworkPortAuditItem {
  port: number;
  protocol: 'TCP';
  service: string;
  category: 'Web' | 'Database' | 'Remote Access' | 'Mail' | 'Infrastructure' | 'Dev';
  status: 'OPEN' | 'CLOSED' | 'FILTERED';
  rttMs: number;
  tlsDetails?: {
    protocol: string;
    cipher: string;
    certExpiry?: string;
    daysRemaining?: number;
    authorized: boolean;
  };
  bannerExposure?: {
    exposed: boolean;
    serverHeader?: string;
    poweredByHeader?: string;
    warning?: string;
  };
  risk: 'SAFE' | 'INFO' | 'WARNING' | 'CRITICAL';
  recommendation: string;
}

export interface NetworkAuditReport {
  target: string;
  hostname: string;
  ip: string;
  scanTime: string;
  durationSeconds: number;
  totalPortsScanned: number;
  openPortsCount: number;
  closedPortsCount: number;
  filteredPortsCount: number;
  bannerInfo?: {
    exposed: boolean;
    serverHeader?: string;
    poweredByHeader?: string;
    warning?: string;
  };
  tlsDetails?: {
    protocol: string;
    cipher: string;
    certExpiry?: string;
    daysRemaining?: number;
    authorized: boolean;
  };
  hardeningRecommendations?: DefensiveHardeningRule[];
  osFingerprint: string;
  overallRisk: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  ports: NetworkPortAuditItem[];
  rawOutput: string[];
}

export interface NetworkAuditViewProps {
  theme?: AuditTheme;
  initialTarget?: string;
  onBack?: () => void;
}

export const NetworkAuditView: React.FC<NetworkAuditViewProps> = ({
  theme = 'dos-green',
  initialTarget = 'https://example.com',
  onBack,
}) => {
  const [targetInput, setTargetInput] = useState(initialTarget || 'https://example.com');
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [currentPortProbe, setCurrentPortProbe] = useState('');
  const [report, setReport] = useState<NetworkAuditReport | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedRaw, setCopiedRaw] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'OPEN' | 'CLOSED' | 'CRITICAL'>('ALL');
  const [showAuthModal, setShowAuthModal] = useState(false);

  const isPaper = theme === 'paper-matrix';
  const isAmber = theme === 'dos-amber';

  const runNetworkAudit = async (urlOrHost: string) => {
    let cleanHost = (urlOrHost || '').trim();
    if (!cleanHost) cleanHost = 'https://example.com';

    setIsScanning(true);
    setErrorMessage(null);
    setScanProgress(15);
    setCurrentPortProbe('Initializing DNS & SSRF Boundary Verification...');
    try {
      retroSound?.playDosBeep?.(880, 0.08);
    } catch {
      // Audio fallback
    }

    let progressTimer: NodeJS.Timeout | null = null;
    try {
      progressTimer = setInterval(() => {
        setScanProgress((prev) => (prev < 90 ? prev + 12 : prev));
        try {
          retroSound?.playKeyClick?.();
        } catch {
          // Audio fallback
        }
      }, 200);

      const res = await fetch('/api/network-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ target: cleanHost }),
      });

      if (progressTimer) clearInterval(progressTimer);
      setScanProgress(100);

      const json = await res.json();
      if (json && json.success && json.data) {
        setReport(json.data);
        try {
          retroSound?.playSuccessChime?.();
        } catch {
          // Audio fallback
        }
      } else {
        const errText = json?.error || 'Network audit failed to resolve target host.';
        setErrorMessage(errText);
        try {
          retroSound?.playWarningAlert?.();
        } catch {
          // Audio fallback
        }
      }
    } catch (err: any) {
      if (progressTimer) clearInterval(progressTimer);
      setScanProgress(100);
      setErrorMessage(`Audit Engine Error: ${err?.message || 'Connection failure'}`);
      try {
        retroSound?.playWarningAlert?.();
      } catch {
        // Audio fallback
      }
    } finally {
      setIsScanning(false);
    }
  };

  useEffect(() => {
    runNetworkAudit(initialTarget || 'https://example.com');
  }, [initialTarget]);

  const copyRawOutput = () => {
    if (!report || !report.rawOutput) return;
    try {
      navigator.clipboard.writeText(report.rawOutput.join('\n'));
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    } catch {
      // clipboard fallback
    }
  };

  const safePorts = report?.ports || [];
  const filteredPorts = safePorts.filter((p) => {
    if (!p) return false;
    if (selectedFilter === 'OPEN') return p.status === 'OPEN';
    if (selectedFilter === 'CLOSED') return p.status === 'CLOSED';
    if (selectedFilter === 'CRITICAL') return p.risk === 'CRITICAL';
    return true;
  });

  return (
    <div
      className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 font-mono transition-colors ${
        isPaper
          ? 'text-[#1a261a]'
          : isAmber
          ? 'text-[#ffb000]'
          : 'text-[#33ff33]'
      }`}
    >
      {/* Header Bar */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-lg ${
          isPaper
            ? 'bg-[#fcfbf7] border-[#c2bcab]'
            : isAmber
            ? 'bg-[#120d00] border-[#664600]'
            : 'bg-[#081208] border-[#1f4d1f]'
        }`}
      >
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className={`p-1.5 rounded border text-xs flex items-center gap-1 hover:opacity-80 transition-all ${
                  isPaper
                    ? 'border-[#c2bcab] bg-[#eef6ee]'
                    : isAmber
                    ? 'border-[#664600] bg-[#261900]'
                    : 'border-[#1f4d1f] bg-[#0c1a0c]'
                }`}
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO VAPT</span>
              </button>
            )}
            <span
              className={`text-[10px] uppercase px-2 py-0.5 rounded border font-bold ${
                isPaper
                  ? 'border-[#1a261a] bg-[#1a261a] text-[#fcfbf7]'
                  : isAmber
                  ? 'border-[#ffb000] bg-[#ffb000]/20 text-[#ffb000]'
                  : 'border-[#33ff33] bg-[#33ff33]/20 text-[#33ff33]'
              }`}
            >
              IN-SERVER PORT AUDITOR
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            N-MAP NETWORK SERVICE & PORT EXPOSURE AUDITOR
          </h2>
          <p className="text-xs opacity-75">
            Non-intrusive TCP socket handshake checks • Authorized TLS handshake analysis • 100% In-Server
          </p>
        </div>

        {/* Target Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (targetInput.trim()) runNetworkAudit(targetInput);
          }}
          className="flex items-center gap-2"
        >
          <div className="relative w-full sm:w-64">
            <Globe className="w-4 h-4 opacity-50 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              placeholder="target.domain or IP"
              className={`w-full pl-9 pr-3 py-1.5 rounded-lg border text-xs font-mono focus:outline-none ${
                isPaper
                  ? 'bg-white border-[#c2bcab] text-[#1a261a]'
                  : isAmber
                  ? 'bg-[#1a1200] border-[#664600] text-[#ffb000]'
                  : 'bg-[#050b05] border-[#1f4d1f] text-[#33ff33]'
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={isScanning}
            className={`px-4 py-1.5 rounded-lg border text-xs font-bold flex items-center gap-1.5 transition-all ${
              isPaper
                ? 'bg-[#1a261a] text-[#fcfbf7] border-[#1a261a] hover:bg-[#2d3f2d]'
                : isAmber
                ? 'bg-[#ffb000] text-[#151000] border-[#ffb000] hover:bg-[#ffb000]/90'
                : 'bg-[#33ff33] text-[#081208] border-[#33ff33] hover:bg-[#33ff33]/90'
            }`}
          >
            {isScanning ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isScanning ? 'AUDITING...' : 'RUN AUDIT'}</span>
          </button>
        </form>
      </div>

      {/* Safety Guardrails Pill Bar */}
      <div
        className={`p-3 rounded-xl border flex flex-wrap items-center justify-between gap-3 text-xs ${
          isPaper
            ? 'bg-[#f4f1ea] border-[#c2bcab]'
            : isAmber
            ? 'bg-[#1a1200] border-[#664600]'
            : 'bg-[#060e06] border-[#1f4d1f]'
        }`}
      >
        <div className="flex flex-wrap items-center gap-3">
          <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Anti-SSRF Firewall Active</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5 opacity-80">
            <Shield className="w-3.5 h-3.5" />
            <span>Safe Bounded Port Scope (12 Services)</span>
          </span>
          <span>&bull;</span>
          <span className="flex items-center gap-1.5 opacity-80">
            <Clock className="w-3.5 h-3.5" />
            <span>1500ms Socket Timeout & Concurrency Throttle</span>
          </span>
        </div>

        <button
          onClick={() => setShowAuthModal(true)}
          className="underline opacity-80 hover:opacity-100 flex items-center gap-1"
        >
          <FileCheck className="w-3.5 h-3.5" />
          <span>Ownership Verification</span>
        </button>
      </div>

      {/* Ownership Challenge Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div
            className={`max-w-lg w-full p-6 rounded-2xl border space-y-4 shadow-2xl ${
              isPaper
                ? 'bg-[#fcfbf7] border-[#c2bcab] text-[#1a261a]'
                : isAmber
                ? 'bg-[#151000] border-[#ffb000] text-[#ffb000]'
                : 'bg-[#081208] border-[#33ff33] text-[#33ff33]'
            }`}
          >
            <div className="flex items-center justify-between border-b border-current/20 pb-2">
              <h3 className="text-base font-bold flex items-center gap-2">
                <KeyRound className="w-4 h-4" />
                <span>Authorization & Ownership Guardrails</span>
              </h3>
              <button onClick={() => setShowAuthModal(false)} className="font-bold px-2 py-0.5 rounded border border-current">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed opacity-90">
              <p>
                <strong>1. Authorization Requirement:</strong> All network service probes must be executed solely on assets you own or have explicit written authorization to audit.
              </p>
              <p>
                <strong>2. Verification Methods:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>DNS TXT Record: <code className="bg-black/30 px-1 py-0.5 rounded">vapt-audit-verify=&lt;token&gt;</code></li>
                <li>HTTP Token: <code className="bg-black/30 px-1 py-0.5 rounded">/.well-known/security-check.txt</code></li>
              </ul>
              <p>
                <strong>3. Non-Destructive Guarantee:</strong> Purely non-intrusive TCP socket handshake verification with zero attack payloads.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setShowAuthModal(false)}
                className={`px-4 py-1.5 rounded border text-xs font-bold ${
                  isPaper
                    ? 'bg-[#1a261a] text-white border-[#1a261a]'
                    : isAmber
                    ? 'bg-[#ffb000] text-black border-[#ffb000]'
                    : 'bg-[#33ff33] text-black border-[#33ff33]'
                }`}
              >
                I ACKNOWLEDGE & AGREE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Banner */}
      {errorMessage && (
        <div className="p-4 rounded-xl border border-red-500/60 bg-red-500/10 text-red-400 flex items-center gap-2.5 text-xs font-bold">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Progress Bar */}
      {isScanning && (
        <div
          className={`p-4 rounded-xl border space-y-2 ${
            isPaper
              ? 'bg-[#eef6ee] border-[#c2bcab]'
              : isAmber
              ? 'bg-[#1c1400] border-[#664600]'
              : 'bg-[#0a170a] border-[#1f4d1f]'
          }`}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>{currentPortProbe}</span>
            </span>
            <span className="font-bold">{scanProgress}%</span>
          </div>
          <div className="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-current">
            <div
              className={`h-full transition-all duration-150 ${
                isPaper ? 'bg-[#1a261a]' : isAmber ? 'bg-[#ffb000]' : 'bg-[#33ff33]'
              }`}
              style={{ width: `${scanProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Report Dashboard */}
      {report && !isScanning && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Target Host Telemetry Summary Card */}
          <div
            className={`p-5 rounded-2xl border grid grid-cols-2 sm:grid-cols-4 gap-4 ${
              isPaper
                ? 'bg-[#fcfbf7] border-[#c2bcab]'
                : isAmber
                ? 'bg-[#120d00] border-[#664600]'
                : 'bg-[#081208] border-[#1f4d1f]'
            }`}
          >
            <div>
              <div className="text-[10px] uppercase opacity-70">Target Host / IP</div>
              <div className="text-sm sm:text-base font-bold truncate">{report.hostname || targetInput}</div>
              <div className="text-xs opacity-75">{report.ip || 'Resolved'}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase opacity-70">Open Services</div>
              <div className="text-2xl font-black">{report.openPortsCount ?? 0} <span className="text-xs font-normal opacity-75">/ {report.totalPortsScanned ?? 12} Ports</span></div>
              <div className="text-[10px] opacity-75">{report.filteredPortsCount ?? 0} Filtered • {report.closedPortsCount ?? 0} Closed</div>
            </div>

            <div>
              <div className="text-[10px] uppercase opacity-70">Scan Execution</div>
              <div className="text-2xl font-black">{report.durationSeconds ?? 1.5}s</div>
              <div className="text-[10px] opacity-75">In-Server TCP Connect</div>
            </div>

            <div>
              <div className="text-[10px] uppercase opacity-70">Exposure Rating</div>
              <div className="inline-block mt-1">
                <span
                  className={`text-xs px-2.5 py-1 rounded border font-bold uppercase ${
                    report.overallRisk === 'CRITICAL'
                      ? 'border-red-500 bg-red-500/20 text-red-400'
                      : report.overallRisk === 'HIGH'
                      ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                      : 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                  }`}
                >
                  {report.overallRisk || 'LOW'} EXPOSURE
                </span>
              </div>
            </div>
          </div>

          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="opacity-75">FILTER PORTS:</span>
              {(['ALL', 'OPEN', 'CLOSED', 'CRITICAL'] as const).map((flt) => (
                <button
                  key={flt}
                  onClick={() => setSelectedFilter(flt)}
                  className={`px-2.5 py-1 rounded border text-xs font-bold transition-all ${
                    selectedFilter === flt
                      ? isPaper
                        ? 'bg-[#1a261a] text-[#fcfbf7] border-[#1a261a]'
                        : isAmber
                        ? 'bg-[#ffb000] text-[#151000] border-[#ffb000]'
                        : 'bg-[#33ff33] text-[#081208] border-[#33ff33]'
                      : 'border-current/40 hover:bg-white/5'
                  }`}
                >
                  {flt}
                </button>
              ))}
            </div>

            <button
              onClick={copyRawOutput}
              className={`px-3 py-1 rounded border text-xs flex items-center gap-1.5 ${
                isPaper
                  ? 'border-[#c2bcab] bg-[#eef6ee]'
                  : isAmber
                  ? 'border-[#664600] bg-[#1a1200]'
                  : 'border-[#1f4d1f] bg-[#0c1a0c]'
              }`}
            >
              {copiedRaw ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedRaw ? 'COPIED RAW OUTPUT' : 'COPY RAW NMAP OUTPUT'}</span>
            </button>
          </div>

          {/* Port Security Matrix Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {filteredPorts.map((p) => (
              <div
                key={p.port}
                className={`p-4 rounded-xl border space-y-2 transition-all ${
                  p.status === 'OPEN'
                    ? isPaper
                      ? 'border-[#2d3f2d] bg-[#eef6ee]'
                      : isAmber
                      ? 'border-[#ffb000]/60 bg-[#261900]'
                      : 'border-[#33ff33]/60 bg-[#0e210e]'
                    : isPaper
                    ? 'border-[#c2bcab]/50 bg-[#f4f1ea] opacity-70'
                    : isAmber
                    ? 'border-[#664600]/40 bg-[#120d00] opacity-70'
                    : 'border-[#1f4d1f]/40 bg-[#060c06] opacity-70'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base font-black">
                      {p.port}/{p.protocol}
                    </span>
                    <span className="text-xs font-bold opacity-80">{p.service}</span>
                  </div>

                  <span
                    className={`text-[10px] font-black uppercase px-2 py-0.5 rounded border ${
                      p.status === 'OPEN'
                        ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                        : p.status === 'FILTERED'
                        ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                        : 'border-slate-600 bg-slate-800 text-slate-400'
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <div className="text-[11px] flex justify-between opacity-80">
                  <span>Category: {p.category}</span>
                  <span>RTT: {p.rttMs}ms</span>
                </div>

                {/* TLS Hygiene Details */}
                {p.tlsDetails && (
                  <div className="p-2 rounded bg-black/30 border border-current/20 text-[10px] space-y-0.5 font-mono">
                    <div className="flex justify-between">
                      <span className="opacity-70">Protocol & Cipher:</span>
                      <span className="font-bold">{p.tlsDetails.protocol} ({p.tlsDetails.cipher})</span>
                    </div>
                    {p.tlsDetails.certExpiry && (
                      <div className="flex justify-between">
                        <span className="opacity-70">Cert Validity:</span>
                        <span className="text-emerald-400 font-bold">{p.tlsDetails.daysRemaining} days remaining</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Banner Disclosure Alert */}
                {p.bannerExposure?.exposed && (
                  <div className="p-1.5 rounded bg-amber-500/10 border border-amber-500/30 text-[10px] text-amber-400 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">Banner Exposed: {[p.bannerExposure.serverHeader, p.bannerExposure.poweredByHeader].filter(Boolean).join(' / ')}</span>
                  </div>
                )}

                <p className="text-[11px] opacity-75 leading-relaxed pt-1 border-t border-current/20">
                  {p.recommendation}
                </p>
              </div>
            ))}
          </div>

          {/* Defensive Hardening Recommendations Module */}
          {report.hardeningRecommendations && report.hardeningRecommendations.length > 0 && (
            <div
              className={`p-5 rounded-2xl border space-y-4 ${
                isPaper
                  ? 'bg-[#fcfbf7] border-[#c2bcab]'
                  : isAmber
                  ? 'bg-[#151000] border-[#664600]'
                  : 'bg-[#060f06] border-[#1f4d1f]'
              }`}
            >
              <div className="flex items-center justify-between border-b border-current/20 pb-2">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm sm:text-base font-bold">DEFENSIVE HARDENING RECOMMENDATIONS</h3>
                </div>
                <span className="text-[10px] uppercase opacity-75 font-mono">Infrastructure Playbook</span>
              </div>

              <div className="space-y-3">
                {report.hardeningRecommendations.map((rule) => (
                  <div
                    key={rule.id}
                    className={`p-3.5 rounded-xl border space-y-2 text-xs transition-all ${
                      rule.severity === 'CRITICAL'
                        ? 'border-red-500/60 bg-red-500/10'
                        : rule.severity === 'MEDIUM'
                        ? 'border-amber-500/60 bg-amber-500/10'
                        : rule.severity === 'PASSED'
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-blue-500/40 bg-blue-500/5'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[9px] font-black uppercase px-2 py-0.5 rounded border ${
                            rule.severity === 'CRITICAL'
                              ? 'border-red-500 bg-red-500/20 text-red-400'
                              : rule.severity === 'MEDIUM'
                              ? 'border-amber-500 bg-amber-500/20 text-amber-400'
                              : rule.severity === 'PASSED'
                              ? 'border-emerald-500 bg-emerald-500/20 text-emerald-400'
                              : 'border-blue-500 bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {rule.severity}
                        </span>
                        <span className="font-bold">{rule.title}</span>
                      </div>
                      <span className="text-[10px] opacity-75 font-mono">[{rule.configType}]</span>
                    </div>

                    <p className="opacity-80 leading-relaxed text-[11px]">{rule.description}</p>

                    {rule.remediationSnippet && (
                      <div className="p-2.5 rounded bg-black/50 border border-current/20 font-mono text-[10px] overflow-x-auto">
                        <pre>{rule.remediationSnippet}</pre>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Raw Nmap CLI Terminal Output Box */}
          {report.rawOutput && report.rawOutput.length > 0 && (
            <div
              className={`p-5 rounded-2xl border space-y-2 ${
                isPaper
                  ? 'bg-[#1a261a] text-[#fcfbf7] border-[#1a261a]'
                  : isAmber
                  ? 'bg-[#0d0900] border-[#664600] text-[#ffb000]'
                  : 'bg-[#040804] border-[#1f4d1f] text-[#33ff33]'
              }`}
            >
              <div className="flex items-center justify-between text-xs pb-1 border-b border-white/10 opacity-75">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" />
                  <span>RAW NMAP EMULATION CLI OUTPUT STREAM</span>
                </span>
                <span>SYN STEALTH (TCP / -Pn)</span>
              </div>

              <pre className="p-3 font-mono text-xs overflow-x-auto leading-relaxed max-h-72">
                {report.rawOutput.join('\n')}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

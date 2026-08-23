'use client';

import React, { useState } from 'react';
import { ScanReport } from '@/types/scanner';
import { retroSound } from '@/lib/retroAudio';
import {
  Printer,
  Copy,
  Download,
  Terminal,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Info,
  Shield,
  FileCode,
} from 'lucide-react';

interface ReportPaperViewProps {
  report: ScanReport;
  onSwitchToTerminal: () => void;
}

export const ReportPaperView: React.FC<ReportPaperViewProps> = ({
  report,
  onSwitchToTerminal,
}) => {
  const [activeSnippetTab, setActiveSnippetTab] = useState<'nginx' | 'apache' | 'cloudflare' | 'nextjs' | 'helmet'>('nginx');
  const [copySuccess, setCopySuccess] = useState(false);

  const getStatusBadge = (status: 'PASS' | 'WARN' | 'FAIL' | 'INFO') => {
    switch (status) {
      case 'PASS':
        return <span className="font-bold text-emerald-800">[ PASS ]</span>;
      case 'WARN':
        return <span className="font-bold text-amber-800">[ WARN ]</span>;
      case 'FAIL':
        return <span className="font-bold text-rose-800">[ FAIL ]</span>;
      case 'INFO':
        return <span className="font-bold text-sky-800">[ INFO ]</span>;
    }
  };

  const getSeverityBadge = (sev: string) => {
    switch (sev) {
      case 'CRITICAL':
        return <span className="px-1.5 py-0.5 bg-rose-900 text-white font-bold text-[10px] rounded">[ CRITICAL ]</span>;
      case 'HIGH':
        return <span className="px-1.5 py-0.5 bg-orange-800 text-white font-bold text-[10px] rounded">[ HIGH ]</span>;
      case 'MEDIUM':
        return <span className="px-1.5 py-0.5 bg-amber-800 text-white font-bold text-[10px] rounded">[ MEDIUM ]</span>;
      case 'LOW':
        return <span className="px-1.5 py-0.5 bg-blue-800 text-white font-bold text-[10px] rounded">[ LOW ]</span>;
      default:
        return <span className="px-1.5 py-0.5 bg-slate-700 text-white font-bold text-[10px] rounded">[ INFO ]</span>;
    }
  };

  const handlePrint = () => {
    retroSound.playDotMatrixPrintHead();
    setTimeout(() => {
      window.print();
    }, 400);
  };

  const handleCopyAscii = () => {
    retroSound.playKeyClick();
    const asciiText = generatePlainAsciiReport(report);
    navigator.clipboard.writeText(asciiText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2500);
  };

  const handleDownloadJson = () => {
    retroSound.playKeyClick();
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vapt-report-${report.targetHost}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto py-6 px-2 sm:px-4">
      {/* Top Action Toolbar (Hidden during Print) */}
      <div className="no-print mb-6 flex flex-wrap items-center justify-between gap-3 p-3 rounded-lg bg-[#121812] border border-[#1f4d1f] text-[#33ff33] text-xs font-mono">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              retroSound.playDosBeep(750, 0.05);
              onSwitchToTerminal();
            }}
            className="px-3 py-1.5 rounded border border-[#1f4d1f] bg-[#0c1a0c] hover:bg-[#1f4d1f] font-bold flex items-center gap-1.5 transition-all"
          >
            <Terminal className="w-4 h-4" />
            <span>&lt;&lt; BACK TO DOS TERMINAL</span>
          </button>
          <span className="hidden sm:inline opacity-70">| TRACTOR-FEED 24-PIN PRINT MODE</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyAscii}
            className="px-3 py-1.5 rounded border border-[#1f4d1f] bg-[#0c1a0c] hover:bg-[#1f4d1f] font-bold flex items-center gap-1.5 transition-all"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copySuccess ? 'COPIED TO CLIPBOARD!' : 'COPY ASCII'}</span>
          </button>

          <button
            onClick={handleDownloadJson}
            className="px-3 py-1.5 rounded border border-[#1f4d1f] bg-[#0c1a0c] hover:bg-[#1f4d1f] font-bold flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>EXPORT JSON</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded border border-[#33ff33] bg-[#33ff33] text-[#0c100c] hover:bg-[#2bd92b] font-bold flex items-center gap-1.5 transition-all shadow-md"
          >
            <Printer className="w-4 h-4" />
            <span>PRINT / SAVE PDF</span>
          </button>
        </div>
      </div>

      {/* Main Continuous Tractor-Feed Dot-Matrix Paper Container */}
      <div className="paper-container relative rounded-lg border-2 border-[#c2bcab] shadow-2xl overflow-hidden font-mono text-[#1a261a]">
        {/* Top Perforation Border */}
        <div className="h-4 border-b border-dashed border-[#b8b09f] bg-[#f4f1ea] flex items-center justify-center text-[9px] text-[#7a857a] tracking-widest uppercase">
          - - - - - - - - - - - - - - - TEAR HERE - - - - - - - - - - - - - - -
        </div>

        <div className="flex">
          {/* Left Tractor Feed Punch Hole Margin */}
          <div className="w-7 sm:w-10 tractor-margin-left shrink-0 select-none py-4" />

          {/* Core Green-Bar Printable Content Sheet */}
          <div className="flex-1 green-bar-paper p-4 sm:p-8 space-y-6 overflow-x-auto">
            {/* Header Title Block */}
            <div className="border-2 border-[#1a261a] p-4 text-center space-y-1">
              <pre className="text-[10px] sm:text-xs leading-tight font-bold text-[#1a261a] overflow-x-auto">
{`+------------------------------------------------------------------------+
|   V A P T - 9 9   W E B S I T E   S E C U R I T Y   A U D I T   R E P O R T   |
|   PASSIVE CYBER-DEFENSE & OWASP COMPLIANCE VULNERABILITY ASSESSMENT    |
+------------------------------------------------------------------------+`}
              </pre>
              <div className="text-xs pt-1 flex flex-wrap items-center justify-between text-[#4a5d4a] font-bold">
                <span>TARGET: {report.targetUrl}</span>
                <span>IP: {report.resolvedIp}</span>
                <span>DATE: {new Date(report.scanTimestamp).toUTCString()}</span>
              </div>
            </div>

            {/* Executive Summary Scorecard Box */}
            <div className="border-2 border-[#1a261a] p-4 bg-[#fcfbf7]/90 space-y-3">
              <div className="font-bold text-sm border-b border-[#1a261a] pb-1 flex items-center justify-between">
                <span>1.0 EXECUTIVE SECURITY SCORECARD</span>
                <span>DURATION: {report.durationMs}ms</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center items-center py-2">
                {/* Score Dial */}
                <div className="border border-[#1a261a] p-3 rounded bg-white">
                  <div className="text-xs text-[#4a5d4a] font-bold">SECURITY POSTURE SCORE</div>
                  <div className="text-4xl font-extrabold my-1">{report.stats.score} / 100</div>
                  <div className="text-xs font-bold text-[#1a261a]">
                    {report.stats.score >= 85 ? 'STRONG DEFENSE' : report.stats.score >= 60 ? 'MODERATE RISK' : 'HIGH RISK POSTURE'}
                  </div>
                </div>

                {/* Grade Stamp */}
                <div className="border-2 border-dashed border-[#1a261a] p-3 rounded bg-white flex flex-col items-center justify-center">
                  <div className="text-xs text-[#4a5d4a] font-bold">LETTER GRADE</div>
                  <div className="text-5xl font-black text-rose-900 my-0.5">
                    [ {report.stats.grade} ]
                  </div>
                  <div className="text-[10px] text-[#4a5d4a]">OWASP TOP-10 COMPLIANCE</div>
                </div>

                {/* Severity Breakdown */}
                <div className="border border-[#1a261a] p-3 rounded bg-white text-xs space-y-1 text-left">
                  <div className="font-bold border-b border-[#c2bcab] pb-1 text-center">FINDINGS SUMMARY</div>
                  <div className="flex justify-between font-bold text-rose-800">
                    <span>CRITICAL SEVERITY:</span>
                    <span>{report.stats.criticalCount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-orange-800">
                    <span>HIGH SEVERITY:</span>
                    <span>{report.stats.highCount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-amber-800">
                    <span>MEDIUM SEVERITY:</span>
                    <span>{report.stats.mediumCount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-blue-800">
                    <span>LOW SEVERITY:</span>
                    <span>{report.stats.lowCount}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-800 border-t border-[#c2bcab] pt-1">
                    <span>PASSING CHECKS:</span>
                    <span>{report.stats.passCount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* HTTP Security Headers Table */}
            <div className="border border-[#1a261a] p-4 bg-[#fcfbf7]/90 space-y-2">
              <div className="font-bold text-xs border-b border-[#1a261a] pb-1">
                2.0 HTTP DEFENSIVE SECURITY HEADERS AUDIT (OWASP SECURE HEADERS PROJECT)
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="border-b border-[#1a261a] text-[#4a5d4a]">
                      <th className="py-1.5 px-2">HEADER NAME</th>
                      <th className="py-1.5 px-2">STATUS</th>
                      <th className="py-1.5 px-2">SERVER VALUE / REMARKS</th>
                      <th className="py-1.5 px-2">RECOMMENDED POLICY</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#c2bcab]">
                    {report.headerChecks.map((h, i) => (
                      <tr key={i} className="hover:bg-black/5">
                        <td className="py-1.5 px-2 font-bold whitespace-nowrap">{h.headerName}</td>
                        <td className="py-1.5 px-2">{getStatusBadge(h.status)}</td>
                        <td className="py-1.5 px-2 max-w-xs truncate text-[11px]">
                          {h.value || <span className="text-[#888] italic">NOT CONFIGURED</span>}
                        </td>
                        <td className="py-1.5 px-2 text-[11px] text-[#4a5d4a]">{h.recommendation}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* SSL/TLS & Cryptographic Transport Status */}
            <div className="border border-[#1a261a] p-4 bg-[#fcfbf7]/90 space-y-2 text-xs">
              <div className="font-bold border-b border-[#1a261a] pb-1 flex justify-between">
                <span>3.0 SSL/TLS & ENCRYPTION TRANSPORT AUDIT</span>
                <span>STATUS: {report.sslCheck.valid ? '[ VALID CERTIFICATE ]' : '[ AT RISK / UNENCRYPTED ]'}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <div><strong className="text-[#1a261a]">PROTOCOL ENFORCEMENT:</strong> {report.isHttps ? 'HTTPS Active (Port 443)' : 'Plaintext HTTP (Port 80)'}</div>
                  <div><strong className="text-[#1a261a]">TLS PROTOCOL VERSION:</strong> {report.sslCheck.protocol || 'N/A'}</div>
                  <div><strong className="text-[#1a261a]">CIPHER SUITE:</strong> {report.sslCheck.cipher || 'N/A'}</div>
                  <div><strong className="text-[#1a261a]">CERTIFICATE ISSUER:</strong> {report.sslCheck.issuer || 'N/A'}</div>
                </div>
                <div>
                  <div><strong className="text-[#1a261a]">SUBJECT COMMON NAME:</strong> {report.sslCheck.subject || report.targetHost}</div>
                  <div><strong className="text-[#1a261a]">EXPIRATION DATE:</strong> {report.sslCheck.validTo || 'N/A'}</div>
                  <div><strong className="text-[#1a261a]">DAYS UNTIL EXPIRY:</strong> {report.sslCheck.daysRemaining !== undefined ? `${report.sslCheck.daysRemaining} days` : 'N/A'}</div>
                  <div><strong className="text-[#1a261a]">SAN ALIASES:</strong> {report.sslCheck.san?.slice(0, 3).join(', ') || 'N/A'}</div>
                </div>
              </div>

              {report.sslCheck.issues.length > 0 && (
                <div className="mt-2 p-2 bg-rose-50 border border-rose-300 text-rose-900 rounded text-[11px]">
                  <strong>WARNINGS:</strong> {report.sslCheck.issues.join(' | ')}
                </div>
              )}
            </div>

            {/* Cookie Flags & Sensitive Files Probe */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Cookies */}
              <div className="border border-[#1a261a] p-3 bg-[#fcfbf7]/90 space-y-2 text-xs">
                <div className="font-bold border-b border-[#1a261a] pb-1">
                  4.0 COOKIE SECURITY FLAGS
                </div>
                {report.cookieChecks.length === 0 ? (
                  <p className="text-[11px] text-[#555] italic">No Set-Cookie response headers detected on target endpoint.</p>
                ) : (
                  <div className="space-y-2">
                    {report.cookieChecks.map((c, i) => (
                      <div key={i} className="border border-[#c2bcab] p-2 rounded bg-white text-[11px]">
                        <div className="flex justify-between font-bold">
                          <span>{c.name}</span>
                          <span>{getStatusBadge(c.status)}</span>
                        </div>
                        <div className="flex gap-3 text-[10px] mt-1 text-[#4a5d4a]">
                          <span>HttpOnly: {c.httpOnly ? 'YES' : 'NO (RISK)'}</span>
                          <span>Secure: {c.secure ? 'YES' : 'NO (RISK)'}</span>
                          <span>SameSite: {c.sameSite || 'NONE (RISK)'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Sensitive File Probes */}
              <div className="border border-[#1a261a] p-3 bg-[#fcfbf7]/90 space-y-2 text-xs">
                <div className="font-bold border-b border-[#1a261a] pb-1">
                  5.0 SENSITIVE RECON PROBES
                </div>
                <div className="space-y-1.5 text-[11px]">
                  {report.sensitiveFiles.map((p, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-dashed border-[#c2bcab] pb-1">
                      <span>{p.path}</span>
                      <div className="flex items-center gap-2">
                        <span>HTTP {p.httpStatus || 'ERR'}</span>
                        {p.accessible && p.severity === 'CRITICAL' ? (
                          <span className="text-rose-800 font-bold">[ EXPOSED / CRIT ]</span>
                        ) : p.accessible && p.severity === 'HIGH' ? (
                          <span className="text-orange-800 font-bold">[ EXPOSED / HIGH ]</span>
                        ) : (
                          <span className="text-emerald-800 font-bold">[ PROTECTED ]</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Vulnerability Findings List */}
            <div className="border-2 border-[#1a261a] p-4 bg-[#fcfbf7]/90 space-y-3">
              <div className="font-bold text-xs border-b border-[#1a261a] pb-1">
                6.0 DETAILED VULNERABILITY FINDINGS & REMEDIATION MATRIX
              </div>

              {report.findings.length === 0 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs rounded font-bold text-center">
                  EXCELLENT: NO CRITICAL OR HIGH VULNERABILITIES DETECTED ON PUBLIC SURFACE.
                </div>
              ) : (
                <div className="space-y-3">
                  {report.findings.map((f, i) => (
                    <div key={i} className="border border-[#1a261a] p-3 rounded bg-white space-y-1.5 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e5e0d3] pb-1">
                        <div className="flex items-center gap-2">
                          {getSeverityBadge(f.severity)}
                          <span className="font-bold text-[#1a261a] text-sm">{f.title}</span>
                        </div>
                        <div className="text-[10px] text-[#4a5d4a] font-bold">
                          {f.cwe && <span>{f.cwe} • </span>}
                          <span>{f.owaspCategory || 'OWASP Top 10'}</span>
                        </div>
                      </div>

                      <div className="text-[11px] leading-relaxed text-[#2a362a]">
                        <strong className="text-[#1a261a]">DESCRIPTION:</strong> {f.description}
                      </div>

                      <div className="text-[11px] leading-relaxed text-rose-950">
                        <strong>RISK IMPACT:</strong> {f.riskImpact}
                      </div>

                      <div className="text-[11px] leading-relaxed p-2 bg-[#eef6ee] border border-[#c2bcab] rounded text-[#1a261a] font-mono">
                        <strong>FIX / REMEDIATION:</strong> {f.remediation}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interactive Remediation Code Tabs */}
            <div className="border border-[#1a261a] p-4 bg-[#fcfbf7]/90 space-y-3">
              <div className="font-bold text-xs border-b border-[#1a261a] pb-1 flex flex-wrap items-center justify-between gap-2">
                <span>7.0 COPY-PASTE SERVER REMEDIATION TEMPLATES</span>
                <div className="flex items-center gap-1 text-[11px]">
                  {(['nginx', 'apache', 'cloudflare', 'nextjs', 'helmet'] as const).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveSnippetTab(tab)}
                      className={`px-2 py-0.5 border rounded uppercase font-bold transition-all ${
                        activeSnippetTab === tab
                          ? 'bg-[#1a261a] text-white border-[#1a261a]'
                          : 'bg-white text-[#1a261a] border-[#c2bcab] hover:bg-black/5'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <pre className="p-3 bg-[#1a261a] text-[#33ff33] rounded font-mono text-[11px] leading-relaxed overflow-x-auto">
                {report.remediationSnippet[activeSnippetTab]}
              </pre>
            </div>

            {/* Signoff Footer */}
            <div className="border-t-2 border-[#1a261a] pt-3 text-[10px] text-[#4a5d4a] flex flex-wrap justify-between items-center">
              <span>REPORT GENERATED BY VAPT-99 RETRO SCANNER ENGINE (ROM v4.12)</span>
              <span>CONFIDENTIAL SECURITY AUDIT • ALL RIGHTS RESERVED</span>
            </div>
          </div>

          {/* Right Tractor Feed Punch Hole Margin */}
          <div className="w-7 sm:w-10 tractor-margin-right shrink-0 select-none py-4" />
        </div>

        {/* Bottom Perforation Border */}
        <div className="h-4 border-t border-dashed border-[#b8b09f] bg-[#f4f1ea] flex items-center justify-center text-[9px] text-[#7a857a] tracking-widest uppercase">
          - - - - - - - - - - - - - - - END OF REPORT - - - - - - - - - - - - - - -
        </div>
      </div>
    </div>
  );
};

/**
 * Formats report into a pure plain-text ASCII banner string for clipboard copy.
 */
function generatePlainAsciiReport(report: ScanReport): string {
  return `+------------------------------------------------------------------------+
|      V A P T - 9 9   W E B S I T E   S E C U R I T Y   R E P O R T     |
+------------------------------------------------------------------------+
TARGET:    ${report.targetUrl}
IP:        ${report.resolvedIp}
TIMESTAMP: ${new Date(report.scanTimestamp).toUTCString()}
SCORE:     ${report.stats.score}/100 [GRADE: ${report.stats.grade}]
==========================================================================
FINDINGS:  ${report.stats.criticalCount} CRITICAL | ${report.stats.highCount} HIGH | ${report.stats.mediumCount} MED | ${report.stats.lowCount} LOW
==========================================================================
HTTP SECURITY HEADERS:
${report.headerChecks.map((h) => `  [ ${h.status} ] ${h.headerName.padEnd(30)} : ${h.value || 'MISSING'}`).join('\n')}

SSL/TLS STATUS:
  PROTOCOL : ${report.sslCheck.protocol || 'N/A'}
  CIPHER   : ${report.sslCheck.cipher || 'N/A'}
  EXPIRES  : ${report.sslCheck.validTo || 'N/A'} (${report.sslCheck.daysRemaining || 0} days remaining)

VULNERABILITIES & ACTIONS:
${report.findings.map((f, i) => `${i + 1}. [${f.severity}] ${f.title}\n   Risk: ${f.riskImpact}\n   Fix : ${f.remediation}\n`).join('\n')}
+------------------------------------------------------------------------+
| VAPT-99 ENGINE (C) 1988-2026 - OWASP PASSIVE DEFENSE SCANNER          |
+------------------------------------------------------------------------+`;
}

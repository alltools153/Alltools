'use client';

import React, { useState } from 'react';
import { HeaderNav } from '@/components/HeaderNav';
import { TerminalView } from '@/components/TerminalView';
import { ReportPaperView } from '@/components/ReportPaperView';
import { ScanReport, ScanTheme } from '@/types/scanner';
import { retroSound } from '@/lib/retroAudio';

export default function HomePage() {
  const [theme, setTheme] = useState<ScanTheme>('dos-green');
  const [report, setReport] = useState<ScanReport | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanPhase, setScanPhase] = useState('IDLE');
  const [logs, setLogs] = useState<string[]>([]);
  const [isMuted, setIsMuted] = useState(false);

  const handleStartScan = async (rawUrl: string) => {
    if (isScanning) return;

    let targetUrl = rawUrl.trim();
    if (!/^https?:\/\//i.test(targetUrl)) {
      targetUrl = 'https://' + targetUrl;
    }

    setIsScanning(true);
    setScanProgress(5);
    setScanPhase('INITIALIZING');
    setLogs([]);
    retroSound.playDosBeep(880, 0.08);

    const addLog = (msg: string) => {
      setLogs((prev) => [...prev, msg]);
      retroSound.playKeyClick();
    };

    addLog(`[+] VAPT-99 KERNEL ACTIVE: Target "${targetUrl}"`);

    // Progressive simulated telemetry
    setScanProgress(20);
    setScanPhase('DNS & SSRF VALIDATION');
    addLog(`[+] Resolving DNS records & verifying SSRF boundary safety...`);

    // Parallel API call
    try {
      const fetchPromise = fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: targetUrl }),
      });

      // Advance progress while fetching
      setTimeout(() => {
        setScanProgress(45);
        setScanPhase('SSL/TLS HANDSHAKE & CIPHER AUDIT');
        addLog(`[+] Inspecting SSL/TLS certificates and cryptographic ciphers...`);
      }, 250);

      setTimeout(() => {
        setScanProgress(70);
        setScanPhase('HTTP SECURITY HEADERS & COOKIES');
        addLog(`[+] Auditing OWASP defensive response headers & cookie security flags...`);
      }, 500);

      setTimeout(() => {
        setScanProgress(85);
        setScanPhase('SENSITIVE FILE PROBES');
        addLog(`[+] Performing passive recon probes (/.env, /.git/HEAD, /robots.txt)...`);
      }, 750);

      const response = await fetchPromise;
      const json = await response.json();

      setScanProgress(100);
      setScanPhase('AUDIT COMPLETED');

      if (!json.success) {
        addLog(`[!] SCAN FAILED: ${json.error || 'Server error'}`);
        retroSound.playWarningAlert();
      } else {
        const data: ScanReport = json.data;
        setReport(data);

        addLog(`[+] Target IP resolved: ${data.resolvedIp}`);
        addLog(`[+] HTTP Response: ${data.httpStatusCode} ${data.httpStatusText} (${data.durationMs}ms)`);
        addLog(`[+] VAPT Posture Score: ${data.stats.score} / 100  [LETTER GRADE: ${data.stats.grade}]`);

        data.findings.forEach((f) => {
          if (f.severity === 'CRITICAL' || f.severity === 'HIGH') {
            addLog(`[!] ALERT [${f.severity}]: ${f.title}`);
          }
        });

        addLog(`[+] PASSIVE AUDIT FINISHED. ${data.stats.passCount} CHECKS PASSED, ${data.findings.length} FINDINGS DETECTED.`);
        retroSound.playSuccessChime();
      }
    } catch (err: any) {
      setScanProgress(100);
      setScanPhase('ERROR');
      addLog(`[!] CRITICAL SCANNER ERROR: ${err.message}`);
      retroSound.playWarningAlert();
    } finally {
      setIsScanning(false);
    }
  };

  const handleSelectPreset = (url: string) => {
    handleStartScan(url);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#0c100c]">
      {/* Top Retro System Header */}
      <HeaderNav
        theme={theme}
        setTheme={setTheme}
        isMuted={isMuted}
        setIsMuted={setIsMuted}
        onSelectPreset={handleSelectPreset}
      />

      {/* Main Visual Display */}
      <main className="flex-1 py-4 sm:py-6">
        {theme === 'paper-matrix' && report ? (
          <ReportPaperView
            report={report}
            onSwitchToTerminal={() => setTheme('dos-green')}
          />
        ) : (
          <TerminalView
            theme={theme}
            setTheme={setTheme}
            report={report}
            isScanning={isScanning}
            scanProgress={scanProgress}
            scanPhase={scanPhase}
            logs={logs}
            onStartScan={handleStartScan}
            onSwitchToPaper={() => setTheme('paper-matrix')}
          />
        )}
      </main>

      {/* Retro Status Footer */}
      <footer className="no-print border-t border-[#1f331f] bg-[#080c08] py-3 text-center text-xs font-mono text-[#4a7d4a]">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-2">
          <span>VAPT-99 KERNEL &bull; LEAD ARCHITECT: <a href="/about" className="text-[#33ff33] underline font-bold hover:text-white">Santanu Batabyal</a></span>
          <div className="flex items-center gap-3">
            <a href="/api-evaluator" className="text-cyan-400 hover:underline">API Security Evaluator</a>
            <span>&bull;</span>
            <a href="/about" className="text-emerald-400 hover:underline">About Developer</a>
          </div>
          <span className="text-[#33ff33]">READY &gt;_</span>
        </div>
      </footer>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ScanReport, ScanTheme } from '@/types/scanner';
import { retroSound } from '@/lib/retroAudio';
import { Terminal, Play, RefreshCw, FileText, Globe, Search, ArrowRight } from 'lucide-react';

interface TerminalViewProps {
  theme: ScanTheme;
  setTheme: (theme: ScanTheme) => void;
  report: ScanReport | null;
  isScanning: boolean;
  scanProgress: number;
  scanPhase: string;
  logs: string[];
  onStartScan: (targetUrl: string) => void;
  onSwitchToPaper: () => void;
}

export const TerminalView: React.FC<TerminalViewProps> = ({
  theme,
  setTheme,
  report,
  isScanning,
  scanProgress,
  scanPhase,
  logs,
  onStartScan,
  onSwitchToPaper,
}) => {
  const [inputVal, setInputVal] = useState('SCAN https://github.com');
  const [quickUrl, setQuickUrl] = useState('https://github.com');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([
    'IBM PC COMPATIBLE 80386-DX 33MHz BIOS v3.04 (C) 1988',
    '640K BASE RAM OK. 15360K EXTENDED MEMORY OK.',
    'MS-DOS Version 5.00 [VAPT-99 CYBER DEFENSE KERNEL ACTIVE]',
    '========================================================================',
    'Enter target URL above or type "SCAN <url>" in prompt below.',
    'Supported commands: SCAN <url>, HELP, REPORT, REMEDY, MODE PAPER, CLS',
    '========================================================================',
  ]);

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isAmber = theme === 'dos-amber';

  // Auto-scroll terminal on new output or log updates
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalOutput, logs, scanProgress]);

  const handleCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    retroSound.playKeyClick();

    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    // Auto-detect direct URL entries like "https://example.com" or "google.com"
    let command = '';
    let args = '';

    if (/^(https?:\/\/|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i.test(trimmed) && !trimmed.toUpperCase().startsWith('SCAN')) {
      command = 'SCAN';
      args = trimmed;
    } else {
      const parts = trimmed.split(' ');
      command = parts[0].toUpperCase();
      args = parts.slice(1).join(' ');
    }

    const newOutputs = [`C:\\VAPT99> ${trimmed}`];

    switch (command) {
      case 'SCAN': {
        if (!args) {
          newOutputs.push('ERROR: Missing target URL. Usage: SCAN <url>');
          newOutputs.push('Example: SCAN https://github.com');
          retroSound.playWarningAlert();
        } else {
          newOutputs.push(`[+] Command acknowledged. Initializing passive audit on: ${args}`);
          setQuickUrl(args);
          onStartScan(args);
        }
        break;
      }

      case 'HELP': {
        newOutputs.push('--------------------- VAPT-99 COMMAND LIST ---------------------');
        newOutputs.push('  SCAN <url>     : Execute automated in-server passive VAPT audit.');
        newOutputs.push('  REPORT / AUDIT : Display summary scorecard of last target scan.');
        newOutputs.push('  REMEDY         : View web server remediation code snippets.');
        newOutputs.push('  MODE PAPER     : Switch to Dot-Matrix Tractor-Feed Paper mode.');
        newOutputs.push('  MODE CRT       : Switch to MS-DOS CRT Terminal mode.');
        newOutputs.push('  COLOR GREEN    : Set phosphor green display palette.');
        newOutputs.push('  COLOR AMBER    : Set amber amber display palette.');
        newOutputs.push('  CLS / CLEAR    : Clear screen buffer.');
        newOutputs.push('  VER            : Display kernel version and build info.');
        newOutputs.push('  ABOUT          : Display engineer & software credits.');
        newOutputs.push('----------------------------------------------------------------');
        break;
      }

      case 'CLS':
      case 'CLEAR': {
        setTerminalOutput([]);
        setInputVal('');
        return;
      }

      case 'COLOR': {
        const colorArg = args.toUpperCase();
        if (colorArg === 'GREEN') {
          setTheme('dos-green');
          newOutputs.push('CRT Palette switched to Phosphor Green (P1 Phosphor).');
        } else if (colorArg === 'AMBER') {
          setTheme('dos-amber');
          newOutputs.push('CRT Palette switched to Amber (P4 Phosphor).');
        } else {
          newOutputs.push('Unknown color. Options: COLOR GREEN, COLOR AMBER');
        }
        break;
      }

      case 'MODE': {
        const modeArg = args.toUpperCase();
        if (modeArg === 'PAPER') {
          onSwitchToPaper();
          newOutputs.push('Switching display to Continuous Tractor-Feed Dot-Matrix Paper...');
        } else if (modeArg === 'CRT') {
          setTheme('dos-green');
          newOutputs.push('Switching display to MS-DOS CRT Terminal...');
        } else {
          newOutputs.push('Unknown mode. Options: MODE PAPER, MODE CRT');
        }
        break;
      }

      case 'REPORT':
      case 'AUDIT': {
        if (!report) {
          newOutputs.push('No scan data available. Run "SCAN <url>" first.');
        } else {
          newOutputs.push(`================================================================`);
          newOutputs.push(`AUDIT SUMMARY FOR: ${report.targetUrl}`);
          newOutputs.push(`OVERALL SCORE: ${report.stats.score}/100  [GRADE: ${report.stats.grade}]`);
          newOutputs.push(`FINDINGS: ${report.stats.criticalCount} CRITICAL | ${report.stats.highCount} HIGH | ${report.stats.mediumCount} MED | ${report.stats.lowCount} LOW | ${report.stats.passCount} PASS`);
          newOutputs.push(`================================================================`);
          report.headerChecks.forEach((h) => {
            newOutputs.push(`  [ ${h.status.padEnd(4)} ] ${h.headerName.padEnd(28)} : ${h.value ? h.value.slice(0, 32) : 'NOT CONFIGURED'}`);
          });
          newOutputs.push(`================================================================`);
          newOutputs.push(`Run "MODE PAPER" to open formatted 24-pin Dot-Matrix Paper view.`);
        }
        break;
      }

      case 'REMEDY': {
        if (!report) {
          newOutputs.push('No scan data available. Run "SCAN <url>" first.');
        } else {
          newOutputs.push('=== NGINX SECURITY HEADERS SNIPPET ===');
          report.remediationSnippet.nginx.split('\n').forEach((line) => newOutputs.push(line));
        }
        break;
      }

      case 'VER': {
        newOutputs.push('VAPT-99 Cyber-Defense Security Engine v4.12.0 (x86_64-dos)');
        newOutputs.push('Compiled on Next.js 14 App Router + Node.js TLS/DNS Subsystem');
        break;
      }

      case 'ABOUT':
      case 'DEV':
      case 'DEVELOPER': {
        newOutputs.push('================================================================');
        newOutputs.push('LEAD ARCHITECT & DEVELOPER : Santanu Batabyal');
        newOutputs.push('ROLE                       : Principal AppSec & Full-Stack Engineer');
        newOutputs.push('SYSTEM                     : VAPT-99 & API Security Testing Evaluator');
        newOutputs.push('STACK                      : Next.js 14 (App Router) / TypeScript / Node.js');
        newOutputs.push('STANDARDS                  : OWASP Top 10 (2023) / RFC Security Guidelines');
        newOutputs.push('Open dedicated developer page at: /about');
        newOutputs.push('================================================================');
        break;
      }

      default: {
        newOutputs.push(`Bad command or file name: "${command}". Type HELP for assistance.`);
        retroSound.playWarningAlert();
      }
    }

    setTerminalOutput((prev) => [...prev, ...newOutputs]);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIndex + 1 < history.length ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  // Generate ASCII progress bar blocks
  const getAsciiBar = (percent: number) => {
    const totalBlocks = 24;
    const filledBlocks = Math.round((percent / 100) * totalBlocks);
    const emptyBlocks = totalBlocks - filledBlocks;
    return `[${'█'.repeat(filledBlocks)}${'-'.repeat(emptyBlocks)}] ${percent}%`;
  };

  return (
    <div className={`crt-scanlines ${isAmber ? 'crt-amber' : ''} p-2 sm:p-4 max-w-7xl mx-auto space-y-4`}>
      {/* Quick Interactive Target Entry Bar */}
      <div
        className={`p-3 rounded-lg border flex flex-wrap items-center justify-between gap-3 font-mono text-xs ${
          isAmber
            ? 'bg-[#151000] border-[#664600] text-[#ffb000]'
            : 'bg-[#0a120a] border-[#1f4d1f] text-[#33ff33]'
        }`}
      >
        <div className="flex items-center gap-2 flex-1 min-w-[240px]">
          <Globe className="w-4 h-4 shrink-0" />
          <span className="font-bold shrink-0">TARGET URL:</span>
          <input
            type="text"
            value={quickUrl}
            onChange={(e) => setQuickUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && quickUrl.trim() && !isScanning) {
                onStartScan(quickUrl.trim());
              }
            }}
            placeholder="https://example.com"
            disabled={isScanning}
            className={`flex-1 px-2.5 py-1.5 rounded border outline-none font-mono text-xs ${
              isAmber
                ? 'bg-[#261900] border-[#664600] text-[#ffb000] focus:border-[#ffb000]'
                : 'bg-[#081008] border-[#1f4d1f] text-[#33ff33] focus:border-[#33ff33]'
            }`}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (quickUrl.trim() && !isScanning) {
                onStartScan(quickUrl.trim());
              }
            }}
            disabled={isScanning || !quickUrl.trim()}
            className={`px-4 py-1.5 font-bold rounded border flex items-center gap-1.5 transition-all shadow-md ${
              isAmber
                ? 'border-[#ffb000] bg-[#ffb000] text-[#151000] hover:bg-[#cca000]'
                : 'border-[#33ff33] bg-[#33ff33] text-[#080e08] hover:bg-[#2bd92b]'
            } disabled:opacity-50`}
          >
            {isScanning ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>SCANNING ({scanProgress}%)</span>
              </>
            ) : (
              <>
                <Search className="w-3.5 h-3.5" />
                <span>START VAPT SCAN</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Live Scan HUD Progress Widget (Visible during & right after scan) */}
      {isScanning && (
        <div
          className={`p-3.5 rounded-lg border font-mono text-xs space-y-2 animate-pulse ${
            isAmber
              ? 'bg-[#201400] border-[#ffb000] text-[#ffb000]'
              : 'bg-[#0a1a0a] border-[#33ff33] text-[#33ff33]'
          }`}
        >
          <div className="flex flex-wrap items-center justify-between font-bold">
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>PASSIVE AUDIT IN PROGRESS: {scanPhase}</span>
            </span>
            <span>{scanProgress}% COMPLETED</span>
          </div>

          <div className="text-sm font-extrabold tracking-wider">
            {getAsciiBar(scanProgress)}
          </div>
        </div>
      )}

      {/* Outer CRT Bezel */}
      <div
        className={`crt-container relative rounded-xl p-4 sm:p-6 min-h-[580px] flex flex-col justify-between overflow-hidden ${
          isAmber ? 'bg-[#0f0b00] text-[#ffb000]' : 'bg-[#080e08] text-[#33ff33]'
        }`}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Terminal Header Bar */}
        <div
          className={`flex flex-wrap items-center justify-between border-b pb-3 mb-3 text-xs font-mono select-none ${
            isAmber ? 'border-[#664600]' : 'border-[#1f4d1f]'
          }`}
        >
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
            <span className="font-bold tracking-wider">MS-DOS PROMPT [VAPT-99.EXE]</span>
          </div>

          <div className="flex items-center gap-3">
            <span>MEM: 640K</span>
            <span>PORT: 3010</span>
            {report && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSwitchToPaper();
                }}
                className={`px-2.5 py-0.5 border text-xs font-bold transition-all flex items-center gap-1.5 shadow ${
                  isAmber
                    ? 'border-[#ffb000] bg-[#ffb000] text-[#151000]'
                    : 'border-[#33ff33] bg-[#33ff33] text-[#080e08]'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>VIEW DOT-MATRIX REPORT &gt;&gt;</span>
              </button>
            )}
          </div>
        </div>

        {/* Output Console Buffer */}
        <div className="flex-1 space-y-1 text-xs sm:text-sm font-mono overflow-y-auto max-h-[440px] pr-2">
          {terminalOutput.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap break-all leading-relaxed">
              {line}
            </div>
          ))}

          {/* Persistent Scan Stream Logs */}
          {logs.length > 0 && (
            <div className="my-2 border-y border-dashed py-2 space-y-1">
              <div className="text-xs opacity-75 font-bold">--- ACTIVE PROBE LOG STREAM ---</div>
              {logs.map((logLine, lIdx) => (
                <div key={lIdx} className="text-xs sm:text-sm font-mono">
                  {logLine}
                </div>
              ))}
            </div>
          )}

          {/* Formatted Full In-Terminal Scorecard & Headers Table */}
          {report && !isScanning && (
            <div
              className={`my-3 p-3.5 border font-mono text-xs sm:text-sm space-y-2 ${
                isAmber ? 'border-[#ffb000] bg-[#ffb000]/5' : 'border-[#33ff33] bg-[#33ff33]/5'
              }`}
            >
              <div className="font-bold text-center">
                +========================================================================+
              </div>
              <div className="font-extrabold flex justify-between px-2 text-sm sm:text-base">
                <span>VAPT AUDIT SCORE: {report.stats.score} / 100</span>
                <span>LETTER GRADE: [ {report.stats.grade} ]</span>
              </div>
              <div className="font-bold text-center">
                +========================================================================+
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 px-1 text-xs">
                <div>&bull; TARGET: {report.targetUrl}</div>
                <div>&bull; RESOLVED IP: {report.resolvedIp}</div>
                <div>&bull; SSL/TLS: {report.sslCheck.valid ? 'VALID CERTIFICATE' : 'UNENCRYPTED / EXPIRED'}</div>
                <div>&bull; DURATION: {report.durationMs}ms</div>
              </div>

              <div className="font-bold pt-1 border-t border-dashed border-current">
                SEVERITY MATRIX: {report.stats.criticalCount} CRITICAL | {report.stats.highCount} HIGH | {report.stats.mediumCount} MED | {report.stats.lowCount} LOW | {report.stats.passCount} PASS
              </div>

              {/* In-Terminal Headers Summary */}
              <div className="pt-2">
                <div className="font-bold text-xs underline mb-1">HTTP SECURITY HEADERS BREAKDOWN:</div>
                <div className="space-y-0.5 text-xs">
                  {report.headerChecks.map((h, i) => (
                    <div key={i} className="flex justify-between gap-2">
                      <span>[{h.status.padEnd(4)}] {h.headerName.padEnd(28)}</span>
                      <span className="truncate max-w-[200px] opacity-80">{h.value || 'MISSING'}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Link to Dot Matrix Paper View */}
              <div className="pt-3 border-t border-current flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs">Continuous 24-pin printer report is ready:</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSwitchToPaper();
                  }}
                  className={`px-3 py-1 font-bold rounded border text-xs flex items-center gap-1 transition-all ${
                    isAmber
                      ? 'border-[#ffb000] bg-[#ffb000] text-[#151000] hover:bg-[#cca000]'
                      : 'border-[#33ff33] bg-[#33ff33] text-[#080e08] hover:bg-[#2bd92b]'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>OPEN TRACTOR-FEED PAPER REPORT &gt;&gt;</span>
                </button>
              </div>
            </div>
          )}

          <div ref={terminalEndRef} />
        </div>

        {/* Command Line Input Prompt */}
        <div
          className={`mt-3 pt-3 border-t flex items-center gap-2 text-xs sm:text-sm font-mono ${
            isAmber ? 'border-[#664600]' : 'border-[#1f4d1f]'
          }`}
        >
          <span className="font-bold select-none">C:\VAPT99&gt;</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isScanning}
            className="flex-1 bg-transparent outline-none border-none font-mono text-inherit selection:bg-current selection:text-black"
            placeholder="Type 'SCAN <url>' or any command..."
          />
          <button
            onClick={() => handleCommand(inputVal)}
            disabled={isScanning || !inputVal.trim()}
            className={`px-3 py-1 font-bold text-xs flex items-center gap-1 border transition-all ${
              isAmber
                ? 'border-[#ffb000] bg-[#ffb000] text-[#151000] hover:bg-[#cca000]'
                : 'border-[#33ff33] bg-[#33ff33] text-[#080e08] hover:bg-[#2bd92b]'
            } disabled:opacity-50`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>EXEC</span>
          </button>
        </div>
      </div>
    </div>
  );
};

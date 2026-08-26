'use client';

import React, { useState, useMemo } from 'react';
import { executeRegexAnalysis, RegexMatchItem } from '@/utils/formatters';
import {
  Code,
  Copy,
  Check,
  Trash2,
  Download,
  Search,
  BookOpen,
  Sparkles,
  Zap,
  Clock,
  List,
  AlertTriangle,
  HelpCircle,
} from 'lucide-react';

const REGEX_TEMPLATES = [
  {
    name: 'Email Validation (RFC 5322 Compliant)',
    pattern: '([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})',
    flags: 'gm',
    sample: `Contact list:\nsantanu@alltools.dev\nsupport@google.com\ninvalid-email@\nlead.architect@company.co.in`,
  },
  {
    name: 'IPv4 Address Extraction',
    pattern: '\\b(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)(?:\\.(?:25[0-5]|2[0-4]\\d|[01]?\\d\\d?)){3}\\b',
    flags: 'gm',
    sample: `Server routing table:\nGateway: 192.168.1.1\nDNS: 8.8.8.8 and 1.1.1.1\nLocal: 127.0.0.1\nInvalid: 999.300.20.1`,
  },
  {
    name: 'Semantic Versioning (SemVer)',
    pattern: 'v?(0|[1-9]\\d*)\\.(0|[1-9]\\d*)\\.(0|[1-9]\\d*)(?:-((?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\\.(?:0|[1-9]\\d*|\\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\\+([0-9a-zA-Z-]+(?:\\.[0-9a-zA-Z-]+)*))?',
    flags: 'gm',
    sample: `Release tags:\nv1.0.0\nv2.4.12-alpha.1\n3.0.0-beta+exp.sha.5114f85\n0.9.4`,
  },
  {
    name: 'ISO 8601 Datetime',
    pattern: '(\\d{4}-\\d{2}-\\d{2})T(\\d{2}:\\d{2}:\\d{2})(?:\\.(\\d+))?Z?',
    flags: 'gm',
    sample: `Audit timestamps:\n2026-08-25T19:30:00Z\n2026-10-09T06:15:32.450Z\n2024-01-01T00:00:00`,
  },
  {
    name: 'URL Slug Validation',
    pattern: '^[a-z0-9]+(?:-[a-z0-9]+)*$',
    flags: 'gm',
    sample: `alltools-developer-suite\nvapt-security-scanner\n123-valid-slug\nInvalid_Slug_With_Underscore`,
  },
  {
    name: 'JWT Token Structure',
    pattern: '([a-zA-Z0-9_-]+)\\.([a-zA-Z0-9_-]+)\\.([a-zA-Z0-9_-]+)',
    flags: 'gm',
    sample: `Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IlNhbnRhbnUiLCJpYXQiOjE1MTYyMzkwMjJ9.4z94eC4oU95h_q8k4q79sZ90yZ5Fk9gq01h_3`,
  },
];

const CHEAT_SHEET = [
  { syntax: '\\d', meaning: 'Any digit [0-9]' },
  { syntax: '\\w', meaning: 'Word character [a-zA-Z0-9_]' },
  { syntax: '\\s', meaning: 'Whitespace (space, tab, newline)' },
  { syntax: '.', meaning: 'Any character except newline' },
  { syntax: '^', meaning: 'Start of string or line' },
  { syntax: '$', meaning: 'End of string or line' },
  { syntax: '+', meaning: '1 or more occurrences' },
  { syntax: '*', meaning: '0 or more occurrences' },
  { syntax: '?', meaning: '0 or 1 occurrence (or lazy quantifier)' },
  { syntax: '{n,m}', meaning: 'Between n and m times' },
  { syntax: '(...)', meaning: 'Capturing group' },
  { syntax: '(?:...)', meaning: 'Non-capturing group' },
  { syntax: '(?=...)', meaning: 'Positive lookahead' },
  { syntax: '(?!...)', meaning: 'Negative lookahead' },
];

export const RegexTool: React.FC = () => {
  const [pattern, setPattern] = useState(REGEX_TEMPLATES[0].pattern);
  const [testString, setTestString] = useState(REGEX_TEMPLATES[0].sample);
  const [flags, setFlags] = useState({
    g: true,
    i: true,
    m: true,
    s: false,
  });
  const [activeTab, setActiveTab] = useState<'matches' | 'cheatsheet'>('matches');
  const [copied, setCopied] = useState(false);

  const activeFlagsString = useMemo(() => {
    let f = '';
    if (flags.g) f += 'g';
    if (flags.i) f += 'i';
    if (flags.m) f += 'm';
    if (flags.s) f += 's';
    return f;
  }, [flags]);

  const analysisResult = useMemo(() => {
    return executeRegexAnalysis(pattern, activeFlagsString, testString);
  }, [pattern, activeFlagsString, testString]);

  const toggleFlag = (flagKey: 'g' | 'i' | 'm' | 's') => {
    setFlags((prev) => ({ ...prev, [flagKey]: !prev[flagKey] }));
  };

  const handleSelectTemplate = (templateName: string) => {
    const tmpl = REGEX_TEMPLATES.find((t) => t.name === templateName);
    if (tmpl) {
      setPattern(tmpl.pattern);
      setTestString(tmpl.sample);
      setFlags({
        g: tmpl.flags.includes('g'),
        i: tmpl.flags.includes('i'),
        m: tmpl.flags.includes('m'),
        s: tmpl.flags.includes('s'),
      });
    }
  };

  const handleCopyMatches = () => {
    if (!analysisResult.matches.length) return;
    const text = analysisResult.matches.map((m, i) => `Match #${i + 1} [${m.index}]: ${m.match}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    const outputData = {
      pattern,
      flags: activeFlagsString,
      totalMatches: analysisResult.matches.length,
      executionTimeMs: analysisResult.executionTimeMs,
      matches: analysisResult.matches,
      testString,
    };
    const blob = new Blob([JSON.stringify(outputData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `regex_analysis_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Inline highlighted overlay renderer
  const renderHighlightedText = () => {
    if (!analysisResult.isValid || !analysisResult.matches.length || !testString) {
      return <span>{testString}</span>;
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    analysisResult.matches.forEach((m, idx) => {
      // Add text before match
      if (m.index > lastIndex) {
        elements.push(<span key={`text-${idx}`}>{testString.slice(lastIndex, m.index)}</span>);
      }

      // Add highlighted match
      elements.push(
        <mark
          key={`match-${idx}`}
          className="bg-[#00f0ff]/25 text-[#00f0ff] font-bold border-b border-[#00f0ff] px-0.5 rounded"
          title={`Match #${idx + 1} (Index: ${m.index})`}
        >
          {m.match}
        </mark>
      );

      lastIndex = m.index + m.length;
    });

    // Add remaining text
    if (lastIndex < testString.length) {
      elements.push(<span key="tail">{testString.slice(lastIndex)}</span>);
    }

    return elements;
  };

  return (
    <div className="space-y-4">
      {/* Top Regex Control Toolbar */}
      <div className="bg-[#111622] border border-white/10 rounded-2xl p-4 space-y-3 shadow-lg">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Template Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-slate-400">Template:</span>
            <select
              onChange={(e) => handleSelectTemplate(e.target.value)}
              className="bg-[#0a0d14] border border-white/10 text-slate-200 rounded-xl px-3 py-1.5 text-xs font-mono focus:outline-none"
            >
              {REGEX_TEMPLATES.map((t) => (
                <option key={t.name} value={t.name}>
                  {t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setPattern('');
                setTestString('');
              }}
              className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
            <button
              onClick={handleCopyMatches}
              disabled={!analysisResult.matches.length}
              className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono flex items-center gap-1 transition-all disabled:opacity-40"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Matches'}</span>
            </button>
            <button
              onClick={handleExport}
              className="px-3 py-1.5 rounded-xl border border-[#00f0ff]/40 bg-[#00f0ff]/10 hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono font-bold flex items-center gap-1 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Pattern Input with Flag Toggles */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 relative flex items-center bg-[#0a0d14] border border-white/10 rounded-xl px-3 py-1">
            <span className="text-[#00f0ff] font-mono font-bold text-sm select-none pr-1">/</span>
            <input
              type="text"
              value={pattern}
              onChange={(e) => setPattern(e.target.value)}
              placeholder="Enter regular expression pattern..."
              className="w-full bg-transparent font-mono text-xs text-slate-200 focus:outline-none py-1.5 selection:bg-[#00f0ff]/30"
              spellCheck={false}
            />
            <span className="text-[#00f0ff] font-mono font-bold text-sm select-none pl-1">/</span>
          </div>

          {/* Flag Toggle Pills */}
          <div className="flex items-center rounded-xl bg-[#0a0d14] p-1 border border-white/10 text-xs font-mono">
            {(['g', 'i', 'm', 's'] as const).map((f) => (
              <button
                key={f}
                onClick={() => toggleFlag(f)}
                title={`Toggle flag: ${f}`}
                className={`px-2.5 py-1 rounded-lg transition-all ${
                  flags[f] ? 'bg-[#00f0ff]/20 text-[#00f0ff] font-bold border border-[#00f0ff]/40' : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Error Alert */}
        {!analysisResult.isValid && analysisResult.error && (
          <div className="p-3 rounded-xl border border-rose-500/40 bg-rose-500/10 text-rose-300 flex items-center gap-2 text-xs font-mono">
            <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0" />
            <span>Regex Compilation Error: {analysisResult.error}</span>
          </div>
        )}
      </div>

      {/* Telemetry Statistics Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[#111622] border border-white/10 rounded-xl p-3.5 font-mono">
          <div className="text-[10px] uppercase text-slate-400">Total Matches</div>
          <div className="text-xl font-bold text-[#00f0ff]">{analysisResult.matches.length}</div>
        </div>
        <div className="bg-[#111622] border border-white/10 rounded-xl p-3.5 font-mono">
          <div className="text-[10px] uppercase text-slate-400">Execution Time</div>
          <div className="text-xl font-bold text-emerald-400">{analysisResult.executionTimeMs} ms</div>
        </div>
        <div className="bg-[#111622] border border-white/10 rounded-xl p-3.5 font-mono">
          <div className="text-[10px] uppercase text-slate-400">Active Flags</div>
          <div className="text-xl font-bold text-purple-400">/{activeFlagsString || '-'}</div>
        </div>
        <div className="bg-[#111622] border border-white/10 rounded-xl p-3.5 font-mono">
          <div className="text-[10px] uppercase text-slate-400">Backtrack Guard</div>
          <div className="text-xl font-bold text-amber-300">5,000 Cap</div>
        </div>
      </div>

      {/* Test String & Inline Highlighting Split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Test String Input Area */}
        <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl">
          <div className="px-4 py-2.5 border-b border-white/10 bg-[#0a0d14] flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold text-slate-200 flex items-center gap-2">
              <Code className="w-3.5 h-3.5 text-[#00f0ff]" />
              Test String Buffer
            </span>
            <span>{testString.length} chars</span>
          </div>
          <textarea
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
            placeholder="Paste or type test string here..."
            className="w-full h-64 p-4 bg-[#0a0d14]/70 font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-[#00f0ff]/30"
            spellCheck={false}
          />
        </div>

        {/* Live Highlighted Overlay Area */}
        <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl">
          <div className="px-4 py-2.5 border-b border-white/10 bg-[#0a0d14] flex items-center justify-between text-xs font-mono text-slate-400">
            <span className="font-bold text-slate-200 flex items-center gap-2">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              Live Visual Match Highlighting
            </span>
            <span>{analysisResult.matches.length} matches detected</span>
          </div>
          <div className="w-full h-64 p-4 bg-[#0a0d14]/70 font-mono text-xs text-slate-300 overflow-y-auto whitespace-pre-wrap leading-relaxed">
            {renderHighlightedText()}
          </div>
        </div>
      </div>

      {/* Matches Table & Cheat Sheet Tabs */}
      <div className="bg-[#111622] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('matches')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'matches' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Capture Groups & Match Table ({analysisResult.matches.length})</span>
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
                activeTab === 'cheatsheet' ? 'bg-[#f72585]/15 text-[#f72585] border border-[#f72585]/40' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Regex Cheat Sheet</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Matches Table */}
        {activeTab === 'matches' && (
          <div>
            {analysisResult.matches.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left font-mono text-xs">
                  <thead className="border-b border-white/10 bg-white/5 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">#</th>
                      <th className="py-2.5 px-3">Index</th>
                      <th className="py-2.5 px-3">Matched Value</th>
                      <th className="py-2.5 px-3">Capture Groups ($1, $2...)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {analysisResult.matches.map((m, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-2 px-3 text-slate-400">{idx + 1}</td>
                        <td className="py-2 px-3 text-purple-400 font-bold">{m.index}</td>
                        <td className="py-2 px-3 text-[#00f0ff] font-bold break-all">{m.match}</td>
                        <td className="py-2 px-3">
                          {m.groups.length > 0 ? (
                            <div className="flex flex-wrap gap-1">
                              {m.groups.map((grp, gIdx) => (
                                <span
                                  key={gIdx}
                                  className="px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-[10px]"
                                >
                                  ${gIdx + 1}: {grp}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-slate-500 text-[11px]">No groups</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500 text-xs font-mono">
                No matching substrings found. Enter a pattern or select a template above.
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Regex Cheat Sheet */}
        {activeTab === 'cheatsheet' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {CHEAT_SHEET.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl border border-white/10 bg-[#0a0d14] flex items-center justify-between font-mono text-xs"
              >
                <code className="text-[#00f0ff] font-bold bg-[#00f0ff]/10 px-1.5 py-0.5 rounded border border-[#00f0ff]/20">
                  {item.syntax}
                </code>
                <span className="text-slate-300 text-[11px]">{item.meaning}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

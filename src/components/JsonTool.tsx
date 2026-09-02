'use client';

import React, { useState, useMemo } from 'react';
import { parseAndFormatJson, convertTextDescriptionToJson } from '@/utils/formatters';
import {
  FileCode,
  Copy,
  Check,
  Trash2,
  Download,
  FolderPlus,
  ChevronRight,
  ChevronDown,
  Sparkles,
  AlertTriangle,
  FileJson,
  Layers,
  ArrowRight,
  Code2,
} from 'lucide-react';

const SAMPLE_JSON = `{
  "projectName": "AllToolss Developer Suite",
  "version": "2.4.0",
  "leadArchitect": "Santanu Batabyal",
  "location": "Bankura, West Bengal",
  "features": [
    "100% In-Server Execution",
    "Zero 3rd-Party API Dependencies",
    "Client-Side Privacy Enforced"
  ],
  "securityPolicies": {
    "ssrfDefense": true,
    "rateLimiting": true,
    "jwtClientDecode": true
  },
  "metrics": {
    "totalTools": 4,
    "latencyMs": 1.25,
    "status": "OPERATIONAL"
  }
}`;

const SAMPLE_DESCRIPTION = `name: Santanu Batabyal, role: Lead Application Security Architect, location: Bankura, active: true, clearanceLevel: 5, primaryLanguages: TypeScript, Python, C++`;

export const JsonTool: React.FC = () => {
  const [inputVal, setInputVal] = useState(SAMPLE_JSON);
  const [indentOption, setIndentOption] = useState<number | 'min'>(2);
  const [activeTab, setActiveTab] = useState<'editor' | 'tree' | 'text2json'>('editor');
  const [descriptionInput, setDescriptionInput] = useState(SAMPLE_DESCRIPTION);
  const [copied, setCopied] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({ root: true });

  // Parse JSON
  const parseResult = useMemo(() => {
    return parseAndFormatJson(inputVal, indentOption);
  }, [inputVal, indentOption]);

  const outputFormatted = parseResult.isValid ? parseResult.formatted || '' : '';

  const inputStats = useMemo(() => {
    return {
      chars: inputVal.length,
      lines: inputVal ? inputVal.split('\n').length : 0,
      bytes: new Blob([inputVal]).size,
    };
  }, [inputVal]);

  const outputStats = useMemo(() => {
    return {
      chars: outputFormatted.length,
      lines: outputFormatted ? outputFormatted.split('\n').length : 0,
      bytes: new Blob([outputFormatted]).size,
    };
  }, [outputFormatted]);

  const handleCopy = (text: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputVal('');
    setDescriptionInput('');
  };

  const handleLoadSample = () => {
    setInputVal(SAMPLE_JSON);
    setDescriptionInput(SAMPLE_DESCRIPTION);
  };

  const handleExport = () => {
    const textToExport = outputFormatted || inputVal;
    if (!textToExport) return;
    const blob = new Blob([textToExport], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `formatted_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleConvertDescription = () => {
    const res = convertTextDescriptionToJson(descriptionInput);
    if (res.success && res.jsonString) {
      setInputVal(res.jsonString);
      setActiveTab('editor');
    } else {
      alert(res.error || 'Could not parse description.');
    }
  };

  const toggleNode = (nodePath: string) => {
    setExpandedNodes((prev) => ({ ...prev, [nodePath]: !prev[nodePath] }));
  };

  // Interactive Tree View Node Renderer
  const renderTreeNode = (data: any, path = 'root', keyName?: string): React.ReactNode => {
    const isObject = data !== null && typeof data === 'object';
    const isArray = Array.isArray(data);
    const isExpanded = expandedNodes[path] ?? true;

    if (!isObject) {
      let valColor = 'text-emerald-400';
      if (typeof data === 'string') valColor = 'text-amber-300';
      if (typeof data === 'boolean') valColor = 'text-purple-400';
      if (data === null) valColor = 'text-rose-400';

      return (
        <div key={path} className="pl-4 py-0.5 font-mono text-xs flex items-center gap-1.5 hover:bg-white/5 rounded">
          {keyName !== undefined && <span className="text-cyan-400 font-semibold">"{keyName}":</span>}
          <span className={`${valColor} font-mono break-all`}>
            {typeof data === 'string' ? `"${data}"` : String(data)}
          </span>
        </div>
      );
    }

    const keys = Object.keys(data);
    const summary = isArray ? `Array(${keys.length})` : `Object {${keys.length}}`;

    return (
      <div key={path} className="pl-3 py-0.5 font-mono text-xs">
        <div
          onClick={() => toggleNode(path)}
          className="flex items-center gap-1.5 cursor-pointer hover:bg-white/5 py-0.5 px-1 rounded select-none text-slate-300"
        >
          {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
          {keyName !== undefined && <span className="text-cyan-400 font-bold">"{keyName}":</span>}
          <span className="text-slate-400 text-[11px] font-sans">
            {isArray ? '[' : '{'} <span className="opacity-60">{summary}</span> {isArray ? ']' : '}'}
          </span>
        </div>

        {isExpanded && (
          <div className="border-l border-white/10 ml-2 pl-1 space-y-0.5">
            {keys.map((k) => renderTreeNode(data[k], `${path}.${k}`, isArray ? undefined : k))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Top Action Toolbar */}
      <div className="bg-[#111622] border border-white/10 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-lg">
        {/* Sub-Tabs */}
        <div className="flex items-center gap-1 p-1 bg-[#0a0d14] rounded-xl border border-white/10">
          <button
            onClick={() => setActiveTab('editor')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'editor' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <FileJson className="w-3.5 h-3.5" />
            <span>Split Editor</span>
          </button>
          <button
            onClick={() => setActiveTab('tree')}
            disabled={!parseResult.isValid}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'tree' ? 'bg-[#00f0ff]/15 text-[#00f0ff] border border-[#00f0ff]/40 shadow-sm' : 'text-slate-400 hover:text-white disabled:opacity-40'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Visual Tree View</span>
          </button>
          <button
            onClick={() => setActiveTab('text2json')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'text2json' ? 'bg-[#f72585]/15 text-[#f72585] border border-[#f72585]/40 shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Text to JSON</span>
          </button>
        </div>

        {/* Formatting Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {activeTab === 'editor' && (
            <div className="flex items-center rounded-xl bg-[#0a0d14] p-1 border border-white/10 text-xs font-mono">
              <button
                onClick={() => setIndentOption(2)}
                className={`px-2.5 py-1 rounded-lg transition-all ${indentOption === 2 ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                2 Spaces
              </button>
              <button
                onClick={() => setIndentOption(4)}
                className={`px-2.5 py-1 rounded-lg transition-all ${indentOption === 4 ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                4 Spaces
              </button>
              <button
                onClick={() => setIndentOption('min')}
                className={`px-2.5 py-1 rounded-lg transition-all ${indentOption === 'min' ? 'bg-white/10 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
              >
                Minify
              </button>
            </div>
          )}

          {/* Quick Buttons */}
          <button
            onClick={handleLoadSample}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-[#222b40] text-slate-300 text-xs font-mono transition-all"
          >
            Sample
          </button>
          <button
            onClick={handleClear}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-rose-500/20 text-rose-300 text-xs font-mono flex items-center gap-1 transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
          <button
            onClick={() => handleCopy(outputFormatted || inputVal)}
            className="px-3 py-1.5 rounded-xl border border-white/10 bg-[#1a2030] hover:bg-[#00f0ff]/20 text-[#00f0ff] text-xs font-mono flex items-center gap-1 transition-all"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
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

      {/* Syntax Error Callout */}
      {!parseResult.isValid && parseResult.error && activeTab === 'editor' && (
        <div className="p-4 rounded-2xl border border-rose-500/40 bg-rose-500/10 text-rose-300 flex items-start gap-3 animate-in fade-in">
          <AlertTriangle className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs font-mono">
            <div className="font-bold text-sm text-rose-200">Invalid JSON Syntax Detected</div>
            <div>{parseResult.error.message}</div>
            {parseResult.error.line !== undefined && (
              <div className="opacity-80">
                Location: Line <span className="font-bold text-white">{parseResult.error.line}</span>, Column <span className="font-bold text-white">{parseResult.error.column}</span> (Char Offset: {parseResult.error.position || 0})
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW MODE 1: Split Editor */}
      {activeTab === 'editor' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Input Editor */}
          <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="px-4 py-2.5 border-b border-white/10 bg-[#0a0d14] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 font-bold text-slate-200">
                <FileCode className="w-3.5 h-3.5 text-[#00f0ff]" />
                Raw JSON Input
              </span>
              <span>{inputStats.lines} lines • {inputStats.chars} chars • {inputStats.bytes} B</span>
            </div>
            <textarea
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Paste raw unformatted or invalid JSON here..."
              className="w-full h-96 p-4 bg-[#0a0d14]/70 font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed selection:bg-[#00f0ff]/30"
              spellCheck={false}
            />
          </div>

          {/* Formatted Output */}
          <div className="bg-[#111622] border border-white/10 rounded-2xl overflow-hidden flex flex-col shadow-xl">
            <div className="px-4 py-2.5 border-b border-white/10 bg-[#0a0d14] flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2 font-bold text-slate-200">
                <Code2 className="w-3.5 h-3.5 text-emerald-400" />
                Formatted & Validated Output
              </span>
              <span>{outputStats.lines} lines • {outputStats.chars} chars • {outputStats.bytes} B</span>
            </div>
            <textarea
              readOnly
              value={outputFormatted}
              placeholder="Formatted output will appear here automatically..."
              className="w-full h-96 p-4 bg-[#0a0d14]/70 font-mono text-xs text-emerald-300 focus:outline-none resize-none leading-relaxed selection:bg-emerald-500/30"
              spellCheck={false}
            />
          </div>
        </div>
      )}

      {/* VIEW MODE 2: Visual Tree View */}
      {activeTab === 'tree' && (
        <div className="bg-[#111622] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
            <span className="font-bold text-slate-200 flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#00f0ff]" />
              Interactive Object Tree
            </span>
            <span className="text-slate-400">Click any key to collapse or expand nodes</span>
          </div>

          {parseResult.isValid ? (
            <div className="p-4 bg-[#0a0d14] rounded-xl border border-white/10 max-h-[500px] overflow-y-auto">
              {renderTreeNode(parseResult.parsed)}
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 text-xs font-mono">
              Please enter valid JSON in the split editor to explore the tree hierarchy.
            </div>
          )}
        </div>
      )}

      {/* VIEW MODE 3: Text / Description to JSON */}
      {activeTab === 'text2json' && (
        <div className="bg-[#111622] border border-white/10 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-200 font-mono flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#f72585]" />
              Structure Description to JSON Generator
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Paste human-readable key-value pairs (e.g. <code className="text-[#f72585]">name: Santanu, role: Admin, active: true</code>) or CSV text to convert to JSON instantly in-browser.
            </p>
          </div>

          <textarea
            value={descriptionInput}
            onChange={(e) => setDescriptionInput(e.target.value)}
            rows={6}
            placeholder="e.g. name: John Doe, email: john@example.com, role: Dev, isLead: true"
            className="w-full p-4 bg-[#0a0d14] border border-white/10 rounded-xl font-mono text-xs text-slate-200 focus:outline-none resize-none leading-relaxed"
          />

          <div className="flex justify-end">
            <button
              onClick={handleConvertDescription}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#f72585] to-[#7209b7] text-white font-mono text-xs font-bold flex items-center gap-2 hover:opacity-90 transition-all shadow-lg"
            >
              <span>Convert to Clean JSON</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

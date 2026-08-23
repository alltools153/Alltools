'use client';

import React, { useState } from 'react';
import { OwaspApiItem } from '@/types/evaluator';
import {
  CheckSquare,
  Square,
  ShieldCheck,
  AlertTriangle,
  Code,
  Copy,
  Check,
  Search,
  Filter,
  RefreshCw,
  Download,
  ChevronDown,
  ChevronUp,
  FileCheck,
  Terminal,
  ShieldAlert,
} from 'lucide-react';

interface OwaspChecklistProps {
  items: OwaspApiItem[];
}

export const OwaspChecklist: React.FC<OwaspChecklistProps> = ({ items }) => {
  // State for checked items: item.id -> array of checked checklist indexes
  const [checkedState, setCheckedState] = useState<Record<string, number[]>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState<'ALL' | 'CRITICAL' | 'HIGH' | 'MEDIUM'>('ALL');
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'API1:2023': true,
    'API2:2023': true,
  });
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Toggle individual checklist item
  const toggleChecklistItem = (itemId: string, checkIndex: number) => {
    setCheckedState((prev) => {
      const current = prev[itemId] || [];
      const updated = current.includes(checkIndex)
        ? current.filter((idx) => idx !== checkIndex)
        : [...current, checkIndex];
      return { ...prev, [itemId]: updated };
    });
  };

  // Toggle card expansion
  const toggleExpand = (id: string) => {
    setExpandedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Calculate total verification vectors checked
  const totalVectorsCount = items.reduce((acc, item) => acc + item.auditChecklist.length, 0);
  const checkedVectorsCount = Object.values(checkedState).reduce(
    (acc, arr) => acc + arr.length,
    0
  );
  const coveragePercent = totalVectorsCount > 0 ? Math.round((checkedVectorsCount / totalVectorsCount) * 100) : 0;

  // Mark all passed / Reset
  const handleMarkAllPassed = () => {
    const allChecked: Record<string, number[]> = {};
    items.forEach((item) => {
      allChecked[item.id] = item.auditChecklist.map((_, idx) => idx);
    });
    setCheckedState(allChecked);
  };

  const handleResetChecklist = () => {
    setCheckedState({});
  };

  // Copy code helper
  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Export audit report CSV
  const handleExportReport = () => {
    let csv = 'OWASP ID,Title,Severity,Total Checks,Completed Checks,Status,Expected Defensive Response\n';
    items.forEach((item) => {
      const total = item.auditChecklist.length;
      const completed = checkedState[item.id]?.length || 0;
      const status = completed === total ? 'FULLY AUDITED' : completed > 0 ? 'PARTIAL' : 'NOT STARTED';
      csv += `"${item.id}","${item.title}","${item.severity}",${total},${completed},"${status}","${item.expectedStatus}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'OWASP_API_Top_10_Audit_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter items
  const filteredItems = items.filter((item) => {
    const matchesSeverity = severityFilter === 'ALL' || item.severity === severityFilter;
    const matchesSearch =
      searchQuery.trim() === '' ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.attackScenario.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSeverity && matchesSearch;
  });

  const getSeverityBadge = (severity: 'CRITICAL' | 'HIGH' | 'MEDIUM') => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-500/10 text-red-400 border-red-500/30';
      case 'HIGH':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/30';
      case 'MEDIUM':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Verification Progress Meter */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 backdrop-blur-sm shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                OWASP API Security Top 10 (2023 Edition) Verification Checklist
              </h2>
              <p className="text-xs text-slate-400">
                Interactive auditing vectors, test payloads, expected secure HTTP responses, and defensive code snippets.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleMarkAllPassed}
              className="px-3 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 hover:bg-emerald-500/20 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all"
            >
              <CheckSquare className="w-3.5 h-3.5" />
              <span>Mark All Audited</span>
            </button>
            <button
              onClick={handleResetChecklist}
              className="px-3 py-1.5 rounded-lg border border-slate-700 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
            <button
              onClick={handleExportReport}
              className="px-3.5 py-1.5 rounded-lg border border-cyan-500/30 bg-cyan-600/20 hover:bg-cyan-600/30 text-xs font-semibold text-cyan-300 flex items-center gap-1.5 transition-all shadow-md"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Audit CSV</span>
            </button>
          </div>
        </div>

        {/* Real-Time Coverage Progress Bar */}
        <div className="bg-slate-950/60 p-4 rounded-lg border border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-slate-300 font-bold flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-400" />
              <span>VERIFICATION COVERAGE PROGRESS</span>
            </span>
            <span className="font-bold text-emerald-400">
              {checkedVectorsCount} / {totalVectorsCount} Vectors Audited ({coveragePercent}%)
            </span>
          </div>

          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-slate-700/60">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-cyan-500 to-indigo-500 transition-all duration-300 rounded-full shadow-sm"
              style={{ width: `${coveragePercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-xs">
        <div className="flex items-center gap-2 flex-1 min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search API vulnerability, attack vector, payload keyword..."
            className="w-full bg-slate-950 border border-slate-800 rounded px-3 py-1.5 text-slate-200 outline-none focus:border-emerald-500 text-xs font-mono"
          />
        </div>

        <div className="flex items-center gap-1.5 font-mono">
          <span className="text-slate-400 text-[11px] uppercase mr-1">Severity:</span>
          {(['ALL', 'CRITICAL', 'HIGH', 'MEDIUM'] as const).map((sev) => (
            <button
              key={sev}
              onClick={() => setSeverityFilter(sev)}
              className={`px-2.5 py-1 rounded text-[11px] font-bold transition-all ${
                severityFilter === sev
                  ? 'bg-slate-700 text-white shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 bg-slate-950/60'
              }`}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      {/* Main List of OWASP Items */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = !!expandedItems[item.id];
          const itemChecked = checkedState[item.id] || [];
          const isCompleted = itemChecked.length === item.auditChecklist.length;

          return (
            <div
              key={item.id}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isCompleted
                  ? 'bg-slate-900/90 border-emerald-500/40 shadow-sm'
                  : 'bg-slate-900/70 border-slate-800'
              }`}
            >
              {/* Accordion Header */}
              <div
                onClick={() => toggleExpand(item.id)}
                className="p-4 cursor-pointer flex flex-wrap items-center justify-between gap-3 select-none hover:bg-slate-800/40 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-sm text-emerald-400 shrink-0">
                    {item.id}
                  </span>
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border uppercase ${getSeverityBadge(
                      item.severity
                    )}`}
                  >
                    {item.severity}
                  </span>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs">
                  <span
                    className={`px-2.5 py-0.5 rounded text-[11px] font-semibold ${
                      isCompleted
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : itemChecked.length > 0
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {itemChecked.length} / {item.auditChecklist.length} Verified
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </div>
              </div>

              {/* Accordion Body */}
              {isExpanded && (
                <div className="p-5 pt-0 border-t border-slate-800/80 space-y-4 text-xs">
                  {/* Description & Attack Scenario */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1.5">
                      <div className="font-bold text-slate-300 uppercase text-[11px] font-mono">
                        Vulnerability Overview:
                      </div>
                      <p className="text-slate-300 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80 space-y-1.5">
                      <div className="font-bold text-orange-400 uppercase text-[11px] font-mono flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Real-World Attack Scenario:</span>
                      </div>
                      <p className="text-slate-300 leading-relaxed">{item.attackScenario}</p>
                    </div>
                  </div>

                  {/* Verification Vectors Checklist */}
                  <div className="space-y-2">
                    <div className="font-bold text-slate-200 uppercase text-[11px] font-mono tracking-wider">
                      Interactive Verification Checklist:
                    </div>
                    <div className="space-y-1.5">
                      {item.auditChecklist.map((checkText, idx) => {
                        const isChecked = itemChecked.includes(idx);

                        return (
                          <div
                            key={idx}
                            onClick={() => toggleChecklistItem(item.id, idx)}
                            className={`flex items-start gap-2.5 p-2.5 rounded-lg border cursor-pointer transition-all ${
                              isChecked
                                ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-300'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0 text-emerald-400">
                              {isChecked ? (
                                <CheckSquare className="w-4 h-4" />
                              ) : (
                                <Square className="w-4 h-4 text-slate-600" />
                              )}
                            </div>
                            <span className="leading-relaxed">{checkText}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Sample Test Payload & Expected Status */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="font-bold text-cyan-400 uppercase text-[11px] font-mono flex items-center gap-1.5">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Sample Audit Test Payload:</span>
                      </div>
                      <button
                        onClick={() => handleCopy(`payload_${item.id}`, item.testPayload)}
                        className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 flex items-center gap-1 border border-slate-700"
                      >
                        {copiedId === `payload_${item.id}` ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copied</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Payload</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 overflow-x-auto">
                      <pre>{item.testPayload}</pre>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-slate-400 uppercase">Expected Secure Status:</span>
                      <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                        {item.expectedStatus}
                      </span>
                    </div>
                  </div>

                  {/* Remediation & Code Snippet */}
                  {item.remediationCode && (
                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-indigo-400 uppercase text-[11px] font-mono flex items-center gap-1.5">
                          <Code className="w-3.5 h-3.5" />
                          <span>Defensive Code Implementation ({item.remediationCode.language}):</span>
                        </div>
                        <button
                          onClick={() =>
                            handleCopy(`code_${item.id}`, item.remediationCode!.snippet)
                          }
                          className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 flex items-center gap-1 border border-slate-700"
                        >
                          {copiedId === `code_${item.id}` ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-400" />
                              <span className="text-emerald-400">Copied</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3 h-3" />
                              <span>Copy Code</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-indigo-200 overflow-x-auto">
                        <pre>{item.remediationCode.snippet}</pre>
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono italic">
                        {item.remediationCode.description}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

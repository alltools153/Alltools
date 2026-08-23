'use client';

import React, { useState } from 'react';
import { BurpTestingTopic } from '@/types/evaluator';
import {
  Terminal,
  Cpu,
  BookOpen,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Shield,
  Layers,
  ChevronRight,
  Code2,
  Wrench,
  AlertTriangle,
} from 'lucide-react';

interface BurpPlaybookProps {
  topics: BurpTestingTopic[];
}

export const BurpPlaybook: React.FC<BurpPlaybookProps> = ({ topics }) => {
  const [selectedTopicId, setSelectedTopicId] = useState<string>(topics[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<'all' | 'manual-pro' | 'automated-enterprise'>('all');

  const filteredTopics = topics.filter((t) => {
    if (filterCategory === 'all') return true;
    return t.category === filterCategory;
  });

  const selectedTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];

  const handleCopyCode = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Overview Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm shadow-xl">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-orange-500/10 text-orange-400 border border-orange-500/20 rounded-lg">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-white tracking-wide flex items-center gap-2">
              Burp Suite API Pentesting Playbook & Automation Hub
            </h2>
            <p className="text-xs text-slate-400">
              End-to-end operational guide for manual logic probing (Pro) and automated CI/CD pipeline scanning (Enterprise).
            </p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-950 rounded-lg border border-slate-800">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              filterCategory === 'all'
                ? 'bg-orange-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Workflows ({topics.length})
          </button>
          <button
            onClick={() => setFilterCategory('manual-pro')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              filterCategory === 'manual-pro'
                ? 'bg-orange-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Manual Pentesting (Pro)
          </button>
          <button
            onClick={() => setFilterCategory('automated-enterprise')}
            className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${
              filterCategory === 'automated-enterprise'
                ? 'bg-orange-500 text-slate-950 shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            CI/CD Automation (Enterprise)
          </button>
        </div>
      </div>

      {/* Main Dual-Pane Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Navigation Sidebar */}
        <div className="lg:col-span-4 space-y-2">
          {filteredTopics.map((topic) => {
            const isSelected = selectedTopicId === topic.id;

            return (
              <div
                key={topic.id}
                onClick={() => setSelectedTopicId(topic.id)}
                className={`cursor-pointer rounded-xl border p-3.5 transition-all duration-200 relative ${
                  isSelected
                    ? 'bg-slate-800/90 border-orange-500 shadow-md shadow-orange-500/10 ring-1 ring-orange-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span
                    className={`text-[10px] font-mono uppercase font-bold px-2 py-0.5 rounded ${
                      topic.category === 'manual-pro'
                        ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                        : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                    }`}
                  >
                    {topic.category === 'manual-pro' ? 'BURP PRO' : 'ENTERPRISE CI/CD'}
                  </span>
                  {topic.extensionRequired && (
                    <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                      <Wrench className="w-3 h-3 text-orange-400" />
                      <span>BApp</span>
                    </span>
                  )}
                </div>

                <h4 className="font-bold text-white text-xs mb-1 line-clamp-1">{topic.title}</h4>
                <p className="text-[11px] text-slate-400 line-clamp-2">{topic.summary}</p>
              </div>
            );
          })}
        </div>

        {/* Right Detail Guide Panel */}
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-6 shadow-xl space-y-6">
          {selectedTopic && (
            <>
              {/* Header Title */}
              <div className="space-y-2 pb-4 border-b border-slate-800">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-xs font-mono uppercase font-bold px-2.5 py-0.5 rounded border ${
                      selectedTopic.category === 'manual-pro'
                        ? 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30'
                        : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30'
                    }`}
                  >
                    {selectedTopic.category === 'manual-pro'
                      ? 'BURP SUITE PROFESSIONAL WORKFLOW'
                      : 'BURP SUITE ENTERPRISE CI/CD PIPELINE'}
                  </span>

                  {selectedTopic.extensionRequired && (
                    <div className="text-xs font-mono text-orange-300 bg-orange-500/10 px-2.5 py-0.5 rounded border border-orange-500/30 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-orange-400" />
                      <span>Required BApp: {selectedTopic.extensionRequired}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl font-black text-white">{selectedTopic.title}</h3>
                <div className="text-xs text-emerald-400 font-mono flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Target Vulnerability: {selectedTopic.targetVulnerability}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">{selectedTopic.summary}</p>
              </div>

              {/* Step-by-Step Pentesting Procedure */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-orange-400" />
                  <span>Step-by-Step Execution Procedure</span>
                </h4>

                <div className="space-y-2.5">
                  {selectedTopic.stepByStep.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="flex items-start gap-3 p-3 rounded-lg bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
                    >
                      <span className="w-5 h-5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 font-mono font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                        {sIdx + 1}
                      </span>
                      <p className="leading-relaxed">{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Code / Configuration Snippet */}
              {selectedTopic.configurationSnippet && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-200 uppercase font-mono tracking-wider flex items-center gap-1.5">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>{selectedTopic.configurationSnippet.title}</span>
                    </h4>

                    <button
                      onClick={() =>
                        handleCopyCode(
                          selectedTopic.id,
                          selectedTopic.configurationSnippet!.code
                        )
                      }
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-[11px] font-mono text-slate-300 flex items-center gap-1 border border-slate-700 transition-colors"
                    >
                      {copiedId === selectedTopic.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span className="text-emerald-400 font-bold">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy Payload / Config</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 overflow-x-auto font-mono text-xs text-slate-200 leading-relaxed">
                    <pre>{selectedTopic.configurationSnippet.code}</pre>
                  </div>
                </div>
              )}

              {/* Pro Tips & Best Practices */}
              <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-400 text-xs uppercase font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Principal AppSec Engineer Tips:</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-300">
                  {selectedTopic.proTips.map((tip, tIdx) => (
                    <li key={tIdx} className="flex items-start gap-2">
                      <span className="text-emerald-400 font-bold shrink-0">&rarr;</span>
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

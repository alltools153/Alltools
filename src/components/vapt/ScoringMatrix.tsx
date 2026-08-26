'use client';

import React, { useState } from 'react';
import { EvaluationPillar, ToolProfile } from '@/types/evaluator';
import {
  Sliders,
  Award,
  Download,
  Info,
  Layers,
  Sparkles,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  ExternalLink,
  ShieldAlert,
  GitBranch,
  CheckCircle2,
  Server,
  Users,
} from 'lucide-react';

interface ScoringMatrixProps {
  pillars: EvaluationPillar[];
  tools: ToolProfile[];
}

export const ScoringMatrix: React.FC<ScoringMatrixProps> = ({ pillars, tools }) => {
  // State for interactive tool scores
  const [toolScores, setToolScores] = useState<Record<string, Record<string, number>>>(() => {
    const initial: Record<string, Record<string, number>> = {};
    tools.forEach((t) => {
      initial[t.id] = { ...t.scores };
    });
    return initial;
  });

  // State for pillar weights
  const [weights, setWeights] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    pillars.forEach((p) => {
      initial[p.id] = p.weight;
    });
    return initial;
  });

  const [selectedToolId, setSelectedToolId] = useState<string | null>(tools[0]?.id || null);
  const [expandedPillars, setExpandedPillars] = useState<Record<string, boolean>>({});

  const togglePillarExpand = (id: string) => {
    setExpandedPillars((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleScoreChange = (toolId: string, pillarId: string, value: number) => {
    const clamped = Math.max(1, Math.min(10, value));
    setToolScores((prev) => ({
      ...prev,
      [toolId]: {
        ...prev[toolId],
        [pillarId]: clamped,
      },
    }));
  };

  const handleWeightChange = (pillarId: string, value: number) => {
    const clamped = Math.max(0.05, Math.min(0.5, value));
    setWeights((prev) => ({
      ...prev,
      [pillarId]: clamped,
    }));
  };

  const handleResetDefaults = () => {
    const defaultScores: Record<string, Record<string, number>> = {};
    tools.forEach((t) => {
      defaultScores[t.id] = { ...t.scores };
    });
    setToolScores(defaultScores);

    const defaultWeights: Record<string, number> = {};
    pillars.forEach((p) => {
      defaultWeights[p.id] = p.weight;
    });
    setWeights(defaultWeights);
  };

  // Calculate weighted total score for a tool (normalized out of 10 and scaled to 100)
  const calculateTotalScore = (toolId: string) => {
    const scores = toolScores[toolId] || {};
    let totalWeightedScore = 0;
    let totalWeight = 0;

    pillars.forEach((p) => {
      const w = weights[p.id] || p.weight;
      const s = scores[p.id] !== undefined ? scores[p.id] : 5;
      totalWeightedScore += s * w;
      totalWeight += w;
    });

    const normalizedOutOf10 = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
    const scoreOutOf100 = Math.round(normalizedOutOf10 * 10 * 10) / 10;
    return { normalizedOutOf10: Math.round(normalizedOutOf10 * 10) / 10, scoreOutOf100 };
  };

  // Sort tools by calculated score
  const sortedTools = [...tools].sort((a, b) => {
    return calculateTotalScore(b.id).scoreOutOf100 - calculateTotalScore(a.id).scoreOutOf100;
  });

  const selectedTool = tools.find((t) => t.id === selectedToolId) || tools[0];

  // Export CSV Handler
  const handleExportCsv = () => {
    let csv = 'Rank,Tool Name,Vendor,Type,Overall Score (100),Normalized (10),';
    csv += pillars.map((p) => `"${p.name} (${Math.round((weights[p.id] || p.weight) * 100)}%)"`).join(',');
    csv += '\n';

    sortedTools.forEach((tool, index) => {
      const { scoreOutOf100, normalizedOutOf10 } = calculateTotalScore(tool.id);
      csv += `${index + 1},"${tool.name}","${tool.vendor}","${tool.type}",${scoreOutOf100},${normalizedOutOf10},`;
      csv += pillars.map((p) => toolScores[tool.id]?.[p.id] || 0).join(',');
      csv += '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'API_Security_Testing_Tool_Evaluation.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getPillarIcon = (name: string) => {
    switch (name) {
      case 'ShieldAlert':
        return <ShieldAlert className="w-4 h-4 text-emerald-400" />;
      case 'GitBranch':
        return <GitBranch className="w-4 h-4 text-cyan-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-4 h-4 text-indigo-400" />;
      case 'Server':
        return <Server className="w-4 h-4 text-amber-400" />;
      default:
        return <Users className="w-4 h-4 text-purple-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Quick Actions */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4 backdrop-blur-sm shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-lg">
              <Award className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg font-bold text-white tracking-wide">
                5-Pillar Weighted API Security Evaluation Matrix
              </h2>
              <p className="text-xs text-slate-400">
                Adjust criteria weights and per-pillar capability ratings to calculate tailored composite scores.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleResetDefaults}
            className="px-3.5 py-1.5 rounded-lg border border-slate-700 bg-slate-800/80 hover:bg-slate-700 text-xs font-medium text-slate-300 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Weights</span>
          </button>

          <button
            onClick={handleExportCsv}
            className="px-4 py-1.5 rounded-lg border border-emerald-500/30 bg-emerald-600/20 hover:bg-emerald-600/30 text-xs font-semibold text-emerald-300 flex items-center gap-1.5 transition-all shadow-md"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Leaderboard Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sortedTools.map((tool, idx) => {
          const { scoreOutOf100, normalizedOutOf10 } = calculateTotalScore(tool.id);
          const isSelected = selectedToolId === tool.id;

          return (
            <div
              key={tool.id}
              onClick={() => setSelectedToolId(tool.id)}
              className={`cursor-pointer rounded-xl border p-4 transition-all duration-200 relative overflow-hidden ${
                isSelected
                  ? 'bg-slate-800/90 border-emerald-500 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500/50'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-800/50'
              }`}
            >
              {idx === 0 && (
                <div className="absolute top-0 right-0 bg-emerald-500 text-slate-950 font-bold text-[10px] uppercase px-2.5 py-0.5 rounded-bl-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>TOP RANKED</span>
                </div>
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-slate-400">RANK #{idx + 1}</span>
                <span className="text-[11px] px-2 py-0.5 rounded-full border border-slate-700 bg-slate-800 text-slate-300">
                  {tool.type}
                </span>
              </div>

              <h3 className="font-bold text-white text-sm line-clamp-1 mb-1">{tool.name}</h3>
              <p className="text-xs text-slate-400 mb-3 line-clamp-2">{tool.tagline}</p>

              <div className="pt-2 border-t border-slate-800 flex items-end justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                    Weighted Posture
                  </div>
                  <div className="text-2xl font-extrabold text-emerald-400 font-mono">
                    {scoreOutOf100}
                    <span className="text-xs text-slate-400 font-normal"> / 100</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono text-slate-300 bg-slate-800/80 px-2 py-1 rounded border border-slate-700">
                    {normalizedOutOf10} / 10
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Interactive Matrix Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Interactive Scoring Grid & Weight Sliders
            </h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">
            Total Active Weight: {Math.round(Object.values(weights).reduce((a, b) => a + b, 0) * 100)}%
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400 uppercase tracking-wider font-mono text-[11px]">
                <th className="p-3.5 min-w-[260px]">Evaluation Pillar & Weight</th>
                {tools.map((t) => (
                  <th key={t.id} className="p-3.5 text-center min-w-[140px]">
                    <div className="font-bold text-slate-200">{t.name.split(' ')[0]}</div>
                    <div className="text-[10px] text-slate-400 font-normal">{t.vendor}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {pillars.map((pillar) => {
                const currentWeight = weights[pillar.id] !== undefined ? weights[pillar.id] : pillar.weight;
                const isExpanded = !!expandedPillars[pillar.id];

                return (
                  <React.Fragment key={pillar.id}>
                    <tr className="hover:bg-slate-800/30 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-start gap-2.5">
                          <div className="p-1.5 bg-slate-800 border border-slate-700 rounded-md shrink-0 mt-0.5">
                            {getPillarIcon(pillar.iconName)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-xs">{pillar.name}</span>
                              <button
                                onClick={() => togglePillarExpand(pillar.id)}
                                className="text-slate-400 hover:text-slate-200 p-0.5"
                                title="Toggle criteria checklist"
                              >
                                {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <p className="text-[11px] text-slate-400 line-clamp-1 mb-2">
                              {pillar.description}
                            </p>

                            {/* Weight Slider */}
                            <div className="flex items-center gap-2 bg-slate-950/50 p-1.5 rounded border border-slate-800/80 max-w-[220px]">
                              <span className="text-[10px] font-mono text-slate-400">Weight:</span>
                              <input
                                type="range"
                                min="0.05"
                                max="0.5"
                                step="0.05"
                                value={currentWeight}
                                onChange={(e) => handleWeightChange(pillar.id, parseFloat(e.target.value))}
                                className="w-20 accent-emerald-500 h-1.5 bg-slate-700 rounded cursor-pointer"
                              />
                              <span className="text-[10px] font-mono font-bold text-emerald-400">
                                {Math.round(currentWeight * 100)}%
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      {tools.map((tool) => {
                        const currentScore =
                          toolScores[tool.id]?.[pillar.id] !== undefined
                            ? toolScores[tool.id][pillar.id]
                            : 5;

                        return (
                          <td key={tool.id} className="p-3.5 text-center align-middle">
                            <div className="inline-flex flex-col items-center gap-1">
                              <div className="flex items-center gap-1.5">
                                <input
                                  type="number"
                                  min="1"
                                  max="10"
                                  step="0.1"
                                  value={currentScore}
                                  onChange={(e) =>
                                    handleScoreChange(tool.id, pillar.id, parseFloat(e.target.value))
                                  }
                                  className="w-14 px-2 py-1 rounded bg-slate-950 border border-slate-700 text-center font-mono font-bold text-slate-200 text-xs focus:border-emerald-500 outline-none"
                                />
                                <span className="text-[10px] text-slate-400">/10</span>
                              </div>
                              <input
                                type="range"
                                min="1"
                                max="10"
                                step="0.1"
                                value={currentScore}
                                onChange={(e) =>
                                  handleScoreChange(tool.id, pillar.id, parseFloat(e.target.value))
                                }
                                className="w-20 accent-cyan-500 h-1 bg-slate-800 rounded cursor-pointer"
                              />
                            </div>
                          </td>
                        );
                      })}
                    </tr>

                    {/* Expandable Criteria Checklist */}
                    {isExpanded && (
                      <tr className="bg-slate-950/70 border-b border-slate-800/80">
                        <td colSpan={tools.length + 1} className="p-3.5 pl-12 text-xs">
                          <div className="font-semibold text-slate-300 mb-1.5 uppercase text-[10px] tracking-wider font-mono">
                            Scoring Benchmark Criteria:
                          </div>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5 text-slate-400 text-xs">
                            {pillar.criteria.map((crit, cIdx) => (
                              <li key={cIdx} className="flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                                <span>{crit}</span>
                              </li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
            <tfoot>
              <tr className="bg-slate-950 border-t-2 border-slate-700 font-bold text-white text-xs">
                <td className="p-3.5 font-mono uppercase tracking-wider">
                  Weighted Total Score (0-100)
                </td>
                {tools.map((tool) => {
                  const { scoreOutOf100 } = calculateTotalScore(tool.id);
                  return (
                    <td key={tool.id} className="p-3.5 text-center font-mono text-base text-emerald-400">
                      {scoreOutOf100}
                    </td>
                  );
                })}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Selected Tool Profile Deep-Dive Dossier */}
      {selectedTool && (
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-xl space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 text-[11px] font-bold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  {selectedTool.type}
                </span>
                <span className="text-xs font-mono text-slate-400">VENDOR: {selectedTool.vendor}</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">{selectedTool.name}</h3>
              <p className="text-xs text-slate-400">{selectedTool.tagline}</p>
            </div>

            <div className="text-right font-mono bg-slate-950 p-3 rounded-lg border border-slate-800">
              <div className="text-[10px] text-slate-400 uppercase">Composite Score</div>
              <div className="text-2xl font-black text-emerald-400">
                {calculateTotalScore(selectedTool.id).scoreOutOf100}
                <span className="text-xs text-slate-400 font-normal"> / 100</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* Key Strengths */}
            <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800/80 space-y-2">
              <div className="font-bold text-emerald-400 uppercase text-[11px] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Key Architectural Strengths</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {selectedTool.keyStrengths.map((str, sIdx) => (
                  <li key={sIdx} className="flex items-start gap-1.5">
                    <span className="text-emerald-400 font-bold shrink-0">&bull;</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Limitations & Considerations */}
            <div className="bg-slate-950/60 rounded-lg p-3.5 border border-slate-800/80 space-y-2">
              <div className="font-bold text-amber-400 uppercase text-[11px] flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" />
                <span>Trade-offs & Constraints</span>
              </div>
              <ul className="space-y-1.5 text-slate-300">
                {selectedTool.limitations.map((lim, lIdx) => (
                  <li key={lIdx} className="flex items-start gap-1.5">
                    <span className="text-amber-400 font-bold shrink-0">&bull;</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-2">
            <div className="bg-slate-950/40 p-3 rounded border border-slate-800/60">
              <div className="font-bold text-slate-400 mb-1 text-[10px] uppercase font-mono">
                Deployment Models
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedTool.deploymentModels.map((d, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[11px]">
                    {d}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/40 p-3 rounded border border-slate-800/60">
              <div className="font-bold text-slate-400 mb-1 text-[10px] uppercase font-mono">
                Supported Protocols
              </div>
              <div className="flex flex-wrap gap-1">
                {selectedTool.supportedProtocols.map((p, i) => (
                  <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-cyan-300 text-[11px]">
                    {p}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-slate-950/40 p-3 rounded border border-slate-800/60">
              <div className="font-bold text-slate-400 mb-1 text-[10px] uppercase font-mono">
                Best Suited For
              </div>
              <p className="text-slate-300 text-xs">{selectedTool.bestSuitedFor}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

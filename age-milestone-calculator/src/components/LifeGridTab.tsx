'use client';

import React, { useState } from 'react';
import { LifeGridStats } from '../types';
import { Grid3X3, Sparkles, Clock, Heart, Award, Compass, Info } from 'lucide-react';

interface LifeGridTabProps {
  stats: LifeGridStats;
  birthYear: number;
}

export const LifeGridTab: React.FC<LifeGridTabProps> = ({ stats, birthYear }) => {
  const [hoveredWeek, setHoveredWeek] = useState<number | null>(null);

  const years = Array.from({ length: stats.lifeExpectancyYears }, (_, i) => i);
  const weeksPerRow = 52;

  const getStageColor = (yearIndex: number, isLived: boolean) => {
    if (!isLived) return 'bg-slate-800/40 border-slate-700/50 hover:bg-slate-700';

    if (yearIndex < 5) return 'bg-pink-500 hover:bg-pink-400';
    if (yearIndex < 18) return 'bg-purple-500 hover:bg-purple-400';
    if (yearIndex < 25) return 'bg-indigo-500 hover:bg-indigo-400';
    if (yearIndex < 50) return 'bg-cyan-500 hover:bg-cyan-400';
    if (yearIndex < 65) return 'bg-emerald-500 hover:bg-emerald-400';
    return 'bg-amber-500 hover:bg-amber-400';
  };

  const stagesLegend = [
    { label: 'Early Childhood (0-4)', color: 'bg-pink-500' },
    { label: 'School Years (5-17)', color: 'bg-purple-500' },
    { label: 'Higher Ed & Exploration (18-24)', color: 'bg-indigo-500' },
    { label: 'Career & Prime (25-49)', color: 'bg-cyan-500' },
    { label: 'Mastery & Leadership (50-64)', color: 'bg-emerald-500' },
    { label: 'Wisdom & Retirement (65-90)', color: 'bg-amber-500' },
    { label: 'Future Weeks Unlived', color: 'bg-slate-800 border border-slate-700' },
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
              <Grid3X3 className="w-3.5 h-3.5" /> Memento Mori Life Grid
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Your Entire Life Visualized in 4,680 Weeks
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Each small square represents one single week of your 90-year journey. Every week is precious.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 shadow-lg">
            <div className="text-right">
              <span className="text-xs text-slate-400 font-semibold block">Current Life Stage</span>
              <span className="text-sm sm:text-base font-bold text-indigo-300">
                {stats.currentStage}
              </span>
            </div>
          </div>
        </div>

        {/* Big Counter Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-800">
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-emerald-400 font-semibold">Weeks Lived</span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-1">
              {stats.weeksLived.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400">{stats.percentLived}% of 90 years</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-cyan-400 font-semibold">Weeks Remaining</span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-1">
              {stats.weeksRemaining.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400">Potential weeks ahead</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-purple-400 font-semibold">Total Grid Weeks</span>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white mt-1">
              {stats.totalWeeks.toLocaleString()}
            </div>
            <span className="text-[11px] text-slate-400">52 weeks x 90 years</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
            <span className="text-xs text-pink-400 font-semibold">Hovered Info</span>
            <div className="font-mono text-base sm:text-lg font-bold text-slate-200 mt-1">
              {hoveredWeek !== null ? (
                <>
                  Week #{hoveredWeek + 1}
                  <span className="text-xs font-normal text-slate-400 block">
                    Age ~{Math.floor(hoveredWeek / 52)} (Year {birthYear + Math.floor(hoveredWeek / 52)})
                  </span>
                </>
              ) : (
                <span className="text-xs text-slate-500 font-normal">Hover any box below</span>
              )}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2 flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-indigo-400" /> Stages:
          </span>
          {stagesLegend.map((s, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
              <span className={`w-3 h-3 rounded-sm ${s.color} inline-block shadow-sm`} />
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* The 90-Year Life in Weeks Grid */}
      <div className="glass-card rounded-3xl p-6 border border-slate-800 overflow-x-auto">
        <div className="min-w-[680px]">
          {/* Header Row: Week numbers */}
          <div className="flex items-center gap-1 text-[10px] font-mono text-slate-500 mb-2 pl-12">
            <span className="w-1/4">Week 1</span>
            <span className="w-1/4 text-center">Week 13 (Q1)</span>
            <span className="w-1/4 text-center">Week 26 (Mid)</span>
            <span className="w-1/4 text-right pr-2">Week 52 (End)</span>
          </div>

          <div className="space-y-1">
            {years.map((yearIdx) => {
              const currentAgeInThisRow = yearIdx;
              const calendarYear = birthYear + yearIdx;

              return (
                <div key={yearIdx} className="flex items-center gap-2">
                  {/* Year & Age label on Left */}
                  <div className="w-10 text-[10px] font-mono text-slate-400 text-right shrink-0">
                    {yearIdx % 5 === 0 ? (
                      <span className="font-bold text-indigo-400">{yearIdx}y</span>
                    ) : (
                      <span className="text-slate-600">{yearIdx}</span>
                    )}
                  </div>

                  {/* 52 Week squares */}
                  <div className="flex items-center gap-0.5 flex-1">
                    {Array.from({ length: weeksPerRow }, (_, weekIdx) => {
                      const absoluteWeekNumber = yearIdx * 52 + weekIdx;
                      const isLived = absoluteWeekNumber < stats.weeksLived;
                      const isCurrent = absoluteWeekNumber === stats.weeksLived;

                      return (
                        <div
                          key={weekIdx}
                          onMouseEnter={() => setHoveredWeek(absoluteWeekNumber)}
                          onMouseLeave={() => setHoveredWeek(null)}
                          className={`w-2.5 h-2.5 rounded-[2px] transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-white ring-2 ring-indigo-400 ring-offset-1 ring-offset-slate-900 scale-125 z-10 animate-pulse'
                              : getStageColor(yearIdx, isLived)
                          }`}
                          title={`Year ${calendarYear}, Age ${yearIdx}, Week ${weekIdx + 1} (${
                            isLived ? 'Lived' : 'Future'
                          })`}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

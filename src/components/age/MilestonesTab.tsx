'use client';

import React, { useState } from 'react';
import { MilestoneItem } from '../types';
import { 
  Trophy, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  Sparkles, 
  PartyPopper,
  Baby,
  Key,
  Award,
  Brain,
  Flame,
  Zap,
  Crown,
  Gem,
  Sun,
  Compass,
  Star,
  Medal
} from 'lucide-react';

interface MilestonesTabProps {
  milestones: MilestoneItem[];
  onCelebrate: () => void;
}

export const MilestonesTab: React.FC<MilestonesTabProps> = ({ milestones, onCelebrate }) => {
  const [filter, setFilter] = useState<'all' | 'age' | 'days' | 'seconds'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'reached' | 'upcoming'>('all');

  const filteredMilestones = milestones.filter((m) => {
    if (filter !== 'all' && m.category !== filter) return false;
    if (statusFilter === 'reached' && !m.reached) return false;
    if (statusFilter === 'upcoming' && m.reached) return false;
    return true;
  });

  const reachedCount = milestones.filter((m) => m.reached).length;
  const totalCount = milestones.length;
  const progressPercent = Math.round((reachedCount / totalCount) * 100);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Baby': return <Baby className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Key': return <Key className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'PartyPopper': return <PartyPopper className="w-5 h-5" />;
      case 'Brain': return <Brain className="w-5 h-5" />;
      case 'Flame': return <Flame className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Crown': return <Crown className="w-5 h-5" />;
      case 'Gem': return <Gem className="w-5 h-5" />;
      case 'Sun': return <Sun className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Trophy': return <Trophy className="w-5 h-5" />;
      case 'Star': return <Star className="w-5 h-5" />;
      case 'Medal': return <Medal className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header & Overall Milestone Progress */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
              <Trophy className="w-3.5 h-3.5" /> Life Milestones Tracker
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Significant Life & Time Milestones
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Celebrate unlocked achievements from your first 1,000 days to your 1 Billionth second!
            </p>
          </div>

          {/* Quick Counter */}
          <div className="flex items-center gap-4 bg-slate-900/80 px-5 py-3 rounded-2xl border border-slate-800 shadow-lg">
            <div className="text-right">
              <div className="text-2xl font-black text-white font-mono">
                {reachedCount} / {totalCount}
              </div>
              <div className="text-[11px] text-slate-400 font-semibold">Unlocked ({progressPercent}%)</div>
            </div>
            <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-yellow-600 text-white shadow-md">
              <Trophy className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6">
          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Filter Controls */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'All Milestones' },
              { id: 'age', label: 'Age Birthdays' },
              { id: 'days', label: '1000s of Days' },
              { id: 'seconds', label: 'Billion Seconds' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                  filter === tab.id
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: 'Show All' },
              { id: 'reached', label: 'Reached' },
              { id: 'upcoming', label: 'Upcoming' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  statusFilter === tab.id
                    ? 'bg-purple-600/30 text-purple-300 border border-purple-500/40 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMilestones.map((m) => (
          <div
            key={m.id}
            className={`glass-card glass-card-hover rounded-3xl p-5 border relative overflow-hidden transition-all flex flex-col justify-between ${
              m.reached
                ? 'border-emerald-500/30 bg-gradient-to-b from-slate-900/90 to-emerald-950/10'
                : 'border-slate-800 opacity-90'
            }`}
          >
            <div>
              {/* Card Header: Icon, Badge, Reached Status */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`p-2.5 rounded-2xl ${
                      m.reached
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                    }`}
                  >
                    {getIcon(m.icon || "star")}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-800/80 text-slate-300 border border-slate-700">
                    {m.badge}
                  </span>
                </div>

                {m.reached ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Reached
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
                    <Clock className="w-3.5 h-3.5" /> in {m.daysRemaining?.toLocaleString()} days
                  </span>
                )}
              </div>

              {/* Title & Description */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-1">{m.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">{m.description}</p>
            </div>

            {/* Footer: Target Date */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                {m.targetDate.toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>

              {m.reached ? (
                <button
                  onClick={onCelebrate}
                  className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 hover:underline"
                >
                  <PartyPopper className="w-3 h-3" /> Celebrate
                </button>
              ) : (
                <span className="text-[11px] text-indigo-300 font-medium">Upcoming Goal</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

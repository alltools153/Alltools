'use client';

import React, { useState } from 'react';
import { calculateDateDifference } from '../utils/calculator';
import { Users, Calendar, ArrowRight, Sparkles, Scale, Clock, Heart } from 'lucide-react';

export const ComparisonTab: React.FC = () => {
  const [person1Name, setPerson1Name] = useState('Alex');
  const [person1Date, setPerson1Date] = useState('1995-04-12');
  const [person2Name, setPerson2Name] = useState('Sam');
  const [person2Date, setPerson2Date] = useState('1998-08-25');

  const diffResult = React.useMemo(() => {
    try {
      const d1 = new Date(person1Date);
      const d2 = new Date(person2Date);
      if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
      return calculateDateDifference(d1, d2);
    } catch {
      return null;
    }
  }, [person1Date, person2Date]);

  const p1 = new Date(person1Date);
  const p2 = new Date(person2Date);
  const isP1Older = p1.getTime() < p2.getTime();

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 text-xs font-semibold mb-3">
          <Scale className="w-3.5 h-3.5" /> Two-Person Age & Relationship Comparison
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Compare Ages & Discover the Double Age Day
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          Compare the exact age difference between partners, siblings, friends, or parents, and find the exact day when one person was or will be twice as old as the other.
        </p>
      </div>

      {/* Input Pickers for Two Persons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Person 1 */}
        <div className="glass-card rounded-3xl p-6 border border-indigo-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
              Person 1 Profile
            </span>
            <div className="w-3 h-3 rounded-full bg-indigo-500" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Name / Label</label>
              <input
                type="text"
                value={person1Name}
                onChange={(e) => setPerson1Name(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
                placeholder="e.g. Alex"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Date of Birth</label>
              <input
                type="date"
                value={person1Date}
                onChange={(e) => setPerson1Date(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Person 2 */}
        <div className="glass-card rounded-3xl p-6 border border-pink-500/30">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-400">
              Person 2 Profile
            </span>
            <div className="w-3 h-3 rounded-full bg-pink-500" />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Name / Label</label>
              <input
                type="text"
                value={person2Name}
                onChange={(e) => setPerson2Name(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
                placeholder="e.g. Sam"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1 font-semibold">Date of Birth</label>
              <input
                type="date"
                value={person2Date}
                onChange={(e) => setPerson2Date(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Results */}
      {diffResult && (
        <div className="space-y-6">
          {/* Main Comparison Summary Card */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 bg-gradient-to-br from-slate-900/90 to-indigo-950/20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Exact Age Difference
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  <span className={isP1Older ? 'text-indigo-400' : 'text-pink-400'}>
                    {isP1Older ? person1Name : person2Name}
                  </span>{' '}
                  is older by{' '}
                  <span className="bg-gradient-to-r from-amber-300 via-pink-300 to-indigo-300 bg-clip-text text-transparent">
                    {diffResult.years}y {diffResult.months}m {diffResult.days}d
                  </span>
                </h3>
              </div>

              <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900/90 border border-slate-800">
                <Users className="w-5 h-5 text-indigo-400" />
                <div className="text-xs font-semibold text-slate-200">
                  Total {diffResult.totalDays.toLocaleString()} Days Difference
                </div>
              </div>
            </div>

            {/* Units breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-indigo-400 font-semibold">Total Days</span>
                <div className="font-mono text-2xl font-bold text-white mt-1">
                  {diffResult.totalDays.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Days</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-purple-400 font-semibold">Total Weeks</span>
                <div className="font-mono text-2xl font-bold text-white mt-1">
                  {diffResult.totalWeeks.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Weeks</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-pink-400 font-semibold">Total Hours</span>
                <div className="font-mono text-2xl font-bold text-white mt-1">
                  {diffResult.totalHours.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Hours</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800">
                <span className="text-xs text-cyan-400 font-semibold">Total Minutes</span>
                <div className="font-mono text-2xl font-bold text-white mt-1">
                  {diffResult.totalMinutes.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Minutes</span>
              </div>
            </div>
          </div>

          {/* Double Age Date Highlight */}
          {diffResult.doubleAgeDate && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 border border-amber-500/30 bg-gradient-to-br from-slate-900/90 to-amber-950/20 relative overflow-hidden">
              <div className="flex items-start gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    The Mathematical Phenomenon: &ldquo;Double Age Day&rdquo;
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white mt-1">
                    On {diffResult.doubleAgeDate.toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}, {isP1Older ? person1Name : person2Name} was / will be exactly twice as old as {isP1Older ? person2Name : person1Name}!
                  </h4>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed max-w-2xl">
                    Every pair of individuals has exactly one unique moment in all of history when the older person is precisely 2.000x the age of the younger person.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

'use client';

import React from 'react';
import { ChronologicalAgeResult, NextBirthdayInfo } from '../types';
import { NextBirthdayCard } from './NextBirthdayCard';
import { 
  Calendar, 
  Clock, 
  Hourglass, 
  Sparkles, 
  Zap, 
  Play, 
  Pause, 
  Cake,
  Share2,
  RotateCcw,
  CheckCircle2,
  Calculator
} from 'lucide-react';

interface AgeCalculatorTabProps {
  inputBirthDate: string;
  setInputBirthDate: (d: string) => void;
  inputBirthTime: string;
  setInputBirthTime: (t: string) => void;
  inputTargetDate: string;
  setInputTargetDate: (d: string) => void;
  inputTargetTime: string;
  setInputTargetTime: (t: string) => void;
  hasCalculated: boolean;
  onCalculate: () => void;
  onReset: () => void;
  isLive: boolean;
  setIsLive: (l: boolean) => void;
  ageResult: ChronologicalAgeResult | null;
  nextBirthday: NextBirthdayInfo | null;
  onCelebrate: () => void;
  onOpenShare: () => void;
}

export const AgeCalculatorTab: React.FC<AgeCalculatorTabProps> = ({
  inputBirthDate,
  setInputBirthDate,
  inputBirthTime,
  setInputBirthTime,
  inputTargetDate,
  setInputTargetDate,
  inputTargetTime,
  setInputTargetTime,
  hasCalculated,
  onCalculate,
  onReset,
  isLive,
  setIsLive,
  ageResult,
  nextBirthday,
  onCelebrate,
  onOpenShare,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputBirthDate) return;
    onCalculate();
  };

  const applyPreset = (yearsAgo: number) => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - yearsAgo);
    setInputBirthDate(d.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-8">
      {/* Date Input & Submit Form Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="pb-6 border-b border-slate-800">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-semibold mb-3">
            <Calculator className="w-3.5 h-3.5" /> Chronological Age Calculator
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Calculate Your Exact Age
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Enter your Date of Birth and click <strong className="text-indigo-300">Calculate Age</strong> to get your complete age breakdown and birthday stats.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Date of Birth */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 focus-within:border-indigo-500/50 transition-all">
              <label className="block text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1.5">
                <Calendar className="w-4 h-4" /> Date of Birth <span className="text-pink-500">*</span>
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    required
                    value={inputBirthDate}
                    onChange={(e) => setInputBirthDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Select date</span>
                </div>
                <div>
                  <input
                    type="time"
                    step="1"
                    value={inputBirthTime}
                    onChange={(e) => setInputBirthTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Birth time (optional)</span>
                </div>
              </div>
            </div>

            {/* Age at the Date of (Target Date) */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 focus-within:border-indigo-500/50 transition-all">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" /> Age at the Date of
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const now = new Date();
                    setInputTargetDate(now.toISOString().split('T')[0]);
                    setInputTargetTime(now.toTimeString().split(' ')[0]);
                  }}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 underline"
                >
                  Set to Today
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <input
                    type="date"
                    value={inputTargetDate}
                    onChange={(e) => setInputTargetDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Defaults to today</span>
                </div>
                <div>
                  <input
                    type="time"
                    step="1"
                    value={inputTargetTime}
                    onChange={(e) => setInputTargetTime(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-cyan-500 transition-all"
                  />
                  <span className="text-[10px] text-slate-500 block mt-1">Target time (optional)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-xs text-slate-400 font-semibold mr-1">Quick Select:</span>
            {[
              { label: '18 Years', years: 18 },
              { label: '21 Years', years: 21 },
              { label: '25 Years', years: 25 },
              { label: '30 Years', years: 30 },
              { label: '40 Years', years: 40 },
              { label: '50 Years', years: 50 },
            ].map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => applyPreset(p.years)}
                className="text-xs px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all"
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* SUBMIT BUTTON & Reset */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-500 hover:via-purple-500 hover:to-pink-500 text-white font-bold text-sm shadow-xl shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calculator className="w-4 h-4" />
              Calculate Age
            </button>

            {hasCalculated && (
              <>
                <button
                  type="button"
                  onClick={onReset}
                  className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Clear / Reset
                </button>

                <button
                  type="button"
                  onClick={() => setIsLive(!isLive)}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-xs font-bold transition-all ${
                    isLive
                      ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-600/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
                  }`}
                >
                  {isLive ? (
                    <>
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <Pause className="w-3.5 h-3.5" /> Live Clock Active
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" /> Enable Live Clock
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onOpenShare}
                  className="w-full sm:w-auto ml-auto px-5 py-3 rounded-2xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-300 hover:text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  Export Summary Card
                </button>
              </>
            )}
          </div>
        </form>
      </div>

      {/* RESULTS DISPLAY SECTION (rendered after Submit) */}
      {hasCalculated && ageResult && nextBirthday && (
        <div className="space-y-8 animate-fadeIn">
          {/* Birthday Greeting Banner if Today is Birthday */}
          {ageResult.isBirthdayToday && (
            <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-indigo-500/20 border border-pink-500/40 flex items-center justify-between shadow-2xl animate-pulse-glow">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-pink-500 text-white shadow-lg">
                  <Cake className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    🎉 Happy Birthday!
                  </h3>
                  <p className="text-slate-300 text-sm">
                    Today is your special day! Celebrating another glorious year of life!
                  </p>
                </div>
              </div>
              <button
                onClick={onCelebrate}
                className="px-4 py-2 rounded-2xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-bold shadow-lg transition-all flex items-center gap-1.5"
              >
                <Sparkles className="w-4 h-4" />
                Party Confetti
              </button>
            </div>
          )}

          {/* Primary Age Result Banner */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 bg-gradient-to-br from-slate-900/90 via-slate-900/95 to-indigo-950/30">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-indigo-400">
                  Calculated Age
                </span>
                <h3 className="text-3xl sm:text-4xl font-black text-white mt-1">
                  <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
                    {ageResult.years} Years, {ageResult.months} Months, {ageResult.days} Days
                  </span>
                </h3>
              </div>

              <div className="text-left md:text-right text-xs text-slate-400">
                <div>Born on: <strong className="text-slate-200">{ageResult.birthDayOfWeek}</strong> ({ageResult.birthDateFormatted})</div>
                <div className="mt-0.5">As of: <strong className="text-slate-200">{ageResult.targetDateFormatted}</strong></div>
              </div>
            </div>

            {/* Age Breakdown Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mt-6">
              {/* Years */}
              <div className="glass-card glass-card-hover rounded-2xl p-4 border border-indigo-500/30">
                <span className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">Years</span>
                <div className="my-1.5">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-white glow-text">
                    {ageResult.years}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Completed Years</span>
              </div>

              {/* Months */}
              <div className="glass-card glass-card-hover rounded-2xl p-4 border border-purple-500/30">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider">Months</span>
                <div className="my-1.5">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-purple-200">
                    {ageResult.months}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Remaining Months</span>
              </div>

              {/* Days */}
              <div className="glass-card glass-card-hover rounded-2xl p-4 border border-pink-500/30">
                <span className="text-[11px] font-bold text-pink-400 uppercase tracking-wider">Days</span>
                <div className="my-1.5">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-pink-200">
                    {ageResult.days}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Remaining Days</span>
              </div>

              {/* Hours */}
              <div className="glass-card glass-card-hover rounded-2xl p-4 border border-cyan-500/30">
                <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Hours</span>
                <div className="my-1.5">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-cyan-200">
                    {String(ageResult.hours).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Hours</span>
              </div>

              {/* Minutes */}
              <div className="glass-card glass-card-hover rounded-2xl p-4 border border-emerald-500/30">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">Minutes</span>
                <div className="my-1.5">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-emerald-200">
                    {String(ageResult.minutes).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Minutes</span>
              </div>

              {/* Seconds */}
              <div className="glass-card glass-card-hover rounded-2xl p-4 border border-amber-500/30 bg-gradient-to-b from-slate-900/80 to-amber-950/20">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Seconds</span>
                <div className="my-1.5 flex items-baseline gap-1">
                  <span className="font-mono text-3xl sm:text-4xl font-black text-amber-300">
                    {String(ageResult.seconds).padStart(2, '0')}
                  </span>
                  <span className="font-mono text-xs text-amber-400/80 font-bold">
                    .{String(ageResult.miliseconds).padStart(3, '0').slice(0, 2)}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">Seconds & MS</span>
              </div>
            </div>
          </div>

          {/* Next Birthday Countdown Card */}
          <NextBirthdayCard info={nextBirthday} onCelebrate={onCelebrate} />

          {/* Single Unit Summary Metrics */}
          <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">Summary in Single Units</h3>
                <p className="text-slate-400 text-xs">Total cumulative duration lived</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* Decimal Years */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <span className="text-xs text-indigo-400 font-semibold">Decimal Age</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {ageResult.decimalAgeYears.toFixed(4)}
                </div>
                <span className="text-[11px] text-slate-500">Years</span>
              </div>

              {/* Total Months */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <span className="text-xs text-purple-400 font-semibold">Total Months</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {ageResult.totalMonths.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-1">
                    + {ageResult.remainingDaysInMonth}d
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Months</span>
              </div>

              {/* Total Weeks */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <span className="text-xs text-pink-400 font-semibold">Total Weeks</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {ageResult.totalWeeks.toLocaleString()}
                  <span className="text-xs font-normal text-slate-400 ml-1">
                    + {ageResult.remainingDaysInWeek}d
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">Weeks</span>
              </div>

              {/* Total Days */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <span className="text-xs text-cyan-400 font-semibold">Total Days</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {ageResult.totalDays.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Days</span>
              </div>

              {/* Total Hours */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <span className="text-xs text-emerald-400 font-semibold">Total Hours</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {ageResult.totalHours.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Hours</span>
              </div>

              {/* Total Minutes */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all">
                <span className="text-xs text-amber-400 font-semibold">Total Minutes</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-white mt-1">
                  {ageResult.totalMinutes.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Minutes</span>
              </div>

              {/* Total Seconds */}
              <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-indigo-500/30 transition-all md:col-span-2">
                <span className="text-xs text-rose-400 font-semibold">Total Seconds</span>
                <div className="font-mono text-xl sm:text-2xl font-bold text-rose-300 mt-1">
                  {ageResult.totalSeconds.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">Seconds</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

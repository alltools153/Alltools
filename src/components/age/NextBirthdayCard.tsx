'use client';

import React from 'react';
import { NextBirthdayInfo } from '../types';
import { Cake, Calendar, Gift, Sparkles, Clock, PartyPopper } from 'lucide-react';

interface NextBirthdayCardProps {
  info: NextBirthdayInfo;
  onCelebrate: () => void;
}

export const NextBirthdayCard: React.FC<NextBirthdayCardProps> = ({ info, onCelebrate }) => {
  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden border border-indigo-500/30">
      {/* Ambient background glow */}
      <div className="absolute -top-24 -right-24 w-60 h-60 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        {/* Left Column: Heading & Turning Age */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="p-2 rounded-xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
              <Cake className="w-5 h-5" />
            </span>
            <span className="text-xs uppercase font-bold tracking-wider text-pink-400">
              Next Birthday Countdown
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
            Turning <span className="bg-gradient-to-r from-pink-400 via-purple-300 to-indigo-400 bg-clip-text text-transparent">{info.turningAge}</span> on {info.nextBirthdayDayOfWeek}
          </h3>

          <p className="text-slate-400 text-sm mt-1 flex items-center gap-2">
            <Calendar className="w-4 h-4 text-indigo-400" />
            {info.nextBirthdayDate}
          </p>
        </div>

        {/* Right Column: Big Countdown Units */}
        <div className="flex items-center gap-2 sm:gap-4">
          <div className="flex flex-col items-center justify-center bg-slate-900/80 border border-indigo-500/20 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 min-w-[64px] sm:min-w-[76px] shadow-lg">
            <span suppressHydrationWarning className="font-mono text-2xl sm:text-3xl font-black text-indigo-300 glow-text">
              {info.days}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Days
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-900/80 border border-indigo-500/20 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 min-w-[64px] sm:min-w-[76px] shadow-lg">
            <span suppressHydrationWarning className="font-mono text-2xl sm:text-3xl font-black text-purple-300">
              {String(info.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Hours
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-900/80 border border-indigo-500/20 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 min-w-[64px] sm:min-w-[76px] shadow-lg">
            <span suppressHydrationWarning className="font-mono text-2xl sm:text-3xl font-black text-pink-300">
              {String(info.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Mins
            </span>
          </div>

          <div className="flex flex-col items-center justify-center bg-slate-900/80 border border-indigo-500/20 rounded-2xl px-3.5 py-2.5 sm:px-5 sm:py-3 min-w-[64px] sm:min-w-[76px] shadow-lg">
            <span suppressHydrationWarning className="font-mono text-2xl sm:text-3xl font-black text-emerald-400">
              {String(info.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] sm:text-xs font-semibold text-slate-400 uppercase tracking-wider mt-0.5">
              Secs
            </span>
          </div>
        </div>
      </div>

      {/* Secondary Row: Half Birthday & Upcoming Birthdays Toggle */}
      <div className="mt-6 pt-5 border-t border-slate-800/80 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Half Birthday Info */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Gift className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs text-slate-400">Half Birthday (6 months mark)</div>
            <div className="text-sm font-semibold text-slate-200">
              {info.halfBirthdayDate.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              <span className="ml-2 text-xs font-normal text-amber-400">({info.daysToHalfBirthday} days away)</span>
            </div>
          </div>
        </div>

        {/* Quick Celebration Trigger */}
        <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-900/40 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs text-slate-400">Birthday Wish & Confetti</div>
              <div className="text-sm font-semibold text-slate-200">Ready to celebrate early?</div>
            </div>
          </div>
          <button
            onClick={onCelebrate}
            className="px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all flex items-center gap-1"
          >
            <PartyPopper className="w-3.5 h-3.5" />
            Cheer
          </button>
        </div>
      </div>

      {/* Upcoming Birthdays Table */}
      <div className="mt-5">
        <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-indigo-400" />
          Next 7 Birthdays Schedule
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-2">
          {info.upcomingBirthdays.map((bday, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800 text-center hover:border-indigo-500/40 transition-all"
            >
              <div className="text-xs font-bold text-indigo-300">{bday.year}</div>
              <div className="text-[11px] text-slate-300 font-medium">{bday.dayOfWeek}</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Age {bday.age}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

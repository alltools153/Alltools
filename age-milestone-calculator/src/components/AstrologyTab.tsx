'use client';

import React from 'react';
import { AstrologyGenInsights } from '../types';
import { 
  Compass, 
  Sparkles, 
  Flame, 
  Droplet, 
  Wind, 
  Mountain, 
  Gem, 
  Flower2, 
  Music, 
  Smartphone,
  Check,
  Calendar
} from 'lucide-react';

interface AstrologyTabProps {
  insights: AstrologyGenInsights;
  birthDate: string;
  setBirthDate: (d: string) => void;
  onRecalculate?: () => void;
}

export const AstrologyTab: React.FC<AstrologyTabProps> = ({
  insights,
  birthDate,
  setBirthDate,
  onRecalculate,
}) => {
  const { westernZodiac, chineseZodiac, generation, birthstone, birthFlower, dayOfWeekPoem } = insights;

  const getElementIcon = (element: string) => {
    switch (element) {
      case 'Fire': return <Flame className="w-4 h-4 text-orange-400" />;
      case 'Water': return <Droplet className="w-4 h-4 text-blue-400" />;
      case 'Air': return <Wind className="w-4 h-4 text-cyan-400" />;
      case 'Earth': return <Mountain className="w-4 h-4 text-emerald-400" />;
      default: return <Sparkles className="w-4 h-4 text-indigo-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Banner & Date Input */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" /> Astrology & Generational Lore
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Zodiac Signs & Generation Insights
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-2xl">
              Explore your Western Zodiac, Chinese Zodiac, generational era traits, birthstone, and traditional birth lore.
            </p>
          </div>

          {/* Quick Date Change */}
          <div className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-center gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-purple-400" /> Birth Date
              </label>
              <input
                type="date"
                value={birthDate}
                onChange={(e) => {
                  setBirthDate(e.target.value);
                  if (onRecalculate) onRecalculate();
                }}
                className="bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Primary Row: Western Zodiac & Chinese Zodiac */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Western Zodiac Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-indigo-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {westernZodiac.symbol}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{westernZodiac.sign}</h3>
                  <p className="text-xs text-slate-400">{westernZodiac.dates}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold">
                {getElementIcon(westernZodiac.element)}
                <span className="text-slate-200">{westernZodiac.element}</span>
              </div>
            </div>

            {/* Core Stats */}
            <div className="grid grid-cols-2 gap-3 my-4">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400">Ruling Planet</span>
                <div className="text-sm font-semibold text-indigo-300 mt-0.5">{westernZodiac.ruler}</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                <span className="text-[11px] text-slate-400">Quality</span>
                <div className="text-sm font-semibold text-purple-300 mt-0.5">{westernZodiac.quality}</div>
              </div>
            </div>

            {/* Personality Traits */}
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Core Personality Archetypes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {westernZodiac.traits.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Lucky Numbers: <strong className="text-slate-200">{westernZodiac.luckyNumbers.join(', ')}</strong></span>
            <span>Lucky Color: <strong className="text-slate-200">{westernZodiac.luckyColor}</strong></span>
          </div>
        </div>

        {/* Chinese Zodiac Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 border border-purple-500/30 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-amber-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  🏮
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Year of the {chineseZodiac.animal}</h3>
                  <p className="text-xs text-slate-400">{chineseZodiac.element} Element • {chineseZodiac.yinYang}</p>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400">
                {chineseZodiac.yinYang} Energy
              </div>
            </div>

            {/* Core Traits */}
            <div className="mb-4 mt-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Virtues & Personality
              </span>
              <div className="flex flex-wrap gap-1.5">
                {chineseZodiac.traits.map((t, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-300 border border-amber-500/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Complementary Signs */}
            <div className="mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Harmonious Compatible Signs
              </span>
              <div className="flex flex-wrap gap-1.5">
                {chineseZodiac.complementaryAnimals.map((a, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>Lucky Numbers: <strong className="text-slate-200">{chineseZodiac.luckyNumbers.join(', ')}</strong></span>
            <span>Element: <strong className="text-amber-400">{chineseZodiac.element}</strong></span>
          </div>
        </div>
      </div>

      {/* Generation Cohort Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-cyan-500/30 relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-cyan-950/20">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-5 pb-5 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
              Generational Cohort
            </span>
            <h3 className="text-2xl font-black text-white mt-1">
              {generation.name} <span className="text-sm font-normal text-slate-400">({generation.range})</span>
            </h3>
            <p className="text-sm text-cyan-200 font-medium italic mt-1">&ldquo;{generation.eraTagline}&rdquo;</p>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <Smartphone className="w-5 h-5 text-cyan-400" />
            <div>
              <div className="text-[11px] text-slate-400">Iconic Tech Era</div>
              <div className="text-xs font-bold text-slate-200">{generation.iconicTech}</div>
            </div>
          </div>
        </div>

        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Historical Defining Characteristics
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {generation.definingCharacteristics.map((char, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-300 flex items-start gap-2"
              >
                <Check className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <span>{char}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Triple Lore: Birthstone, Birth Flower, Day of Week Poem */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Birthstone */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-pink-500/20 text-pink-400 border border-pink-500/30">
                <Gem className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">Birthstone</span>
                <h4 className="text-lg font-bold text-white">{birthstone.name}</h4>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {birthstone.meaning}
            </p>
          </div>
        </div>

        {/* Birth Flower */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <Flower2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">Birth Flower</span>
                <h4 className="text-lg font-bold text-white">{birthFlower.name}</h4>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {birthFlower.meaning}
            </p>
          </div>
        </div>

        {/* Day-of-the-Week Poem */}
        <div className="glass-card rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase font-bold text-slate-400">{dayOfWeekPoem.day}&apos;s Child</span>
                <h4 className="text-sm font-bold text-amber-300 italic">&ldquo;{dayOfWeekPoem.rhymeLine}&rdquo;</h4>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-xl border border-slate-800">
              {dayOfWeekPoem.characteristics}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

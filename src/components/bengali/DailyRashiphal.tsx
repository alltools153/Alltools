'use client';

import React, { useState } from 'react';
import {
  Moon,
  Sparkles,
  Briefcase,
  DollarSign,
  Heart,
  Activity,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { RASHIS, toBengaliDigits } from '@/lib/constants/panjikaData';
import { Language, Numerals, RashiDetails } from '@/types/panjika';

interface DailyRashiphalProps {
  language: Language;
  numerals: Numerals;
}

export const DailyRashiphal: React.FC<DailyRashiphalProps> = ({ language, numerals }) => {
  const [selectedRashiId, setSelectedRashiId] = useState<number | 'all'>('all');

  const isBn = language === 'bn';

  const displayedRashis =
    selectedRashiId === 'all'
      ? RASHIS
      : RASHIS.filter((r) => r.id === selectedRashiId);

  return (
    <section className="w-full">
      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        {/* Header */}
        <div className="border-b border-[#e6d7bc] dark:border-[#443228] pb-4">
          <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1.5">
            <Moon className="w-3.5 h-3.5" />
            <span>{isBn ? 'দৈনিক রাশিফল ও গ্রহ সংস্থান' : 'Daily Vedic Horoscope'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a]">
            {isBn ? 'আজকের দ্বাদশ রাশির ভাগ্যফল ও প্রতিকার' : 'Daily 12 Rashi Forecast & Remedies'}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {isBn
              ? 'চন্দ্র রাশি ও নক্ষত্রের সঞ্চার অনুসারে আজকের কর্ম, অর্থ, প্রেম, স্বাস্থ্য ও বৈদিক শুভ প্রতিকার।'
              : 'Authentic planetary transit insights for career, finances, family harmony, health, and astrological remedies.'}
          </p>
        </div>

        {/* 12 Rashi Selectors Strip */}
        <div className="flex items-center space-x-2 overflow-x-auto py-4 scrollbar-none">
          <button
            onClick={() => setSelectedRashiId('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
              selectedRashiId === 'all'
                ? 'bg-[#8b0000] text-white border-2 border-[#d4af37] shadow-md'
                : 'bg-[#f4ebd9] dark:bg-[#1a1210] text-gray-700 dark:text-gray-300 border border-[#e6d7bc] dark:border-[#443228]'
            }`}
          >
            {isBn ? 'সকল রাশি' : 'All 12 Signs'}
          </button>
          {RASHIS.map((r) => (
            <button
              key={r.id}
              onClick={() => setSelectedRashiId(r.id)}
              className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-serif font-bold whitespace-nowrap transition ${
                selectedRashiId === r.id
                  ? 'bg-[#8b0000] text-white border-2 border-[#d4af37] shadow-md'
                  : 'bg-white dark:bg-[#1a1210] text-gray-800 dark:text-gray-200 border border-[#e6d7bc] dark:border-[#443228] hover:bg-[#f4ebd9]'
              }`}
            >
              <span>{r.symbol}</span>
              <span>{isBn ? r.nameBn : r.nameEn}</span>
            </button>
          ))}
        </div>

        {/* Rashiphal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-2">
          {displayedRashis.map((rashi) => {
            const pred = isBn ? rashi.dailyPredictionBn : rashi.dailyPredictionEn;
            return (
              <div
                key={rashi.id}
                className="p-5 rounded-2xl bg-white/90 dark:bg-[#1a1210]/90 border-2 border-[#e6d7bc] dark:border-[#443228] hover:border-[#d4af37] hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  {/* Top Sign Header */}
                  <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                    <div className="flex items-center space-x-2.5">
                      <span className="text-2xl">{rashi.symbol}</span>
                      <div>
                        <h3 className="text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a]">
                          {isBn ? rashi.nameBn : rashi.nameEn} রাশি
                        </h3>
                        <span className="text-[11px] text-gray-500">
                          {isBn ? `অধিপতি: ${rashi.rulerBn}` : `Lord: ${rashi.rulerEn}`} • {isBn ? rashi.elementBn : rashi.elementEn} তত্ত্ব
                        </span>
                      </div>
                    </div>

                    <div className="text-right text-[11px] text-amber-800 dark:text-amber-300 font-bold bg-amber-50 dark:bg-[#2e201b] px-2 py-1 rounded-lg border border-amber-200 dark:border-amber-800">
                      শুভ সংখ্যা: {numerals === 'bn' ? toBengaliDigits(rashi.luckyNumber) : rashi.luckyNumber}
                    </div>
                  </div>

                  {/* General Prediction */}
                  <p className="text-xs text-gray-800 dark:text-gray-200 font-medium my-3 italic">
                    "{pred.general}"
                  </p>

                  {/* Aspect Bullets */}
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-xl bg-gray-50 dark:bg-[#150f0d] flex items-start space-x-2">
                      <Briefcase className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">কর্ম:</span>{' '}
                        <span className="text-gray-700 dark:text-gray-300">{pred.career}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-50 dark:bg-[#150f0d] flex items-start space-x-2">
                      <DollarSign className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">অর্থ:</span>{' '}
                        <span className="text-gray-700 dark:text-gray-300">{pred.finance}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-50 dark:bg-[#150f0d] flex items-start space-x-2">
                      <Heart className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">প্রেম:</span>{' '}
                        <span className="text-gray-700 dark:text-gray-300">{pred.love}</span>
                      </div>
                    </div>

                    <div className="p-2 rounded-xl bg-gray-50 dark:bg-[#150f0d] flex items-start space-x-2">
                      <Activity className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-gray-900 dark:text-white">স্বাস্থ্য:</span>{' '}
                        <span className="text-gray-700 dark:text-gray-300">{pred.health}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Vedic Advice & Remedy Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                  <div className="p-2.5 rounded-xl bg-[#f4ebd9]/80 dark:bg-[#251a16] border border-[#d4af37]/40 text-xs">
                    <div className="font-bold text-[#8b0000] dark:text-[#fef08a] mb-0.5 flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>{isBn ? 'আজকের শুভ প্রতিকার:' : 'Remedy & Advice:'}</span>
                    </div>
                    <p className="text-gray-800 dark:text-gray-200 text-[11px]">{pred.advice}</p>
                  </div>

                  <div className="flex justify-between items-center text-[10px] text-gray-500 mt-2">
                    <span>শুভ রঙ: {isBn ? rashi.luckyColorBn : rashi.luckyColorEn}</span>
                    <span>রত্ন: {rashi.luckyGemsBn}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

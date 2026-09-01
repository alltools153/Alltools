'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import {
  Clock,
  Sun,
  Moon,
  Compass,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Volume2,
  ShieldCheck,
  Calendar,
} from 'lucide-react';
import { DayPanjika, Language, LocationConfig, Numerals } from '@/types/panjika';
import { toBengaliDigits } from '@/lib/constants/panjikaData';
import { formatDeterministicDate } from '@/lib/bengaliNumerals';
import { AlponaBorderDivider, DiyaFlameIcon, MangalGhatIcon } from './AlponaMotifs';
import { soundFx } from '@/lib/audioSynthesizer';
import { safeCopyToClipboard } from '@/lib/safeClient';

const LiveBengaliClock = dynamic(() => import('./LiveBengaliClock'), {
  ssr: false,
  loading: () => (
    <div className="h-14 w-52 rounded-2xl bg-[#f4ebd9]/60 dark:bg-[#1c1513]/60 animate-pulse border-2 border-[#d4af37]/40 flex items-center justify-center text-xs text-amber-800/50 dark:text-amber-200/50 font-mono font-bold">
      <Clock className="w-4 h-4 mr-2 animate-spin text-[#d4af37]" />
      <span>--:--:--</span>
    </div>
  ),
});

interface LivePanjikaWidgetProps {
  panjika: DayPanjika;
  language: Language;
  numerals: Numerals;
  location?: LocationConfig;
  onOpenDetails: () => void;
}

export const LivePanjikaWidget: React.FC<LivePanjikaWidgetProps> = ({
  panjika,
  language,
  numerals,
  location,
  onOpenDetails,
}) => {
  const [copied, setCopied] = useState(false);

  const isBn = language === 'bn';

  // Determine current active Muhurat
  const activeMuhurat = panjika.muhurats.find((m) => m.isAuspicious) || panjika.muhurats[0];

  const handleCopySummary = async () => {
    const summaryText = `🌸 আজকের বাংলা পঞ্জিকা (${panjika.bengaliDate.formattedBn}) 🌸\n` +
      `📅 ইংরেজি তারিখ: ${panjika.dateStr}\n` +
      `✨ তিথি: ${panjika.tithi.nameBn} (${panjika.tithi.pakshaBn}) সমাপ্তি: ${panjika.tithi.endTime}\n` +
      `⭐ নক্ষত্র: ${panjika.nakshatra.nameBn} (${panjika.nakshatra.lordBn})\n` +
      `☀️ সূর্যোদয়: ${panjika.sunrise} | সূর্যাস্ত: ${panjika.sunset}\n` +
      `🌺 অমৃতযোগ: ${panjika.muhurats.find(m => m.id === 'amrita')?.startTime} - ${panjika.muhurats.find(m => m.id === 'amrita')?.endTime}\n` +
      `⚠️ রাহুকাল: ${panjika.muhurats.find(m => m.id === 'rahu')?.startTime} - ${panjika.muhurats.find(m => m.id === 'rahu')?.endTime}\n` +
      `🔔 শুভাশুভ শুভকামনা সহ বাংলা পঞ্জিকা!`;

    const success = await safeCopyToClipboard(summaryText);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="w-full relative">
      <div className="royal-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-7 border-2 border-[#d4af37]/70 relative overflow-hidden">
        {/* Background Vintage Watermark */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-5 pointer-events-none">
          <MangalGhatIcon size={380} />
        </div>

        {/* Top Live Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 border-b border-[#e6d7bc] dark:border-[#443228] pb-3.5 sm:pb-5">
          <div>
            <div className="flex items-center space-x-2">
              <span className="inline-flex items-center px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold bg-[#8b0000] text-[#fef08a] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping mr-1.5" />
                {isBn ? 'আজকের পঞ্চাঙ্গ' : "Today's Panjika"}
              </span>
              <span className="text-[11px] sm:text-xs font-medium text-amber-800 dark:text-amber-300 bg-[#fde68a]/50 dark:bg-[#430202] px-2 py-0.5 rounded-full border border-[#d4af37]/40">
                {isBn ? panjika.bengaliDate.ritu.nameBn : panjika.bengaliDate.ritu.nameEn}
              </span>
            </div>

            {/* Prominent Bengali Date */}
            <h2 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-[#8b0000] dark:text-[#fef08a] mt-1.5 sm:mt-2 tracking-wide leading-tight">
              {panjika.bengaliDate.formattedBn}
            </h2>

            <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 mt-1 flex flex-wrap items-center gap-1.5 sm:space-x-2">
              <span className="flex items-center space-x-1">
                <Calendar className="w-3.5 h-3.5 text-[#bf7052]" />
                <span suppressHydrationWarning>
                  {formatDeterministicDate(panjika.gregorianDate, isBn, numerals)}
                </span>
              </span>
              <span className="text-gray-400 hidden xs:inline">•</span>
              <span>
                {isBn ? `শকাব্দ ${toBengaliDigits(panjika.bengaliDate.sakabdo)}` : `Saka ${panjika.bengaliDate.sakabdo}`}
              </span>
            </p>
          </div>

          {/* Live Digital Clock Display */}
          <div className="flex flex-col items-start lg:items-end w-full lg:w-auto mt-1 lg:mt-0">
            <LiveBengaliClock
              language={language}
              numerals={numerals}
              location={location}
            />

            {/* Quick Share / Copy Button */}
            <button
              onClick={handleCopySummary}
              className="mt-1.5 sm:mt-2 text-[11px] sm:text-xs text-[#8b0000] dark:text-[#fef08a] hover:underline flex items-center space-x-1 font-medium active:scale-95 transition"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>
                {copied
                  ? isBn
                    ? 'কপি করা হয়েছে! ✓'
                    : 'Copied to Clipboard! ✓'
                  : isBn
                  ? 'আজকের পঞ্জিকা শেয়ার বা কপি করুন'
                  : 'Share Daily Panjika'}
              </span>
            </button>
          </div>
        </div>

        {/* Today's Festival Highlight Banner (Mobile & Desktop) */}
        {panjika.festivals && panjika.festivals.length > 0 && (
          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#8B0000] via-[#9B111E] to-[#6A0404] text-white border-2 border-[#D4AF37] shadow-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
            <div className="flex items-center space-x-2.5 min-w-0">
              <div className="p-1.5 sm:p-2 rounded-xl bg-[#FEF08A] text-[#6A0404] shadow font-bold shrink-0 text-base">
                🌺
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#FEF08A] uppercase tracking-wide">
                    {isBn ? 'আজকের বিশেষ উৎসব ও পর্ব' : "TODAY'S SPECIAL FESTIVAL"}
                  </span>
                  {panjika.festivals[0].isPublicHoliday && (
                    <span className="text-[9px] bg-red-800 text-white px-1.5 py-0.2 rounded font-semibold">
                      {isBn ? 'ছুটি' : 'Holiday'}
                    </span>
                  )}
                </div>
                <div className="text-sm sm:text-base font-serif font-bold text-white mt-0.5 truncate">
                  {panjika.festivals[0].nameBn}
                </div>
                <p className="text-[11px] sm:text-xs text-gray-200 line-clamp-1">
                  {panjika.festivals[0].descriptionBn}
                </p>
              </div>
            </div>
            <button
              onClick={onOpenDetails}
              className="text-xs font-bold bg-[#FEF08A] text-[#6A0404] hover:bg-white px-3 py-1.5 rounded-xl shadow transition shrink-0 text-center active:scale-95"
            >
              {isBn ? 'উৎসবের নির্ঘণ্ট →' : 'View Timings →'}
            </button>
          </div>
        )}

        {/* Live Active Muhurat Alert Ribbon */}
        <div className="mt-3 sm:mt-4 p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-emerald-900/10 via-emerald-800/15 to-teal-900/10 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-600/40 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center space-x-2.5 min-w-0">
            <div className="p-1.5 sm:p-2 rounded-xl bg-emerald-700 text-white shadow-md shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-[11px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase tracking-wide">
                  {isBn ? 'শুভ যোগ কাল' : 'AUSPICIOUS MUHURAT'}
                </span>
                <span className="text-[10px] sm:text-[11px] bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 px-2 py-0.5 rounded-full font-semibold">
                  {isBn ? 'অমৃতযোগ' : 'Amrita Yoga'} ({panjika.muhurats[0].startTime} - {panjika.muhurats[0].endTime})
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 mt-0.5 truncate">
                {isBn
                  ? panjika.muhurats[0].descriptionBn
                  : panjika.muhurats[0].descriptionEn}
              </p>
            </div>
          </div>

          <button
            onClick={onOpenDetails}
            className="text-xs font-bold bg-[#8b0000] text-white hover:bg-[#6b0707] px-3.5 py-2 rounded-xl shadow transition shrink-0 text-center active:scale-95"
          >
            {isBn ? 'সকল লগ্ন দেখুন →' : 'View Full Details →'}
          </button>
        </div>

        {/* Main Panchang Limbs 4-Card Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3.5 mt-3.5 sm:mt-5">
          {/* 1. Tithi */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#ffffff]/80 dark:bg-[#1a1210]/80 border border-[#e6d7bc] dark:border-[#443228] shadow-sm hover:border-[#8b0000] dark:hover:border-[#d4af37] transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-amber-800 dark:text-amber-400">
                  {isBn ? 'তিথি' : 'TITHI'}
                </span>
                <span className="bg-amber-100 dark:bg-[#332219] text-amber-900 dark:text-amber-200 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold">
                  {panjika.tithi.pakshaBn}
                </span>
              </div>
              <div className="text-base sm:text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-1 truncate">
                {panjika.tithi.nameBn}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                {isBn ? 'সমাপ্তি:' : 'Ends:'}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {panjika.tithi.endTime}
                </span>
              </div>
            </div>
            {/* Completion Progress Bar */}
            <div className="mt-2 sm:mt-2.5">
              <div className="flex justify-between text-[9px] sm:text-[10px] text-gray-500 mb-0.5">
                <span>{isBn ? 'অগ্রগতি' : 'Progress'}</span>
                <span suppressHydrationWarning>
                  {numerals === 'bn' ? toBengaliDigits(panjika.tithi.percentage) : panjika.tithi.percentage}%
                </span>
              </div>
              <div className="w-full bg-[#f4ebd9] dark:bg-[#2b1f1a] rounded-full h-1.5 overflow-hidden">
                <div
                  suppressHydrationWarning
                  className="bg-gradient-to-r from-amber-500 to-[#8b0000] h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${panjika.tithi.percentage}%` }}
                />
              </div>
            </div>
          </div>

          {/* 2. Nakshatra */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#ffffff]/80 dark:bg-[#1a1210]/80 border border-[#e6d7bc] dark:border-[#443228] shadow-sm hover:border-[#8b0000] dark:hover:border-[#d4af37] transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-amber-800 dark:text-amber-400">
                  {isBn ? 'নক্ষত্র' : 'NAKSHATRA'}
                </span>
                <span className="bg-amber-100 dark:bg-[#332219] text-amber-900 dark:text-amber-200 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold truncate max-w-[70px]">
                  {panjika.nakshatra.lordBn}
                </span>
              </div>
              <div className="text-base sm:text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-1 truncate">
                {panjika.nakshatra.nameBn}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                {isBn ? 'সমাপ্তি:' : 'Ends:'}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {panjika.nakshatra.endTime}
                </span>
              </div>
            </div>
            <div className="mt-1.5 text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {isBn
                ? `গণ: ${panjika.nakshatra.gana}`
                : `Gana: ${panjika.nakshatra.ganaEn}`}
            </div>
          </div>

          {/* 3. Yoga & Karana */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#ffffff]/80 dark:bg-[#1a1210]/80 border border-[#e6d7bc] dark:border-[#443228] shadow-sm hover:border-[#8b0000] dark:hover:border-[#d4af37] transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-amber-800 dark:text-amber-400">
                  {isBn ? 'যোগ ও করণ' : 'YOGA & KARANA'}
                </span>
                <span
                  className={`px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold ${
                    panjika.yoga.isAuspicious
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300'
                  }`}
                >
                  {panjika.yoga.natureBn}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-1 truncate">
                {panjika.yoga.nameBn} যোগ
              </div>
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 mt-0.5 truncate">
                {isBn ? 'করণ:' : 'Karana:'}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {panjika.karana.nameBn}
                </span>
              </div>
            </div>
            <div className="mt-1.5 text-[10px] sm:text-[11px] text-gray-500 dark:text-gray-400 truncate">
              {isBn ? `দেবতা: ${panjika.karana.deityBn}` : `Deity: ${panjika.karana.deityBn}`}
            </div>
          </div>

          {/* 4. Sun & Moon Signs */}
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-[#ffffff]/80 dark:bg-[#1a1210]/80 border border-[#e6d7bc] dark:border-[#443228] shadow-sm hover:border-[#8b0000] dark:hover:border-[#d4af37] transition flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-[11px] sm:text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold text-amber-800 dark:text-amber-400">
                  {isBn ? 'রাশি সংস্থান' : 'SIGNS'}
                </span>
                <span className="bg-amber-100 dark:bg-[#332219] text-amber-900 dark:text-amber-200 px-1.5 sm:px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-bold">
                  {panjika.sunSign.nameBn}
                </span>
              </div>
              <div className="text-base sm:text-lg font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-1 truncate">
                চন্দ্র: {panjika.moonSign.nameBn}
              </div>
              <div className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 mt-0.5">
                {isBn ? 'রবি:' : 'Sun:'}{' '}
                <span className="font-semibold text-gray-900 dark:text-white">
                  {panjika.sunSign.nameBn} ({numerals === 'bn' ? toBengaliDigits(panjika.sunSign.degrees) : panjika.sunSign.degrees}°)
                </span>
              </div>
            </div>
            <div className="mt-1.5 text-[10px] sm:text-[11px] text-emerald-700 dark:text-emerald-400 font-medium truncate">
              {panjika.chandraSuddhiBn}
            </div>
          </div>
        </div>

        {/* Ephemeris Row: Sunrise, Sunset, Rahu Kalam, Disha Shool */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-3 sm:mt-4 text-xs">
          {/* Sunrise */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f4ebd9]/60 dark:bg-[#1a1210]/60 border border-[#e6d7bc] dark:border-[#443228]">
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600 shrink-0" />
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[10px]">
                {isBn ? 'সূর্যোদয়' : 'SUNRISE'}
              </div>
              <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                {numerals === 'bn' ? toBengaliDigits(panjika.sunrise) : panjika.sunrise}
              </div>
            </div>
          </div>

          {/* Sunset */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f4ebd9]/60 dark:bg-[#1a1210]/60 border border-[#e6d7bc] dark:border-[#443228]">
            <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-orange-600 shrink-0" />
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[10px]">
                {isBn ? 'সূর্যাস্ত' : 'SUNSET'}
              </div>
              <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                {numerals === 'bn' ? toBengaliDigits(panjika.sunset) : panjika.sunset}
              </div>
            </div>
          </div>

          {/* Rahu Kalam Alert */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 p-2.5 sm:p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50">
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-rose-600 shrink-0" />
            <div className="min-w-0">
              <div className="text-rose-700 dark:text-rose-400 text-[9px] sm:text-[10px] font-bold truncate">
                {isBn ? 'রাহুকাল' : 'RAHU KALAM'}
              </div>
              <div className="font-bold text-[11px] sm:text-xs text-rose-900 dark:text-rose-200 truncate">
                {panjika.muhurats.find((m) => m.id === 'rahu')?.startTime} -{' '}
                {panjika.muhurats.find((m) => m.id === 'rahu')?.endTime}
              </div>
            </div>
          </div>

          {/* Disha Shool (Travel caution) */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 p-2.5 sm:p-3 rounded-xl bg-[#f4ebd9]/60 dark:bg-[#1a1210]/60 border border-[#e6d7bc] dark:border-[#443228]">
            <Compass className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 shrink-0" />
            <div>
              <div className="text-gray-500 dark:text-gray-400 text-[9px] sm:text-[10px]">
                {isBn ? 'দিকের শূল' : 'DISHA SHOOL'}
              </div>
              <div className="font-bold text-xs sm:text-sm text-gray-900 dark:text-white">
                {isBn ? panjika.dishaShool.directionBn : panjika.dishaShool.directionEn}
              </div>
            </div>
          </div>
        </div>

        {/* Fasting / Puja Badge on Today */}
        {panjika.fastingDetails && (
          <div className="mt-3 sm:mt-4 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700 flex items-start sm:items-center space-x-2 sm:space-x-3 text-xs">
            <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5 sm:mt-0" />
            <div>
              <span className="font-bold text-amber-900 dark:text-amber-200">
                {panjika.fastingDetails.nameBn}:
              </span>{' '}
              <span className="text-gray-700 dark:text-gray-300">
                {panjika.fastingDetails.rulesBn}{' '}
                {panjika.fastingDetails.paranaTime && `(${panjika.fastingDetails.paranaTime})`}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

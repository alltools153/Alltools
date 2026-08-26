'use client';

import React, { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Sparkles,
  Heart,
  ShieldAlert,
  Printer,
  Filter,
  Flame,
  Sun,
  Moon,
  Clock,
  CheckCircle,
} from 'lucide-react';
import { BENGALI_MONTHS, WEEKDAYS, toBengaliDigits } from '@/lib/constants/panjikaData';
import { DayPanjika, Language, LocationConfig, Numerals } from '@/types/panjika';
import { getDayPanjika, getMonthCalendarDays, getBengaliMonthCalendarDays } from '@/lib/panjikaEngine';
import { AlponaBorderDivider, DiyaFlameIcon, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';

interface CalendarGridProps {
  currentDate: Date;
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  language: Language;
  numerals: Numerals;
  location: LocationConfig;
  onPrintCalendar: () => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  currentDate,
  selectedDate,
  onSelectDate,
  language,
  numerals,
  location,
  onPrintCalendar,
}) => {
  // Navigation mode: 'gregorian' (Jan-Dec) vs 'bengali' (Boishakh-Choitro)
  const [navMode, setNavMode] = useState<'gregorian' | 'bengali'>('gregorian');

  // Gregorian view state
  const [viewYear, setViewYear] = useState(selectedDate.getFullYear());
  const [viewMonth, setViewMonth] = useState(selectedDate.getMonth()); // 0-11

  // Bengali view state (0 = Boishakh, 11 = Choitro)
  const [bengaliMonthIndex, setBengaliMonthIndex] = useState(4); // Bhadro default
  const [bengaliYear, setBengaliYear] = useState(1433);

  // Quick Filter Chips: 'all' | 'marriage' | 'ekadashi' | 'purnima_amavasya' | 'holidays'
  const [activeFilter, setActiveFilter] = useState<'all' | 'marriage' | 'ekadashi' | 'purnima_amavasya' | 'holidays'>('all');

  const isBn = language === 'bn';

  // Gregorian Month Names
  const gregorianMonthNamesBn = [
    'জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
    'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'
  ];

  // Helper to get days based on active navigation mode
  let monthDays: DayPanjika[] = [];
  let firstDayWeekday = 0;
  let headerTitleBn = '';
  let headerSubtitle = '';

  if (navMode === 'gregorian') {
    monthDays = getMonthCalendarDays(viewYear, viewMonth, location);
    firstDayWeekday = new Date(viewYear, viewMonth, 1).getDay();
    const midDay = monthDays[Math.min(14, monthDays.length - 1)];
    const bnMonth = midDay?.bengaliDate.monthNameBn || '';
    const bnYr = midDay?.bengaliDate.year || 1433;
    headerTitleBn = `${gregorianMonthNamesBn[viewMonth]} ${viewYear}`;
    headerSubtitle = `${bnMonth} ${toBengaliDigits(bnYr)} বঙ্গাব্দ (${midDay?.bengaliDate.ritu.nameBn})`;
  } else {
    // Exact authentic Bengali Month calendar days (1st to 30th/31st of this Bengali month)
    const res = getBengaliMonthCalendarDays(bengaliYear, bengaliMonthIndex, location);
    monthDays = res.days;
    firstDayWeekday = res.firstDayWeekday;
    const bMonthInfo = BENGALI_MONTHS[bengaliMonthIndex];
    headerTitleBn = `${bMonthInfo.nameBn} ${toBengaliDigits(bengaliYear)} বঙ্গাব্দ`;
    headerSubtitle = `${bMonthInfo.seasonBn} • ${bMonthInfo.historicalSignificance}`;
  }

  // Navigation handlers
  const handlePrev = () => {
    if (navMode === 'gregorian') {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear(viewYear - 1);
      } else {
        setViewMonth(viewMonth - 1);
      }
    } else {
      if (bengaliMonthIndex === 0) {
        setBengaliMonthIndex(11);
        setBengaliYear(bengaliYear - 1);
      } else {
        setBengaliMonthIndex(bengaliMonthIndex - 1);
      }
    }
  };

  const handleNext = () => {
    if (navMode === 'gregorian') {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear(viewYear + 1);
      } else {
        setViewMonth(viewMonth + 1);
      }
    } else {
      if (bengaliMonthIndex === 11) {
        setBengaliMonthIndex(0);
        setBengaliYear(bengaliYear + 1);
      } else {
        setBengaliMonthIndex(bengaliMonthIndex + 1);
      }
    }
  };

  const handleJumpToday = () => {
    const today = new Date();
    setViewYear(today.getFullYear());
    setViewMonth(today.getMonth());
    setBengaliMonthIndex(4); // current approx
    setBengaliYear(1433);
    onSelectDate(today);
  };

  return (
    <section className="w-full relative select-none">
      {/* Alpona & Paisley Styled Container */}
      <div className="parchment-card rounded-3xl p-4 sm:p-7 border-2 border-[#D4AF37] shadow-vintage-card relative overflow-hidden alpona-frame">
        {/* Subtle Paisley / Shankha Top Watermark */}
        <div className="absolute top-2 right-2 opacity-5 pointer-events-none">
          <ShankhaIcon size={180} />
        </div>

        {/* Top Controls & Dual Navigation Switcher */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[#E6D7BC] dark:border-[#4D2638] pb-4">
          <div>
            {/* Nav Mode Switcher (Gregorian Months ↔ Bengali Months) */}
            <div className="flex items-center space-x-1.5 bg-[#F5EBE1] dark:bg-[#1A0E17] p-1 rounded-2xl border border-[#D4AF37]/50 inline-flex mb-2">
              <button
                onClick={() => setNavMode('gregorian')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  navMode === 'gregorian'
                    ? 'bg-[#8B0000] text-[#FEF3C7] shadow-md'
                    : 'text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]/50'
                }`}
              >
                📅 {isBn ? 'ইংরেজি মাস (Jan - Dec)' : 'Gregorian Months'}
              </button>
              <button
                onClick={() => setNavMode('bengali')}
                className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                  navMode === 'bengali'
                    ? 'bg-[#8B0000] text-[#FEF3C7] shadow-md'
                    : 'text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]/50'
                }`}
              >
                🌸 {isBn ? 'বাংলা মাস (বৈশাখ - চৈত্র)' : 'Bengali Months'}
              </button>
            </div>

            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8B0000] dark:text-[#E5C158] flex items-center space-x-2">
              <span>{headerTitleBn}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#2B080C]/80 dark:text-[#FDFBF7]/80 font-medium mt-0.5">
              {headerSubtitle}
            </p>
          </div>

          {/* Nav Buttons & Quick Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleJumpToday}
              className="px-3.5 py-1.5 bg-[#8B0000] hover:bg-[#6B0707] text-[#FEF3C7] text-xs font-bold rounded-xl border border-[#D4AF37] shadow-sm transition"
            >
              {isBn ? 'আজকের পঞ্জিকা' : 'Jump to Today'}
            </button>

            <button
              onClick={handlePrev}
              className="p-2 bg-[#F5EBE1] dark:bg-[#1A0E17] hover:bg-[#E6D7BC] text-[#8B0000] dark:text-[#E5C158] rounded-xl border border-[#D4AF37] shadow-sm transition"
              title="পূর্ববর্তী মাস"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              onClick={handleNext}
              className="p-2 bg-[#F5EBE1] dark:bg-[#1A0E17] hover:bg-[#E6D7BC] text-[#8B0000] dark:text-[#E5C158] rounded-xl border border-[#D4AF37] shadow-sm transition"
              title="পরবর্তী মাস"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={onPrintCalendar}
              className="p-2 bg-[#F5EBE1] dark:bg-[#1A0E17] hover:bg-[#E6D7BC] text-[#8B0000] dark:text-[#E5C158] rounded-xl border border-[#D4AF37] shadow-sm transition hidden sm:flex items-center space-x-1"
              title="মুদ্রণযোগ্য ক্যালেন্ডার"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Filter Chips */}
        <div className="flex items-center space-x-2 overflow-x-auto py-3 border-b border-[#E6D7BC]/70 dark:border-[#4D2638]/70 scrollbar-none text-xs">
          <span className="text-[#2B080C]/70 dark:text-[#FDFBF7]/70 font-semibold flex items-center space-x-1 mr-1 shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>{isBn ? 'ফিল্টার:' : 'Filter:'}</span>
          </span>

          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition ${
              activeFilter === 'all'
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'bg-[#F5EBE1] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]'
            }`}
          >
            {isBn ? 'সকল দিন' : 'All Days'}
          </button>

          <button
            onClick={() => setActiveFilter('marriage')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1 ${
              activeFilter === 'marriage'
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'bg-[#F5EBE1] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]'
            }`}
          >
            <span>💍</span>
            <span>{isBn ? 'শুভ বিবাহ লগ্ন (Marriage Dates)' : 'Marriage Dates'}</span>
          </button>

          <button
            onClick={() => setActiveFilter('ekadashi')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1 ${
              activeFilter === 'ekadashi'
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'bg-[#F5EBE1] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]'
            }`}
          >
            <span>🍃</span>
            <span>{isBn ? 'একাদশী তালিকা (Ekadashi)' : 'Ekadashi List'}</span>
          </button>

          <button
            onClick={() => setActiveFilter('purnima_amavasya')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1 ${
              activeFilter === 'purnima_amavasya'
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'bg-[#F5EBE1] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]'
            }`}
          >
            <span>🌕</span>
            <span>{isBn ? 'পূর্ণিমা ও অমাবস্যা' : 'Purnima / Amavasya'}</span>
          </button>

          <button
            onClick={() => setActiveFilter('holidays')}
            className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition flex items-center space-x-1 ${
              activeFilter === 'holidays'
                ? 'bg-[#8B0000] text-white shadow-sm'
                : 'bg-[#F5EBE1] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] hover:bg-[#E6D7BC]'
            }`}
          >
            <span>🌺</span>
            <span>{isBn ? 'সরকারি ও ধর্মীয় ছুটি (Holidays)' : 'Govt Holidays'}</span>
          </button>
        </div>

        {/* 7-Column Weekday Headers */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-3 text-center">
          {WEEKDAYS.map((w, idx) => (
            <div
              key={w.index}
              className={`py-2 px-1 rounded-xl text-xs sm:text-sm font-serif font-bold ${
                idx === 0
                  ? 'bg-[#8B0000] text-[#FEF3C7] border border-[#D4AF37]'
                  : 'bg-[#F5EBE1] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] border border-[#E6D7BC] dark:border-[#4D2638]'
              }`}
            >
              <div>{isBn ? w.nameBn : w.shortEn}</div>
              <div className="text-[10px] text-gray-500 font-normal hidden sm:block">
                {w.planetLordBn}
              </div>
            </div>
          ))}
        </div>

        {/* 7-Column Days Grid */}
        <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-2">
          {/* Empty prefix padding */}
          {Array.from({ length: firstDayWeekday }).map((_, i) => (
            <div
              key={`empty-${i}`}
              className="min-h-[85px] sm:min-h-[110px] p-2 rounded-2xl bg-gray-100/30 dark:bg-[#150a12]/30 border border-dashed border-gray-300 dark:border-gray-800 opacity-40 select-none"
            />
          ))}

          {/* Month Days */}
          {monthDays.map((panjikaDay) => {
            const gDay = panjikaDay.gregorianDate.getDate();
            const isToday =
              currentDate.getDate() === gDay &&
              currentDate.getMonth() === panjikaDay.gregorianDate.getMonth() &&
              currentDate.getFullYear() === panjikaDay.gregorianDate.getFullYear();

            const isSelected =
              selectedDate.getDate() === gDay &&
              selectedDate.getMonth() === panjikaDay.gregorianDate.getMonth() &&
              selectedDate.getFullYear() === panjikaDay.gregorianDate.getFullYear();

            const isEkadashi = panjikaDay.tithi.nameBn === 'একাদশী';
            const isPurnima = panjikaDay.tithi.nameBn === 'পূর্ণিমা';
            const isAmavasya = panjikaDay.tithi.nameBn === 'অমাবস্যা';
            const hasFestivals = panjikaDay.festivals.length > 0;
            const isMarriageDate = panjikaDay.bengaliDate.monthIndex === 7 && [3, 8, 15].includes(panjikaDay.bengaliDate.day);

            // Filter logic
            if (activeFilter === 'marriage' && !isMarriageDate) return null;
            if (activeFilter === 'ekadashi' && !isEkadashi) return null;
            if (activeFilter === 'purnima_amavasya' && !isPurnima && !isAmavasya) return null;
            if (activeFilter === 'holidays' && !hasFestivals) return null;

            return (
              <div
                key={panjikaDay.dateStr}
                onClick={() => onSelectDate(panjikaDay.gregorianDate)}
                className={`min-h-[95px] sm:min-h-[120px] p-2 sm:p-2.5 rounded-2xl border-2 cursor-pointer transition-all duration-200 flex flex-col justify-between relative group ${
                  isSelected
                    ? 'border-[#8B0000] bg-[#FDE8E8] dark:bg-[#3D1420] shadow-royal-gold scale-[1.02] z-10'
                    : isToday
                    ? 'border-[#D4AF37] bg-[#FEF3C7]/60 dark:bg-[#2E1B15] shadow-md ring-2 ring-[#D4AF37]/50'
                    : 'border-[#E6D7BC] dark:border-[#4D2638] bg-white/90 dark:bg-[#1A0E17]/90 hover:bg-[#F5EBE1] dark:hover:bg-[#2B1220] hover:border-[#D4AF37] hover:shadow-md'
                }`}
              >
                {/* Top Row: Large English Date & Subscript Bengali Day */}
                <div className="flex items-start justify-between">
                  {/* Large English Date (e.g. "22") */}
                  <span
                    className={`font-sans text-xl sm:text-2xl font-black leading-none ${
                      panjikaDay.gregorianDate.getDay() === 0
                        ? 'text-red-700 dark:text-red-400'
                        : 'text-[#2B080C] dark:text-[#FDFBF7]'
                    }`}
                  >
                    {gDay}
                  </span>

                  {/* Subscript Bengali Date (e.g. "৭ ভাদ্র") */}
                  <span className="text-[11px] font-serif font-bold text-[#8B0000] dark:text-[#E5C158] bg-[#F5EBE1] dark:bg-[#2B1220] px-1.5 py-0.5 rounded-md border border-[#D4AF37]/30">
                    {toBengaliDigits(panjikaDay.bengaliDate.day)} {panjikaDay.bengaliDate.monthNameBn}
                  </span>
                </div>

                {/* Middle Row: Subscript Tithi Badge (e.g. "একাদশী" / "শুক্লা অষ্টমী") */}
                <div className="my-1">
                  <div className="text-[10px] sm:text-[11px] font-medium text-[#8B0000] dark:text-[#FEF3C7] truncate font-serif flex items-center space-x-1">
                    {isPurnima ? <span>🌕</span> : isAmavasya ? <span>🌑</span> : isEkadashi ? <span>🍃</span> : null}
                    <span>{panjikaDay.tithi.nameBn}</span>
                  </div>
                  <div className="text-[9px] text-gray-500 dark:text-gray-400 truncate hidden sm:block">
                    {panjikaDay.nakshatra.nameBn}
                  </div>
                </div>

                {/* Bottom Badges */}
                <div className="space-y-0.5">
                  {hasFestivals && (
                    <div className="bg-[#8B0000] text-white text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md truncate shadow-sm flex items-center space-x-1">
                      <span>🌺</span>
                      <span className="truncate">{panjikaDay.festivals[0].nameBn}</span>
                    </div>
                  )}

                  {isMarriageDate && !hasFestivals && (
                    <div className="bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate">
                      💍 শুভ বিবাহ লগ্ন
                    </div>
                  )}

                  {isEkadashi && !hasFestivals && (
                    <div className="bg-amber-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-md truncate">
                      🍃 একাদশী উপবাস
                    </div>
                  )}
                </div>

                {/* Today Badge */}
                {isToday && (
                  <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-[#2B080C] text-[9px] font-black px-1.5 py-0.5 rounded-full uppercase shadow border border-white">
                    আজ
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

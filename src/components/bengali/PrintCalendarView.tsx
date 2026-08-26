'use client';

import React from 'react';
import { BENGALI_MONTHS, WEEKDAYS, toBengaliDigits } from '@/lib/constants/panjikaData';
import { DayPanjika, LocationConfig } from '@/types/panjika';
import { AlponaBorderDivider, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';
import { getMonthCalendarDays } from '@/lib/panjikaEngine';
import { formatDeterministicDate } from '@/lib/bengaliNumerals';

interface PrintCalendarViewProps {
  year: number;
  monthIndex: number;
  location: LocationConfig;
}

export const PrintCalendarView: React.FC<PrintCalendarViewProps> = ({
  year,
  monthIndex,
  location,
}) => {
  const monthDays = getMonthCalendarDays(year, monthIndex, location);
  const midDay = monthDays[Math.min(14, monthDays.length - 1)];
  const monthNameBn = midDay?.bengaliDate.monthNameBn || '';
  const bongabdoYear = midDay?.bengaliDate.year || 1433;
  const firstDayWeekday = new Date(year, monthIndex, 1).getDay();

  return (
    <div className="p-8 bg-white text-black max-w-4xl mx-auto border-4 border-[#8b0000] rounded-xl font-serif">
      {/* Top Royal Banner */}
      <div className="text-center border-b-2 border-[#8b0000] pb-4 mb-4">
        <div className="flex items-center justify-between px-4">
          <MangalGhatIcon size={48} />
          <div>
            <h1 className="text-3xl font-black text-[#8b0000] tracking-wide">
              শ্রী শ্রী সনাতন বঙ্গীয় পঞ্জিকা
            </h1>
            <p className="text-sm font-semibold text-gray-700 mt-0.5">
              {bongabdoYear} বঙ্গাব্দ • সূর্যসিদ্ধান্ত ও বিশুদ্ধ জ্যোতিষ সিদ্ধান্ত সম্মত
            </p>
          </div>
          <ShankhaIcon size={48} />
        </div>

        <div className="mt-3 bg-[#8b0000] text-white py-1.5 px-6 rounded-md font-bold text-xl inline-block">
          {monthNameBn} মাস ({bongabdoYear} বঙ্গাব্দ)
        </div>
      </div>

      {/* Weekday Grid Headers */}
      <div className="grid grid-cols-7 gap-1 text-center font-bold text-sm bg-gray-100 border border-gray-400 py-2">
        {WEEKDAYS.map((w, idx) => (
          <div key={w.index} className={idx === 0 ? 'text-red-700 font-black' : 'text-gray-900'}>
            {w.nameBn}
          </div>
        ))}
      </div>

      {/* Days Table */}
      <div className="grid grid-cols-7 gap-1 mt-1 border border-gray-400 p-1">
        {Array.from({ length: firstDayWeekday }).map((_, i) => (
          <div key={`p-empty-${i}`} className="min-h-[90px] border border-gray-200 bg-gray-50/50" />
        ))}

        {monthDays.map((d) => {
          const gDay = d.gregorianDate.getDate();
          const hasFest = d.festivals.length > 0;
          const isSun = d.gregorianDate.getDay() === 0;

          return (
            <div
              key={d.dateStr}
              className="min-h-[95px] p-1.5 border border-gray-300 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <span className={`text-xl font-black leading-none ${isSun ? 'text-red-700' : 'text-black'}`}>
                  {toBengaliDigits(d.bengaliDate.day)}
                </span>
                <span className="text-[10px] text-gray-500 font-sans">{gDay}</span>
              </div>

              <div className="text-[10px] text-[#8b0000] font-semibold my-0.5 leading-tight">
                {d.tithi.nameBn}
              </div>

              <div className="text-[9px] text-gray-600 truncate">
                নক্ষত্র: {d.nakshatra.nameBn}
              </div>

              {hasFest && (
                <div className="bg-red-800 text-white text-[9px] font-bold px-1 rounded truncate mt-0.5">
                  {d.festivals[0].nameBn}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Proverb & Astrological Note */}
      <div className="mt-4 pt-3 border-t border-gray-400 text-center text-xs text-gray-600 flex justify-between items-center">
        <span>স্থান: {location.bengaliName}</span>
        <span>ওঁ সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে</span>
        <span suppressHydrationWarning>মুদ্রণ তারিখ: {formatDeterministicDate(new Date(year, monthIndex, 1), true, 'bn')}</span>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';
import { Language, LocationConfig, Numerals } from '@/types/panjika';
import { getBengaliTimePeriod, padBengaliZero } from '@/lib/bengaliNumerals';

interface LiveBengaliClockProps {
  language: Language;
  numerals: Numerals;
  location?: LocationConfig;
  className?: string;
}

export const LiveBengaliClock: React.FC<LiveBengaliClockProps> = ({
  language,
  numerals,
  location,
  className = '',
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  const timeZone = location?.timezone || 'Asia/Kolkata';
  const isBn = language === 'bn';

  useEffect(() => {
    setCurrentTime(new Date());
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Compute timezone-accurate 24h period & 8-prahara
  const timePeriod = getBengaliTimePeriod(currentTime, timeZone);
  const { hours12, minutes, seconds, periodPrefixBn, periodEn } = timePeriod;
  const pad2 = (n: number) => String(n).padStart(2, '0');

  const formatClockTime = () => {
    if (isBn) {
      if (numerals === 'bn') {
        const bnH = padBengaliZero(hours12, 2);
        const bnM = padBengaliZero(minutes, 2);
        const bnS = padBengaliZero(seconds, 2);
        return `${periodPrefixBn} ${bnH}:${bnM}:${bnS}`.normalize('NFC');
      } else {
        return `${periodPrefixBn} ${pad2(hours12)}:${pad2(minutes)}:${pad2(seconds)}`;
      }
    } else {
      if (numerals === 'bn') {
        const bnH = padBengaliZero(hours12, 2);
        const bnM = padBengaliZero(minutes, 2);
        const bnS = padBengaliZero(seconds, 2);
        return `${bnH}:${bnM}:${bnS} ${periodEn}`;
      }
      return `${pad2(hours12)}:${pad2(minutes)}:${pad2(seconds)} ${periodEn}`;
    }
  };

  const tzCode = timeZone === 'Asia/Dhaka' ? 'BST' : timeZone === 'Asia/Kolkata' ? 'IST' : timeZone.split('/')[1] || 'UTC';
  const locationLabel = isBn
    ? location
      ? `${location.bengaliName} সময় (${tzCode})`
      : `কলকাতা সময় (${tzCode})`
    : location
    ? `${location.name} Time (${tzCode})`
    : `Kolkata Time (${tzCode})`;

  return (
    <div className={`bg-[#f4ebd9] dark:bg-[#1c1513] border-2 border-[#d4af37] px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl shadow-inner flex items-center space-x-2.5 sm:space-x-3 w-full sm:w-auto ${className}`}>
      <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#8b0000] dark:text-[#eac95b] animate-pulse shrink-0" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center space-x-1.5 text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider font-semibold">
          <span className="truncate max-w-[120px] sm:max-w-none">{locationLabel}</span>
          <span className="bg-[#8b0000]/10 dark:bg-[#fef08a]/10 text-[#8b0000] dark:text-[#fef08a] px-1.5 py-0.2 rounded text-[8.5px] sm:text-[9px] font-bold shrink-0">
            {isBn ? timePeriod.praharaNameBn : timePeriod.praharaNameEn}
          </span>
        </div>
        <div className="text-base sm:text-xl font-bold font-mono text-[#8b0000] dark:text-[#fef08a] tracking-wider truncate">
          {formatClockTime()}
        </div>
      </div>
    </div>
  );
};

export default LiveBengaliClock;

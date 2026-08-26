'use client';

import React, { useState } from 'react';
import {
  Compass,
  ArrowRightLeft,
  Calendar,
  Sparkles,
  Copy,
  Check,
} from 'lucide-react';
import { BENGALI_MONTHS, toBengaliDigits } from '@/lib/constants/panjikaData';
import { Language, LocationConfig, Numerals } from '@/types/panjika';
import { getBengaliDate, getDayPanjika } from '@/lib/panjikaEngine';
import { safeCopyToClipboard } from '@/lib/safeClient';

interface DateConverterProps {
  language: Language;
  numerals: Numerals;
  location: LocationConfig;
}

export const DateConverter: React.FC<DateConverterProps> = ({ language, numerals, location }) => {
  const [conversionMode, setConversionMode] = useState<'greg_to_bn' | 'bn_to_greg'>('greg_to_bn');
  
  // Gregorian input state
  const [gregDateStr, setGregDateStr] = useState('2026-08-22');

  // Bengali input state
  const [bnYear, setBnYear] = useState(1433);
  const [bnMonthIndex, setBnMonthIndex] = useState(4); // Bhadro
  const [bnDay, setBnDay] = useState(7);

  const [copied, setCopied] = useState(false);

  const isBn = language === 'bn';

  // Perform Greg to Bn calculation
  const selectedGregDate = new Date(gregDateStr + 'T12:00:00');
  const calculatedPanjika = getDayPanjika(selectedGregDate, location);

  // Perform Bn to Greg approximation
  const approximateGregYear = bnYear + 593;
  // approximate month mapping
  const approxGregDate = new Date(approximateGregYear, (bnMonthIndex + 3) % 12, bnDay, 12, 0, 0);

  const handleCopy = async (text: string) => {
    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="w-full">
      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[#e6d7bc] dark:border-[#443228] pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>{isBn ? 'দ্বিমুখী ক্যালেন্ডার কনভার্টার' : 'Dual-Way Calendar Converter'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a]">
              {isBn ? 'ইংরেজি ↔ বাংলা তারিখ রূপান্তর' : 'English ↔ Bengali Date Converter'}
            </h2>
          </div>

          {/* Mode Switcher */}
          <button
            onClick={() =>
              setConversionMode(conversionMode === 'greg_to_bn' ? 'bn_to_greg' : 'greg_to_bn')
            }
            className="flex items-center space-x-2 bg-[#f4ebd9] dark:bg-[#1a1210] hover:bg-[#eadbc8] text-[#8b0000] dark:text-[#fef08a] px-4 py-2 rounded-2xl border border-[#d4af37] text-xs font-bold shadow transition"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>
              {conversionMode === 'greg_to_bn'
                ? isBn ? 'মোড: ইংরেজি → বাংলা' : 'Mode: Eng → Bengali'
                : isBn ? 'মোড: বাংলা → ইংরেজি' : 'Mode: Bengali → Eng'}
            </span>
          </button>
        </div>

        {/* Converter Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          {/* Input Panel */}
          <div className="p-5 rounded-2xl bg-white/80 dark:bg-[#1a1210]/80 border-2 border-[#e6d7bc] dark:border-[#443228]">
            <h3 className="text-base font-serif font-bold text-[#8b0000] dark:text-[#fef08a] mb-4">
              {conversionMode === 'greg_to_bn'
                ? isBn ? '১. ইংরেজি (Gregorian) তারিখ নির্বাচন করুন' : '1. Select English Date'
                : isBn ? '১. বাংলা সন ও তারিখ নির্বাচন করুন' : '1. Select Bengali Date'}
            </h3>

            {conversionMode === 'greg_to_bn' ? (
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                  {isBn ? 'তারিখ বেছে নিন:' : 'Choose Date:'}
                </label>
                <input
                  type="date"
                  value={gregDateStr}
                  onChange={(e) => setGregDateStr(e.target.value)}
                  className="w-full bg-[#fbf8f1] dark:bg-[#150f0d] border-2 border-[#d4af37] rounded-xl p-3 text-sm font-semibold focus:outline-none"
                />
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {isBn ? 'দিন' : 'Day'}
                  </label>
                  <select
                    value={bnDay}
                    onChange={(e) => setBnDay(Number(e.target.value))}
                    className="w-full bg-[#fbf8f1] dark:bg-[#150f0d] border border-[#d4af37] rounded-xl p-2.5 text-xs font-bold"
                  >
                    {Array.from({ length: 31 }).map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {numerals === 'bn' ? toBengaliDigits(i + 1) : i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {isBn ? 'মাস' : 'Month'}
                  </label>
                  <select
                    value={bnMonthIndex}
                    onChange={(e) => setBnMonthIndex(Number(e.target.value))}
                    className="w-full bg-[#fbf8f1] dark:bg-[#150f0d] border border-[#d4af37] rounded-xl p-2.5 text-xs font-bold"
                  >
                    {BENGALI_MONTHS.map((m) => (
                      <option key={m.index} value={m.index}>
                        {m.nameBn}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-gray-600 mb-1">
                    {isBn ? 'সন' : 'Year'}
                  </label>
                  <select
                    value={bnYear}
                    onChange={(e) => setBnYear(Number(e.target.value))}
                    className="w-full bg-[#fbf8f1] dark:bg-[#150f0d] border border-[#d4af37] rounded-xl p-2.5 text-xs font-bold"
                  >
                    {[1430, 1431, 1432, 1433, 1434, 1435].map((y) => (
                      <option key={y} value={y}>
                        {numerals === 'bn' ? toBengaliDigits(y) : y} বঙ্গাব্দ
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}
          </div>

          {/* Result Output Panel */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#8b0000] to-[#590404] text-white border-2 border-[#d4af37] shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between text-xs text-[#fef08a] border-b border-[#d4af37]/40 pb-2">
                <span className="font-bold uppercase tracking-wider">
                  {isBn ? 'রূপান্তরিত সঠিক ফলাফল' : 'CONVERTED RESULT'}
                </span>
                <button
                  onClick={() => handleCopy(calculatedPanjika.bengaliDate.formattedBn)}
                  className="flex items-center space-x-1 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'কপি হয়েছে' : 'কপি করুন'}</span>
                </button>
              </div>

              {/* Big Result Text */}
              <div className="mt-4">
                <div className="text-2xl sm:text-3xl font-serif font-bold text-[#fef08a]">
                  {calculatedPanjika.bengaliDate.formattedBn}
                </div>
                <div className="text-xs text-[#fde68a] mt-1 font-medium">
                  {calculatedPanjika.bengaliDate.ritu.nameBn} • {calculatedPanjika.bengaliDate.barBn}
                </div>
              </div>

              {/* Panchang Limb Quick Details */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-xs text-[#fff]">
                <div className="p-2 rounded-xl bg-[#430202]/80 border border-[#d4af37]/40">
                  <span className="text-[#fde68a] block text-[10px]">তিথি:</span>
                  <span className="font-bold">{calculatedPanjika.tithi.nameBn}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#430202]/80 border border-[#d4af37]/40">
                  <span className="text-[#fde68a] block text-[10px]">নক্ষত্র:</span>
                  <span className="font-bold">{calculatedPanjika.nakshatra.nameBn}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#430202]/80 border border-[#d4af37]/40">
                  <span className="text-[#fde68a] block text-[10px]">সূর্যোদয়:</span>
                  <span className="font-bold">{toBengaliDigits(calculatedPanjika.sunrise)}</span>
                </div>
                <div className="p-2 rounded-xl bg-[#430202]/80 border border-[#d4af37]/40">
                  <span className="text-[#fde68a] block text-[10px]">অমৃতযোগ:</span>
                  <span className="font-bold">{calculatedPanjika.muhurats[0].startTime}</span>
                </div>
              </div>
            </div>

            {/* Eras Comparison Stamp */}
            <div className="mt-4 pt-3 border-t border-[#d4af37]/30 text-[11px] text-[#fcd34d] flex justify-between">
              <span>শকাব্দ: {toBengaliDigits(calculatedPanjika.bengaliDate.sakabdo)}</span>
              <span>ত্রিপুরাব্দ: {toBengaliDigits(calculatedPanjika.bengaliDate.tripurabdo)}</span>
              <span>কলিযুগাব্দ: {toBengaliDigits(5127)}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

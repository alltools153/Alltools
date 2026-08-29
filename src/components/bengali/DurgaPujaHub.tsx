'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame,
  Sparkles,
  Volume2,
  Calendar,
  Clock,
  Heart,
  ChevronDown,
  ChevronUp,
  CheckCircle,
} from 'lucide-react';
import { Language, Numerals } from '@/types/panjika';
import { toBengaliDigits } from '@/lib/constants/panjikaData';
import { AlponaBorderDivider, DiyaFlameIcon, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';
import { soundFx } from '@/lib/audioSynthesizer';

interface DurgaPujaHubProps {
  language: Language;
  numerals: Numerals;
}

export const DurgaPujaHub: React.FC<DurgaPujaHubProps> = ({ language, numerals }) => {
  const isBn = language === 'bn';

  // Target date for Durga Shashthi 2026 (October 16, 2026)
  const targetDate = new Date(2026, 9, 16, 6, 0, 0);

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [litLampsCount, setLitLampsCount] = useState(24);
  const [activeRitualTab, setActiveRitualTab] = useState<string>('ashtami');
  const [isPlayingDhak, setIsPlayingDhak] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();
      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlayDhak = () => {
    soundFx.playDhak();
    setIsPlayingDhak(true);
    setTimeout(() => setIsPlayingDhak(false), 2000);
  };

  const pujaDays = [
    {
      id: 'mahalaya',
      titleBn: 'মহালয়া',
      titleEn: 'Mahalaya',
      dateBn: '২২ আশ্বিন (৯ অক্টোবর)',
      dateEn: '9 October 2026',
      tagBn: 'দেবীপক্ষ প্রারম্ভ',
      highlightsBn: [
        'ভোরবেলা বীরেন্দ্রকৃষ্ণ ভদ্রের চণ্ডীপাঠ ও মহিষাসুরমর্দিনী শ্রবণ',
        'গঙ্গাবক্ষে পূর্বপুরুষগণের উদ্দেশ্যে পবিত্র তিলতর্পণ সমাপন',
        'মর্ত্যধামে দেবী দুর্গার শুভাগমন আহ্বান',
      ],
      mantraBn: 'যা দেবী সর্বভূতেষু মাতৃরূপেণ সংস্থিতা। নমস্তস্যৈ নমস্তস্যৈ নমস্তস্যৈ নমো নমঃ॥',
    },
    {
      id: 'shashthi',
      titleBn: 'মহা ষষ্ঠী',
      titleEn: 'Maha Shashthi',
      dateBn: '২৯ আশ্বিন (১৬ অক্টোবর)',
      dateEn: '16 October 2026',
      tagBn: 'দেবী বোধন ও অধিবাস',
      highlightsBn: [
        'বিল্ববৃক্ষমূলে সায়ংকালে দেবীর বোধন ও আমন্ত্রণ',
        'প্রতিমার চক্ষুদান ও প্রাণ প্রতিষ্ঠা',
        'ঢাকের বোলে মণ্ডপে মণ্ডপে দেবীর আনন্দোৎসব শুরু',
      ],
      mantraBn: 'ওঁ ঐং হ্রীং শ্রীং মহিষমর্দিন্যৈ নমঃ॥',
    },
    {
      id: 'saptami',
      titleBn: 'মহা সপ্তমী',
      titleEn: 'Maha Saptami',
      dateBn: '৩০ আশ্বিন (১৭ অক্টোবর)',
      dateEn: '17 October 2026',
      tagBn: 'নবপত্রিকা প্রবেশ ও মহাস্নান',
      highlightsBn: [
        'প্রভাতে নয়টি উদ্ভিদের সমন্বয়ে নবপত্রিকা (কলাবউ) স্নান ও অভিষেক',
        'সপ্তমী বিহিত পূজা ও পুষ্পাঞ্জলি প্রদান',
        'সন্ধ্যায় ধুনুচি নৃত্য ও মহতী আরতি',
      ],
      mantraBn: 'নবপত্রিকাবাসিন্যৈ নবদুর্গায়ৈ নমঃ॥',
    },
    {
      id: 'ashtami',
      titleBn: 'মহা অষ্টমী ও সন্ধিপূজা',
      titleEn: 'Maha Ashtami & Sandhi Puja',
      dateBn: '৩১ আশ্বিন (১৮ অক্টোবর)',
      dateEn: '18 October 2026',
      tagBn: '১০৮ পদ্ম ও প্রদীপ',
      highlightsBn: [
        'সকালবেলা মহাষ্টমী পূজা ও উপবাসীদের মহাশ্রদ্ধায় পুষ্পাঞ্জলি',
        'বেলা ১১:৩০ টায় জগজ্জননী কুমারী মায়ের পূজা',
        'সন্ধ্যা ০৬:৪৫ - ০৭:৩৩ মিনিটে মহা সন্ধিপূজা (১০৮টি নীলপদ্ম ও ১০৮ ঘৃতপ্রদীপ প্রজ্বলন)',
      ],
      mantraBn: 'জয়ন্তী মঙ্গলা কালী ভদ্রকালী কপালিনী। দুর্গা শিবা ক্ষমা ধাত্রী স্বাহা স্বধা নমোঽস্তু তে॥',
    },
    {
      id: 'navami',
      titleBn: 'মহা নবমী',
      titleEn: 'Maha Navami',
      dateBn: '১ কার্তিক (১৯ অক্টোবর)',
      dateEn: '19 October 2026',
      tagBn: 'মহাহোম ও বলিদান',
      highlightsBn: [
        'মহিষাসুর বধের আনন্দোৎসব ও চণ্ডী যজ্ঞ সমাপন',
        'মহাহোম পূর্ণাহুতি ও নবমী মহাভোগ বিতরণ',
        'সন্ধ্যায় আরতি ও সঙ্গীতানুষ্ঠান',
      ],
      mantraBn: 'সর্বমঙ্গলমঙ্গল্যে শিবে সর্বার্থসাধিকে। শরণ্যে ত্র্যম্বকে গৌরি নারায়ণি নমোঽস্তু তে॥',
    },
    {
      id: 'dashami',
      titleBn: 'বিজয়া দশমী ও সিঁদুর খেলা',
      titleEn: 'Vijaya Dashami',
      dateBn: '২ কার্তিক (২০ অক্টোবর)',
      dateEn: '20 October 2026',
      tagBn: 'দেবী বরণ ও শুভ বিজয়া',
      highlightsBn: [
        'দর্পণে দেবীর প্রতিবিম্ব বিসর্জন ও অপরাজিতা পূজা',
        'সধবা নারীগণের পান-মিষ্টিতে দেবী বরণ ও সিঁদুর খেলা',
        'গঙ্গাবক্ষে প্রতিমা নিরঞ্জন ও শুভ বিজয়ার কোলাকুলি-প্রণাম ও মিষ্টিমুখ',
      ],
      mantraBn: 'বিসর্জয়ামি দেবেশাং শুভায় চ ভবায় চ। পুনরাগমনীয় চ পূজাং গৃহ্নীত্ব মাং শবে॥',
    },
  ];

  return (
    <section className="w-full">
      <div className="royal-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border-2 border-[#d4af37] shadow-2xl relative overflow-hidden">
        {/* Top Visual Festive Banner */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs font-bold shadow-md mb-2">
            <DiyaFlameIcon size={16} />
            <span>{isBn ? 'শারদীয়া দুর্গোৎসব ১৪৩৩ / ২০২৬' : 'Sharadiya Durga Puja 2026'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-serif font-black text-[#8b0000] dark:text-[#fef08a] tracking-wide leading-tight">
            {isBn ? 'মা আসছেন! শারদীয়া দুর্গাপূজা' : 'Ma Durga Arrival Countdown'}
          </h2>
          <p className="text-[11px] sm:text-sm text-gray-600 dark:text-gray-300 mt-1">
            {isBn
              ? 'কাশফুলের শুভ্রতা, শিউলির সুবাস আর ঢাকের মধুর আওয়াজে মায়ের আবাহন।'
              : 'The pristine white Kash blossoms, fragrance of Shiuli, and reverberating Dhak rhythms.'}
          </p>
        </div>

        {/* Live Countdown Timer Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-4 max-w-xl mx-auto mt-4 sm:mt-6">
          <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#8b0000] to-[#5a0202] text-white text-center border sm:border-2 border-[#d4af37] shadow-md">
            <div suppressHydrationWarning className="text-lg sm:text-4xl font-bold font-serif text-[#fef08a]">
              {numerals === 'bn' ? toBengaliDigits(timeLeft.days) : timeLeft.days}
            </div>
            <div className="text-[8.5px] sm:text-xs text-[#fde68a] uppercase font-semibold mt-0.5 sm:mt-1">
              {isBn ? 'দিন' : 'DAYS'}
            </div>
          </div>

          <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#8b0000] to-[#5a0202] text-white text-center border sm:border-2 border-[#d4af37] shadow-md">
            <div suppressHydrationWarning className="text-lg sm:text-4xl font-bold font-serif text-[#fef08a]">
              {numerals === 'bn' ? toBengaliDigits(timeLeft.hours) : timeLeft.hours}
            </div>
            <div className="text-[8.5px] sm:text-xs text-[#fde68a] uppercase font-semibold mt-0.5 sm:mt-1">
              {isBn ? 'ঘণ্টা' : 'HOURS'}
            </div>
          </div>

          <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#8b0000] to-[#5a0202] text-white text-center border sm:border-2 border-[#d4af37] shadow-md">
            <div suppressHydrationWarning className="text-lg sm:text-4xl font-bold font-serif text-[#fef08a]">
              {numerals === 'bn' ? toBengaliDigits(timeLeft.minutes) : timeLeft.minutes}
            </div>
            <div className="text-[8.5px] sm:text-xs text-[#fde68a] uppercase font-semibold mt-0.5 sm:mt-1">
              {isBn ? 'মিনিট' : 'MINUTES'}
            </div>
          </div>

          <div className="p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-b from-[#8b0000] to-[#5a0202] text-white text-center border sm:border-2 border-[#d4af37] shadow-md">
            <div suppressHydrationWarning className="text-lg sm:text-4xl font-bold font-serif text-[#fef08a]">
              {numerals === 'bn' ? toBengaliDigits(timeLeft.seconds) : timeLeft.seconds}
            </div>
            <div className="text-[8.5px] sm:text-xs text-[#fde68a] uppercase font-semibold mt-0.5 sm:mt-1">
              {isBn ? 'সেকেন্ড' : 'SECONDS'}
            </div>
          </div>
        </div>

        {/* Audio Dhak Trigger Button */}
        <div className="flex justify-center mt-3.5 sm:mt-5">
          <button
            onClick={handlePlayDhak}
            className={`flex items-center space-x-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all transform active:scale-95 ${
              isPlayingDhak
                ? 'bg-amber-400 text-[#430202] scale-105 ring-4 ring-amber-300'
                : 'bg-[#8b0000] hover:bg-[#6b0707] text-[#fef08a] border-2 border-[#d4af37]'
            }`}
          >
            <Volume2 className="w-4 h-4 shrink-0" />
            <span>
              {isPlayingDhak
                ? isBn
                  ? 'ঢাক বাজছে! তা ধিং তা ধিং...'
                  : 'Dhak Playing!'
                : isBn
                ? 'ঢাকের আওয়াজ শুনুন'
                : 'Play Festive Dhak'}
            </span>
          </button>
        </div>

        <AlponaBorderDivider color="#d4af37" className="my-4 sm:my-6" />

        {/* Sandhi Puja Special Interactive Feature */}
        <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-[#2a1b14] dark:to-[#381f15] border-2 border-[#d4af37] shadow-md my-4 sm:my-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2.5 sm:gap-3 border-b border-[#d4af37]/40 pb-2.5 sm:pb-3">
            <div>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="bg-amber-600 text-white text-[10px] sm:text-[11px] font-bold px-2 sm:px-2.5 py-0.5 rounded-full">
                  {isBn ? 'সন্ধিপূজা বিশেষ মুহূর্ত' : 'Sandhi Puja Window'}
                </span>
                <span className="text-[11px] sm:text-xs text-amber-900 dark:text-amber-300 font-semibold">
                  {isBn ? '১৮ অক্টোবর ২০২৬ • সন্ধ্যা ০৬:৪৫ - ০৭:৩৩' : '18 Oct 2026 • 6:45 PM - 7:33 PM'}
                </span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-1">
                {isBn ? 'সন্ধিপূজা ও ১০৮ নীলপদ্ম-প্রদীপ সাধনা' : 'Sandhi Puja 108 Lotuses & Lamps'}
              </h3>
            </div>

            <div className="text-xs text-gray-700 dark:text-gray-300 flex items-center space-x-2">
              <span>{isBn ? 'প্রদীপ:' : 'Lamps:'}</span>
              <span className="font-bold text-sm sm:text-base text-[#8b0000] dark:text-[#fef08a]">
                {numerals === 'bn' ? toBengaliDigits(litLampsCount) : litLampsCount} / ১০৮
              </span>
              <button
                onClick={() => setLitLampsCount(Math.min(108, litLampsCount + 12))}
                className="bg-amber-600 hover:bg-amber-700 text-white px-2.5 py-1 rounded-lg text-xs font-bold active:scale-95 transition"
              >
                + প্রদীপ জ্বালাও
              </button>
            </div>
          </div>

          <p className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
            {isBn
              ? 'অষ্টমী তিথির শেষ ২৪ মিনিট এবং নবমী তিথির প্রথম ২৪ মিনিট—মোট ৪৮ মিনিটের এই পুণ্যলগ্নে মা দুর্গা চণ্ডিকা রূপে চণ্ড ও মুণ্ডকে বধ করেছিলেন। এই সময়ে দেবীর চরণে ১০৮টি নীলপদ্ম ও ১০৮টি ঘৃতপ্রদীপ নিবেদন করা হয়।'
              : 'The sacred 48-minute intersection where Ashtami merges with Navami. In this potent time, Ma Durga assumed the wrathful form of Chamunda to vanquish Chanda and Munda.'}
          </p>
        </div>

        {/* Day-by-Day Puja Navigation */}
        <div className="mt-4 sm:mt-6">
          <h3 className="text-base sm:text-lg font-serif font-bold text-[#8b0000] dark:text-[#fef08a] mb-2.5 sm:mb-4">
            {isBn ? 'দুর্গাপূজার প্রতিটি দিনের তাৎপর্য ও আচারবিধি' : 'Day-by-Day Rituals & Significance'}
          </h3>

          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-1.5 sm:gap-2 mb-3 sm:mb-4">
            {pujaDays.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveRitualTab(day.id)}
                className={`p-2 sm:p-3 rounded-xl sm:rounded-2xl border text-center transition-all text-xs flex flex-col justify-between active:scale-95 ${
                  activeRitualTab === day.id
                    ? 'bg-[#8b0000] text-white border-[#d4af37] shadow-lg scale-[1.02] font-bold'
                    : 'bg-[#ffffff]/80 dark:bg-[#1a1210] border-[#e6d7bc] dark:border-[#443228] text-gray-800 dark:text-gray-200 hover:bg-[#f4ebd9]'
                }`}
              >
                <span className="font-serif text-xs sm:text-sm block truncate">{day.titleBn}</span>
                <span className="text-[9px] sm:text-[10px] text-amber-300 block mt-0.5 truncate">{day.dateBn.split(' ')[0]}</span>
              </button>
            ))}
          </div>

          {/* Selected Puja Day Details */}
          {(() => {
            const selected = pujaDays.find((d) => d.id === activeRitualTab) || pujaDays[3];
            return (
              <div className="p-3.5 sm:p-5 rounded-xl sm:rounded-2xl bg-[#ffffff]/90 dark:bg-[#201714] border border-[#e6d7bc] dark:border-[#443228] shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#e6d7bc] dark:border-[#443228] pb-2.5 sm:pb-3 mb-2.5 sm:mb-3">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a]">
                      {isBn ? selected.titleBn : selected.titleEn}
                    </h4>
                    <span className="text-[11px] sm:text-xs text-amber-700 dark:text-amber-400 font-medium">
                      {isBn ? selected.dateBn : selected.dateEn} • {selected.tagBn}
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 sm:space-y-2 mt-2 sm:mt-3">
                  <div className="text-xs font-bold text-gray-700 dark:text-gray-300">
                    {isBn ? 'প্রধান আচার ও নিয়মাবলী:' : 'Key Rituals:'}
                  </div>
                  {selected.highlightsBn.map((item, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-[11px] sm:text-xs text-gray-700 dark:text-gray-300">
                      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                {/* Chandi Mantra */}
                <div className="mt-3 sm:mt-4 p-2.5 sm:p-3.5 rounded-xl bg-[#f4ebd9]/80 dark:bg-[#150f0d] border border-[#d4af37]/40 text-center">
                  <div className="text-[10px] sm:text-[11px] text-amber-900 dark:text-amber-300 font-bold uppercase tracking-wider mb-1">
                    {isBn ? 'পবিত্র পুষ্পাঞ্জলি ও চণ্ডী শ্লোক' : 'Sacred Pushpanjali Shloka'}
                  </div>
                  <div className="font-serif text-xs sm:text-sm font-semibold text-[#8b0000] dark:text-[#fef08a] italic leading-relaxed">
                    {selected.mantraBn}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
};

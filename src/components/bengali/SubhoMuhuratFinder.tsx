'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Heart,
  Home,
  Baby,
  Scroll,
  Briefcase,
  Car,
  Calendar,
  Clock,
  CheckCircle,
  Share2,
} from 'lucide-react';
import { AUSPICIOUS_CEREMONY_DATES } from '@/lib/festivalsData';
import { Language, Numerals } from '@/types/panjika';
import { AlponaBorderDivider } from './AlponaMotifs';

interface SubhoMuhuratFinderProps {
  language: Language;
  numerals: Numerals;
}

export const SubhoMuhuratFinder: React.FC<SubhoMuhuratFinderProps> = ({ language, numerals }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('bibaho');
  const [searchMonth, setSearchMonth] = useState<string>('all');

  const isBn = language === 'bn';

  const categories = [
    { id: 'bibaho', labelBn: 'শুভ বিবাহ লগ্ন', labelEn: 'Marriage Dates', icon: Heart },
    { id: 'griha_pravesh', labelBn: 'গৃহপ্রবেশ', labelEn: 'Griha Pravesh', icon: Home },
    { id: 'annaprashan', labelBn: 'অন্নপ্রাশন (মুখেভাত)', labelEn: 'Annaprashan', icon: Baby },
    { id: 'upanayan', labelBn: 'উপনয়ন (পৈতে)', labelEn: 'Upanayan', icon: Scroll },
    { id: 'sadhbhakhon', labelBn: 'সাধভক্ষণ', labelEn: 'Sadhbhakhon', icon: Sparkles },
  ];

  const filteredDates = AUSPICIOUS_CEREMONY_DATES.filter((item) => {
    if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
    return true;
  });

  return (
    <section className="w-full">
      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 border-b border-[#e6d7bc] dark:border-[#443228] pb-4">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isBn ? 'সনাতন শুভ লগ্ন নির্দেশিকা' : 'Vedic Auspicious Almanac'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a]">
              {isBn ? 'শুভ দিন ও মাঙ্গলিক লগ্ন সময়সূচী' : 'Auspicious Ceremony Dates & Lagna'}
            </h2>
          </div>
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center space-x-2 overflow-x-auto py-4 scrollbar-none">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#8b0000] text-white border-2 border-[#d4af37] shadow-md scale-105'
                    : 'bg-[#ffffff]/80 dark:bg-[#1a1210] text-gray-700 dark:text-gray-300 border border-[#e6d7bc] dark:border-[#443228] hover:bg-[#f4ebd9]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-300' : 'text-[#8b0000]'}`} />
                <span>{isBn ? cat.labelBn : cat.labelEn}</span>
              </button>
            );
          })}
        </div>

        {/* Auspicious Dates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2">
          {filteredDates.map((record) => (
            <div
              key={record.id}
              className="p-5 rounded-2xl bg-white/90 dark:bg-[#1a1210]/90 border-2 border-[#e6d7bc] dark:border-[#443228] hover:border-[#d4af37] hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="bg-amber-100 dark:bg-[#3d271d] text-amber-900 dark:text-amber-200 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                    {record.categoryBn}
                  </span>
                  <span className="text-xs text-gray-500 font-semibold">{record.gregorianDateStr}</span>
                </div>

                <h3 className="text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-2">
                  {record.bengaliDateStr}
                </h3>

                <div className="mt-2 space-y-1 text-xs text-gray-700 dark:text-gray-300">
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">তিথি:</span> {record.tithiBn}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-900 dark:text-white">নক্ষত্র:</span> {record.nakshatraBn}
                  </div>
                </div>

                {/* Lagna Timings */}
                <div className="mt-3 p-2.5 rounded-xl bg-[#f4ebd9]/60 dark:bg-[#261b17] border border-[#d4af37]/30 text-xs">
                  <div className="font-bold text-[#8b0000] dark:text-[#fef08a] mb-1 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{isBn ? 'শুভ লগ্ন সময়সূচী:' : 'Lagna Windows:'}</span>
                  </div>
                  {record.lagnaTimingsBn.map((timing, i) => (
                    <div key={i} className="text-gray-800 dark:text-gray-200 font-medium pl-1">
                      • {timing}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-gray-100 dark:border-gray-800 text-[11px] text-gray-500 dark:text-gray-400">
                {record.notesBn}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

'use client';

import React, { useState } from 'react';
import {
  Search,
  BookOpen,
  Calendar,
  Sparkles,
  ShieldCheck,
  CheckCircle,
  Filter,
} from 'lucide-react';
import { EKADASHI_LIST, FESTIVALS_DATABASE } from '@/lib/festivalsData';
import { Festival, Language, Numerals } from '@/types/panjika';

interface FestivalDirectoryProps {
  language: Language;
  numerals: Numerals;
}

export const FestivalDirectory: React.FC<FestivalDirectoryProps> = ({ language, numerals }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeTab, setActiveTab] = useState<'festivals' | 'ekadashi'>('festivals');

  const isBn = language === 'bn';

  const filteredFestivals = FESTIVALS_DATABASE.filter((f) => {
    if (activeCategory !== 'all' && f.category !== activeCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        f.nameBn.toLowerCase().includes(q) ||
        f.nameEn.toLowerCase().includes(q) ||
        f.descriptionBn.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <section className="w-full">
      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        {/* Header & Mode Switcher */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[#e6d7bc] dark:border-[#443228] pb-5">
          <div>
            <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1.5">
              <BookOpen className="w-3.5 h-3.5" />
              <span>{isBn ? 'উৎসব ও ব্রত কোষ' : 'Festivals & Vratas Almanac'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a]">
              {isBn ? 'বাঙালির বারো মাসে তেরো পার্বণ' : 'Bengali Festival & Fasting Catalog'}
            </h2>
          </div>

          {/* Tab Switcher: All Festivals vs Ekadashi Special */}
          <div className="flex items-center space-x-2 bg-[#f4ebd9] dark:bg-[#1a1210] p-1.5 rounded-2xl border border-[#d4af37]/40">
            <button
              onClick={() => setActiveTab('festivals')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'festivals'
                  ? 'bg-[#8b0000] text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-[#eadbc8]'
              }`}
            >
              🌺 {isBn ? 'সকল উৎসব ও পূজা' : 'All Festivals'}
            </button>
            <button
              onClick={() => setActiveTab('ekadashi')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ekadashi'
                  ? 'bg-[#8b0000] text-white shadow-md'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-[#eadbc8]'
              }`}
            >
              🍃 {isBn ? 'একাদশী ও পারণ তালিকা' : 'Ekadashi Schedule'}
            </button>
          </div>
        </div>

        {activeTab === 'festivals' ? (
          <>
            {/* Search & Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 my-5">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? 'উৎসবের নাম দিয়ে খুঁজুন...' : 'Search festivals...'}
                  className="w-full pl-9 pr-4 py-2 bg-white dark:bg-[#150f0d] border border-[#e6d7bc] dark:border-[#443228] rounded-xl text-xs focus:outline-none focus:border-[#8b0000]"
                />
              </div>

              <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-1">
                {['all', 'puja', 'fasting', 'cultural'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                      activeCategory === cat
                        ? 'bg-[#8b0000] text-white'
                        : 'bg-[#f4ebd9] dark:bg-[#1a1210] text-gray-700 dark:text-gray-300 hover:bg-[#eadbc8]'
                    }`}
                  >
                    {cat === 'all'
                      ? isBn ? 'সকল' : 'All'
                      : cat === 'puja'
                      ? isBn ? 'পূজা পার্বণ' : 'Pujas'
                      : cat === 'fasting'
                      ? isBn ? 'ব্রত ও উপবাস' : 'Fasting'
                      : isBn ? 'সাংস্কৃতিক' : 'Cultural'}
                  </button>
                ))}
              </div>
            </div>

            {/* Festivals Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFestivals.map((fest) => (
                <div
                  key={fest.id}
                  className="p-5 rounded-2xl bg-white/90 dark:bg-[#1a1210]/90 border-2 border-[#e6d7bc] dark:border-[#443228] hover:border-[#d4af37] hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-red-100 dark:bg-[#3d1815] text-red-800 dark:text-red-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                        {fest.category.toUpperCase()}
                      </span>
                      <span className="text-xs font-semibold text-gray-500">{fest.dateStr}</span>
                    </div>

                    <h3 className="text-lg font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-2">
                      {fest.nameBn}
                    </h3>
                    <div className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-0.5">
                      {fest.bengaliDateStr} • {fest.tithiRequirementBn}
                    </div>

                    <p className="text-xs text-gray-600 dark:text-gray-300 mt-2 line-clamp-3">
                      {fest.descriptionBn}
                    </p>

                    {fest.pujaTimings && fest.pujaTimings.length > 0 && (
                      <div className="mt-3 p-2.5 rounded-xl bg-[#f4ebd9]/60 dark:bg-[#251a16] border border-[#d4af37]/30 text-xs">
                        <div className="font-bold text-[#8b0000] dark:text-[#fef08a] mb-1">
                          {isBn ? 'পূজা সময়সূচী:' : 'Timings:'}
                        </div>
                        {fest.pujaTimings.map((t, idx) => (
                          <div key={idx} className="text-gray-800 dark:text-gray-200">
                            • {t.labelBn}: <span className="font-bold">{t.time}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Ekadashi Special Full-Year Table */
          <div className="mt-5">
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              {isBn
                ? 'শ্রীশ্রী হরিভক্তিবিলাসোক্ত পূর্ণাঙ্গ একাদশী ব্রত ও পারণ সময়সূচী। নির্জলা বা ফলাহার উপবাসের জন্য অতীব পুণ্যদায়ক।'
                : 'Complete Ekadashi fasting dates, auspicious parana time windows, and Vedic spiritual merits.'}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="bg-[#8b0000] text-[#fef08a] font-serif">
                    <th className="p-3 rounded-tl-xl">{isBn ? 'একাদশীর নাম' : 'Ekadashi'}</th>
                    <th className="p-3">{isBn ? 'মাস ও পক্ষ' : 'Month & Paksha'}</th>
                    <th className="p-3">{isBn ? 'তারিখ' : 'Date'}</th>
                    <th className="p-3">{isBn ? 'পারণ সময়সূচী' : 'Parana Window'}</th>
                    <th className="p-3 rounded-tr-xl">{isBn ? 'ব্রত মাহাত্ম্য' : 'Significance'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#e6d7bc] dark:divide-[#443228] bg-white/90 dark:bg-[#1a1210]/90">
                  {EKADASHI_LIST.map((e) => (
                    <tr key={e.id} className="hover:bg-[#fbf5e6] dark:hover:bg-[#281b16] transition">
                      <td className="p-3 font-bold font-serif text-[#8b0000] dark:text-[#fef08a]">
                        {e.nameBn}
                      </td>
                      <td className="p-3 text-gray-700 dark:text-gray-300">
                        {e.bengaliMonthBn} ({e.pakshaBn})
                      </td>
                      <td className="p-3 font-semibold text-gray-900 dark:text-white">
                        {e.gregorianDateStr}
                      </td>
                      <td className="p-3 text-emerald-800 dark:text-emerald-300 font-medium">
                        {e.paranaTimeBn}
                      </td>
                      <td className="p-3 text-gray-600 dark:text-gray-400">
                        {e.significanceBn}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

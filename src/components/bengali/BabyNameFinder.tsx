'use client';

import React, { useState, useEffect } from 'react';
import {
  UserCheck,
  Search,
  Heart,
  Sparkles,
  Bookmark,
  Filter,
} from 'lucide-react';
import { BABY_NAMES_DATABASE } from '@/lib/babyNamesData';
import { NAKSHATRAS, RASHIS } from '@/lib/constants/panjikaData';
import { BabyNameRecord, Language, Numerals } from '@/types/panjika';

interface BabyNameFinderProps {
  language: Language;
  numerals: Numerals;
}

export const BabyNameFinder: React.FC<BabyNameFinderProps> = ({ language, numerals }) => {
  const [searchLetter, setSearchLetter] = useState('all');
  const [genderFilter, setGenderFilter] = useState<'all' | 'boy' | 'girl'>('all');
  const [rashiFilter, setRashiFilter] = useState('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const isBn = language === 'bn';

  useEffect(() => {
    try {
      const stored = localStorage.getItem('panjika_fav_baby_names');
      if (stored) setFavorites(JSON.parse(stored));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleFavorite = (id: string) => {
    const next = favorites.includes(id) ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    try {
      localStorage.setItem('panjika_fav_baby_names', JSON.stringify(next));
    } catch (e) {
      console.error(e);
    }
  };

  const letters = ['all', 'অ', 'আ', 'ই', 'উ', 'ক', 'চ', 'ত', 'দ', 'ন', 'প', 'ব', 'ম', 'র', 'শ', 'স', 'হ'];

  const filteredNames = BABY_NAMES_DATABASE.filter((name) => {
    if (genderFilter !== 'all' && name.gender !== genderFilter) return false;
    if (searchLetter !== 'all' && name.startingLetterBn !== searchLetter) return false;
    if (rashiFilter !== 'all' && name.rashiBn !== rashiFilter) return false;
    return true;
  });

  return (
    <section className="w-full">
      <div className="royal-card rounded-2xl sm:rounded-3xl p-3.5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        {/* Header */}
        <div className="border-b border-[#e6d7bc] dark:border-[#443228] pb-3 sm:pb-4">
          <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-0.5 sm:py-1 rounded-full text-[11px] sm:text-xs font-bold shadow-sm mb-1.5">
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isBn ? 'রাশি ও নক্ষত্র পদাক্ষর নামকোষ' : 'Vedic Baby Naming Guide'}</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a] leading-tight">
            {isBn ? 'রাশি ও নক্ষত্র অনুযায়ী শিশুর সুন্দর নাম' : 'Aesthetic Bengali Baby Names'}
          </h2>
          <p className="text-[11px] sm:text-xs text-gray-600 dark:text-gray-300 mt-1">
            {isBn
              ? 'বাঙালির ঐতিহ্য, বৈদিক সংস্কার ও আধুনিক রুচিসম্মত অর্থপূর্ণ সুন্দর নাম খুঁজুন।'
              : 'Discover authentic, meaningful, and melodious Bengali baby names categorized by zodiac and starting syllables.'}
          </p>
        </div>

        {/* Filter Controls */}
        <div className="space-y-2.5 sm:space-y-3 my-3.5 sm:my-5">
          {/* Gender Filter */}
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 mr-1 text-[11px] sm:text-xs">
              {isBn ? 'লিঙ্গ:' : 'Gender:'}
            </span>
            {(['all', 'boy', 'girl'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-xl text-xs font-bold transition active:scale-95 ${
                  genderFilter === g
                    ? 'bg-[#8b0000] text-white shadow-sm'
                    : 'bg-[#f4ebd9] dark:bg-[#1a1210] text-gray-700 dark:text-gray-300 hover:bg-[#eadbc8]'
                }`}
              >
                {g === 'all' ? (isBn ? 'সকল' : 'All') : g === 'boy' ? (isBn ? 'পুত্র' : 'Boy') : (isBn ? 'কন্যা' : 'Girl')}
              </button>
            ))}
          </div>

          {/* Bengali Starting Letters Bar */}
          <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 no-scrollbar touch-scroll -mx-2 px-2 sm:mx-0 sm:px-0">
            <span className="text-[11px] sm:text-xs font-semibold text-gray-600 dark:text-gray-400 mr-1 whitespace-nowrap">
              {isBn ? 'আদ্যক্ষর:' : 'Letter:'}
            </span>
            {letters.map((lettr) => (
              <button
                key={lettr}
                onClick={() => setSearchLetter(lettr)}
                className={`w-7 h-7 rounded-lg text-xs font-serif font-bold transition shrink-0 active:scale-95 ${
                  searchLetter === lettr
                    ? 'bg-[#8b0000] text-white'
                    : 'bg-[#f4ebd9] dark:bg-[#1a1210] text-gray-800 dark:text-gray-200 hover:bg-[#eadbc8]'
                }`}
              >
                {lettr === 'all' ? 'সব' : lettr}
              </button>
            ))}
          </div>
        </div>

        {/* Names Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredNames.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div
                key={item.id}
                className="p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white/90 dark:bg-[#1a1210]/90 border-2 border-[#e6d7bc] dark:border-[#443228] hover:border-[#d4af37] hover:shadow-lg transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="bg-amber-100 dark:bg-[#3d271d] text-amber-900 dark:text-amber-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                      {item.gender === 'boy' ? 'পুত্র' : 'কন্যা'} • {item.popularityTag}
                    </span>
                    <button
                      onClick={() => toggleFavorite(item.id)}
                      className="p-1 rounded-full text-rose-500 hover:bg-rose-50 dark:hover:bg-[#281816] active:scale-95"
                      title="পছন্দের তালিকায় রাখুন"
                    >
                      <Heart className={`w-4 h-4 ${isFav ? 'fill-rose-600 text-rose-600' : ''}`} />
                    </button>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mt-1.5 sm:mt-2">
                    {item.nameBn}{' '}
                    <span className="text-xs font-sans font-normal text-gray-500">
                      ({item.nameEn})
                    </span>
                  </h3>

                  <div className="text-xs text-amber-800 dark:text-amber-300 font-medium mt-0.5">
                    রাশি: {item.rashiBn} • নক্ষত্র: {item.nakshatraBn}
                  </div>

                  <p className="text-[11px] sm:text-xs text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                    <span className="font-semibold text-gray-900 dark:text-white">অর্থ:</span> {item.meaningBn}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

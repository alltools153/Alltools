'use client';

import React, { useState } from 'react';
import {
  Calendar,
  Compass,
  Flame,
  Globe,
  Heart,
  Moon,
  Sparkles,
  Sun,
  UserCheck,
  Volume2,
  Printer,
  ChevronDown,
  Clock,
  BookOpen,
} from 'lucide-react';
import { LOCATIONS, toBengaliDigits } from '@/lib/constants/panjikaData';
import { CalculationMethod, Language, LocationConfig, Numerals, ThemeMode } from '@/types/panjika';
import { AlponaMandala, DiyaFlameIcon, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';
import { soundFx } from '@/lib/audioSynthesizer';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  numerals: Numerals;
  setNumerals: (num: Numerals) => void;
  location: LocationConfig;
  setLocation: (loc: LocationConfig) => void;
  calcMethod: CalculationMethod;
  setCalcMethod: (method: CalculationMethod) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPrintClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  numerals,
  setNumerals,
  location,
  setLocation,
  calcMethod,
  setCalcMethod,
  theme,
  setTheme,
  activeTab,
  setActiveTab,
  onPrintClick,
}) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const isBn = language === 'bn';

  const navItems = [
    { id: 'live', labelBn: 'আজকের পঞ্জিকা', labelEn: 'Today Panjika', icon: Clock },
    { id: 'calendar', labelBn: 'ক্যালেন্ডার', labelEn: 'Calendar', icon: Calendar },
    { id: 'durga', labelBn: 'দুর্গাপূজা ২০২৬', labelEn: 'Durga Puja', icon: Flame },
    { id: 'muhurat', labelBn: 'শুভ লগ্ন ও দিন', labelEn: 'Subha Muhurat', icon: Sparkles },
    { id: 'festivals', labelBn: 'উৎসব ও ব্রত', labelEn: 'Festivals', icon: BookOpen },
    { id: 'converter', labelBn: 'দিন রূপান্তর', labelEn: 'Date Converter', icon: Compass },
    { id: 'matchmaking', labelBn: 'যোটক বিচার', labelEn: 'Kundali Milan', icon: Heart },
    { id: 'babynames', labelBn: 'শিশুর নাম', labelEn: 'Baby Names', icon: UserCheck },
    { id: 'rashiphal', labelBn: 'আজকের রাশিফল', labelEn: 'Horoscope', icon: Moon },
    { id: 'about', labelBn: 'আমাদের কথা (ঐতিহ্য)', labelEn: 'About Us', icon: Sparkles },
  ];

  return (
    <header className="w-full bg-gradient-to-b from-[#8b0000] via-[#730505] to-[#590404] text-[#fff8ea] border-b-4 border-[#d4af37] shadow-2xl relative overflow-hidden select-none">
      {/* Top Zari Pattern Border */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#d4af37] via-[#fef08a] to-[#d4af37] opacity-90" />

      {/* Decorative Corner Alpona Mandalas */}
      <div className="absolute -left-12 -top-12 opacity-15 pointer-events-none">
        <AlponaMandala size={160} color="#fef08a" />
      </div>
      <div className="absolute -right-12 -top-12 opacity-15 pointer-events-none">
        <AlponaMandala size={160} color="#fef08a" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm border-b border-[#d4af37]/30 pb-3 mb-4">
          {/* Location Selector */}
          <button
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center space-x-1.5 bg-[#430202]/70 hover:bg-[#430202] text-[#fef08a] px-3 py-1.5 rounded-full border border-[#d4af37]/50 transition-all shadow-inner"
            title="স্থান পরিবর্তন করুন (Change City)"
          >
            <Compass className="w-3.5 h-3.5 text-[#fef08a]" />
            <span className="font-semibold">
              {isBn ? location.bengaliName : location.name}
            </span>
            <ChevronDown className="w-3 h-3 text-[#d4af37]" />
          </button>

          {/* Quick Audio Triggers & Calculation Mode */}
          <div className="flex items-center space-x-2">
            {/* Audio Shankha */}
            <button
              onClick={() => soundFx.playShankha()}
              className="flex items-center space-x-1 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 text-[#fef08a] px-2.5 py-1 rounded-md border border-[#d4af37]/40 transition active:scale-95"
              title="পবিত্র শঙ্খধ্বনি বাজান"
            >
              <Volume2 className="w-3.5 h-3.5 text-[#fef08a]" />
              <span className="hidden sm:inline font-bengali text-xs">শঙ্খধ্বনি</span>
            </button>

            {/* Audio Temple Bell */}
            <button
              onClick={() => soundFx.playTempleBell()}
              className="flex items-center space-x-1 bg-[#d4af37]/20 hover:bg-[#d4af37]/40 text-[#fef08a] px-2.5 py-1 rounded-md border border-[#d4af37]/40 transition active:scale-95"
              title="মন্দিরের পবিত্র ঘণ্টা বাজান"
            >
              <DiyaFlameIcon size={16} />
              <span className="hidden sm:inline font-bengali text-xs">ঘণ্টাধ্বনি</span>
            </button>

            {/* Calculation Mode Dropdown */}
            <div className="flex items-center bg-[#430202]/70 rounded-md border border-[#d4af37]/40 px-1.5 py-0.5">
              <span className="text-[11px] text-[#fef08a]/80 mr-1 hidden md:inline">
                {isBn ? 'পঞ্জিকা ধারা:' : 'Method:'}
              </span>
              <select
                value={calcMethod}
                onChange={(e) => setCalcMethod(e.target.value as CalculationMethod)}
                className="bg-transparent text-xs text-[#fef08a] focus:outline-none cursor-pointer py-1"
              >
                <option value="surya_siddhanta" className="bg-[#430202] text-white">
                  সূর্যসিদ্ধান্ত (গুপ্তপ্রেস)
                </option>
                <option value="drik_siddhanta" className="bg-[#430202] text-white">
                  দৃক সিদ্ধান্ত (বিশুদ্ধ সিদ্ধান্ত)
                </option>
              </select>
            </div>

            {/* Language Toggle (বাংলা / Eng) */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="bg-[#d4af37] text-[#430202] font-bold px-2.5 py-1 rounded-md hover:bg-[#fef08a] transition shadow text-xs"
            >
              {language === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Numerals Toggle (১২৩ / 123) */}
            <button
              onClick={() => setNumerals(numerals === 'bn' ? 'en' : 'bn')}
              className="bg-[#430202] text-[#fef08a] border border-[#d4af37]/60 font-semibold px-2 py-1 rounded-md hover:bg-[#2b0101] transition text-xs"
              title="সংখ্যা পরিবর্তন (Toggle Numerals)"
            >
              {numerals === 'bn' ? '123' : '১২৩'}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => {
                if (theme === 'parchment') setTheme('dark');
                else if (theme === 'dark') setTheme('crimson');
                else setTheme('parchment');
              }}
              className="p-1.5 rounded-md bg-[#430202]/80 hover:bg-[#430202] text-[#fef08a] border border-[#d4af37]/40 transition"
              title="থিম পরিবর্তন (Toggle Theme)"
            >
              {theme === 'dark' ? (
                <Moon className="w-3.5 h-3.5 text-amber-300" />
              ) : theme === 'crimson' ? (
                <Flame className="w-3.5 h-3.5 text-orange-400" />
              ) : (
                <Sun className="w-3.5 h-3.5 text-amber-300" />
              )}
            </button>

            {/* Print Calendar */}
            <button
              onClick={onPrintClick}
              className="p-1.5 rounded-md bg-[#d4af37]/20 hover:bg-[#d4af37]/40 text-[#fef08a] border border-[#d4af37]/40 transition hidden sm:flex items-center space-x-1"
              title="ক্যালেন্ডার প্রিন্ট করুন"
            >
              <Printer className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Branding Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-2">
          {/* Logo & Royal Bengali Title */}
          <div className="flex items-center space-x-4 text-center md:text-left">
            <div className="hidden sm:block p-2 bg-[#430202] rounded-2xl border-2 border-[#d4af37] shadow-royal-glow">
              <MangalGhatIcon size={52} />
            </div>

            <div>
              <div className="flex items-center justify-center md:justify-start space-x-2">
                <h1 className="font-serif font-black text-2xl sm:text-3xl lg:text-4xl text-[#fff8ea] tracking-wide drop-shadow-md">
                  {isBn ? 'বাংলা ক্যালেন্ডার ও পঞ্জিকা' : 'Bengali Calendar & Interactive Panjika'}
                </h1>
                <span className="hidden lg:inline-block">
                  <ShankhaIcon size={32} />
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#fde68a] mt-0.5 font-medium tracking-wide">
                {isBn
                  ? '১৪৩৩ বঙ্গাব্দ • ঐতিহ্যবাহী খাঁটি দিনপঞ্জি, নির্ভুল তিথি, লগ্ন ও শাস্ত্রীয় শুভ মুহূর্ত'
                  : 'Bongabdo 1433 • Authentic Traditional Almanac, Accurate Tithi, Lagna & Rituals'}
              </p>
            </div>
          </div>

          {/* Quick Date Stamp Badge */}
          <div className="bg-[#430202]/90 border-2 border-[#d4af37] px-4 py-2 rounded-xl text-center shadow-lg">
            <div className="text-[11px] text-[#fef08a] uppercase font-bold tracking-widest">
              {isBn ? 'বঙ্গাব্দ সন' : 'BENGALI YEAR'}
            </div>
            <div className="text-xl sm:text-2xl font-bold font-serif text-[#ffffff] drop-shadow">
              {numerals === 'bn' ? toBengaliDigits('1433') : '1433'}{' '}
              <span className="text-sm font-normal text-[#fde68a]">
                {isBn ? 'বঙ্গাব্দ' : 'BS'}
              </span>
            </div>
            <div className="text-[10px] text-[#fcd34d]/80">
              {isBn ? 'সূর্যসিদ্ধান্ত ও বেদসম্মত' : 'Surya Siddhanta & Vedic'}
            </div>
          </div>
        </div>

        {/* Horizontal Navigation Tabs */}
        <nav className="mt-4 flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1.5 scrollbar-none no-print">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-[#d4af37] text-[#430202] shadow-md scale-105 border border-[#fff]'
                    : 'bg-[#430202]/60 text-[#fef08a] hover:bg-[#430202] hover:text-[#ffffff] border border-[#d4af37]/30'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#430202]' : 'text-[#fef08a]'}`} />
                <span>{isBn ? item.labelBn : item.labelEn}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Location Selector Modal */}
      {isLocationModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-[#fbf8f1] dark:bg-[#201714] text-[#2d1e18] dark:text-[#f4ebd9] w-full max-w-lg rounded-2xl border-2 border-[#d4af37] shadow-2xl p-6 relative">
            <div className="flex items-center justify-between border-b border-[#e6d7bc] dark:border-[#443228] pb-3 mb-4">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-[#8b0000] dark:text-[#eac95b]" />
                <h3 className="text-lg font-bold font-serif">
                  {isBn ? 'শহর ও দ্রাঘিমাংশ নির্বাচন করুন' : 'Select City / Location'}
                </h3>
              </div>
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="text-gray-500 hover:text-red-700 text-lg font-bold px-2"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              {isBn
                ? 'পঞ্জিকার সঠিক সূর্যোদয়, সূর্যাস্ত এবং তিথি-লগ্ন গণনার জন্য আপনার শহর নির্বাচন করুন।'
                : 'Select your city for accurate local sunrise, sunset, and panjika muhurat calculations.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-80 overflow-y-auto pr-1">
              {LOCATIONS.map((loc) => {
                const isSelected = loc.id === location.id;
                return (
                  <button
                    key={loc.id}
                    onClick={() => {
                      setLocation(loc);
                      setIsLocationModalOpen(false);
                    }}
                    className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                      isSelected
                        ? 'border-[#8b0000] bg-[#fde8e8] dark:bg-[#430202] dark:border-[#d4af37] font-bold shadow-sm'
                        : 'border-[#e6d7bc] dark:border-[#443228] hover:bg-[#f4ebd9] dark:hover:bg-[#2b1f1a]'
                    }`}
                  >
                    <span className="font-semibold text-sm text-[#8b0000] dark:text-[#fef08a]">
                      {isBn ? loc.bengaliName : loc.name}
                    </span>
                    <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                      {loc.lat > 0 ? `${loc.lat.toFixed(2)}° N` : `${Math.abs(loc.lat).toFixed(2)}° S`},{' '}
                      {loc.lng > 0 ? `${loc.lng.toFixed(2)}° E` : `${Math.abs(loc.lng).toFixed(2)}° W`}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-3 border-t border-[#e6d7bc] dark:border-[#443228] flex justify-end">
              <button
                onClick={() => setIsLocationModalOpen(false)}
                className="bg-[#8b0000] hover:bg-[#6b0707] text-white px-4 py-2 rounded-lg text-xs font-semibold"
              >
                {isBn ? 'সম্পন্ন' : 'Done'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

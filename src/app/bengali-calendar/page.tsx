'use client';

import React, { useState, useEffect } from 'react';
import { LivePanjikaWidget } from '@/components/bengali/LivePanjikaWidget';
import { CalendarGrid } from '@/components/bengali/CalendarGrid';
import { DayDetailsModal } from '@/components/bengali/DayDetailsModal';
import { DurgaPujaHub } from '@/components/bengali/DurgaPujaHub';
import { SubhoMuhuratFinder } from '@/components/bengali/SubhoMuhuratFinder';
import { FestivalDirectory } from '@/components/bengali/FestivalDirectory';
import { DateConverter } from '@/components/bengali/DateConverter';
import { KundaliMilan } from '@/components/bengali/KundaliMilan';
import { BabyNameFinder } from '@/components/bengali/BabyNameFinder';
import { DailyRashiphal } from '@/components/bengali/DailyRashiphal';
import { AboutHeritage } from '@/components/bengali/AboutHeritage';
import { PrintCalendarView } from '@/components/bengali/PrintCalendarView';
import { SeoFaqSection } from '@/components/bengali/SeoFaqSection';
import { Footer } from '@/components/bengali/Footer';
import { LOCATIONS } from '@/lib/constants/panjikaData';
import { getDayPanjika } from '@/lib/panjikaEngine';
import { CalculationMethod, Language, LocationConfig, Numerals, ThemeMode } from '@/types/panjika';
import { Clock, Sparkles, Heart, BookOpen, Flame, MapPin, Globe, Moon } from 'lucide-react';

export default function BengaliCalendarPage() {
  const [language, setLanguage] = useState<Language>('bn');
  const [numerals, setNumerals] = useState<Numerals>('bn');
  const [location, setLocation] = useState<LocationConfig>(LOCATIONS[0]);
  const [calcMethod, setCalcMethod] = useState<CalculationMethod>('surya_siddhanta');
  const [theme, setTheme] = useState<ThemeMode>('parchment');
  const [activeTab, setActiveTab] = useState<string>('live');

  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [isDayModalOpen, setIsDayModalOpen] = useState(false);

  const isBn = language === 'bn';

  // Calculate panjika for selected date
  const selectedDayPanjika = getDayPanjika(selectedDate, location, calcMethod);

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    setIsDayModalOpen(true);
  };

  const handleJumpToToday = () => {
    const today = new Date();
    setSelectedDate(today);
    setIsDayModalOpen(true);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-gradient-to-b from-[#1a0e17] via-[#2b080c] to-[#1a0e17] text-[#FEF3C7] py-3 sm:py-6 overflow-x-hidden">
      {/* Top Panjika Control Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 w-full space-y-3 sm:space-y-4">
        {/* Controls: Location, Calculation Method, Language, Numerals */}
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-2xl bg-black/40 border border-[#D4AF37]/30 backdrop-blur">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 flex-1 min-w-0">
            {/* Location Selector */}
            <div className="flex items-center gap-1 bg-black/40 px-2 sm:px-2.5 py-1 rounded-xl border border-[#D4AF37]/20 text-xs min-w-0 max-w-[130px] xs:max-w-[160px] sm:max-w-none">
              <MapPin className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
              <select
                value={location.id}
                onChange={(e) => {
                  const found = LOCATIONS.find((l) => l.id === e.target.value);
                  if (found) setLocation(found);
                }}
                className="bg-transparent text-[#FEF3C7] text-xs focus:outline-none cursor-pointer truncate w-full"
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc.id} value={loc.id} className="bg-[#2B080C] text-[#FEF3C7]">
                    {isBn ? loc.bengaliName : loc.name} ({loc.country})
                  </option>
                ))}
              </select>
            </div>

            {/* Calculation Method */}
            <div className="flex items-center gap-1 bg-black/40 px-2 sm:px-2.5 py-1 rounded-xl border border-[#D4AF37]/20 text-xs min-w-0 max-w-[135px] xs:max-w-[170px] sm:max-w-none">
              <Moon className="w-3.5 h-3.5 text-[#E5C158] shrink-0" />
              <select
                value={calcMethod}
                onChange={(e) => setCalcMethod(e.target.value as any)}
                className="bg-transparent text-[#FEF3C7] text-xs focus:outline-none cursor-pointer truncate w-full"
              >
                <option value="surya_siddhanta" className="bg-[#2B080C] text-[#FEF3C7]">
                  {isBn ? 'সূর্যসিদ্ধান্ত' : 'Surya Siddhanta'}
                </option>
                <option value="drik_panchanga" className="bg-[#2B080C] text-[#FEF3C7]">
                  {isBn ? 'দৃক সিদ্ধান্ত' : 'Drik Siddhanta'}
                </option>
                <option value="bangladesh_academy" className="bg-[#2B080C] text-[#FEF3C7]">
                  {isBn ? 'বাংলা একাডেমি' : 'Bangladesh Academy'}
                </option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-semibold text-[#FEF3C7] hover:bg-[#D4AF37]/20 active:scale-95 transition"
            >
              {language === 'bn' ? 'English' : 'বাংলা'}
            </button>

            {/* Numerals Toggle */}
            <button
              onClick={() => setNumerals(numerals === 'bn' ? 'en' : 'bn')}
              className="px-2.5 py-1 rounded-lg border border-[#D4AF37]/40 bg-[#D4AF37]/10 text-xs font-semibold text-[#FEF3C7] hover:bg-[#D4AF37]/20 active:scale-95 transition"
            >
              {numerals === 'bn' ? '123' : '১২৩'}
            </button>
          </div>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#D4AF37]/20 no-scrollbar touch-scroll -mx-3 px-3 sm:mx-0 sm:px-0">
          {[
            { id: 'live', label: isBn ? 'আজকের পঞ্জিকা' : 'Live Panjika', icon: Sparkles },
            { id: 'calendar', label: isBn ? 'মাসিক দিনপঞ্জি' : 'Monthly Calendar', icon: Clock },
            { id: 'durga', label: isBn ? 'দুর্গাপূজা নির্ঘণ্ট' : 'Durga Puja', icon: Flame },
            { id: 'muhurat', label: isBn ? 'শুভ মুহূর্ত ও লগ্ন' : 'Subho Muhurat', icon: Heart },
            { id: 'festivals', label: isBn ? 'উৎসব ও ছুটি' : 'Festivals', icon: Sparkles },
            { id: 'converter', label: isBn ? 'তারিখ রূপান্তর' : 'Date Converter', icon: Clock },
            { id: 'matchmaking', label: isBn ? 'যোটক বিচার' : 'Kundali Milan', icon: Heart },
            { id: 'babynames', label: isBn ? 'নামকরণ' : 'Baby Names', icon: BookOpen },
            { id: 'rashiphal', label: isBn ? 'দৈনিক রাশিফল' : 'Rashiphal', icon: Moon },
            { id: 'about', label: isBn ? 'আমাদের কথা' : 'About Creator', icon: Globe },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#8B0000] to-[#5A0202] text-[#FEF3C7] border border-[#D4AF37] shadow-royal-gold'
                    : 'text-[#FEF3C7]/70 hover:text-[#FEF3C7] hover:bg-black/30'
                }`}
              >
                <Icon className="w-3.5 h-3.5 text-[#E5C158]" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-6 space-y-6 sm:space-y-8">
        {/* On-Page Header */}
        <div className="text-center space-y-1.5 sm:space-y-2 py-1 px-1">
          <h1 className="text-xl sm:text-3xl lg:text-4xl font-serif font-black text-[#FEF3C7] tracking-wide drop-shadow-md leading-tight">
            {isBn ? 'বাংলা ক্যালেন্ডার ও পঞ্জিকা' : 'Bengali Calendar & Panjika'} <span className="text-sm sm:text-xl font-normal block sm:inline mt-0.5 sm:mt-0 text-[#E5C158]">(১৪৩১–১৪৩৩ বঙ্গাব্দ)</span>
          </h1>
          <p className="text-[11px] sm:text-sm text-[#FDFBF7]/80 max-w-3xl mx-auto font-medium leading-relaxed">
            {isBn
              ? 'ঐতিহ্যবাহী সনাতন দিনপঞ্জি, নির্ভুল সূর্যসিদ্ধান্ত ও বিশুদ্ধ সিদ্ধান্ত ভিত্তিক আজকের তিথি, নক্ষত্র, অমৃতযোগ নির্ঘণ্ট, শুভ বিবাহ লগ্ন ও উৎসব সময়সূচী।'
              : 'Authentic traditional Bengali almanac, accurate solar & lunar calculation for Tithi, Nakshatra, Amrita Yoga, auspicious marriage dates, and festival calendars.'}
          </p>
        </div>

        {/* Tab 1: Live Panjika & Main Calendar Overview */}
        {activeTab === 'live' && (
          <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
            <section aria-label="Today Panjika">
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#D4AF37] mb-2 sm:mb-3 flex items-start sm:items-center space-x-2">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5C158] shrink-0 mt-0.5 sm:mt-0" />
                <span>{isBn ? 'আজকের তিথি, শুভ সময় ও অমৃতযোগ নির্ঘণ্ট' : "Today's Tithi & Auspicious Muhurat"}</span>
              </h2>
              <LivePanjikaWidget
                panjika={selectedDayPanjika}
                language={language}
                numerals={numerals}
                location={location}
                onOpenDetails={() => setIsDayModalOpen(true)}
              />
            </section>

            <section aria-label="Monthly Calendar">
              <CalendarGrid
                currentDate={currentDate}
                selectedDate={selectedDate}
                onSelectDate={handleSelectDate}
                language={language}
                numerals={numerals}
                location={location}
                onPrintCalendar={handlePrint}
              />
            </section>

            <section aria-label="Auspicious Ceremony Dates">
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#D4AF37] mb-2 sm:mb-3 flex items-start sm:items-center space-x-2">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5C158] shrink-0 mt-0.5 sm:mt-0" />
                <span>{isBn ? 'শুভ বিবাহ, গৃহপ্রবেশ ও অন্নপ্রাশনের দিনপঞ্জি' : 'Auspicious Marriage & Ceremony Dates'}</span>
              </h2>
              <SubhoMuhuratFinder language={language} numerals={numerals} />
            </section>

            <section aria-label="Durga Puja 2026">
              <DurgaPujaHub language={language} numerals={numerals} />
            </section>

            <section aria-label="Daily Horoscope">
              <DailyRashiphal language={language} numerals={numerals} />
            </section>

            <section aria-label="Frequently Asked Questions">
              <h2 className="text-base sm:text-xl font-serif font-bold text-[#D4AF37] mb-2 sm:mb-3 flex items-start sm:items-center space-x-2">
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5C158] shrink-0 mt-0.5 sm:mt-0" />
                <span>{isBn ? 'সাধারণ জিজ্ঞাসা ও শাস্ত্রীয় নির্দেশিকা' : 'Frequently Asked Questions'}</span>
              </h2>
              <SeoFaqSection language={language} />
            </section>
          </div>
        )}

        {/* Tab 2: Dedicated Monthly Calendar */}
        {activeTab === 'calendar' && (
          <div className="animate-in fade-in duration-300 space-y-6">
            <CalendarGrid
              currentDate={currentDate}
              selectedDate={selectedDate}
              onSelectDate={handleSelectDate}
              language={language}
              numerals={numerals}
              location={location}
              onPrintCalendar={handlePrint}
            />
            <SeoFaqSection language={language} />
          </div>
        )}

        {/* Tab 3: Durga Puja */}
        {activeTab === 'durga' && (
          <div className="animate-in fade-in duration-300">
            <DurgaPujaHub language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 4: Subho Muhurat */}
        {activeTab === 'muhurat' && (
          <div className="animate-in fade-in duration-300">
            <SubhoMuhuratFinder language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 5: Festival Directory */}
        {activeTab === 'festivals' && (
          <div className="animate-in fade-in duration-300">
            <FestivalDirectory language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 6: Date Converter */}
        {activeTab === 'converter' && (
          <div className="animate-in fade-in duration-300">
            <DateConverter language={language} numerals={numerals} location={location} />
          </div>
        )}

        {/* Tab 7: Kundali Milan */}
        {activeTab === 'matchmaking' && (
          <div className="animate-in fade-in duration-300">
            <KundaliMilan language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 8: Baby Names */}
        {activeTab === 'babynames' && (
          <div className="animate-in fade-in duration-300">
            <BabyNameFinder language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 9: Horoscope */}
        {activeTab === 'rashiphal' && (
          <div className="animate-in fade-in duration-300">
            <DailyRashiphal language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 10: About Creator & Bankura Heritage */}
        {activeTab === 'about' && (
          <div className="animate-in fade-in duration-300">
            <AboutHeritage language={language} />
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer language={language} />

      {/* Floating Action Button: "আজকের পঞ্জিকা" */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 no-print">
        <button
          onClick={handleJumpToToday}
          className="flex items-center space-x-1.5 sm:space-x-2 bg-gradient-to-r from-[#8B0000] to-[#5A0202] text-[#FEF3C7] px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-full border-2 border-[#D4AF37] shadow-royal-gold hover:scale-105 active:scale-95 transition-all text-xs sm:text-sm font-bold font-serif"
          title="আজকের পূর্ণাঙ্গ পঞ্জিকা দেখুন"
        >
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-[#E5C158] animate-pulse" />
          <span>
            {isBn ? 'আজকের পঞ্জিকা' : "Today's Panjika"}
          </span>
        </button>
      </div>

      {/* Day Details Deep Dive Modal / Drawer */}
      <DayDetailsModal
        panjika={selectedDayPanjika}
        isOpen={isDayModalOpen}
        onClose={() => setIsDayModalOpen(false)}
        language={language}
        numerals={numerals}
      />

      {/* Hidden Dedicated Print Calendar */}
      <div className="print-only hidden">
        <PrintCalendarView
          year={selectedDate.getFullYear()}
          monthIndex={selectedDate.getMonth()}
          location={location}
        />
      </div>
    </div>
  );
}

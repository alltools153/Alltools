'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/Header';
import { LivePanjikaWidget } from '@/components/LivePanjikaWidget';
import { CalendarGrid } from '@/components/CalendarGrid';
import { DayDetailsModal } from '@/components/DayDetailsModal';
import { DurgaPujaHub } from '@/components/DurgaPujaHub';
import { SubhoMuhuratFinder } from '@/components/SubhoMuhuratFinder';
import { FestivalDirectory } from '@/components/FestivalDirectory';
import { DateConverter } from '@/components/DateConverter';
import { KundaliMilan } from '@/components/KundaliMilan';
import { BabyNameFinder } from '@/components/BabyNameFinder';
import { DailyRashiphal } from '@/components/DailyRashiphal';
import { AboutHeritage } from '@/components/AboutHeritage';
import { PrintCalendarView } from '@/components/PrintCalendarView';
import { SeoFaqSection } from '@/components/SeoFaqSection';
import { Footer } from '@/components/Footer';
import { LOCATIONS } from '@/lib/constants/panjikaData';
import { getDayPanjika } from '@/lib/panjikaEngine';
import { CalculationMethod, Language, LocationConfig, Numerals, ThemeMode } from '@/types/panjika';
import { Clock, Sparkles, Heart, BookOpen, Flame } from 'lucide-react';

export default function Home() {
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
    <div className="min-h-screen flex flex-col justify-between relative">
      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        numerals={numerals}
        setNumerals={setNumerals}
        location={location}
        setLocation={setLocation}
        calcMethod={calcMethod}
        setCalcMethod={setCalcMethod}
        theme={theme}
        setTheme={setTheme}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onPrintClick={handlePrint}
      />

      {/* Main Content Hub */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* On-Page SEO H1 Header */}
        <div className="text-center space-y-2 py-2">
          <h1 className="text-2xl sm:text-4xl font-serif font-black text-[#FEF3C7] tracking-wide drop-shadow-md">
            বাংলা ক্যালেন্ডার ও পঞ্জিকা – Bengali Calendar & Panjika (১৪৩৩ বঙ্গাব্দ)
          </h1>
          <p className="text-xs sm:text-sm text-[#FDFBF7]/80 max-w-3xl mx-auto font-medium">
            ঐতিহ্যবাহী সনাতন দিনপঞ্জি, নির্ভুল সূর্যসিদ্ধান্ত ও বিশুদ্ধ সিদ্ধান্ত ভিত্তিক আজকের তিথি, নক্ষত্র, অমৃতযোগ নির্ঘণ্ট, শুভ বিবাহ লগ্ন ও উৎসব সময়সূচী।
          </p>
        </div>

        {/* Tab 1: Live Panjika & Main Calendar Overview */}
        {activeTab === 'live' && (
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* H2 Section 1: Today's Tithi & Auspicious Muhurat */}
            <section aria-label="Today Panjika">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#D4AF37] mb-3 flex items-center space-x-2">
                <Sparkles className="w-5 h-5 text-[#E5C158]" />
                <span>আজকের তিথি, শুভ সময় ও অমৃতযোগ নির্ঘণ্ট (Today's Tithi & Auspicious Muhurat)</span>
              </h2>
              <LivePanjikaWidget
                panjika={selectedDayPanjika}
                language={language}
                numerals={numerals}
                location={location}
                onOpenDetails={() => setIsDayModalOpen(true)}
              />
            </section>

            {/* Monthly Calendar View */}
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

            {/* H2 Section 2: Auspicious Marriage & Ceremony Dates */}
            <section aria-label="Auspicious Ceremony Dates">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#D4AF37] mb-3 flex items-center space-x-2">
                <Heart className="w-5 h-5 text-[#E5C158]" />
                <span>শুভ বিবাহ, গৃহপ্রবেশ ও অন্নপ্রাশনের দিনপঞ্জি (Auspicious Marriage & Ceremony Dates)</span>
              </h2>
              <SubhoMuhuratFinder language={language} numerals={numerals} />
            </section>

            {/* Durga Puja Preview */}
            <section aria-label="Durga Puja 2026">
              <DurgaPujaHub language={language} numerals={numerals} />
            </section>

            {/* Daily Horoscope Preview */}
            <section aria-label="Daily Horoscope">
              <DailyRashiphal language={language} numerals={numerals} />
            </section>

            {/* H2 Section 3: Frequently Asked Questions & Vedic Guidance */}
            <section aria-label="Frequently Asked Questions">
              <h2 className="text-lg sm:text-xl font-serif font-bold text-[#D4AF37] mb-3 flex items-center space-x-2">
                <BookOpen className="w-5 h-5 text-[#E5C158]" />
                <span>সাধারণ জিজ্ঞাসা (Frequently Asked Questions & Vedic Guidance)</span>
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

        {/* Tab 3: Durga Puja 2026 Dedicated Hub */}
        {activeTab === 'durga' && (
          <div className="animate-in fade-in duration-300">
            <DurgaPujaHub language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 4: Subho Muhurat & Marriage Lagna Finder */}
        {activeTab === 'muhurat' && (
          <div className="animate-in fade-in duration-300">
            <SubhoMuhuratFinder language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 5: Festival Directory & Ekadashi Schedule */}
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

        {/* Tab 7: Kundali Milan & Rajjotok Bichar */}
        {activeTab === 'matchmaking' && (
          <div className="animate-in fade-in duration-300">
            <KundaliMilan language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 8: Baby Names Directory */}
        {activeTab === 'babynames' && (
          <div className="animate-in fade-in duration-300">
            <BabyNameFinder language={language} numerals={numerals} />
          </div>
        )}

        {/* Tab 9: Horoscope / Rashiphal */}
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

      {/* Floating Action Button: "আজকের পঞ্জিকা (Today's Panjika)" */}
      <div className="fixed bottom-6 right-6 z-40 no-print">
        <button
          onClick={handleJumpToToday}
          className="flex items-center space-x-2 bg-gradient-to-r from-[#8B0000] to-[#5A0202] text-[#FEF3C7] px-4 py-3 rounded-full border-2 border-[#D4AF37] shadow-royal-gold hover:scale-105 active:scale-95 transition-all"
          title="আজকের পূর্ণাঙ্গ পঞ্জিকা দেখুন"
        >
          <Clock className="w-5 h-5 text-[#E5C158] animate-pulse" />
          <span className="font-serif font-bold text-xs sm:text-sm">
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

      {/* Hidden Dedicated Print Calendar for Window.print */}
      <div className="print-only hidden">
        <PrintCalendarView
          year={selectedDate.getFullYear()}
          monthIndex={selectedDate.getMonth()}
          location={location}
        />
      </div>

      {/* Cultural Footer */}
      <Footer language={language} />
    </div>
  );
}

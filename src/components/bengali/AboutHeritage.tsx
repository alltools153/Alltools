'use client';

import React from 'react';
import {
  Heart,
  Sparkles,
  MapPin,
  Award,
  BookOpen,
  Calendar,
  Compass,
  CheckCircle,
} from 'lucide-react';
import { AlponaBorderDivider, AlponaMandala, BankuraHorseIcon, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';
import { Language } from '@/types/panjika';

interface AboutHeritageProps {
  language: Language;
}

export const AboutHeritage: React.FC<AboutHeritageProps> = ({ language }) => {
  const isBn = language === 'bn';

  return (
    <section className="w-full select-none">
      <div className="parchment-card rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-vintage-card alpona-frame relative overflow-hidden">
        {/* Background Mandala */}
        <div className="absolute right-0 top-0 translate-x-1/4 -translate-y-1/4 opacity-10 pointer-events-none">
          <AlponaMandala size={340} color="#D4AF37" />
        </div>

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto border-b border-[#E6D7BC] dark:border-[#4D2638] pb-6">
          <div className="inline-flex items-center space-x-2 bg-[#8B0000] text-[#FEF3C7] px-4 py-1.5 rounded-full text-xs font-bold shadow-md mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isBn ? 'আমাদের কথা ও ঐতিহ্য' : 'About Creator & Heritage'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-black text-[#8B0000] dark:text-[#E5C158] tracking-wide">
            {isBn ? 'বাংলার সংস্কৃতি, খাঁটি পঞ্জিকা ও কারিগর' : 'Bengal Heritage & Digital Panjika'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 mt-1">
            {isBn
              ? 'রাঢ়বঙ্গের প্রাচীন পুণ্যভূমি বাঁকুড়ার ঐতিহ্য ও জ্যোতির্বিজ্ঞানের মেলবন্ধনে রচিত ডিজিটাল দিনপঞ্জি।'
              : 'A digital tribute to ancient Bengali astrological precision and the timeless folk arts of Bankura.'}
          </p>
        </div>

        {/* Creator / Developer Spotlight Card */}
        <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F5EBE1] via-[#FDFBF7] to-[#F5EBE1] dark:from-[#25121E] dark:via-[#1A0E17] dark:to-[#25121E] border-2 border-[#D4AF37] shadow-lg flex flex-col md:flex-row items-center gap-6">
          {/* Terracotta Bankura Horse & Icon */}
          <div className="shrink-0 p-4 rounded-2xl bg-[#8B0000] border-2 border-[#D4AF37] shadow-royal-gold flex flex-col items-center justify-center text-center">
            <BankuraHorseIcon size={70} color="#FEF3C7" />
            <span className="text-[10px] text-[#FEF3C7] font-bold mt-1 uppercase tracking-wider font-serif">
              বাঁকুড়ার ঘোড়া
            </span>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="bg-amber-100 dark:bg-[#3D1420] text-[#8B0000] dark:text-[#E5C158] px-3 py-0.5 rounded-full text-xs font-bold">
                👨‍💻 {isBn ? 'প্রধান স্থপতি ও সফটওয়্যার প্রণেতা' : 'Lead Architect & Creator'}
              </span>
              <span className="flex items-center space-x-1 text-xs text-gray-600 dark:text-gray-400 font-medium">
                <MapPin className="w-3.5 h-3.5 text-red-600" />
                <span>{isBn ? 'কুচিয়াকোল, বাঁকুড়া, পশ্চিমবঙ্গ' : 'Kuchiakol, Bankura, West Bengal'}</span>
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-serif font-black text-[#8B0000] dark:text-[#E5C158]">
              {isBn ? 'শান্তনু বটব্যাল (Santanu Batabyal)' : 'Santanu Batabyal'}
            </h3>

            <p className="text-xs sm:text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-serif">
              {isBn
                ? 'বাঁকুড়ার কুচিয়াকোল (Kuchiakol, Bankura) থেকে শ্রদ্ধার সাথে নির্মিত এই পূর্ণাঙ্গ ডিজিটাল বাংলা ক্যালেন্ডার ও খাঁটি সনাতন পঞ্জিকা। বাংলার ঘরে ঘরে সঠিক তিথি, লগ্ন, ব্রত ও দুর্গাপূজার শুভ মুহূর্ত উপহার দেওয়ার জন্য আধুনিক সফটওয়্যার আর্কিটেকচার ও প্রাচীন সূর্যসিদ্ধান্তের সমন্বয়ে এটি গড়ে তোলা হয়েছে।'
                : 'Crafted with reverence by Santanu Batabyal from Kuchiakol, Bankura, West Bengal. Engineered with precision algorithms to preserve and present the authentic solar and lunar Bengali almanac to global Bengalis.'}
            </p>
          </div>
        </div>

        <AlponaBorderDivider color="#D4AF37" className="my-8" />

        {/* Bankura Heritage & Cultural Pillars 3-Card Grid */}
        <div>
          <h3 className="text-xl font-serif font-bold text-[#8B0000] dark:text-[#E5C158] text-center mb-6">
            {isBn ? 'বাঁকুড়া ও রাঢ়বঙ্গের ঐতিহাসিক গৌরব' : 'Heritage of Bankura & Bengal'}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs">
            {/* 1. Bishnupur Terracotta */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#1A0E17]/90 border-2 border-[#E6D7BC] dark:border-[#4D2638] hover:border-[#D4AF37] transition shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-[#331118] flex items-center justify-center text-red-800 dark:text-[#E5C158] font-bold mb-3">
                  🏛️
                </div>
                <h4 className="text-base font-bold font-serif text-[#8B0000] dark:text-[#E5C158]">
                  {isBn ? 'বিষ্ণুপুরের টেরাকোটা ও রাসমঞ্চ' : 'Bishnupur Terracotta'}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  {isBn
                    ? 'মল্ল রাজাদের পুণ্যস্মৃতি বিজড়িত জোড়বাংলা, মদনমোহন ও রাসমঞ্চের অপূর্ব পোড়ামাটির শিল্পকলা বিশ্ববন্দিত ঐতিহ্য।'
                    : 'The world-renowned terracotta architecture of Bishnupur temples, Rasmancha, and Jor Bangla crafted under Malla rulers.'}
                </p>
              </div>
            </div>

            {/* 2. Panchmura Bankura Horse & Dokra */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#1A0E17]/90 border-2 border-[#E6D7BC] dark:border-[#4D2638] hover:border-[#D4AF37] transition shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-[#332218] flex items-center justify-center text-amber-800 dark:text-[#E5C158] font-bold mb-3">
                  🐎
                </div>
                <h4 className="text-base font-bold font-serif text-[#8B0000] dark:text-[#E5C158]">
                  {isBn ? 'পাঁচমুড়ার টেরাকোটা ঘোড়া ও দোকরা' : 'Bankura Horse & Dokra'}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  {isBn
                    ? 'পাঁচমুড়ার লম্বা কান ও সটান গ্রীবার অনন্য টেরাকোটা ঘোড়া এবং প্রাচীন মোম-ঢালাই ধাতুশিল্প দোকরা বাংলার চারুকলার শিখর।'
                    : 'The iconic long-eared Bankura horse from Panchmura and lost-wax brass Dokra metalcraft.'}
                </p>
              </div>
            </div>

            {/* 3. Baluchari Saree & Vedic Calculation */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-[#1A0E17]/90 border-2 border-[#E6D7BC] dark:border-[#4D2638] hover:border-[#D4AF37] transition shadow-sm flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-[#2A1133] flex items-center justify-center text-purple-800 dark:text-[#E5C158] font-bold mb-3">
                  📜
                </div>
                <h4 className="text-base font-bold font-serif text-[#8B0000] dark:text-[#E5C158]">
                  {isBn ? 'বালুচরী ও শাস্ত্রীয় পঞ্জিকা' : 'Baluchari & Solar Panjika'}
                </h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
                  {isBn
                    ? 'মহাভারত ও রামায়ণের আখ্যান বোনা বালুচরী রেশম শাড়ির মহিমা এবং সূর্যসিদ্ধান্তের শাশ্বত জ্যোতির্বিজ্ঞান।'
                    : 'Baluchari silk weaving depicting mythological epics, harmonized with ancient Surya Siddhanta astronomy.'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-8 p-5 rounded-2xl bg-[#8B0000] text-[#FEF3C7] text-center border border-[#D4AF37] shadow-inner">
          <p className="text-xs sm:text-sm font-serif italic max-w-2xl mx-auto leading-relaxed">
            "বাঙালির বারো মাসে তেরো পার্বণ, হালখাতার মিষ্টি আর শারদীয়ার ঢাকের আওয়াজ—প্রতিটি বাঙালি মুহূর্তকে নিখুঁত ও প্রাণবন্ত রাখাই আমাদের ব্রত।"
          </p>
          <div className="text-[11px] text-[#FEF08A] font-bold mt-2">
            — শান্তনু বটব্যাল (Santanu Batabyal), কুচিয়াকোল, বাঁকুড়া
          </div>
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Heart, Sparkles } from 'lucide-react';
import { AlponaBorderDivider, AlponaMandala, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';
import { Language } from '@/types/panjika';

interface FooterProps {
  language: Language;
}

export const Footer: React.FC<FooterProps> = ({ language }) => {
  const isBn = language === 'bn';

  return (
    <footer className="w-full bg-gradient-to-b from-[#430202] via-[#2c0101] to-[#1a0101] text-[#fff8ea] border-t-4 border-[#d4af37] py-10 px-4 sm:px-6 lg:px-8 mt-12 relative overflow-hidden select-none no-print">
      {/* Decorative Background Mandalas */}
      <div className="absolute left-4 -bottom-10 opacity-10 pointer-events-none">
        <AlponaMandala size={180} color="#fef08a" />
      </div>
      <div className="absolute right-4 -bottom-10 opacity-10 pointer-events-none">
        <AlponaMandala size={180} color="#fef08a" />
      </div>

      <div className="max-w-7xl mx-auto text-center relative z-10">
        <div className="flex justify-center items-center space-x-3 mb-3">
          <ShankhaIcon size={32} />
          <MangalGhatIcon size={40} />
          <ShankhaIcon size={32} />
        </div>

        <h3 className="font-serif font-black text-2xl text-[#fef08a] tracking-wide">
          {isBn ? 'বাংলা ক্যালেন্ডার ও খাঁটি সনাতন পঞ্জিকা' : 'Bengali Calendar & Authentic Panjika'}
        </h3>
        <p className="text-xs text-amber-200/80 mt-1 max-w-xl mx-auto">
          {isBn
            ? 'সূর্যসিদ্ধান্ত ও বিশুদ্ধ জ্যোতির্বিজ্ঞানের মিলনমঞ্চ। বাঙালির সংস্কৃতি, পার্বণ ও মাঙ্গলিক ক্ষণের চিরন্তন সঙ্গী।'
            : 'Uniting ancient Surya Siddhanta principles with modern astronomical precision for global Bengalis.'}
        </p>

        <AlponaBorderDivider color="#d4af37" className="my-6 max-w-lg mx-auto opacity-70" />

        <div className="text-xs text-gray-300 font-serif italic mb-4">
          "ওঁ সর্বে ভবন্তু সুখিনঃ সর্বে সন্তু নিরাময়াঃ। সর্বে ভদ্রাণি পশ্যন্তু মা কশ্চিৎ দুঃখভাগ ভবেৎ॥"
        </div>

        <div className="flex flex-wrap justify-center items-center gap-6 text-xs text-amber-200/80 border-t border-[#d4af37]/20 pt-4">
          <span>১৪৩৩ বঙ্গাব্দ (Bengali Year 1433)</span>
          <span>•</span>
          <span>গুপ্তপ্রেস ও বিশুদ্ধ সিদ্ধান্ত ধারা</span>
          <span>•</span>
          <span>
            রচয়িতা: <strong className="text-[#fef08a]">শান্তনু বটব্যাল (Santanu Batabyal)</strong>, কুচিয়াকোল, বাঁকুড়া
          </span>
          <span>•</span>
          <span className="flex items-center space-x-1">
            <span>নির্মিত পরম শ্রদ্ধায়</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
          </span>
        </div>
      </div>
    </footer>
  );
};

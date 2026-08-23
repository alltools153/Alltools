'use client';

import React, { useState } from 'react';
import {
  Heart,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Share2,
  Printer,
} from 'lucide-react';
import { NAKSHATRAS, RASHIS, toBengaliDigits } from '@/lib/constants/panjikaData';
import { calculateKundaliMilan } from '@/lib/matchmakingEngine';
import { Language, Numerals } from '@/types/panjika';
import { AlponaBorderDivider } from './AlponaMotifs';

interface KundaliMilanProps {
  language: Language;
  numerals: Numerals;
}

export const KundaliMilan: React.FC<KundaliMilanProps> = ({ language, numerals }) => {
  const [groomRashi, setGroomRashi] = useState(1);
  const [groomNakshatra, setGroomNakshatra] = useState(1);
  const [brideRashi, setBrideRashi] = useState(4);
  const [brideNakshatra, setBrideNakshatra] = useState(8);

  const isBn = language === 'bn';

  const report = calculateKundaliMilan(groomRashi, groomNakshatra, brideRashi, brideNakshatra);

  return (
    <section className="w-full">
      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        {/* Header */}
        <div className="border-b border-[#e6d7bc] dark:border-[#443228] pb-4">
          <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1.5">
            <Heart className="w-3.5 h-3.5" />
            <span>{isBn ? 'বৈদিক অষ্টকূট যোটক বিচার' : 'Vedic Ashtakoot Matchmaking'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a]">
            {isBn ? 'বিবাহের রাজযোটক ও গুণ মিলন পরীক্ষা (৩৬ গুণ)' : 'Marriage Kundali Milan (36 Gunas)'}
          </h2>
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">
            {isBn
              ? 'বর ও কন্যার রাশি এবং জন্ম নক্ষত্র নির্বাচন করে ৩৬ গুণের নিখুঁত শাস্ত্রীয় সামঞ্জস্য ও মাঙ্গলিক বিচার দেখুন।'
              : 'Select Groom & Bride Rashi and Nakshatra to calculate 36-point Guna compatibility and Manglik analysis.'}
          </p>
        </div>

        {/* Groom & Bride Input Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {/* Groom Box */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-[#1f1613] border-2 border-[#d4af37]/60 shadow-sm">
            <div className="flex items-center space-x-2 text-sm font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mb-3">
              <span>🤵</span>
              <span>{isBn ? 'বরের বিবরণ (Groom Profile)' : 'Groom Profile'}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {isBn ? 'বরের জন্ম রাশি:' : 'Groom Moon Sign (Rashi):'}
                </label>
                <select
                  value={groomRashi}
                  onChange={(e) => setGroomRashi(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#150f0d] border border-[#e6d7bc] dark:border-[#443228] rounded-xl p-2.5 font-bold"
                >
                  {RASHIS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.symbol} {r.nameBn} রাশি ({r.nameEn}) - অধিপতি: {r.rulerBn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {isBn ? 'বরের জন্ম নক্ষত্র:' : 'Groom Nakshatra:'}
                </label>
                <select
                  value={groomNakshatra}
                  onChange={(e) => setGroomNakshatra(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#150f0d] border border-[#e6d7bc] dark:border-[#443228] rounded-xl p-2.5 font-bold"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.index} value={n.index}>
                      {n.index}. {n.nameBn} ({n.nameEn}) - গণ: {n.gana}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Bride Box */}
          <div className="p-5 rounded-2xl bg-rose-50/60 dark:bg-[#231514] border-2 border-[#d4af37]/60 shadow-sm">
            <div className="flex items-center space-x-2 text-sm font-bold font-serif text-[#8b0000] dark:text-[#fef08a] mb-3">
              <span>👰</span>
              <span>{isBn ? 'কন্যার বিবরণ (Bride Profile)' : 'Bride Profile'}</span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {isBn ? 'কন্যার জন্ম রাশি:' : 'Bride Moon Sign (Rashi):'}
                </label>
                <select
                  value={brideRashi}
                  onChange={(e) => setBrideRashi(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#150f0d] border border-[#e6d7bc] dark:border-[#443228] rounded-xl p-2.5 font-bold"
                >
                  {RASHIS.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.symbol} {r.nameBn} রাশি ({r.nameEn}) - অধিপতি: {r.rulerBn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  {isBn ? 'কন্যার জন্ম নক্ষত্র:' : 'Bride Nakshatra:'}
                </label>
                <select
                  value={brideNakshatra}
                  onChange={(e) => setBrideNakshatra(Number(e.target.value))}
                  className="w-full bg-white dark:bg-[#150f0d] border border-[#e6d7bc] dark:border-[#443228] rounded-xl p-2.5 font-bold"
                >
                  {NAKSHATRAS.map((n) => (
                    <option key={n.index} value={n.index}>
                      {n.index}. {n.nameBn} ({n.nameEn}) - গণ: {n.gana}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Score Summary & Verdict */}
        <div className="mt-6 p-6 rounded-2xl bg-gradient-to-r from-[#8b0000] to-[#5a0202] text-white border-2 border-[#d4af37] shadow-xl text-center">
          <div className="inline-block bg-[#fef08a] text-[#430202] px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2">
            {report.totalScore >= 28 ? '👑 রাজযোটক মিলন' : report.totalScore >= 18 ? '✨ শুভ মিলন' : '⚠️ সতর্কতামূলক মিলন'}
          </div>

          <div className="text-4xl sm:text-5xl font-serif font-black text-[#fef08a]">
            {numerals === 'bn' ? toBengaliDigits(report.totalScore) : report.totalScore} / {numerals === 'bn' ? toBengaliDigits('36') : '36'}
          </div>
          <div className="text-xs text-[#fde68a] mt-1 font-semibold">
            {isBn ? `মোট প্রাপ্ত গুণ স্কোর (${report.percentage}%)` : `Compatibility Score (${report.percentage}%)`}
          </div>

          <p className="max-w-2xl mx-auto text-xs sm:text-sm text-gray-100 mt-3 font-serif">
            {isBn ? report.verdictBn : report.verdictEn}
          </p>
        </div>

        {/* Ashtakoot 8-Kuta Breakdown Table */}
        <div className="mt-6">
          <h3 className="text-base font-serif font-bold text-[#8b0000] dark:text-[#fef08a] mb-3">
            {isBn ? 'অষ্টকূট বিশ্লেষণ ও প্রাপ্ত পয়েন্ট তালিকা' : 'Ashtakoot Guna Breakdown'}
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[#f4ebd9] dark:bg-[#251a16] text-[#8b0000] dark:text-[#fef08a] font-serif">
                  <th className="p-3 rounded-tl-xl">{isBn ? 'কূট নাম' : 'Kuta'}</th>
                  <th className="p-3">{isBn ? 'সর্বোচ্চ পয়েন্ট' : 'Max'}</th>
                  <th className="p-3">{isBn ? 'প্রাপ্ত পয়েন্ট' : 'Score'}</th>
                  <th className="p-3 rounded-tr-xl">{isBn ? 'ফলাফল ও তাৎপর্য' : 'Significance'}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e6d7bc] dark:divide-[#443228] bg-white/90 dark:bg-[#1a1210]/90">
                {report.kutas.map((k, idx) => (
                  <tr key={idx} className="hover:bg-[#fbf5e6] dark:hover:bg-[#251b17]">
                    <td className="p-3 font-bold font-serif text-gray-900 dark:text-white">
                      {isBn ? k.nameBn : k.nameEn}
                    </td>
                    <td className="p-3 text-gray-600 dark:text-gray-400">{k.maxPoints}</td>
                    <td className="p-3 font-bold text-[#8b0000] dark:text-[#fef08a]">
                      {k.obtainedPoints}
                    </td>
                    <td className="p-3 text-gray-700 dark:text-gray-300">
                      {isBn ? k.descriptionBn : k.descriptionEn}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Manglik Analysis & Remedies */}
        <div className="mt-6 p-4 rounded-2xl bg-amber-50 dark:bg-[#261c17] border border-[#d4af37]/50 text-xs">
          <div className="font-bold text-[#8b0000] dark:text-[#fef08a] text-sm mb-1 flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4" />
            <span>{isBn ? 'মাঙ্গলিক দোষ ও বৈদিক প্রতিকার' : 'Manglik & Astrological Remedies'}</span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{report.manglikAnalysisBn}</p>
          {report.remediesBn.length > 0 && (
            <div className="mt-2 space-y-1">
              {report.remediesBn.map((rem, i) => (
                <div key={i} className="text-gray-800 dark:text-gray-200">
                  • {rem}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

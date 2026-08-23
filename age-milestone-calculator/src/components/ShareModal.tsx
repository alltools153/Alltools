'use client';

import React, { useRef, useState } from 'react';
import { ChronologicalAgeResult, NextBirthdayInfo, AstrologyGenInsights } from '../types';
import { toPng } from 'html-to-image';
import { 
  X, 
  Download, 
  Copy, 
  Check, 
  Sparkles, 
  Calculator
} from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  ageResult: ChronologicalAgeResult;
  nextBirthday: NextBirthdayInfo;
  insights: AstrologyGenInsights;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  ageResult,
  nextBirthday,
  insights,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  if (!isOpen) return null;

  const handleDownload = async () => {
    if (!cardRef.current) return;
    try {
      setIsDownloading(true);
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, quality: 0.95 });
      const link = document.createElement('a');
      link.download = `Age-Calculator-Report-${ageResult.years}y.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopyText = () => {
    const text = `🌟 Age Calculator Report:
🎂 Age: ${ageResult.years} Years, ${ageResult.months} Months, ${ageResult.days} Days
📅 Total Days on Earth: ${ageResult.totalDays.toLocaleString()} Days (${ageResult.totalWeeks.toLocaleString()} Weeks)
⏰ Total Seconds: ${ageResult.totalSeconds.toLocaleString()}
♈ Zodiac: ${insights.westernZodiac.sign} (${insights.westernZodiac.element})
🏮 Chinese Zodiac: Year of the ${insights.chineseZodiac.animal}
🚀 Generation: ${insights.generation.name}
🎉 Turning ${nextBirthday.turningAge} in ${nextBirthday.days} days!
Calculated with Age Calculator`;

    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (e) {
      console.error('Clipboard copy failed', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl max-w-xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Calculator className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Share Age Report</h3>
            <p className="text-xs text-slate-400">Save summary as PNG image or copy text</p>
          </div>
        </div>

        {/* Shareable Card Canvas */}
        <div
          ref={cardRef}
          className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 border border-indigo-500/40 shadow-2xl relative overflow-hidden my-4 text-white"
        >
          {/* Decorative glow */}
          <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-500/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <span className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-sm shadow-md">
                ⌛
              </span>
              <span className="font-bold text-base bg-gradient-to-r from-indigo-300 to-pink-300 bg-clip-text text-transparent">
                Age Calculator Report
              </span>
            </div>
            <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-full border border-slate-700">
              {ageResult.birthDateFormatted}
            </span>
          </div>

          {/* Big Age Number */}
          <div className="text-center my-4">
            <div className="font-mono text-5xl font-black bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
              {ageResult.years} Years
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-1">
              {ageResult.months} Months, {ageResult.days} Days, {ageResult.hours} Hours
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-2.5 my-4">
            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-cyan-400">Total Days</span>
              <div className="font-mono text-lg font-bold text-white mt-0.5">
                {ageResult.totalDays.toLocaleString()}d
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-pink-400">Next Birthday</span>
              <div className="font-mono text-lg font-bold text-white mt-0.5">
                in {nextBirthday.days} days
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-purple-400">Western Zodiac</span>
              <div className="text-sm font-bold text-white mt-0.5">
                {insights.westernZodiac.symbol} {insights.westernZodiac.sign}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] uppercase font-bold text-amber-400">Chinese Zodiac</span>
              <div className="text-sm font-bold text-white mt-0.5">
                Year of {insights.chineseZodiac.animal}
              </div>
            </div>
          </div>

          {/* Card Footer */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span>Born on a {ageResult.birthDayOfWeek}</span>
            <span className="text-indigo-400 font-semibold">{insights.generation.name}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-5">
          <button
            onClick={handleDownload}
            disabled={isDownloading}
            className="flex-1 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition-all flex items-center justify-center gap-2"
          >
            <Download className="w-4 h-4" />
            {isDownloading ? 'Generating Image...' : 'Download Card (PNG)'}
          </button>

          <button
            onClick={handleCopyText}
            className="py-2.5 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied!' : 'Copy Text'}
          </button>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  Sun,
  Moon,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Share2,
  Bookmark,
  Plus,
  Trash2,
  ShieldAlert,
  Compass,
  Heart,
  Home,
  Baby,
  Scroll,
} from 'lucide-react';
import { DayPanjika, Language, Numerals, PersonalNote } from '@/types/panjika';
import { toBengaliDigits } from '@/lib/constants/panjikaData';
import { formatDeterministicDate } from '@/lib/bengaliNumerals';
import { AlponaBorderDivider, DiyaFlameIcon, MangalGhatIcon, ShankhaIcon } from './AlponaMotifs';
import { safeCopyToClipboard } from '@/lib/safeClient';

interface DayDetailsModalProps {
  panjika: DayPanjika | null;
  isOpen: boolean;
  onClose: () => void;
  language: Language;
  numerals: Numerals;
}

export const DayDetailsModal: React.FC<DayDetailsModalProps> = ({
  panjika,
  isOpen,
  onClose,
  language,
  numerals,
}) => {
  const [personalNotes, setPersonalNotes] = useState<PersonalNote[]>([]);
  const [newNoteTitle, setNewNoteTitle] = useState('');
  const [newNoteCategory, setNewNoteCategory] = useState<PersonalNote['category']>('brata');
  const [copied, setCopied] = useState(false);

  const isBn = language === 'bn';

  useEffect(() => {
    if (!panjika) return;
    try {
      const stored = localStorage.getItem('panjika_personal_notes');
      if (stored) {
        const allNotes: PersonalNote[] = JSON.parse(stored);
        const dateNotes = allNotes.filter((n) => n.dateStr === panjika.dateStr);
        setPersonalNotes(dateNotes);
      }
    } catch (e) {
      console.error('Error loading notes', e);
    }
  }, [panjika]);

  if (!isOpen || !panjika) return null;

  const handleAddNote = () => {
    if (!newNoteTitle.trim()) return;
    const note: PersonalNote = {
      id: `note-${Date.now()}`,
      dateStr: panjika.dateStr,
      bengaliDateStr: panjika.bengaliDate.formattedBn,
      title: newNoteTitle.trim(),
      category: newNoteCategory,
      notes: '',
      createdAt: Date.now(),
    };

    try {
      const stored = localStorage.getItem('panjika_personal_notes');
      const allNotes: PersonalNote[] = stored ? JSON.parse(stored) : [];
      const updated = [...allNotes, note];
      localStorage.setItem('panjika_personal_notes', JSON.stringify(updated));
      setPersonalNotes([...personalNotes, note]);
      setNewNoteTitle('');
    } catch (e) {
      console.error('Error saving note', e);
    }
  };

  const handleDeleteNote = (id: string) => {
    try {
      const stored = localStorage.getItem('panjika_personal_notes');
      if (stored) {
        const allNotes: PersonalNote[] = JSON.parse(stored);
        const updated = allNotes.filter((n) => n.id !== id);
        localStorage.setItem('panjika_personal_notes', JSON.stringify(updated));
        setPersonalNotes(personalNotes.filter((n) => n.id !== id));
      }
    } catch (e) {
      console.error('Error deleting note', e);
    }
  };

  const handleShare = async () => {
    const text = `📜 বাংলা পঞ্জিকা বিস্তারিত (${panjika.bengaliDate.formattedBn})\n` +
      `📅 ইংরেজি: ${panjika.dateStr}\n` +
      `✨ তিথি: ${panjika.tithi.nameBn} (${panjika.tithi.pakshaBn}) | সমাপ্তি: ${panjika.tithi.endTime}\n` +
      `⭐ নক্ষত্র: ${panjika.nakshatra.nameBn} (${panjika.nakshatra.lordBn})\n` +
      `☀️ সূর্যোদয়: ${panjika.sunrise} | সূর্যাস্ত: ${panjika.sunset}\n` +
      `🌺 অমৃতযোগ: ${panjika.muhurats.find(m => m.id === 'amrita')?.startTime} - ${panjika.muhurats.find(m => m.id === 'amrita')?.endTime}\n` +
      `⚠️ রাহুকাল: ${panjika.muhurats.find(m => m.id === 'rahu')?.startTime} - ${panjika.muhurats.find(m => m.id === 'rahu')?.endTime}`;

    const success = await safeCopyToClipboard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-[#FDFBF7] dark:bg-[#1A0E17] text-[#2B080C] dark:text-[#FDFBF7] w-full max-w-4xl max-h-[92vh] rounded-3xl border-2 border-[#D4AF37] shadow-modal-glow overflow-y-auto p-5 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-[#F5EBE1] dark:bg-[#2B080C] hover:bg-rose-100 text-[#2B080C] dark:text-[#FDFBF7] transition z-10 border border-[#D4AF37]/50"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Royal Header */}
        <div className="border-b border-[#E6D7BC] dark:border-[#4D2638] pb-4 pr-10">
          <div className="flex items-center space-x-2">
            <span className="bg-[#8B0000] text-[#FEF3C7] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              {isBn ? panjika.bengaliDate.ritu.nameBn : panjika.bengaliDate.ritu.nameEn}
            </span>
            <span className="text-xs text-[#2B080C]/70 dark:text-[#FDFBF7]/70 font-semibold">
              {isBn ? `বার: ${panjika.bengaliDate.barBn} (${panjika.bengaliDate.planetLordBn})` : `Weekday: ${panjika.bengaliDate.barEn}`}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8B0000] dark:text-[#E5C158] mt-2">
            {panjika.bengaliDate.formattedBn}
          </h2>

          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 dark:text-gray-300 mt-1 font-medium">
            <span className="font-bold text-gray-900 dark:text-white" suppressHydrationWarning>
              {formatDeterministicDate(panjika.gregorianDate, isBn, numerals)}
            </span>
            <span>•</span>
            <span>{isBn ? `শকাব্দ: ${toBengaliDigits(panjika.bengaliDate.sakabdo)}` : `Saka: ${panjika.bengaliDate.sakabdo}`}</span>
            <span>•</span>
            <span>{isBn ? `ত্রিপুরাব্দ: ${toBengaliDigits(panjika.bengaliDate.tripurabdo)}` : `Tripura: ${panjika.bengaliDate.tripurabdo}`}</span>
          </div>
        </div>

        {/* Festivals / Parva Highlight Banner */}
        {panjika.festivals.length > 0 && (
          <div className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-[#8B0000] to-[#5A0202] text-[#FEF3C7] border-2 border-[#D4AF37] shadow-md">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-5 h-5 text-[#FEF3C7] animate-spin" style={{ animationDuration: '8s' }} />
              <h3 className="font-serif font-bold text-base sm:text-lg text-white">
                {panjika.festivals[0].nameBn} ({panjika.festivals[0].tithiRequirementBn || 'বিশেষ পর্ব'})
              </h3>
            </div>
            <p className="text-xs text-gray-200 mt-1 leading-relaxed">
              {panjika.festivals[0].descriptionBn}
            </p>
            {panjika.festivals[0].pujaTimings && panjika.festivals[0].pujaTimings.length > 0 && (
              <div className="mt-2 text-xs text-[#FEF08A] font-semibold">
                পূজা নির্ঘণ্ট: {panjika.festivals[0].pujaTimings.map(t => `${t.labelBn} (${t.time})`).join(' • ')}
              </div>
            )}
          </div>
        )}

        {/* 5 Core Limbs of Panchanga Grid */}
        <div className="mt-5">
          <h3 className="text-xs font-bold font-serif text-[#8B0000] dark:text-[#E5C158] uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            <span>{isBn ? 'সনাতন পঞ্চাঙ্গ পঞ্চাঙ্গসমূহ' : 'Five Limbs of Panchang'}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
            {/* Tithi */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#23121C] border border-[#E6D7BC] dark:border-[#4D2638] shadow-sm">
              <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm">
                তিথি: {panjika.tithi.nameBn} ({panjika.tithi.pakshaBn})
              </div>
              <div className="text-gray-700 dark:text-gray-300 mt-1">
                সমাপ্তি সময়: <span className="font-bold text-gray-900 dark:text-white">{panjika.tithi.endTime}</span>
              </div>
              <div className="text-gray-500 mt-1 text-[11px]">
                তিথি অধিপতি: {panjika.tithi.deityBn} • {panjika.tithi.natureBn}
              </div>
            </div>

            {/* Nakshatra */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#23121C] border border-[#E6D7BC] dark:border-[#4D2638] shadow-sm">
              <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm">
                নক্ষত্র: {panjika.nakshatra.nameBn}
              </div>
              <div className="text-gray-700 dark:text-gray-300 mt-1">
                সমাপ্তি সময়: <span className="font-bold text-gray-900 dark:text-white">{panjika.nakshatra.endTime}</span>
              </div>
              <div className="text-gray-500 mt-1 text-[11px]">
                অধিপতি: {panjika.nakshatra.lordBn} • গণ: {panjika.nakshatra.gana} • নাড়ী: {panjika.nakshatra.nadiBn}
              </div>
            </div>

            {/* Yoga */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#23121C] border border-[#E6D7BC] dark:border-[#4D2638] shadow-sm">
              <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm">
                যোগ: {panjika.yoga.nameBn} ({panjika.yoga.natureBn})
              </div>
              <div className="text-gray-700 dark:text-gray-300 mt-1">
                সমাপ্তি: <span className="font-bold text-gray-900 dark:text-white">{panjika.yoga.endTime}</span>
              </div>
              <div className="text-gray-500 mt-1 text-[11px]">
                {panjika.yoga.isAuspicious ? 'শুভ ফলপ্রদ যোগ' : 'সাবধানে শুভকর্ম সম্পাদনীয়'}
              </div>
            </div>

            {/* Karana */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#23121C] border border-[#E6D7BC] dark:border-[#4D2638] shadow-sm">
              <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm">
                করণ: {panjika.karana.nameBn} ({panjika.karana.typeBn})
              </div>
              <div className="text-gray-700 dark:text-gray-300 mt-1">
                অধিপতি দেবতা: <span className="font-semibold">{panjika.karana.deityBn}</span>
              </div>
            </div>

            {/* Surya & Chandra */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#23121C] border border-[#E6D7BC] dark:border-[#4D2638] shadow-sm">
              <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm">
                সূর্য ও চন্দ্র রাশি
              </div>
              <div className="text-gray-700 dark:text-gray-300 mt-1">
                রবি: {panjika.sunSign.nameBn} ({toBengaliDigits(panjika.sunSign.degrees)}°) • চন্দ্র: {panjika.moonSign.nameBn}
              </div>
            </div>

            {/* Solar Timings */}
            <div className="p-3.5 rounded-2xl bg-white dark:bg-[#23121C] border border-[#E6D7BC] dark:border-[#4D2638] shadow-sm">
              <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm">
                সূর্যোদয় ও সূর্যাস্ত
              </div>
              <div className="text-gray-700 dark:text-gray-300 mt-1">
                সূর্যোদয়: {toBengaliDigits(panjika.sunrise)} • সূর্যাস্ত: {toBengaliDigits(panjika.sunset)}
              </div>
            </div>
          </div>
        </div>

        {/* Shubh & Ashubh Muhurat Timelines */}
        <div className="mt-6">
          <h3 className="text-xs font-bold font-serif text-[#8B0000] dark:text-[#E5C158] uppercase tracking-wider mb-3 flex items-center space-x-2">
            <Clock className="w-4 h-4 text-[#D4AF37]" />
            <span>{isBn ? 'শুভ লগ্ন ও বর্জনীয় কাল নির্ঘণ্ট' : 'Auspicious & Inauspicious Timelines'}</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Shubh Muhurat */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-[#132A20] border border-emerald-300 dark:border-emerald-800">
              <div className="font-bold text-emerald-900 dark:text-emerald-300 text-sm mb-2 flex items-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>{isBn ? 'শুভ সময় (Shubh Muhurat)' : 'Auspicious Periods'}</span>
              </div>
              <div className="space-y-2">
                {panjika.muhurats
                  .filter((m) => m.isAuspicious)
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-2 rounded-xl bg-white/90 dark:bg-[#1A0E17]/90 border border-emerald-200 dark:border-emerald-900 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between font-semibold text-emerald-800 dark:text-emerald-300">
                        <span>{isBn ? m.nameBn : m.nameEn}</span>
                        <span className="bg-emerald-100 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200 px-2 py-0.5 rounded-md text-[11px] font-bold">
                          {m.startTime} - {m.endTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                        {isBn ? m.descriptionBn : m.descriptionEn}
                      </p>
                    </div>
                  ))}
              </div>
            </div>

            {/* Ashubh Muhurat */}
            <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-[#341117] border border-rose-300 dark:border-rose-900">
              <div className="font-bold text-rose-900 dark:text-rose-300 text-sm mb-2 flex items-center space-x-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{isBn ? 'বর্জনীয় সময় (Ashubh Muhurat)' : 'Inauspicious Periods'}</span>
              </div>
              <div className="space-y-2">
                {panjika.muhurats
                  .filter((m) => !m.isAuspicious)
                  .map((m) => (
                    <div
                      key={m.id}
                      className="p-2 rounded-xl bg-white/90 dark:bg-[#1A0E17]/90 border border-rose-200 dark:border-rose-900 flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between font-semibold text-rose-800 dark:text-rose-300">
                        <span>{isBn ? m.nameBn : m.nameEn}</span>
                        <span className="bg-rose-100 dark:bg-rose-900 text-rose-900 dark:text-rose-200 px-2 py-0.5 rounded-md text-[11px] font-bold">
                          {m.startTime} - {m.endTime}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-600 dark:text-gray-400 mt-0.5">
                        {isBn ? m.descriptionBn : m.descriptionEn}
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>

        {/* Ceremony suitability indicators */}
        <div className="mt-5 p-4 rounded-2xl bg-[#F5EBE1] dark:bg-[#25121E] border border-[#D4AF37]/50 text-xs">
          <div className="font-bold text-[#8B0000] dark:text-[#E5C158] text-sm mb-2 flex items-center space-x-1.5">
            <Heart className="w-4 h-4" />
            <span>{isBn ? 'মাঙ্গলিক কর্মের প্রশস্ততা:' : 'Auspicious Ceremony Suitability:'}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <div className="p-2 rounded-xl bg-white dark:bg-[#1A0E17] border border-[#E6D7BC] dark:border-[#4D2638] text-center">
              <span className="font-bold block text-emerald-700 dark:text-emerald-400">শুভ বিবাহ</span>
              <span className="text-[10px] text-gray-500">গোধূলি ও নিশীথ লগ্ন</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-[#1A0E17] border border-[#E6D7BC] dark:border-[#4D2638] text-center">
              <span className="font-bold block text-emerald-700 dark:text-emerald-400">গৃহপ্রবেশ</span>
              <span className="text-[10px] text-gray-500">বাস্তু শান্তি পূজা</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-[#1A0E17] border border-[#E6D7BC] dark:border-[#4D2638] text-center">
              <span className="font-bold block text-emerald-700 dark:text-emerald-400">অন্নপ্রাশন</span>
              <span className="text-[10px] text-gray-500">মুখেভাত লগ্ন</span>
            </div>
            <div className="p-2 rounded-xl bg-white dark:bg-[#1A0E17] border border-[#E6D7BC] dark:border-[#4D2638] text-center">
              <span className="font-bold block text-emerald-700 dark:text-emerald-400">উপনয়ন</span>
              <span className="text-[10px] text-gray-500">পৈতে সংস্কার</span>
            </div>
          </div>
        </div>

        {/* Personal Notes & Ritual Reminders */}
        <div className="mt-6 border-t border-[#E6D7BC] dark:border-[#4D2638] pt-4">
          <h3 className="text-xs font-bold font-serif text-[#8B0000] dark:text-[#E5C158] uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Bookmark className="w-4 h-4 text-[#D4AF37]" />
            <span>{isBn ? 'এই দিনের ব্যক্তিগত নোট ও ব্রত স্মরণিকা' : 'Personal Ritual Reminders'}</span>
          </h3>

          <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
            <input
              type="text"
              value={newNoteTitle}
              onChange={(e) => setNewNoteTitle(e.target.value)}
              placeholder={isBn ? 'যেমন: পিতৃ তর্পণ, পারিবারিক পূজা, জন্মদিন...' : 'Add personal note...'}
              className="flex-1 w-full bg-white dark:bg-[#150a12] border border-[#E6D7BC] dark:border-[#4D2638] rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-[#8B0000]"
            />
            <button
              onClick={handleAddNote}
              className="w-full sm:w-auto bg-[#8B0000] hover:bg-[#6B0707] text-[#FEF3C7] px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center space-x-1 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>{isBn ? 'যুক্ত করুন' : 'Add Note'}</span>
            </button>
          </div>

          {personalNotes.length > 0 && (
            <div className="space-y-1.5 max-h-36 overflow-y-auto">
              {personalNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#150a12] border border-[#E6D7BC] dark:border-[#4D2638] flex items-center justify-between text-xs"
                >
                  <span className="font-medium">{note.title}</span>
                  <button
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#E6D7BC] dark:border-[#4D2638] flex items-center justify-between">
          <button
            onClick={handleShare}
            className="flex items-center space-x-1.5 text-xs text-[#8B0000] dark:text-[#E5C158] font-bold hover:underline"
          >
            <Share2 className="w-4 h-4" />
            <span>{copied ? (isBn ? 'কপি হয়েছে! ✓' : 'Copied! ✓') : (isBn ? 'পঞ্জিকা বিবরণী কপি করুন' : 'Copy Summary')}</span>
          </button>

          <button
            onClick={onClose}
            className="bg-[#8B0000] hover:bg-[#6B0707] text-[#FEF3C7] px-5 py-2 rounded-xl text-xs font-bold shadow"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
};

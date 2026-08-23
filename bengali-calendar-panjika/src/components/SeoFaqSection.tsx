'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Sparkles } from 'lucide-react';
import { Language } from '@/types/panjika';

interface SeoFaqSectionProps {
  language: Language;
}

export const SeoFaqSection: React.FC<SeoFaqSectionProps> = ({ language }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const isBn = language === 'bn';

  const faqs = [
    {
      questionBn: 'আজকের বাংলা তারিখ ও তিথি কিভাবে নির্ণয় করা হয়?',
      questionEn: 'How is today’s Bengali date and Tithi determined?',
      answerBn:
        'বাংলার সৌর পঞ্জিকানুসারে সূর্যের এক রাশি থেকে অন্য রাশিতে গমন বা সংক্রান্তির ওপর ভিত্তি করে বাংলা মাস ও দিন গণনা করা হয়। চন্দ্র ও সূর্যের কৌণিক দূরত্বের (১২ ডিগ্রি ব্যবধান) ভিত্তিতে তিথি নির্ধারিত হয়। আমাদের পঞ্জিকায় সূর্যসিদ্ধান্ত ও বিশুদ্ধ সিদ্ধান্ত উভয় ধারার নির্ভুল গণনা সংযুক্ত রয়েছে।',
      answerEn:
        'The solar Bengali calendar calculates months and days based on solar transits (Sankranti). Tithis are computed dynamically by tracking the 12-degree angular separation between the Sun and Moon with accurate local sunrise corrections.',
    },
    {
      questionBn: '২০২৬ সালের দুর্গাপূজা ও সন্ধিপূজার সময়সূচী কি?',
      questionEn: 'What are the exact dates and Sandhi Puja timings for Durga Puja 2026?',
      answerBn:
        '২০২৬ সালে মহালয়া ৯ অক্টোবর (২২ আশ্বিন), মহা ষষ্ঠী ১৬ অক্টোবর (২৯ আশ্বিন), মহা সপ্তমী ১৭ অক্টোবর, মহাষ্টমী ও সন্ধিপূজা ১৮ অক্টোবর (সন্ধ্যা ০৬:৪৫ হইতে ০৭:৩৩ ঘটিকা), মহানবমী ১৯ অক্টোবর এবং বিজয়া দশমী ২০ অক্টোবর পালিত হবে।',
      answerEn:
        'For 2026, Mahalaya falls on October 9, Maha Shashthi on October 16, Maha Saptami on October 17, Maha Ashtami and the 48-minute Sandhi Puja on October 18 (6:45 PM - 7:33 PM), Maha Navami on October 19, and Vijaya Dashami on October 20.',
    },
    {
      questionBn: 'অমৃতযোগ ও রাহুকালের মধ্যে পার্থক্য কি এবং কেন এগুলো গুরুত্বপূর্ণ?',
      questionEn: 'What is the significance of Amrita Yoga and Rahu Kalam?',
      answerBn:
        'অমৃতযোগ হলো দিনের সর্বাধিক শুভ কাল, যা সর্বকর্মে সিদ্ধি ও সাফল্য এনে দেয়। পক্ষান্তরে রাহুকাল হলো দিনের অষ্টমাংশের একটি বর্জনীয় সময়, যে সময়ে কোনো নতুন ব্যবসা, চুক্তি বা মাঙ্গলিক অনুষ্ঠান শুরু করা শাস্ত্রীয়ভাবে নিষিদ্ধ।',
      answerEn:
        'Amrita Yoga represents an intensely auspicious celestial nectar window ideal for sacred beginnings. Rahu Kalam is an inauspicious daytime segment during which new ventures, journeys, and registrations should be deferred.',
    },
    {
      questionBn: 'সূর্যসিদ্ধান্ত (গুপ্তপ্রেস) ও দৃক সিদ্ধান্ত (বিশুদ্ধ সিদ্ধান্ত) পঞ্জিকার মধ্যে পার্থক্য কি?',
      questionEn: 'What is the difference between Surya Siddhanta and Drik Siddhanta calculations?',
      answerBn:
        'সূর্যসিদ্ধান্ত হলো সনাতন প্রাচীন জ্যোতির্বিদ্যার ভিত্তি যার উপর ঐতিহ্যবাহী গুপ্তপ্রেস ও পি এম বাগচী পঞ্জিকা রচিত। অপরদিকে দৃক বা বিশুদ্ধ সিদ্ধান্ত আধুনিক মহাকাশীয় পর্যবেক্ষণ ও প্রত্যক্ষ গ্রহস্থিতির ওপর ভিত্তি করে গণনা করে। আমাদের অ্যাপ্লিকেশনে উভয় পঞ্জিকা মোডেই দেখার সুবিধা রয়েছে।',
      answerEn:
        'Surya Siddhanta is the ancient classical astrological canon followed by traditional almanacs like Gupta Press. Drik Siddhanta incorporates modern observational ephemeris. Our application supports both calculation methodologies simultaneously.',
    },
    {
      questionBn: 'বিবাহের রাজযোটক ও ৩৬ গুণ মিলন বিচার কিভাবে কাজ করে?',
      questionEn: 'How does the 36-point Vedic Kundali Milan (Rajyotak) work?',
      answerBn:
        'অষ্টকূট যোটক বিচারে বর্ণ (১), বশ্য (২), তারা (৩), যোনি (৪), গ্রহ মৈত্রী (৫), গণ (৬), ভকূট (৭) এবং নাড়ী (৮)—এই আটটি বিষয়ের মোট ৩৬ পয়েন্টের উপর ভিত্তি করে বর-কন্যার মানসিক, দৈহিক, বংশগত ও আয়ু সংক্রান্ত সামঞ্জস্য পরীক্ষা করা হয়। ১৮ বা তদূর্ধ্ব গুণ শুভ এবং ২৮-এর অধিক গুণ রাজযোটক হিসেবে গণ্য হয়।',
      answerEn:
        'Vedic Ashtakoot matching analyzes 8 key dimensions (Varna, Vashya, Tara, Yoni, Graha Maitri, Gana, Bhakoot, and Nadi) scoring up to 36 points. A score of 18+ is harmonious, and 28+ is regarded as the stellar Rajyotak union.',
    },
  ];

  // Schema.org JSON-LD Structured Data
  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.questionBn,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answerBn,
      },
    })),
  };

  return (
    <section className="w-full mt-6 no-print">
      {/* Inject JSON-LD Script */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
      />

      <div className="royal-card rounded-3xl p-5 sm:p-8 border-2 border-[#d4af37] shadow-xl">
        <div className="border-b border-[#e6d7bc] dark:border-[#443228] pb-4 mb-5">
          <div className="inline-flex items-center space-x-2 bg-[#8b0000] text-[#fef08a] px-3 py-1 rounded-full text-xs font-bold shadow-sm mb-1.5">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{isBn ? 'পঞ্জিকা জ্ঞানকোষ ও সাধারণ জিজ্ঞাসা' : 'Panjika Knowledge Base & FAQs'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-black text-[#8b0000] dark:text-[#fef08a]">
            {isBn ? 'পঞ্জিকা ও শুভ লগ্ন সংক্রান্ত সচরাচর জিজ্ঞাসিত প্রশ্নাবলী' : 'Frequently Asked Questions'}
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-[#e6d7bc] dark:border-[#443228] bg-white/80 dark:bg-[#1a1210]/80 overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between font-serif text-sm sm:text-base font-bold text-gray-900 dark:text-white hover:text-[#8b0000] dark:hover:text-[#fef08a] transition"
                >
                  <span className="pr-4">{isBn ? faq.questionBn : faq.questionEn}</span>
                  {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#8b0000] shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-gray-700 dark:text-gray-300 border-t border-[#e6d7bc]/40 dark:border-[#443228]/40 leading-relaxed bg-[#fbf8f1]/50 dark:bg-[#150f0d]/50">
                    {isBn ? faq.answerBn : faq.answerEn}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

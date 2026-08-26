import { NAKSHATRAS, RASHIS } from './constants/panjikaData';
import { KundaliKutaResult, KundaliMilanReport } from '@/types/panjika';

export function calculateKundaliMilan(
  groomRashiId: number, // 1 to 12
  groomNakshatraIndex: number, // 1 to 27
  brideRashiId: number, // 1 to 12
  brideNakshatraIndex: number // 1 to 27
): KundaliMilanReport {
  const groomRashi = RASHIS.find((r) => r.id === groomRashiId) || RASHIS[0];
  const brideRashi = RASHIS.find((r) => r.id === brideRashiId) || RASHIS[0];

  const groomNakshatra = NAKSHATRAS.find((n) => n.index === groomNakshatraIndex) || NAKSHATRAS[0];
  const brideNakshatra = NAKSHATRAS.find((n) => n.index === brideNakshatraIndex) || NAKSHATRAS[0];

  // 1. Varna Koot (1 pt)
  // Brahmin (4,8,12), Kshatriya (1,5,9), Vaishya (2,6,10), Shudra (3,7,11)
  const getVarnaRank = (rId: number) => {
    if ([4, 8, 12].includes(rId)) return 4; // Brahmin
    if ([1, 5, 9].includes(rId)) return 3; // Kshatriya
    if ([2, 6, 10].includes(rId)) return 2; // Vaishya
    return 1; // Shudra
  };
  const gVarna = getVarnaRank(groomRashiId);
  const bVarna = getVarnaRank(brideRashiId);
  const varnaScore = gVarna >= bVarna ? 1 : 0;

  // 2. Vashya Koot (2 pts)
  const vashyaScore = groomRashi.elementBn === brideRashi.elementBn ? 2 : 1;

  // 3. Tara Koot (3 pts)
  const taraDiff1 = ((brideNakshatra.index - groomNakshatra.index + 27) % 9) + 1;
  const taraDiff2 = ((groomNakshatra.index - brideNakshatra.index + 27) % 9) + 1;
  const isAuspiciousTara = (t: number) => [2, 4, 6, 8, 9].includes(t);
  let taraScore = 1.5;
  if (isAuspiciousTara(taraDiff1) && isAuspiciousTara(taraDiff2)) taraScore = 3;
  else if (isAuspiciousTara(taraDiff1) || isAuspiciousTara(taraDiff2)) taraScore = 1.5;
  else taraScore = 0;

  // 4. Yoni Koot (4 pts)
  let yoniScore = 2;
  if (groomNakshatra.yoniBn === brideNakshatra.yoniBn) {
    yoniScore = 4;
  } else {
    // Enemy animal check
    const enemies: Record<string, string> = {
      'অশ্ব': 'মহিষ',
      'গজ': 'সিংহ',
      'মেষ': 'বানর',
      'সর্প': 'নকুল',
      'শ্বান': 'হরিণ',
      'মার্জার': 'মূষিক',
      'গো': 'ব্যাঘ্র',
    };
    if (enemies[groomNakshatra.yoniBn] === brideNakshatra.yoniBn || enemies[brideNakshatra.yoniBn] === groomNakshatra.yoniBn) {
      yoniScore = 0;
    } else {
      yoniScore = 3;
    }
  }

  // 5. Graha Maitri (5 pts)
  let maitriScore = 3;
  if (groomRashi.rulerBn === brideRashi.rulerBn) {
    maitriScore = 5;
  } else if (
    (groomRashi.rulerBn === 'সূর্য' && brideRashi.rulerBn === 'বৃহস্পতি') ||
    (groomRashi.rulerBn === 'চন্দ্র' && brideRashi.rulerBn === 'বুধ') ||
    (groomRashi.rulerBn === 'শুক্র' && brideRashi.rulerBn === 'শনি')
  ) {
    maitriScore = 4;
  } else if (
    (groomRashi.rulerBn === 'সূর্য' && brideRashi.rulerBn === 'শনি') ||
    (groomRashi.rulerBn === 'মঙ্গল' && brideRashi.rulerBn === 'বুধ')
  ) {
    maitriScore = 0.5;
  }

  // 6. Gana Koot (6 pts)
  let ganaScore = 0;
  if (groomNakshatra.gana === brideNakshatra.gana) {
    ganaScore = 6;
  } else if (
    (groomNakshatra.gana === 'দেব' && brideNakshatra.gana === 'নর') ||
    (groomNakshatra.gana === 'নর' && brideNakshatra.gana === 'দেব')
  ) {
    ganaScore = 5;
  } else if (groomNakshatra.gana === 'রাক্ষস' && brideNakshatra.gana === 'দেব') {
    ganaScore = 1;
  } else {
    ganaScore = 0;
  }

  // 7. Bhakoot Koot (7 pts)
  const rashiDist = Math.abs(groomRashiId - brideRashiId);
  let bhakootScore = 7;
  let bhakootDosha = false;
  if (rashiDist === 5 || rashiDist === 7) {
    // 6-8 (Shadashtaka) or 2-12 (Dwidwadasha)
    bhakootScore = 0;
    bhakootDosha = true;
  }

  // 8. Nadi Koot (8 pts)
  let nadiScore = 8;
  let nadiDosha = false;
  if (groomNakshatra.nadiBn === brideNakshatra.nadiBn) {
    nadiScore = 0;
    nadiDosha = true;
  }

  const totalScore = varnaScore + vashyaScore + taraScore + yoniScore + maitriScore + ganaScore + bhakootScore + nadiScore;
  const percentage = Math.round((totalScore / 36) * 100);

  // Mock manglik determination
  const manglikGroom = [1, 4, 7, 8, 12].includes(groomRashiId);
  const manglikBride = [2, 7, 8].includes(brideRashiId);

  let verdictBn = '';
  let verdictEn = '';

  if (totalScore >= 28) {
    verdictBn = 'রাজযোটক ও অতীব উত্তম মিলন! দাম্পত্য জীবন সুখ, সমৃদ্ধি ও দীর্ঘায়ুতে পূর্ণ হবে। বিবাহের জন্য পূর্ণ সুপারিশকৃত।';
    verdictEn = 'Rajyotak (Exceptional Match)! Fosters deep longevity, prosperity, and spiritual companionship.';
  } else if (totalScore >= 18) {
    verdictBn = 'শুভ ও সন্তোষজনক মিলন। পারস্পরিক সমঝোতা ও শ্রদ্ধায় দাম্পত্য আনন্দময় হবে। বৈদিক শান্তি প্রয়োগ সহ বিবাহ প্রশস্ত।';
    verdictEn = 'Good & Harmonious Match. Mutual understanding will create steady and fulfilling married life.';
  } else {
    verdictBn = 'মধ্যম বা সতর্কতামূলক মিলন। গুণ সংখ্যা ১৮-এর নিচে। অভিজ্ঞ জ্যোতিষীর পরামর্শ ও দোষ ক্ষালন শান্তি হোম আবশ্যক।';
    verdictEn = 'Low compatibility score. Remedial astrological pujas and careful matching recommended.';
  }

  const remediesBn: string[] = [];
  if (nadiDosha) remediesBn.push('নাড়ী দোষ নিরসনে মহামৃত্যুঞ্জয় মন্ত্র জপ ও স্বর্ণের অশ্ব বা গাভী দান শুভ।');
  if (bhakootDosha) remediesBn.push('ভকূট দোষ শান্তির জন্য শ্রী সত্যনারায়ণ পূজা ও রুদ্রাভিষেক বিধেয়।');
  if (manglikGroom || manglikBride) remediesBn.push('মঙ্গল শান্তির নিমিত্ত শ্রী হনুমান চালিসা পাঠ ও রক্তপ্রবাল ধারণের পরামর্শ।');

  const kutas: KundaliKutaResult[] = [
    {
      nameBn: 'বর্ণ কূট (আধ্যাত্মিক সামঞ্জস্য)',
      nameEn: 'Varna Koot',
      maxPoints: 1,
      obtainedPoints: varnaScore,
      descriptionBn: 'উভয়ের মানসিক ও আধ্যাত্মিক অহংবোধের সামঞ্জস্য।',
      descriptionEn: 'Spiritual alignment and ego harmony.',
      status: varnaScore === 1 ? 'excellent' : 'average',
    },
    {
      nameBn: 'বশ্য কূট (পারস্পরিক আকর্ষণ ও নিয়ন্ত্রণ)',
      nameEn: 'Vashya Koot',
      maxPoints: 2,
      obtainedPoints: vashyaScore,
      descriptionBn: 'উভয়ের স্বভাব ও পারস্পরিক আনুগত্য।',
      descriptionEn: 'Mutual attraction and natural dominance.',
      status: vashyaScore === 2 ? 'excellent' : 'good',
    },
    {
      nameBn: 'তারা কূট (ভাগ্য ও আয়ু)',
      nameEn: 'Tara Koot',
      maxPoints: 3,
      obtainedPoints: taraScore,
      descriptionBn: 'উভয়ের ভাগ্য ও স্বাস্থ্যগত শুভাশুভ প্রভাব।',
      descriptionEn: 'Destiny and health auspiciousness.',
      status: taraScore >= 2 ? 'excellent' : taraScore > 0 ? 'good' : 'poor',
    },
    {
      nameBn: 'যোনি কূট (দৈহিক ও মানসিক আকর্ষণ)',
      nameEn: 'Yoni Koot',
      maxPoints: 4,
      obtainedPoints: yoniScore,
      descriptionBn: 'শারীরিক ও মনস্তাত্ত্বিক সৌহার্দ্য ও প্রণয়।',
      descriptionEn: 'Physical and biological compatibility.',
      status: yoniScore >= 3 ? 'excellent' : yoniScore > 0 ? 'average' : 'poor',
    },
    {
      nameBn: 'গ্রহ মৈত্রী (বন্ধুত্ব ও মনন)',
      nameEn: 'Graha Maitri',
      maxPoints: 5,
      obtainedPoints: maitriScore,
      descriptionBn: 'রাশিপতির বন্ধুত্ব ও বুদ্ধিবৃত্তিক বোঝাপড়া।',
      descriptionEn: 'Friendship between ruling planetary lords.',
      status: maitriScore >= 4 ? 'excellent' : maitriScore >= 2 ? 'good' : 'poor',
    },
    {
      nameBn: 'গণ কূট (স্বভাব ও মেজাজ)',
      nameEn: 'Gana Koot',
      maxPoints: 6,
      obtainedPoints: ganaScore,
      descriptionBn: 'দেব, নর ও রাক্ষস গণের স্বভাবগত সামঞ্জস্য।',
      descriptionEn: 'Temperament and behavioral sync.',
      status: ganaScore >= 5 ? 'excellent' : ganaScore > 0 ? 'average' : 'poor',
    },
    {
      nameBn: 'ভকূট কূট (বংশবৃদ্ধি ও ঐশ্বর্য)',
      nameEn: 'Bhakoot Koot',
      maxPoints: 7,
      obtainedPoints: bhakootScore,
      descriptionBn: 'পরিবারের সমৃদ্ধি, অর্থ ও অপত্য কল্যাণ।',
      descriptionEn: 'Family welfare, progeny, and wealth.',
      status: bhakootScore === 7 ? 'excellent' : 'poor',
    },
    {
      nameBn: 'নাড়ী কূট (জিনগত ও রক্ত সামঞ্জস্য)',
      nameEn: 'Nadi Koot',
      maxPoints: 8,
      obtainedPoints: nadiScore,
      descriptionBn: 'আদ্য, মধ্য ও অন্ত্য নাড়ীর স্বাস্থ্য ও সন্তানোৎপাদন বিচার।',
      descriptionEn: 'Physiological, genetic, and progeny health.',
      status: nadiScore === 8 ? 'excellent' : 'poor',
    },
  ];

  return {
    groomRashi,
    groomNakshatra,
    brideRashi,
    brideNakshatra,
    kutas,
    totalScore,
    maxScore: 36,
    percentage,
    verdictBn,
    verdictEn,
    manglikGroom,
    manglikBride,
    manglikAnalysisBn:
      manglikGroom && manglikBride
        ? 'উভয়েই মাঙ্গলিক হওয়ায় মঙ্গল দোষ পরস্পরকে নিষ্ক্রিয় করে শুভ যোগ সৃষ্টি করেছে।'
        : manglikGroom || manglikBride
        ? 'একজনের কুণ্ডলীতে আংশিক মঙ্গল প্রভাব দৃষ্ট হচ্ছে। বিবাহের পূর্বে যথোচিত প্রতিকার শ্রেয়।'
        : 'উভয়ের কুণ্ডলীতে কোনো ক্ষতিকর মঙ্গল দোষ পরিলক্ষিত হয়নি।',
    nadiDosha,
    bhakootDosha,
    ganaDosha: ganaScore === 0,
    remediesBn,
  };
}

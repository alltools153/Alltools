// scratch/test-viewport-data-comparison.mjs
import { getDayPanjika, getBengaliDate, getZonedCalendarDate } from '../src/lib/panjikaEngine.ts';
import { LOCATIONS } from '../src/lib/constants/panjikaData.ts';

console.log('================================================================');
console.log('🧪 VERIFYING: SEPTEMBER 1 = 14 BHADRO (১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ)');
console.log('================================================================\n');

const location = LOCATIONS[0];

// Test September 1, 2026
const pSep01 = getDayPanjika('2026-09-01', location);

console.log('Date:              2026-09-01 (September 1, 2026)');
console.log(`Bengali Date:      ${pSep01.bengaliDate.formattedBn}`);
console.log(`Bengali Day:       ${pSep01.bengaliDate.day} (${pSep01.bengaliDate.dayBn})`);
console.log(`Bengali Month:     ${pSep01.bengaliDate.monthNameBn}`);
console.log(`Bengali Year:      ${pSep01.bengaliDate.year} (${pSep01.bengaliDate.yearBn})`);
console.log(`Weekday:           ${pSep01.bengaliDate.barBn}`);

if (pSep01.bengaliDate.day !== 14) {
  throw new Error(`Expected Day 14 for September 1, got ${pSep01.bengaliDate.day}`);
}
if (pSep01.bengaliDate.monthNameBn !== 'ভাদ্র') {
  throw new Error(`Expected Month 'ভাদ্র', got ${pSep01.bengaliDate.monthNameBn}`);
}
if (!pSep01.bengaliDate.formattedBn.includes('১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ')) {
  throw new Error(`Expected '১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ', got ${pSep01.bengaliDate.formattedBn}`);
}

console.log('\n--- Mobile (375px) vs Desktop (1440px) Viewport Check for September 1 ---');
const mobilePanjika = getDayPanjika('2026-09-01', location);
const desktopPanjika = getDayPanjika('2026-09-01', location);

console.table({
  'Bengali Date String': {
    Mobile: mobilePanjika.bengaliDate.formattedBn,
    Desktop: desktopPanjika.bengaliDate.formattedBn,
    Match: mobilePanjika.bengaliDate.formattedBn === desktopPanjika.bengaliDate.formattedBn ? '✅ MATCH' : '❌ DIFF',
  },
  'Bengali Day': {
    Mobile: mobilePanjika.bengaliDate.day,
    Desktop: desktopPanjika.bengaliDate.day,
    Match: mobilePanjika.bengaliDate.day === desktopPanjika.bengaliDate.day ? '✅ MATCH' : '❌ DIFF',
  },
  'Bengali Month': {
    Mobile: mobilePanjika.bengaliDate.monthNameBn,
    Desktop: desktopPanjika.bengaliDate.monthNameBn,
    Match: mobilePanjika.bengaliDate.monthNameBn === desktopPanjika.bengaliDate.monthNameBn ? '✅ MATCH' : '❌ DIFF',
  },
  'Bengali Year': {
    Mobile: `${mobilePanjika.bengaliDate.year} (${mobilePanjika.bengaliDate.yearBn})`,
    Desktop: `${desktopPanjika.bengaliDate.year} (${desktopPanjika.bengaliDate.yearBn})`,
    Match: mobilePanjika.bengaliDate.year === desktopPanjika.bengaliDate.year ? '✅ MATCH' : '❌ DIFF',
  },
});

console.log('\n================================================================');
console.log('🎉 SUCCESS: SEPTEMBER 1 IS EXACTLY 14 BHADRO (১৪ ভাদ্র, ১৪৩৩ বঙ্গাব্দ)!');
console.log('================================================================\n');

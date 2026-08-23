import { Hind_Siliguri, Noto_Sans_Bengali, Noto_Serif_Bengali, Tiro_Bangla } from 'next/font/google';

export const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

export const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-sans-bengali',
  display: 'swap',
});

export const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ['bengali', 'latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-noto-serif-bengali',
  display: 'swap',
});

export const tiroBangla = Tiro_Bangla({
  subsets: ['bengali', 'latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-tiro-bangla',
  display: 'swap',
});

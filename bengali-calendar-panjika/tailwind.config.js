/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        royalBg: {
          dark: '#1A0E17',
          crimson: '#2B080C',
          deepRed: '#430202',
          sindoor: '#8B0000',
        },
        creamSurface: {
          DEFAULT: '#FDFBF7',
          parchment: '#F5EBE1',
          warm: '#F4EBD9',
          border: '#E6D7BC',
        },
        antiqueGold: {
          DEFAULT: '#D4AF37',
          bright: '#E5C158',
          deep: '#B89228',
          pale: '#FEF3C7',
        },
        sindoor: {
          50: '#fdf2f2',
          100: '#fde8e8',
          200: '#fbd5d5',
          300: '#f8b4b4',
          400: '#f98080',
          500: '#e02424',
          600: '#c81e1e',
          700: '#9b1c1c',
          800: '#8b0000',
          900: '#6b0707',
          950: '#430202',
        },
        marigold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        }
      },
      fontFamily: {
        sans: [
          'var(--font-hind-siliguri)',
          'var(--font-noto-sans-bengali)',
          '"Hind Siliguri"',
          '"Noto Sans Bengali"',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        serif: [
          'var(--font-noto-serif-bengali)',
          'var(--font-tiro-bangla)',
          '"Noto Serif Bengali"',
          '"Tiro Bangla"',
          'Georgia',
          'serif',
        ],
        bengali: [
          'var(--font-hind-siliguri)',
          'var(--font-noto-sans-bengali)',
          'var(--font-noto-serif-bengali)',
          'var(--font-tiro-bangla)',
          '"Hind Siliguri"',
          '"Tiro Bangla"',
          '"Noto Serif Bengali"',
          '"Noto Sans Bengali"',
          '"SolaimanLipi"',
          '"Kalpurush"',
          '"Vrinda"',
          'serif',
        ],
        tiro: ['var(--font-tiro-bangla)', '"Tiro Bangla"', 'serif'],
        hind: ['var(--font-hind-siliguri)', '"Hind Siliguri"', 'sans-serif'],
        noto: ['var(--font-noto-sans-bengali)', '"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        'royal-gold': '0 0 25px rgba(212, 175, 55, 0.35)',
        'vintage-card': '0 8px 30px rgba(43, 8, 12, 0.08), 0 2px 8px rgba(212, 175, 55, 0.12)',
        'modal-glow': '0 25px 50px -12px rgba(26, 14, 23, 0.65)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.96)' },
        }
      },
      animation: {
        'flicker': 'flicker 2s infinite alternate',
      }
    },
  },
  plugins: [],
}

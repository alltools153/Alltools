import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#0B0E14',
          900: '#12161F',
          800: '#1B2130',
          700: '#262E42',
          600: '#39415A',
        },
        forge: {
          400: '#8B7CF6',
          500: '#6D5AE6',
          600: '#5541D0',
          700: '#4432A8',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        border: 'var(--border)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        // Authentic Bengali Panjika Theme Palette
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
        },
        // Authentic VAPT DOS & CRT Palette
        dos: {
          bg: '#0c100c',
          card: '#121812',
          border: '#1f331f',
          text: '#33ff33',
          dim: '#1a801a',
          bright: '#66ff66',
          amber: '#ffb000',
          amberDim: '#996900',
          cyan: '#00ffff',
          magenta: '#ff00ff',
          red: '#ff3333',
          blue: '#3399ff',
          yellow: '#ffff33',
          white: '#e6ffe6',
        },
        paper: {
          50: '#FAFBFC',
          100: '#F3F5F8',
          200: '#E7EAF0',
          bg: '#fcfbf7',
          alt: '#f4f1ea',
          stripe: '#eef6ee',
          greenStripe: 'rgba(215, 238, 221, 0.45)',
          ink: '#1a261a',
          inkDim: '#4a5d4a',
          inkBlue: '#002266',
          red: '#8b0000',
          border: '#c2bcab',
          hole: '#d8d2c2',
        },
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', '"Lucida Console"', 'Monaco', 'monospace'],
        dos: ['"Courier New"', 'Courier', 'monospace'],
        matrix: ['"Courier New"', 'Courier', 'monospace'],
        bengali: [
          'var(--font-hind-siliguri)',
          'var(--font-noto-sans-bengali)',
          'var(--font-noto-serif-bengali)',
          'var(--font-tiro-bangla)',
          '"Hind Siliguri"',
          '"Tiro Bangla"',
          '"Noto Serif Bengali"',
          '"Noto Sans Bengali"',
          'serif',
        ],
        serif: [
          'var(--font-noto-serif-bengali)',
          'var(--font-tiro-bangla)',
          '"Noto Serif Bengali"',
          '"Tiro Bangla"',
          'Georgia',
          'serif',
        ],
      },
      boxShadow: {
        'glow-primary': '0 0 25px -5px var(--primary)',
        'glow-accent': '0 0 25px -5px var(--accent)',
        soft: '0 1px 2px rgba(15,18,26,0.04), 0 8px 24px -8px rgba(15,18,26,0.10)',
        lift: '0 2px 8px rgba(15,18,26,0.06), 0 24px 48px -16px rgba(15,18,26,0.18)',
        'royal-gold': '0 0 25px rgba(212, 175, 55, 0.35)',
        'vintage-card': '0 8px 30px rgba(43, 8, 12, 0.08), 0 2px 8px rgba(212, 175, 55, 0.12)',
        'modal-glow': '0 25px 50px -12px rgba(26, 14, 23, 0.65)',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(0.96)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        flicker: 'flicker 2s infinite alternate',
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 8s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;

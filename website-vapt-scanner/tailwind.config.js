/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
        }
      },
      fontFamily: {
        mono: ['"Courier New"', 'Courier', '"Lucida Console"', 'Monaco', 'monospace'],
        dos: ['"Courier New"', 'Courier', 'monospace'],
        matrix: ['"Courier New"', 'Courier', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(100%)' },
        }
      }
    },
  },
  plugins: [],
};

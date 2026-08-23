import React from 'react';

export const AlponaMandala: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 120,
  color = '#D4AF37',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Concentric Circles */}
    <circle cx="100" cy="100" r="92" stroke={color} strokeWidth="2" strokeDasharray="3 3" />
    <circle cx="100" cy="100" r="82" stroke={color} strokeWidth="1.5" />
    <circle cx="100" cy="100" r="62" stroke={color} strokeWidth="2" />
    <circle cx="100" cy="100" r="42" stroke={color} strokeWidth="1" strokeDasharray="2 2" />
    <circle cx="100" cy="100" r="22" stroke={color} strokeWidth="1.5" />
    <circle cx="100" cy="100" r="8" fill={color} />

    {/* 8 Lotus Petals */}
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <g key={i} transform={`rotate(${angle} 100 100)`}>
        <path
          d="M 100 38 C 92 52 90 70 100 78 C 110 70 108 52 100 38 Z"
          fill="none"
          stroke={color}
          strokeWidth="1.5"
        />
        <path
          d="M 100 18 C 88 40 85 68 100 82 C 115 68 112 40 100 18 Z"
          fill="none"
          stroke={color}
          strokeWidth="1"
          opacity="0.8"
        />
        <circle cx="100" cy="30" r="2.5" fill={color} />
        <circle cx="100" cy="12" r="3" fill={color} />
        <path
          d="M 100 82 Q 94 92 100 100 Q 106 92 100 82"
          stroke={color}
          strokeWidth="1"
          fill="none"
        />
      </g>
    ))}
  </svg>
);

export const AlponaBorderDivider: React.FC<{ className?: string; color?: string }> = ({
  className = '',
  color = '#D4AF37',
}) => (
  <div className={`flex items-center justify-center space-x-2 my-4 select-none ${className}`}>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
    <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M 30 2 C 24 8 20 12 12 12 C 4 12 0 16 0 16 C 0 16 6 20 14 18 C 22 16 26 14 30 22 C 34 14 38 16 46 18 C 54 20 60 16 60 16 C 60 16 56 12 48 12 C 40 12 36 8 30 2 Z"
        fill="none"
        stroke={color}
        strokeWidth="1.2"
      />
      <circle cx="30" cy="12" r="3" fill={color} />
      <circle cx="18" cy="12" r="1.5" fill={color} />
      <circle cx="42" cy="12" r="1.5" fill={color} />
    </svg>
    <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />
  </div>
);

export const MangalGhatIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 40,
  color = '#8B0000',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <circle cx="32" cy="18" r="7" fill="#8C5830" stroke="#D4AF37" strokeWidth="1.5" />
    <path d="M 32 18 C 26 12 16 14 14 18 C 16 22 26 22 32 18 Z" fill="#2D6A4F" stroke="#D4AF37" strokeWidth="0.8" />
    <path d="M 32 18 C 38 12 48 14 50 18 C 48 22 38 22 32 18 Z" fill="#2D6A4F" stroke="#D4AF37" strokeWidth="0.8" />
    <path d="M 32 18 C 30 8 32 2 32 2 C 32 2 34 8 32 18 Z" fill="#2D6A4F" stroke="#D4AF37" strokeWidth="0.8" />

    <path
      d="M 24 24 L 40 24 L 42 28 C 48 34 48 46 40 52 C 38 54 36 55 32 55 C 28 55 26 54 24 52 C 16 46 16 34 22 28 Z"
      fill={color}
      stroke="#D4AF37"
      strokeWidth="1.5"
    />

    <path
      d="M 32 35 L 32 45 M 27 40 L 37 40 M 32 35 L 35 35 M 32 45 L 29 45 M 27 40 L 27 37 M 37 40 L 37 43"
      stroke="#FFFFFF"
      strokeWidth="1.2"
      strokeLinecap="round"
    />

    <path d="M 22 55 L 42 55 L 44 59 L 20 59 Z" fill="#D4AF37" stroke="#B89228" strokeWidth="1" />
  </svg>
);

export const ShankhaIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 36,
  color = '#D4AF37',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <path
      d="M 12 32 C 12 18 24 10 36 12 C 48 14 54 24 50 38 C 46 50 34 54 22 50 C 14 46 12 38 12 32 Z"
      fill="#FFFDF7"
      stroke={color}
      strokeWidth="2"
    />
    <path
      d="M 22 26 C 26 22 34 22 38 26 C 42 30 40 38 34 40 C 28 42 22 36 22 26 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
    />
    <path
      d="M 36 12 C 42 16 46 22 46 28 C 46 34 42 42 38 46"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      strokeDasharray="2 2"
    />
    <circle cx="34" cy="30" r="3" fill="#8B0000" />
  </svg>
);

export const DiyaFlameIcon: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 28,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    <path d="M 6 22 C 6 26 12 28 16 28 C 20 28 26 26 26 22 L 6 22 Z" fill="#8C4830" stroke="#D4AF37" strokeWidth="1" />
    <path d="M 4 22 L 28 22 L 26 20 L 6 20 Z" fill="#D4AF37" />
    <g className="animate-flicker origin-bottom">
      <path
        d="M 16 4 C 18 10 22 14 20 19 C 18 21 14 21 12 19 C 10 14 14 10 16 4 Z"
        fill="url(#flameGrad)"
      />
      <circle cx="16" cy="16" r="2.5" fill="#FFFFFF" />
    </g>
    <defs>
      <radialGradient id="flameGrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#FFFFFF" />
        <stop offset="35%" stopColor="#FEF08A" />
        <stop offset="70%" stopColor="#F59E0B" />
        <stop offset="100%" stopColor="#DC2626" />
      </radialGradient>
    </defs>
  </svg>
);

/**
 * Authentic Handcrafted SVG of the Bankura Terracotta Horse (বাঁকুড়ার ঘোড়া)
 * World-famous terracotta folk heritage of Bankura, West Bengal
 */
export const BankuraHorseIcon: React.FC<{ className?: string; size?: number; color?: string }> = ({
  className = '',
  size = 54,
  color = '#8C4830', // Bishnupur Clay
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`select-none ${className}`}
  >
    {/* Prominent Bankura Erect Pointed Ears */}
    <path d="M 38 12 L 44 2 M 62 12 L 56 2" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
    <polygon points="38,15 44,2 48,15" fill={color} stroke="#D4AF37" strokeWidth="1.2" />
    <polygon points="62,15 56,2 52,15" fill={color} stroke="#D4AF37" strokeWidth="1.2" />

    {/* Stylized Muzzle & Head */}
    <rect x="42" y="14" width="16" height="22" rx="4" fill={color} stroke="#D4AF37" strokeWidth="1.5" />
    <circle cx="46" cy="22" r="2" fill="#FEF3C7" />
    <circle cx="54" cy="22" r="2" fill="#FEF3C7" />
    
    {/* Long Cylindrical Neck with Terracotta Beads */}
    <path d="M 40 36 L 36 65 L 64 65 L 60 36 Z" fill={color} stroke="#D4AF37" strokeWidth="1.5" />
    <circle cx="50" cy="42" r="3" fill="#D4AF37" />
    <circle cx="50" cy="52" r="3" fill="#D4AF37" />
    <circle cx="50" cy="62" r="3" fill="#D4AF37" />

    {/* Body */}
    <rect x="25" y="65" width="50" height="24" rx="6" fill={color} stroke="#D4AF37" strokeWidth="1.5" />
    
    {/* Four Cylindrical Legs */}
    <rect x="28" y="89" width="6" height="26" rx="2" fill={color} stroke="#D4AF37" strokeWidth="1.2" />
    <rect x="38" y="89" width="6" height="26" rx="2" fill={color} stroke="#D4AF37" strokeWidth="1.2" />
    <rect x="56" y="89" width="6" height="26" rx="2" fill={color} stroke="#D4AF37" strokeWidth="1.2" />
    <rect x="66" y="89" width="6" height="26" rx="2" fill={color} stroke="#D4AF37" strokeWidth="1.2" />

    {/* Tail */}
    <path d="M 75 70 Q 88 75 82 92" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

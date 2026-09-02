'use client';

import React from 'react';
import { ScanTheme } from '@/types/scanner';
import { retroSound } from '@/lib/retroAudio';
import { Terminal, FileText, Volume2, VolumeX, Shield, Sparkles } from 'lucide-react';

interface HeaderNavProps {
  theme: ScanTheme;
  setTheme: (theme: ScanTheme) => void;
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  onSelectPreset: (url: string) => void;
}

export const HeaderNav: React.FC<HeaderNavProps> = ({
  theme,
  setTheme,
  isMuted,
  setIsMuted,
  onSelectPreset,
}) => {
  const presets = [
    { label: 'Google.com', url: 'https://google.com' },
    { label: 'Cloudflare.com', url: 'https://cloudflare.com' },
    { label: 'Example.com', url: 'http://example.com' },
    { label: 'Wikipedia.org', url: 'https://wikipedia.org' },
  ];

  const toggleSound = () => {
    const nextState = retroSound.toggleMute();
    setIsMuted(nextState);
    if (!nextState) {
      retroSound.playDosBeep(880, 0.05);
    }
  };

  const isPaper = theme === 'paper-matrix';
  const isAmber = theme === 'dos-amber';

  return (
    <header
      className={`w-full border-b transition-colors ${
        isPaper
          ? 'bg-[#f4f1ea] border-[#c2bcab] text-[#1a261a]'
          : isAmber
          ? 'bg-[#151000] border-[#664600] text-[#ffb000]'
          : 'bg-[#080e08] border-[#1f4d1f] text-[#33ff33]'
      } px-4 py-2.5 shadow-md`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Brand Banner */}
        <div className="flex items-center gap-2.5">
          <div
            className={`w-7 h-7 rounded border flex items-center justify-center font-bold text-xs ${
              isPaper
                ? 'border-[#1a261a] bg-[#1a261a] text-[#fcfbf7]'
                : isAmber
                ? 'border-[#ffb000] bg-[#ffb000]/10 text-[#ffb000] glow-amber'
                : 'border-[#33ff33] bg-[#33ff33]/10 text-[#33ff33] glow-green'
            }`}
          >
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold tracking-wider text-sm sm:text-base font-mono">
                VAPT-99 // RETRO CYBER-DEFENSE
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded border uppercase font-mono hidden sm:inline-block ${
                  isPaper
                    ? 'border-[#4a5d4a] text-[#4a5d4a]'
                    : isAmber
                    ? 'border-[#996900] text-[#ffb000]'
                    : 'border-[#1a801a] text-[#66ff66]'
                }`}
              >
                ROM v4.12
              </span>
            </div>
          </div>
        </div>

        {/* Preset Quick-Targets */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="hidden md:inline opacity-70 font-mono">TEST TARGETS:</span>
          {presets.map((p) => (
            <button
              key={p.url}
              onClick={() => {
                retroSound.playKeyClick();
                onSelectPreset(p.url);
              }}
              className={`px-2 py-1 rounded text-[11px] font-mono border transition-all ${
                isPaper
                  ? 'border-[#c2bcab] bg-[#eef6ee] hover:bg-[#dcecdc] text-[#1a261a]'
                  : isAmber
                  ? 'border-[#664600] bg-[#261900] hover:bg-[#3d2900] text-[#ffb000]'
                  : 'border-[#1f4d1f] bg-[#0c1a0c] hover:bg-[#152e15] text-[#33ff33]'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* View Mode & SFX Control */}
        <div className="flex items-center gap-2">
          {/* Trigger for Defensive Nmap Network Service Audit */}
          <button
            onClick={() => onSelectPreset('NMAP')}
            className={`px-2.5 py-1 rounded border text-xs font-mono font-bold flex items-center gap-1.5 transition-all ${
              isPaper
                ? 'border-[#2d3f2d] bg-[#2d3f2d] text-[#fcfbf7] hover:bg-[#1a261a]'
                : isAmber
                ? 'border-[#ffb000] bg-[#ffb000]/15 text-[#ffb000] hover:bg-[#ffb000]/25'
                : 'border-[#33ff33] bg-[#33ff33]/15 text-[#33ff33] hover:bg-[#33ff33]/25'
            }`}
            title="Open Server-Side Network Service & Port Security Auditor"
          >
            <Shield className="w-3.5 h-3.5" />
            <span>N-MAP AUDIT</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? 'Unmute 8-bit PC Speaker SFX' : 'Mute SFX'}
            className={`p-1.5 rounded border flex items-center gap-1 text-xs font-mono transition-all ${
              isPaper
                ? 'border-[#c2bcab] bg-[#eef6ee] hover:bg-[#dcecdc] text-[#1a261a]'
                : isAmber
                ? 'border-[#664600] bg-[#261900] hover:bg-[#3d2900] text-[#ffb000]'
                : 'border-[#1f4d1f] bg-[#0c1a0c] hover:bg-[#152e15] text-[#33ff33]'
            }`}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isMuted ? 'SFX OFF' : 'SFX ON'}</span>
          </button>

          {/* Theme Selector */}
          <div className="flex items-center rounded border overflow-hidden text-xs font-mono border-current">
            <button
              onClick={() => {
                retroSound.playDosBeep(600, 0.04);
                setTheme('dos-green');
              }}
              title="MS-DOS CRT Phosphor Green Mode"
              className={`px-2 py-1 flex items-center gap-1 transition-all ${
                theme === 'dos-green' ? 'bg-[#33ff33] text-[#0c100c] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <Terminal className="w-3 h-3" />
              <span>GREEN</span>
            </button>
            <button
              onClick={() => {
                retroSound.playDosBeep(700, 0.04);
                setTheme('dos-amber');
              }}
              title="MS-DOS CRT Amber Phosphor Mode"
              className={`px-2 py-1 flex items-center gap-1 transition-all ${
                theme === 'dos-amber' ? 'bg-[#ffb000] text-[#151000] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <span>AMBER</span>
            </button>
            <button
              onClick={() => {
                retroSound.playDosBeep(800, 0.04);
                setTheme('paper-matrix');
              }}
              title="Continuous Tractor-Feed Dot-Matrix Paper Printout Mode"
              className={`px-2 py-1 flex items-center gap-1 transition-all ${
                theme === 'paper-matrix' ? 'bg-[#1a261a] text-[#fcfbf7] font-bold' : 'hover:bg-white/5'
              }`}
            >
              <FileText className="w-3 h-3" />
              <span>PAPER</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '../components/Navbar';
import { AgeCalculatorTab } from '../components/AgeCalculatorTab';
import { AstrologyTab } from '../components/AstrologyTab';
import { MilestonesTab } from '../components/MilestonesTab';
import { CosmicTab } from '../components/CosmicTab';
import { LifeGridTab } from '../components/LifeGridTab';
import { ComparisonTab } from '../components/ComparisonTab';
import { ShareModal } from '../components/ShareModal';
import { 
  calculateChronologicalAge,
  calculateNextBirthday,
  calculateAstrologyGenInsights,
  calculateMilestones,
  calculateCosmicBioStats,
  calculatePlanetaryAges,
  calculateLifeGridStats
} from '../utils/calculator';
import { triggerBirthdayConfetti } from '../utils/confetti';
import { Heart } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState('age');
  const [isDark, setIsDark] = useState(true);
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Form Inputs state
  const [inputBirthDate, setInputBirthDate] = useState('1998-05-20');
  const [inputBirthTime, setInputBirthTime] = useState('09:00:00');
  const [inputTargetDate, setInputTargetDate] = useState('');
  const [inputTargetTime, setInputTargetTime] = useState('');

  // Active submitted dates for calculation
  const [hasCalculated, setHasCalculated] = useState(true);
  const [activeBirthDate, setActiveBirthDate] = useState('1998-05-20');
  const [activeBirthTime, setActiveBirthTime] = useState('09:00:00');
  const [activeTargetDate, setActiveTargetDate] = useState('');
  const [activeTargetTime, setActiveTargetTime] = useState('');

  // Live ticking control
  const [isLive, setIsLive] = useState(false);
  const [liveNow, setLiveNow] = useState<Date | null>(null);

  // Initialize target date on mount
  useEffect(() => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    setInputTargetDate(todayStr);
    setInputTargetTime(timeStr);
    setActiveTargetDate(todayStr);
    setActiveTargetTime(timeStr);
    setLiveNow(now);
  }, []);

  // Real-time ticking effect (100ms interval when isLive is active)
  useEffect(() => {
    if (!isLive || !hasCalculated) return;

    const interval = setInterval(() => {
      setLiveNow(new Date());
    }, 100);

    return () => clearInterval(interval);
  }, [isLive, hasCalculated]);

  // Construct target Date object
  const targetDateObj = useMemo(() => {
    if (isLive && liveNow) return liveNow;
    if (!activeTargetDate) return new Date();
    const timeStr = activeTargetTime || '00:00:00';
    const parsed = new Date(`${activeTargetDate}T${timeStr}`);
    return isNaN(parsed.getTime()) ? new Date() : parsed;
  }, [activeTargetDate, activeTargetTime, isLive, liveNow]);

  // Construct birth Date object
  const birthDateObj = useMemo(() => {
    if (!activeBirthDate) return new Date(1998, 4, 20, 9, 0, 0);
    const timeStr = activeBirthTime || '00:00:00';
    const parsed = new Date(`${activeBirthDate}T${timeStr}`);
    return isNaN(parsed.getTime()) ? new Date(1998, 4, 20, 9, 0, 0) : parsed;
  }, [activeBirthDate, activeBirthTime]);

  // Calculate results safely
  const ageResult = useMemo(() => {
    if (!hasCalculated) return null;
    return calculateChronologicalAge(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj, hasCalculated]);

  const nextBirthday = useMemo(() => {
    if (!hasCalculated) return null;
    return calculateNextBirthday(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj, hasCalculated]);

  const astrologyInsights = useMemo(() => {
    return calculateAstrologyGenInsights(birthDateObj);
  }, [birthDateObj]);

  const milestones = useMemo(() => {
    return calculateMilestones(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj]);

  const cosmicBioStats = useMemo(() => {
    return calculateCosmicBioStats(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj]);

  const planetaryAges = useMemo(() => {
    return calculatePlanetaryAges(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj]);

  const lifeGridStats = useMemo(() => {
    return calculateLifeGridStats(birthDateObj, targetDateObj);
  }, [birthDateObj, targetDateObj]);

  const handleCalculate = () => {
    setActiveBirthDate(inputBirthDate);
    setActiveBirthTime(inputBirthTime);
    setActiveTargetDate(inputTargetDate || new Date().toISOString().split('T')[0]);
    setActiveTargetTime(inputTargetTime || new Date().toTimeString().split(' ')[0]);
    setHasCalculated(true);
  };

  const handleReset = () => {
    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0];
    setInputBirthDate('');
    setInputBirthTime('00:00:00');
    setInputTargetDate(todayStr);
    setInputTargetTime(timeStr);
    setActiveBirthDate('');
    setActiveTargetDate(todayStr);
    setHasCalculated(false);
    setIsLive(false);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        setIsDark={setIsDark}
        onOpenShare={() => setIsShareOpen(true)}
        onCelebrate={triggerBirthdayConfetti}
      />

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        {activeTab === 'age' && (
          <AgeCalculatorTab
            inputBirthDate={inputBirthDate}
            setInputBirthDate={setInputBirthDate}
            inputBirthTime={inputBirthTime}
            setInputBirthTime={setInputBirthTime}
            inputTargetDate={inputTargetDate}
            setInputTargetDate={setInputTargetDate}
            inputTargetTime={inputTargetTime}
            setInputTargetTime={setInputTargetTime}
            hasCalculated={hasCalculated}
            onCalculate={handleCalculate}
            onReset={handleReset}
            isLive={isLive}
            setIsLive={setIsLive}
            ageResult={ageResult}
            nextBirthday={nextBirthday}
            onCelebrate={triggerBirthdayConfetti}
            onOpenShare={() => setIsShareOpen(true)}
          />
        )}

        {activeTab === 'milestones' && (
          <MilestonesTab
            milestones={milestones}
            onCelebrate={triggerBirthdayConfetti}
          />
        )}

        {activeTab === 'cosmic' && (
          <CosmicTab
            stats={cosmicBioStats}
            planets={planetaryAges}
          />
        )}

        {activeTab === 'lifegrid' && (
          <LifeGridTab
            stats={lifeGridStats}
            birthYear={birthDateObj.getFullYear() || 1998}
          />
        )}

        {activeTab === 'comparison' && (
          <ComparisonTab />
        )}

        {activeTab === 'astrology' && (
          <AstrologyTab
            insights={astrologyInsights}
            birthDate={inputBirthDate || '1998-05-20'}
            setBirthDate={(d) => {
              setInputBirthDate(d);
              setActiveBirthDate(d);
              setHasCalculated(true);
            }}
            onRecalculate={handleCalculate}
          />
        )}

        {activeTab === 'about' && (
          <div className="max-w-3xl mx-auto p-8 rounded-3xl bg-slate-900/80 border border-indigo-500/30 backdrop-blur-xl shadow-2xl space-y-6 text-slate-300">
            <div className="flex items-center gap-4 border-b border-slate-800 pb-5">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-2xl font-bold text-white shadow-lg">
                SB
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Santanu Batabyal</h2>
                <p className="text-sm text-indigo-400 font-medium">Lead Engineer & Creator • Kuchiakol, Bankura, West Bengal</p>
              </div>
            </div>

            <div className="space-y-4 text-sm leading-relaxed">
              <p>
                Welcome to the <strong className="text-white">Age Milestone & Cosmic Insights Calculator</strong>, crafted with precision engineering and high-performance algorithms by <strong>Santanu Batabyal</strong> from <strong>Kuchiakol, Bankura</strong>.
              </p>
              <p>
                This application computes exact chronological age down to milliseconds, planetary orbits, lunar age, generational cohorts, and life milestones with complete client-side responsiveness.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>📍 Kuchiakol, Bankura, West Bengal, India</span>
              <span className="text-indigo-400 font-semibold">Version 1.0.0</span>
            </div>
          </div>
        )}
      </main>

      {/* Share / Export Modal */}
      {ageResult && nextBirthday && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          ageResult={ageResult}
          nextBirthday={nextBirthday}
          insights={astrologyInsights}
        />
      )}

      {/* Footer */}
      <footer className="w-full border-t border-slate-800/80 bg-slate-950/60 backdrop-blur-xl py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-300">Age Calculator</span>
            <span>— Created by <strong className="text-indigo-400">Santanu Batabyal</strong>, Kuchiakol, Bankura</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> in Kuchiakol, Bankura
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

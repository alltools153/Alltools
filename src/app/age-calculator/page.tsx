'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AgeCalculatorTab } from '@/components/age/AgeCalculatorTab';
import { AstrologyTab } from '@/components/age/AstrologyTab';
import { MilestonesTab } from '@/components/age/MilestonesTab';
import { CosmicTab } from '@/components/age/CosmicTab';
import { LifeGridTab } from '@/components/age/LifeGridTab';
import { ComparisonTab } from '@/components/age/ComparisonTab';
import { ShareModal } from '@/components/age/ShareModal';
import { 
  calculateChronologicalAge,
  calculateNextBirthday,
  calculateAstrologyGenInsights,
  calculateMilestones,
  calculateCosmicBioStats,
  calculatePlanetaryAges,
  calculateLifeGridStats
} from '@/utils/calculator';
import { triggerBirthdayConfetti } from '@/utils/confetti';
import { Heart, Clock, Orbit, Award, Grid, ArrowRightLeft, Sparkles, User } from 'lucide-react';

export default function AgeCalculatorPage() {
  const [activeTab, setActiveTab] = useState('age');
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

  // Construct birth Date object (reactive to inputBirthDate & activeBirthDate)
  const birthDateObj = useMemo(() => {
    const bDate = inputBirthDate || activeBirthDate || '1998-05-20';
    const bTime = inputBirthTime || activeBirthTime || '09:00:00';
    const parsed = new Date(`${bDate}T${bTime}`);
    return isNaN(parsed.getTime()) ? new Date(1998, 4, 20, 9, 0, 0) : parsed;
  }, [inputBirthDate, inputBirthTime, activeBirthDate, activeBirthTime]);

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
    <div className="min-h-screen flex flex-col justify-between py-6">
      {/* Sub-Tabs Navigation */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-6">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-800">
          {[
            { id: 'age', label: 'Age Calculator', icon: Clock },
            { id: 'milestones', label: 'Milestones', icon: Award },
            { id: 'cosmic', label: 'Cosmic & Bio', icon: Orbit },
            { id: 'lifegrid', label: 'Life in Weeks', icon: Grid },
            { id: 'comparison', label: 'Comparison', icon: ArrowRightLeft },
            { id: 'astrology', label: 'Zodiac & Astrological', icon: Sparkles },
            { id: 'about', label: 'About Creator', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-2 w-full flex-1">
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
                This application computes exact chronological age down to milliseconds, planetary orbits, lunar age, generational cohorts, and life milestones with complete in-server responsiveness.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>📍 Kuchiakol, Bankura, West Bengal, India</span>
              <span className="text-indigo-400 font-semibold">100% In-Server Engine</span>
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
    </div>
  );
}

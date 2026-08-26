'use client';

import React from 'react';
import { CosmicBioStats, PlanetaryAge } from '../types';
import { 
  Heart, 
  Wind, 
  Eye, 
  Utensils, 
  Moon, 
  Orbit, 
  Globe, 
  Rocket, 
  Sparkles,
  Calendar,
  Compass
} from 'lucide-react';

interface CosmicTabProps {
  stats: CosmicBioStats;
  planets: PlanetaryAge[];
}

export const CosmicTab: React.FC<CosmicTabProps> = ({ stats, planets }) => {
  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/20 shadow-2xl relative overflow-hidden">
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-semibold mb-3">
          <Orbit className="w-3.5 h-3.5" /> Cosmic Journey & Biological Lifetime
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-white">
          Your Voyage Through the Cosmos & Biology
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl">
          While living your life on Earth, you have traversed billions of miles through interstellar space and your body has performed billions of miraculous biological cycles.
        </p>
      </div>

      {/* Biological Stats Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <Heart className="w-4 h-4" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">Biological Heartbeats & Cycles</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Heartbeats */}
          <div className="glass-card glass-card-hover rounded-3xl p-5 border border-rose-500/30">
            <div className="flex items-center justify-between text-rose-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Heartbeats</span>
              <Heart className="w-5 h-5 animate-pulse" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white glow-text">
              {stats.heartbeats.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Based on an avg resting rate of ~80 bpm
            </p>
          </div>

          {/* Breaths */}
          <div className="glass-card glass-card-hover rounded-3xl p-5 border border-cyan-500/30">
            <div className="flex items-center justify-between text-cyan-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Breaths Taken</span>
              <Wind className="w-5 h-5" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white glow-cyan">
              {stats.breaths.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Approx ~16 breaths per minute
            </p>
          </div>

          {/* Blinks */}
          <div className="glass-card glass-card-hover rounded-3xl p-5 border border-purple-500/30">
            <div className="flex items-center justify-between text-purple-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Eye Blinks</span>
              <Eye className="w-5 h-5" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white">
              {stats.blinks.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              ~17 blinks/min while awake
            </p>
          </div>

          {/* Meals Eaten */}
          <div className="glass-card glass-card-hover rounded-3xl p-5 border border-amber-500/30">
            <div className="flex items-center justify-between text-amber-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Meals Eaten</span>
              <Utensils className="w-5 h-5" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white glow-amber">
              {stats.mealsEaten.toLocaleString()}
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              Approx 3 nourishing meals / day
            </p>
          </div>

          {/* Sleep Years */}
          <div className="glass-card glass-card-hover rounded-3xl p-5 border border-indigo-500/30">
            <div className="flex items-center justify-between text-indigo-400 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider">Time Slept</span>
              <Moon className="w-5 h-5" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white">
              {stats.sleepYears} <span className="text-sm font-normal text-slate-400">years</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-2">
              {stats.sleepHours.toLocaleString()} total hours of dream state
            </p>
          </div>
        </div>
      </div>

      {/* Cosmic Distance Traveled Section */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Rocket className="w-4 h-4" />
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white">Interstellar Space Voyage</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Orbiting the Sun */}
          <div className="glass-card rounded-3xl p-6 border border-indigo-500/30 relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-indigo-950/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                Around The Sun (Solar Orbit)
              </span>
              <Globe className="w-6 h-6 text-indigo-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white glow-text">
              {(stats.sunDistanceMiles / 1e9).toFixed(3)} Billion
            </div>
            <div className="text-xs text-indigo-300 font-semibold mt-0.5">Miles traveled</div>
            <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
              ≈ {(stats.sunDistanceKm / 1e9).toFixed(3)} Billion km (Earth speed: 67,000 mph)
            </div>
          </div>

          {/* Orbiting the Milky Way Galaxy */}
          <div className="glass-card rounded-3xl p-6 border border-purple-500/30 relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-purple-950/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Around The Milky Way (Galactic Drift)
              </span>
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white">
              {(stats.galaxyDistanceMiles / 1e9).toFixed(3)} Billion
            </div>
            <div className="text-xs text-purple-300 font-semibold mt-0.5">Miles through galaxy</div>
            <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
              ≈ {(stats.galaxyDistanceKm / 1e9).toFixed(3)} Billion km (Solar speed: 514,000 mph)
            </div>
          </div>

          {/* Earth Rotations */}
          <div className="glass-card rounded-3xl p-6 border border-cyan-500/30 relative overflow-hidden bg-gradient-to-br from-slate-900/90 to-cyan-950/40">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                Earth Spin Rotations
              </span>
              <Orbit className="w-6 h-6 text-cyan-400 animate-spin-slow" />
            </div>
            <div className="font-mono text-2xl sm:text-3xl font-black text-white glow-cyan">
              {stats.earthRotations.toLocaleString()}
            </div>
            <div className="text-xs text-cyan-300 font-semibold mt-0.5">Day & Night cycles experienced</div>
            <div className="text-xs text-slate-400 mt-3 pt-3 border-t border-slate-800">
              Equator velocity: ~1,037 mph (1,670 km/h)
            </div>
          </div>
        </div>
      </div>

      {/* Planetary Ages Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30">
              <Orbit className="w-4 h-4" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-white">Planetary Ages Across the Solar System</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {planets.map((p) => (
            <div
              key={p.planet}
              className="glass-card glass-card-hover rounded-3xl p-6 border border-slate-800 relative overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${p.color} flex items-center justify-center text-white text-xl font-bold shadow-lg`}
                    >
                      {p.symbol}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-white">{p.planet}</h4>
                      <div className="text-[11px] text-slate-400">
                        1 Year = {p.orbitalPeriodDays.toLocaleString()} Earth days
                      </div>
                    </div>
                  </div>
                </div>

                <div className="my-4 p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-slate-400">
                      Age on {p.planet}
                    </span>
                    <div className="font-mono text-3xl font-black text-white mt-0.5">
                      {p.ageOnPlanet}{' '}
                      <span className="text-xs font-normal text-slate-400">years</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 italic mb-4 leading-relaxed bg-slate-900/30 p-3 rounded-xl border border-slate-800/60">
                  &ldquo;{p.funFact}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs flex items-center justify-between">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                  Next {p.planet} B-Day:
                </span>
                <span className="font-semibold text-indigo-300">
                  {p.nextBirthdayEarthDate.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

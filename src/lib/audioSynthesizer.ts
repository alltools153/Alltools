/**
 * Web Audio API synthesizer for authentic Bengali cultural sounds
 * Zero external mp3 dependencies - purely synthesized in browser!
 */

class AudioSynthesizer {
  private ctx: AudioContext | null = null;

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  /**
   * Synthesize Sacred Conch Shell Blow (শঙ্খধ্বনি)
   */
  public playShankha(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 4.2;

    // Master gain for Shankha swell
    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0.001, now);
    masterGain.gain.exponentialRampToValueAtTime(0.45, now + 0.9);
    masterGain.gain.setValueAtTime(0.45, now + 2.8);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    // Filter to simulate conch shell cavity resonance
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(420, now);
    filter.Q.setValueAtTime(3.5, now);

    // Fundamental & Harmonics
    const baseFreq = 215; // Shankha pitch around A3/G#3
    const harmonics = [1, 2, 3, 4, 5];
    const harmonicGains = [0.6, 0.4, 0.25, 0.15, 0.08];

    // Pitch bend / breath pressure modulation
    const vibrato = ctx.createOscillator();
    const vibratoGain = ctx.createGain();
    vibrato.frequency.setValueAtTime(4.8, now);
    vibratoGain.gain.setValueAtTime(3.5, now);
    vibrato.start(now);
    vibrato.stop(now + duration);

    harmonics.forEach((h, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = idx === 0 ? 'sine' : 'sawtooth';
      osc.frequency.setValueAtTime(baseFreq * h, now);
      // slight pitch rise at start like real conch blow
      osc.frequency.exponentialRampToValueAtTime(baseFreq * h * 1.03, now + 0.8);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * h * 0.98, now + duration);

      vibrato.connect(osc.frequency);

      oscGain.gain.setValueAtTime(harmonicGains[idx], now);

      osc.connect(oscGain);
      oscGain.connect(filter);

      osc.start(now);
      osc.stop(now + duration);
    });

    filter.connect(masterGain);
    masterGain.connect(ctx.destination);
  }

  /**
   * Synthesize Temple Bell / Ghanta Chime (মন্দিরের ঘণ্টা)
   */
  public playTempleBell(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    const duration = 3.5;

    const frequencies = [587.33, 1174.66, 1760.0, 2349.32, 3520.0];
    const decays = [3.5, 2.8, 2.0, 1.4, 0.8];
    const amplitudes = [0.4, 0.25, 0.15, 0.1, 0.05];

    const master = ctx.createGain();
    master.gain.setValueAtTime(0.5, now);
    master.connect(ctx.destination);

    frequencies.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(amplitudes[idx], now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + decays[idx]);

      osc.connect(gain);
      gain.connect(master);

      osc.start(now);
      osc.stop(now + decays[idx]);
    });
  }

  /**
   * Synthesize Dhak Beat for Durga Puja (ঢাকের কাঠি)
   */
  public playDhak(): void {
    const ctx = this.getContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    // Fast festive roll pattern
    const hitTimes = [0, 0.18, 0.36, 0.54, 0.72, 0.82, 0.92, 1.1, 1.28];
    const pitches = [180, 190, 180, 190, 180, 220, 240, 180, 190];

    hitTimes.forEach((tOffset, i) => {
      const hitTime = now + tOffset;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitches[i], hitTime);
      osc.frequency.exponentialRampToValueAtTime(80, hitTime + 0.12);

      gain.gain.setValueAtTime(0.35, hitTime);
      gain.gain.exponentialRampToValueAtTime(0.001, hitTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(hitTime);
      osc.stop(hitTime + 0.15);
    });
  }
}

export const soundFx = new AudioSynthesizer();

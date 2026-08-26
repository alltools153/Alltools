'use client';

class RetroAudioSynthesizer {
  private ctx: AudioContext | null = null;
  public isMuted = false;

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('vapt_retro_sound_muted');
      if (saved === 'true') {
        this.isMuted = true;
      }
    }
  }

  private initContext() {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('vapt_retro_sound_muted', String(this.isMuted));
    }
    return this.isMuted;
  }

  public playKeyClick() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1400, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.015);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.015);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.016);
    } catch {
      // Audio not permitted yet
    }
  }

  public playDosBeep(freq = 880, duration = 0.08) {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration + 0.01);
    } catch {
      // safe fallback
    }
  }

  public playWarningAlert() {
    if (this.isMuted) return;
    try {
      this.playDosBeep(440, 0.1);
      setTimeout(() => this.playDosBeep(330, 0.15), 110);
    } catch {}
  }

  public playSuccessChime() {
    if (this.isMuted) return;
    try {
      this.playDosBeep(523.25, 0.06); // C5
      setTimeout(() => this.playDosBeep(659.25, 0.06), 70); // E5
      setTimeout(() => this.playDosBeep(783.99, 0.06), 140); // G5
      setTimeout(() => this.playDosBeep(1046.5, 0.12), 210); // C6
    } catch {}
  }

  public playDotMatrixPrintHead() {
    if (this.isMuted) return;
    try {
      const ctx = this.initContext();
      if (!ctx) return;

      const bufferSize = ctx.sampleRate * 0.08;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.02));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.value = 2400;

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.08, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start();
    } catch {}
  }
}

export const retroSound = new RetroAudioSynthesizer();

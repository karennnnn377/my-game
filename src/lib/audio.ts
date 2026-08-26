/* Original synthesized SFX — WebAudio, zero samples, zero copyright. */

class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  muted = false;

  private ensure(): AudioContext | null {
    if (typeof window === "undefined") return null;
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    if (!this.ctx) {
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.gain.value = 0.42;
      this.master.connect(this.ctx.destination);
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  private tone(freq: number, t0: number, dur: number, type: OscillatorType, vol: number, slideTo?: number) {
    const ctx = this.ensure();
    if (!ctx || !this.master || this.muted) return;
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = type;
    const now = ctx.currentTime + t0;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) osc.frequency.exponentialRampToValueAtTime(Math.max(30, slideTo), now + dur);
    g.gain.setValueAtTime(0.0001, now);
    g.gain.exponentialRampToValueAtTime(vol, now + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    osc.connect(g).connect(this.master);
    osc.start(now);
    osc.stop(now + dur + 0.05);
  }

  private noise(t0: number, dur: number, vol: number, freq = 1200) {
    const ctx = this.ensure();
    if (!ctx || !this.master || this.muted) return;
    const len = Math.floor(ctx.sampleRate * dur);
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const f = ctx.createBiquadFilter();
    f.type = "bandpass";
    f.frequency.value = freq;
    const g = ctx.createGain();
    const now = ctx.currentTime + t0;
    g.gain.setValueAtTime(vol, now);
    g.gain.exponentialRampToValueAtTime(0.0001, now + dur);
    src.connect(f).connect(g).connect(this.master);
    src.start(now);
  }

  click() { this.tone(680, 0, 0.07, "square", 0.12, 520); }
  tick() { this.tone(940, 0, 0.045, "square", 0.07); }
  hover() { this.tone(440, 0, 0.04, "sine", 0.05); }
  flip() { this.tone(300, 0, 0.09, "triangle", 0.14, 560); this.noise(0, 0.06, 0.06, 2400); }
  correct() {
    this.tone(523, 0, 0.1, "triangle", 0.22);
    this.tone(659, 0.08, 0.1, "triangle", 0.22);
    this.tone(784, 0.16, 0.18, "triangle", 0.24);
  }
  wrong() { this.tone(180, 0, 0.22, "sawtooth", 0.16, 90); this.noise(0.02, 0.15, 0.08, 300); }
  streak(n: number) {
    const base = 500 + Math.min(n, 12) * 40;
    this.tone(base, 0, 0.09, "square", 0.14, base * 1.5);
    this.tone(base * 1.5, 0.07, 0.12, "square", 0.12, base * 2);
  }
  levelUp() {
    [523, 659, 784, 1047, 1319].forEach((f, i) => this.tone(f, i * 0.09, 0.16, "triangle", 0.2));
  }
  achievement() {
    this.tone(880, 0, 0.12, "sine", 0.2);
    this.tone(1175, 0.1, 0.12, "sine", 0.2);
    this.tone(1568, 0.2, 0.26, "sine", 0.22);
    this.noise(0.2, 0.2, 0.05, 5000);
  }
  complete() {
    [392, 523, 659, 784].forEach((f, i) => this.tone(f, i * 0.12, 0.3, "triangle", 0.18));
    [523, 659, 784, 1047].forEach((f) => this.tone(f, 0.55, 0.7, "sine", 0.12));
  }
  whoosh() { this.noise(0, 0.25, 0.1, 800); }
}

export const sfx = new Sfx();

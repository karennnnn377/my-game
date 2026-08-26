import { PEOPLE, BY_CAT, difficultyOf, type Person, type CatId } from "../data/people";
import { SIBLINGS } from "../data/cats";

export interface Question {
  answer: Person;
  options: Person[]; // 5 people incl. answer, shuffled
  diff: 0 | 1 | 2 | 3;
  cat: CatId;
}

export type Mode = "mix" | "daily" | CatId;
export const QUESTIONS_PER_GAME = 15;
export const OPTIONS_PER_Q = 5;

export function hashStr(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function shuffle<T>(arr: T[], rnd: () => number): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function poolFor(mode: Mode): Person[] {
  if (mode === "mix" || mode === "daily") return PEOPLE;
  const base = BY_CAT[mode] ?? [];
  if (base.length >= 12) return base;
  const set = new Set<Person>(base);
  for (const s of SIBLINGS[mode] ?? []) for (const p of BY_CAT[s] ?? []) set.add(p);
  return [...set];
}

/** Pick 4 believable distractors: same/sibling category, never sharing the answer's birth date, era-weighted. */
function pickDistractors(answer: Person, rnd: () => number): Person[] {
  const out: Person[] = [];
  const seen = new Set<string>([answer.id]);
  const pools = (SIBLINGS[answer.cat] ?? [answer.cat]).map((c) => BY_CAT[c] ?? []).filter((p) => p.length > 0);

  for (const pool of pools) {
    if (out.length >= 4) break;
    const scored = pool
      .filter((p) => !seen.has(p.id) && !(p.m === answer.m && p.d === answer.d))
      .map((p) => ({
        p,
        w: Math.abs(p.year - answer.year) * 0.6 + Math.abs(p.pop - answer.pop) * 1.2 + rnd() * 90,
      }))
      .sort((a, b) => a.w - b.w);
    for (const { p } of scored) {
      if (out.length >= 4) break;
      out.push(p);
      seen.add(p.id);
    }
  }
  // safety fill from everyone
  if (out.length < 4) {
    for (const p of shuffle(PEOPLE, rnd)) {
      if (out.length >= 4) break;
      if (!seen.has(p.id) && !(p.m === answer.m && p.d === answer.d)) {
        out.push(p);
        seen.add(p.id);
      }
    }
  }
  return out;
}

/* ---- cross-game anti-repetition memory ---- */
const RECENT_KEY = "gyfp:recent";
export function loadRecent(): Set<string> {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]") as string[]);
  } catch {
    return new Set<string>();
  }
}
export function pushRecent(ids: string[]) {
  try {
    const cur = [...loadRecent(), ...ids].slice(-80);
    localStorage.setItem(RECENT_KEY, JSON.stringify(cur));
  } catch {
    /* ignore */
  }
}

export function generateGame(mode: Mode, seed?: number, recent?: Set<string>): Question[] {
  const rnd = seed !== undefined ? mulberry32(seed) : mulberry32((Math.random() * 2 ** 32) >>> 0);
  const recents = recent ?? new Set<string>();
  const pool = poolFor(mode);
  const questions: Question[] = [];
  const usedDates = new Set<string>();
  const usedAnswers = new Set<string>();
  const ordered = shuffle(pool, rnd);

  for (let qi = 0; qi < QUESTIONS_PER_GAME && ordered.length > 0; qi++) {
    // random difficulty target so every game feels different
    const targetDiff = mode === "mix" || mode === "daily" ? Math.floor(rnd() * 4) : Math.floor(rnd() * 3) + (rnd() < 0.4 ? 0 : 1);
    let answer: Person | undefined;
    /* two passes: first avoid people used in recent games, then relax */
    for (const avoidRecent of [true, false]) {
      for (const p of ordered) {
        if (usedAnswers.has(p.id)) continue;
        if (avoidRecent && recents.has(p.id)) continue;
        const key = `${p.m}-${p.d}`;
        if (usedDates.has(key)) continue;
        const d = difficultyOf(p.pop);
        if (d === targetDiff || d === targetDiff - 1 || d === targetDiff + 1) {
          answer = p;
          break;
        }
      }
      if (answer) break;
    }
    if (!answer) {
      for (const p of ordered) {
        const key = `${p.m}-${p.d}`;
        if (!usedAnswers.has(p.id) && !usedDates.has(key)) {
          answer = p;
          break;
        }
      }
    }
    if (!answer) break;

    usedAnswers.add(answer.id);
    usedDates.add(`${answer.m}-${answer.d}`);
    const options = shuffle([answer, ...pickDistractors(answer, rnd)], rnd);
    questions.push({ answer, options, diff: difficultyOf(answer.pop), cat: answer.cat });
  }
  return questions;
}

export function dailySeed(): number {
  const now = new Date();
  return hashStr(`gyfp-${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`);
}
export function dailyKey(): string {
  const n = new Date();
  return `gyfp-daily-${n.getFullYear()}-${n.getMonth() + 1}-${n.getDate()}`;
}

export const DIFF_POINTS = [100, 150, 225, 350];
export function streakBonus(streak: number): number {
  return Math.min(streak, 10) * 25;
}

export function levelFromXp(xp: number): number {
  return Math.floor(Math.sqrt(Math.max(0, xp) / 140)) + 1;
}
export function xpForLevel(level: number): number {
  return 140 * (level - 1) * (level - 1);
}

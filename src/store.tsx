import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { tr, trCat, ACH, type Lang } from "./i18n";
import { levelFromXp, dailySeed, hashStr, mulberry32, type Mode } from "./lib/engine";
import { sfx } from "./lib/audio";
import type { CatId } from "./data/people";

/* ---------------- types ---------------- */

export type Screen =
  | { s: "home" }
  | { s: "cats" }
  | { s: "game"; mode: Mode; n?: number }
  | { s: "lb" }
  | { s: "profile" };

export interface Profile {
  name: string;
  xp: number;
  games: number;
  answered: number;
  correct: number;
  bestScore: number;
  bestStreak: number;
  bday: { gy: number; gm: number; gd: number } | null;
  cats: Partial<Record<CatId, number>>;
  ach: string[];
}

export interface GameResult {
  score: number;
  correct: number;
  total: number;
  bestStreak: number;
  perCat: Partial<Record<CatId, number>>;
  mode: Mode;
  xp: number;
}

export interface LbRow {
  name: string;
  score: number;
  acc: number;
  streak: number;
  level: number;
  you?: boolean;
}

const DEFAULT_PROFILE: Profile = {
  name: "Player One",
  xp: 0,
  games: 0,
  answered: 0,
  correct: 0,
  bestScore: 0,
  bestStreak: 0,
  bday: null,
  cats: {},
  ach: [],
};

/* ---------------- persistence ---------------- */

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? { ...fallback, ...JSON.parse(raw) } : fallback;
  } catch {
    return fallback;
  }
}
function loadRaw<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}
function save(key: string, v: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* ignore */
  }
}

/* ---------------- fx bus ---------------- */

type FxEvent = { type: "confetti"; power: "small" | "big" };
const listeners = new Set<(e: FxEvent) => void>();
export const fxBus = {
  emit(e: FxEvent) {
    listeners.forEach((l) => l(e));
  },
  on(l: (e: FxEvent) => void) {
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  },
};

/* ---------------- leaderboard bots ---------------- */

const BOT_NAMES = [
  "TriviaTitan", "NimaQQ", "CairoCat", "TehranStar", "LisbonLion", "OsakaOwl",
  "BerlinBrain", "RioRocket", "ParisPixel", "DelhiDynamo", "LondonLynx", "SeoulSage",
  "MadridMantis", "TorontoFox", "IstanbulHawk", "BangkokBolt", "RomeRaven", "ViennaViper",
  "OsloOrbit", "NairobiNova", "DubaiDune", "SydneySurf", "MexicoMeteor", "WarsawWolf",
  "AthensAtlas", "HanoiHalo", "StockholmSpark", "LimaLightning", "DohaDrift", "AmsterdamAce",
];

function genBots(seed: number, min: number, max: number, n = 24): LbRow[] {
  const rnd = mulberry32(seed);
  const rows: LbRow[] = [];
  const used = new Set<number>();
  while (rows.length < n) {
    const i = Math.floor(rnd() * BOT_NAMES.length);
    if (used.has(i)) continue;
    used.add(i);
    const score = Math.round(min + rnd() * (max - min));
    rows.push({
      name: BOT_NAMES[i],
      score,
      acc: Math.round(46 + rnd() * 52),
      streak: Math.round(1 + rnd() * 14),
      level: Math.max(1, Math.round(score / 420 + rnd() * 3)),
    });
  }
  return rows.sort((a, b) => b.score - a.score);
}

/* ---------------- context ---------------- */

interface Store {
  lang: Lang;
  dir: "ltr" | "rtl";
  setLang: (l: Lang) => void;
  t: (k: string) => string;
  cat: (c: string) => string;
  sound: boolean;
  toggleSound: () => void;
  screen: Screen;
  go: (s: Screen) => void;
  profile: Profile;
  setName: (n: string) => void;
  saveBday: (b: Profile["bday"]) => void;
  recordGame: (r: GameResult) => { newAch: string[]; levelUp: number | null };
  lbRows: (tab: "global" | "daily" | "weekly") => LbRow[];
  toasts: { id: number; icon: string; title: string }[];
  pushToast: (icon: string, title: string) => void;
}

const Ctx = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => loadRaw<Lang>("gyfp:lang", "en"));
  const [sound, setSound] = useState<boolean>(() => loadRaw("gyfp:sound", true));
  const [screen, setScreen] = useState<Screen>({ s: "home" });
  const [profile, setProfile] = useState<Profile>(() => load("gyfp:profile", DEFAULT_PROFILE));
  const [results, setResults] = useState<{ score: number; acc: number; streak: number; ts: number; xp: number }[]>(() =>
    loadRaw("gyfp:results", [])
  );
  const [toasts, setToasts] = useState<{ id: number; icon: string; title: string }[]>([]);

  const dir = lang === "en" ? "ltr" : "rtl";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang, dir]);

  useEffect(() => {
    sfx.muted = !sound;
    save("gyfp:sound", sound);
  }, [sound]);

  useEffect(() => save("gyfp:lang", lang), [lang]);
  useEffect(() => save("gyfp:profile", profile), [profile]);
  useEffect(() => save("gyfp:results", results.slice(0, 60)), [results]);

  const t = useCallback((k: string) => tr(lang, k), [lang]);
  const cat = useCallback((c: string) => trCat(lang, c), [lang]);

  const go = useCallback((s: Screen) => {
    setScreen(s);
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    sfx.whoosh();
  }, []);

  const pushToast = useCallback(
    (icon: string, title: string) => {
      const id = Date.now() + Math.random();
      setToasts((ts) => [...ts.slice(-3), { id, icon, title }]);
      setTimeout(() => setToasts((ts) => ts.filter((x) => x.id !== id)), 4000);
    },
    []
  );

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    sfx.click();
  }, []);

  const toggleSound = useCallback(() => {
    setSound((s) => {
      if (s) sfx.click();
      return !s;
    });
  }, []);

  const setName = useCallback((n: string) => setProfile((p) => ({ ...p, name: n || p.name })), []);
  const saveBday = useCallback((b: Profile["bday"]) => setProfile((p) => ({ ...p, bday: b })), []);

  const recordGame = useCallback(
    (r: GameResult): { newAch: string[]; levelUp: number | null } => {
      const prevLevel = levelFromXp(profile.xp);
      const next: Profile = {
        ...profile,
        xp: profile.xp + r.xp,
        games: profile.games + 1,
        answered: profile.answered + r.total,
        correct: profile.correct + r.correct,
        bestScore: Math.max(profile.bestScore, r.score),
        bestStreak: Math.max(profile.bestStreak, r.bestStreak),
        cats: { ...profile.cats },
        ach: [...profile.ach],
      };
      (Object.keys(r.perCat) as CatId[]).forEach((c) => {
        next.cats[c] = (next.cats[c] ?? 0) + (r.perCat[c] ?? 0);
      });
      const newLevel = levelFromXp(next.xp);

      // ---- achievement evaluation ----
      const earned: string[] = [];
      const has = (id: string) => next.ach.includes(id);
      const grant = (id: string) => {
        if (!has(id)) {
          next.ach.push(id);
          earned.push(id);
        }
      };
      if (r.correct >= 8) grant("first_win");
      if (r.bestStreak >= 10) grant("streak10");
      if (next.bestStreak >= 25) grant("streak25");
      if (r.total > 0 && r.correct / r.total >= 0.9) grant("acc90");
      if ((next.cats.football ?? 0) >= 15) grant("football_expert");
      if (((next.cats.actors ?? 0) + (next.cats.actresses ?? 0)) >= 15) grant("movie_expert");
      if (((next.cats.singers ?? 0) + (next.cats.musicians ?? 0) + (next.cats.rappers ?? 0)) >= 15) grant("music_expert");
      if ((next.cats.iran ?? 0) >= 15) grant("iran_legend");
      if (Object.values(next.cats).filter((v) => (v ?? 0) > 0).length >= 10) grant("world_knowledge");
      if (r.correct === r.total && r.total > 0) grant("quiz_master");
      if (next.games >= 10) grant("veteran");
      if (newLevel >= 5) grant("level5");

      setProfile(next);
      setResults((rs) => [
        { score: r.score, acc: Math.round((r.correct / Math.max(1, r.total)) * 100), streak: r.bestStreak, ts: Date.now(), xp: r.xp },
        ...rs,
      ]);

      earned.forEach((id, i) => {
        setTimeout(() => {
          sfx.achievement();
          pushToast(ACH[id].icon, `${tr(lang, "ach_unlocked")}: ${ACH[id].n[lang === "en" ? 0 : lang === "fa" ? 1 : 2]}`);
        }, 900 + i * 1400);
      });

      return { newAch: earned, levelUp: newLevel > prevLevel ? newLevel : null };
    },
    [profile, lang, pushToast]
  );

  const lbRows = useCallback(
    (tab: "global" | "daily" | "weekly"): LbRow[] => {
      const now = Date.now();
      const dayMs = 86400000;
      const mine = results
        .filter((r) => (tab === "daily" ? now - r.ts < dayMs : tab === "weekly" ? now - r.ts < 7 * dayMs : true))
        .map((r) => ({
          name: profile.name,
          score: r.score,
          acc: r.acc,
          streak: r.streak,
          level: levelFromXp(r.xp),
          you: true,
        }));
      const seedBase = tab === "global" ? 42 : tab === "daily" ? dailySeed() : Math.floor(now / (7 * dayMs));
      const range: [number, number] = tab === "global" ? [1400, 4200] : tab === "daily" ? [350, 1650] : [900, 3000];
      const bots = genBots(hashStr(tab) ^ seedBase, range[0], range[1]);
      const bestMine: LbRow[] = mine.length
        ? [mine.reduce((a, b) => (b.score > a.score ? b : a))]
        : [];
      return [...bots, ...bestMine].sort((a, b) => b.score - a.score);
    },
    [results, profile]
  );

  const value = useMemo<Store>(
    () => ({
      lang, dir, setLang, t, cat, sound, toggleSound, screen, go,
      profile, setName, saveBday, recordGame, lbRows, toasts, pushToast,
    }),
    [lang, dir, setLang, t, cat, sound, toggleSound, screen, go, profile, setName, saveBday, recordGame, lbRows, toasts, pushToast]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore(): Store {
  const s = useContext(Ctx);
  if (!s) throw new Error("store missing");
  return s;
}

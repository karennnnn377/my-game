import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Avatar } from "../components/Avatar";
import { PersonModal } from "../components/PersonCard";
import { DiffBadge, DIFF_STYLE, IcBack, IcBolt, IcCheck, IcFlame, IcStar, IcTarget, IcTrophy, IcX, LogoMark } from "../components/ui";
import { MONTHS, ACH, fmt } from "../i18n";
import { CAT_MAP } from "../data/cats";
import type { Person } from "../data/people";
import { factsOf } from "../lib/bio";
import {
  DIFF_POINTS, QUESTIONS_PER_GAME, dailySeed, generateGame, levelFromXp,
  loadRecent, pushRecent, streakBonus, type Mode, type Question,
} from "../lib/engine";
import { sfx } from "../lib/audio";
import { digits, num } from "../lib/num";
import { fxBus, useStore } from "../store";

const QTIME = 20; // seconds per question

function useCountUp(target: number, dur = 1300) {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0;
    const t0 = performance.now();
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      setV(Math.round(target * (1 - Math.pow(1 - k, 3))));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, dur]);
  return v;
}

export default function Game({ mode }: { mode: Mode }) {
  const { t, cat, go, lang, profile, recordGame } = useStore();

  const questions = useMemo<Question[]>(
    () => generateGame(mode, mode === "daily" ? dailySeed() : undefined, mode === "daily" ? undefined : loadRecent()),
    [mode]
  );

  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState<"ask" | "reveal" | "done">("ask");
  const [sel, setSel] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [marks, setMarks] = useState<boolean[]>([]);
  const [lastGain, setLastGain] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QTIME);
  const [showPerson, setShowPerson] = useState<Person | null>(null);
  const [summary, setSummary] = useState<{ newAch: string[]; levelUp: number | null; xp: number } | null>(null);
  const recorded = useRef(false);
  /* authoritative tallies (immune to stale closures) */
  const st = useRef({ marks: [] as boolean[], score: 0, streak: 0, best: 0 });

  const q = questions[idx];
  const acc = mode === "mix" ? "#ffb400" : mode === "daily" ? "#3fe3d6" : CAT_MAP[mode].c1;
  const done = phase === "done";
  const correctCount = marks.filter(Boolean).length;
  const accuracy = marks.length ? Math.round((correctCount / marks.length) * 100) : 0;
  const finalScore = useCountUp(done ? score : 0, done ? 1500 : 0.001);

  const finish = useCallback(() => {
    setPhase("done");
    sfx.complete();
    pushRecent(questions.map((qq) => qq.answer.id)); // anti-repetition for the next game
    const m = st.current.marks;
    const cc = m.filter(Boolean).length;
    if (!recorded.current) {
      recorded.current = true;
      const perCat: Record<string, number> = {};
      questions.forEach((qq, i) => {
        if (m[i]) perCat[qq.answer.cat] = (perCat[qq.answer.cat] ?? 0) + 1;
      });
      /* trailing correct tail feeds the cross-game mega streak */
      let tail = 0;
      for (let i = m.length - 1; i >= 0 && m[i]; i--) tail++;
      const finalScoreVal = st.current.score;
      const xp = Math.round(finalScoreVal / 12);
      const res = recordGame({ score: finalScoreVal, correct: cc, total: questions.length, bestStreak: st.current.best, tail, perCat, mode, xp });
      setSummary({ ...res, xp });
    }
    if (cc >= 8) setTimeout(() => fxBus.emit({ type: "confetti", power: "big" }), 350);
  }, [questions, recordGame, mode]);

  const pick = useCallback(
    (i: number) => {
      if (phase !== "ask" || !q) return;
      const ok = i >= 0 && q.options[i].id === q.answer.id;
      setSel(i);
      st.current.marks = [...st.current.marks, ok];
      setMarks(st.current.marks);
      if (ok) {
        const ns = st.current.streak + 1;
        st.current.streak = ns;
        st.current.best = Math.max(st.current.best, ns);
        const gain = DIFF_POINTS[q.diff] + streakBonus(ns);
        st.current.score += gain;
        setScore(st.current.score);
        setLastGain(gain);
        setStreak(ns);
        setBestStreak(st.current.best);
        if (ns >= 3) sfx.streak(ns);
        else sfx.correct();
        if (ns >= 3) fxBus.emit({ type: "confetti", power: "small" });
      } else {
        st.current.streak = 0;
        setStreak(0);
        setLastGain(0);
        sfx.wrong();
      }
      setPhase("reveal");
    },
    [phase, q]
  );

  /* per-question countdown — pauses during reveal */
  useEffect(() => {
    if (phase !== "ask") return;
    if (timeLeft <= 0) {
      pick(-1);
      return;
    }
    const id = window.setTimeout(() => {
      if (timeLeft <= 6) sfx.tick();
      setTimeLeft((x) => x - 1);
    }, 1000);
    return () => clearTimeout(id);
  }, [phase, timeLeft, pick]);

  const nextQ = useCallback(() => {
    if (phase !== "reveal") return;
    if (idx + 1 >= questions.length) finish();
    else {
      setIdx((x) => x + 1);
      setSel(null);
      setPhase("ask");
      setTimeLeft(QTIME);
      sfx.flip();
    }
  }, [phase, idx, questions.length, finish]);

  // keyboard: 1-5 to answer, Enter/Space for next
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const n = parseInt(e.key, 10);
      if (n >= 1 && n <= 5) pick(n - 1);
      if ((e.key === "Enter" || e.key === " ") && phase === "reveal") {
        e.preventDefault();
        nextQ();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [pick, nextQ, phase]);

  if (!q && !done) return null;

  /* ---------------- finished screen ---------------- */
  if (done) {
    const grade =
      correctCount === questions.length ? t("grade_perfect")
      : correctCount >= 12 ? t("grade_great")
      : correctCount >= 9 ? t("grade_good")
      : correctCount >= 5 ? t("grade_ok")
      : t("grade_bad");
    const lvl = levelFromXp(profile.xp);
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-14">
        <div className="w-full max-w-2xl glass chip p-6 sm:p-10 text-center relative overflow-hidden scanlines animate-rise">
          <div className="absolute inset-x-0 top-0 h-1.5" style={{ background: `linear-gradient(90deg, transparent, ${acc}, transparent)` }} />
          <p className="font-display text-[11px] tracking-[0.3em] text-mint-400">
            {mode === "daily" ? t("daily_badge") : mode === "mix" ? t("random_mix").toUpperCase() : cat(mode).toUpperCase()}
          </p>
          <h1 className="font-display text-3xl sm:text-5xl text-gold-400 mt-3 leading-tight">
            {digits(questions.length, lang)}/{digits(questions.length, lang)}
            <span className="block text-lg sm:text-2xl text-ink-200 mt-2">{t("complete")}</span>
          </h1>
          <p className="font-display text-coral-400 text-sm sm:text-base mt-3">{grade}</p>

          <div className="mt-7">
            <p className="text-ink-300 text-xs uppercase tracking-[0.25em]">{t("final_score")}</p>
            <p className="font-display text-6xl sm:text-7xl shimmer-text mt-1" dir="ltr">{num(finalScore, lang)}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mt-8">
            {[
              { icon: <IcCheck size={18} />, label: t("p_correct"), val: `${digits(correctCount, lang)}/${digits(questions.length, lang)}`, c: "#22e584" },
              { icon: <IcTarget size={18} />, label: t("accuracy"), val: `${digits(accuracy, lang)}${lang === "en" ? "%" : "٪"}`, c: "#ffb400" },
              { icon: <IcFlame size={18} />, label: t("best_streak"), val: `×${digits(bestStreak, lang)}`, c: "#ff6b7e" },
            ].map((s, i) => (
              <div key={i} className="chip glass p-3 sm:p-4 animate-rise" style={{ animationDelay: `${i * 120}ms` }}>
                <span className="inline-flex" style={{ color: s.c }}>{s.icon}</span>
                <p className="font-display text-xl sm:text-2xl mt-1" dir="ltr">{s.val}</p>
                <p className="text-[10px] sm:text-xs text-ink-300 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-mint-400 font-display text-sm animate-fade-up" style={{ animationDelay: "350ms" }}>
            <IcStar size={16} /> +{digits(summary?.xp ?? 0, lang)} {t("xp_gained")}
            <span className="text-ink-300 font-body text-xs">· {t("th_level")} {digits(lvl, lang)}</span>
          </div>

          {summary?.levelUp && (
            <div className="mt-4 chip inline-flex items-center gap-2 border border-gold-500/50 bg-gold-500/10 px-4 py-2 font-display text-gold-400 animate-pop">
              <IcTrophy size={18} /> {t("level_up")} {t("level_now")} {summary.levelUp}
            </div>
          )}

          {summary && summary.newAch.length > 0 && (
            <div className="mt-4 space-y-2">
              {summary.newAch.map((id, i) => (
                <div key={id} className="chip glass border border-mint-500/40 px-4 py-2 inline-flex items-center gap-2 animate-rise" style={{ animationDelay: `${500 + i * 200}ms` }}>
                  <span className="text-xl">{ACH[id].icon}</span>
                  <span className="font-display text-mint-400 text-sm">{t("ach_unlocked")}</span>
                  <span className="text-ink-200 text-sm">{ACH[id].n[lang === "en" ? 0 : lang === "fa" ? 1 : 2]}</span>
                </div>
              ))}
            </div>
          )}

          {mode === "daily" && <p className="mt-4 text-ink-300 text-sm">{t("daily_done")}</p>}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button className="btn-game btn-primary px-6 py-3 text-sm" onClick={() => { sfx.click(); go({ s: "game", mode, n: Date.now() }); }}>
              <span className="flex items-center gap-2"><IcBolt size={16} /> {t("play_again")}</span>
            </button>
            <button className="btn-game btn-ghost px-5 py-3 text-sm" onClick={() => { sfx.click(); go({ s: "lb" }); }}>
              <span className="flex items-center gap-2"><IcTrophy size={16} /> {t("nav_lb")}</span>
            </button>
            <button className="btn-game btn-ghost px-5 py-3 text-sm" onClick={() => { sfx.click(); go({ s: "home" }); }}>
              <span className="flex items-center gap-2"><IcBack size={16} /> {t("back_home")}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ---------------- play screen ---------------- */
  const timedOut = sel === -1;
  const isCorrect = sel !== null && !timedOut && q.options[sel].id === q.answer.id;
  const fact = factsOf(q.answer, lang)[0];

  return (
    <div className="min-h-screen flex flex-col" style={{ ["--acc" as string]: acc }}>
      {/* HUD */}
      <div className="sticky top-0 z-30 glass border-b border-ink-700/40">
        <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center gap-3 sm:gap-5">
          <button className="text-ink-300 hover:text-gold-400 transition-colors cursor-pointer" onClick={() => { sfx.click(); go({ s: "home" }); }} aria-label={t("exit")}>
            <IcX size={20} />
          </button>
          <div className="flex items-center gap-2">
            <LogoMark size={26} />
            <span className="font-display text-xs text-ink-200 hidden sm:block">
              {fmt(t("q_counter"), { a: digits(idx + 1, lang), b: digits(questions.length, lang) })}
            </span>
          </div>
          {/* progress segments — mirrored automatically in RTL */}
          <div className="flex-1 flex items-center gap-1">
            {Array.from({ length: questions.length }, (_, i) => (
              <span
                key={i}
                className="h-1.5 flex-1 rounded-full transition-all duration-300"
                style={{
                  background:
                    i < marks.length ? (marks[i] ? "#22e584" : "#ff3b56")
                    : i === marks.length ? acc
                    : "rgba(90,110,168,0.25)",
                  boxShadow: i === marks.length ? `0 0 8px ${acc}` : undefined,
                }}
              />
            ))}
          </div>
          <div className={`flex items-center gap-1.5 font-display text-sm ${timeLeft <= 5 && phase === "ask" ? "text-bad-400 animate-pulse" : "text-ink-300"}`}>
            <span key={timeLeft} className="inline-block animate-tick w-6 text-center">{digits(timeLeft, lang)}</span>
          </div>
          <div className="flex items-center gap-2 font-display text-sm text-gold-400">
            <IcStar size={15} />
            <span key={score} className="inline-block animate-tick" dir="ltr">{num(score, lang)}</span>
          </div>
          <div className={`flex items-center gap-1 font-display text-sm ${streak >= 3 ? "text-coral-400" : "text-ink-300"}`}>
            <IcFlame size={15} />
            <span key={streak} className="inline-block animate-tick">×{digits(streak, lang)}</span>
          </div>
        </div>
        {/* countdown bar — mirrors with document direction */}
        <div className="h-1 bg-ink-800/80">
          <div
            className="h-full transition-all duration-1000 ease-linear"
            style={{
              width: `${(timeLeft / QTIME) * 100}%`,
              background: timeLeft <= 5 ? "#ff3b56" : acc,
              boxShadow: timeLeft <= 5 ? "0 0 12px rgba(255,59,86,0.8)" : `0 0 8px ${acc}88`,
            }}
          />
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 pt-6 sm:pt-10 pb-10">
        <div key={idx} className="animate-rise">
          {/* date stage */}
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4 flex-wrap">
              {mode === "daily" && (
                <span className="chip border border-mint-500/50 bg-mint-500/10 px-2.5 py-1 font-display text-[10px] tracking-widest text-mint-400">{t("daily_badge")}</span>
              )}
              <DiffBadge diff={q.diff} />
              <span className="chip border border-ink-600/60 bg-ink-800/60 px-2.5 py-1 font-display text-[10px] tracking-widest text-ink-300">
                {CAT_MAP[q.cat].icon} {cat(q.cat).toUpperCase()}
              </span>
            </div>

            <div
              className="relative inline-block chip glass px-8 sm:px-14 py-5 sm:py-7 overflow-hidden"
              style={{ boxShadow: `0 0 60px -18px ${acc}aa, inset 0 0 40px -20px ${acc}66`, borderColor: `${acc}55` }}
            >
              <div className="absolute inset-x-8 top-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${acc}, transparent)` }} />
              <p className="font-display text-mint-400 text-sm sm:text-xl tracking-[0.35em] uppercase">{MONTHS[lang][q.answer.m - 1]}</p>
              <p className="font-display text-7xl sm:text-8xl text-gold-400 leading-none mt-1" style={{ textShadow: `0 0 34px ${acc}88` }} dir="ltr">
                {q.answer.d}
              </p>
              <div className="absolute inset-x-8 bottom-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${acc}, transparent)` }} />
            </div>

            <h2 className="font-display text-lg sm:text-2xl text-ink-200 mt-5">{t("who_born")}</h2>
            <p className="text-ink-400 text-xs mt-1 font-display">{fmt(t("q_counter"), { a: digits(idx + 1, lang), b: digits(QUESTIONS_PER_GAME, lang) })} · <span style={{ color: DIFF_STYLE[q.diff].bar }}>{digits(DIFF_POINTS[q.diff], lang)} {t("points")}</span></p>
          </div>

          {/* feedback banner + fact */}
          <div className={`mt-4 text-center ${phase === "reveal" ? "" : "h-10"}`} aria-live="polite">
            {phase === "reveal" && (
              <div className="animate-pop">
                <div className={`inline-flex items-center gap-2 chip px-4 py-1.5 font-display text-sm ${timedOut || !isCorrect ? "bg-bad-500/15 text-bad-400 border border-bad-500/50" : "bg-good-500/15 text-good-400 border border-good-500/50"}`}>
                  {isCorrect ? <IcCheck size={16} /> : <IcX size={16} />}
                  {timedOut
                    ? `${t("time_up")} — ${t("it_was")} ${q.answer.name}`
                    : isCorrect
                      ? `${t("correct")} +${digits(lastGain, lang)}`
                      : `${t("wrong")} — ${t("it_was")} ${q.answer.name}`}
                </div>
                <p className="text-ink-300 text-xs sm:text-sm mt-2 max-w-xl mx-auto leading-relaxed">
                  <span className="font-display text-[9px] tracking-[0.25em] text-gold-500 me-2">{t("q_fact")}</span>
                  {fact}
                </p>
              </div>
            )}
          </div>

          {/* options */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-4">
            {q.options.map((p: Person, i: number) => {
              const isSel = sel === i;
              const isAnswer = p.id === q.answer.id;
              let style: React.CSSProperties = {};
              let cls = "border-ink-600/50 hover:border-[var(--acc)]";
              if (phase === "reveal") {
                if (isAnswer) {
                  cls = "border-good-500 ring-2 ring-good-500/60";
                  style = { boxShadow: "0 0 34px -6px rgba(34,229,132,0.55)" };
                } else if (isSel) {
                  cls = "border-bad-500 ring-2 ring-bad-500/60 animate-shake";
                  style = { boxShadow: "0 0 30px -8px rgba(255,59,86,0.5)" };
                } else cls = "border-ink-700/40 opacity-40 hover:opacity-90";
              }
              return (
                <button
                  key={p.id}
                  onClick={() => (phase === "ask" ? pick(i) : setShowPerson(p))}
                  disabled={done}
                  className={`group relative chip glass card-3d p-2.5 sm:p-3 text-center border transition-all duration-200 cursor-pointer animate-rise ${i === 4 ? "col-span-2 sm:col-span-1" : ""} ${cls}`}
                  style={{ ...style, animationDelay: `${i * 70}ms` }}
                >
                  <span className="absolute top-1.5 start-1.5 font-display text-[10px] text-ink-400 group-hover:text-gold-400 transition-colors" dir="ltr">{i + 1}</span>
                  <div className="chip overflow-hidden aspect-[10/11] bg-ink-900">
                    <Avatar p={p} className="w-full h-full transition-transform duration-500 group-hover:scale-110" />
                  </div>
                  <p className="font-semibold text-xs sm:text-sm text-ink-200 mt-2 leading-snug group-hover:text-gold-300 transition-colors">{p.name}</p>
                  <p className="text-[10px] text-ink-400 mt-0.5 font-display tracking-wider">
                    {p.year < 0 ? `${-p.year} ${t("bc")}` : p.year}
                  </p>
                  {phase === "reveal" && isAnswer && (
                    <span className="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-good-500 text-ink-950 flex items-center justify-center animate-pop">
                      <IcCheck size={15} />
                    </span>
                  )}
                  {phase === "reveal" && isSel && !isAnswer && (
                    <span className="absolute -top-2 -end-2 w-7 h-7 rounded-full bg-bad-500 text-white flex items-center justify-center animate-pop">
                      <IcX size={15} />
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* next / finish */}
          <div className="text-center mt-6">
            {phase === "reveal" ? (
              <button className="btn-game btn-primary px-8 py-3.5 text-sm animate-pop" onClick={nextQ}>
                <span className="flex items-center gap-2">
                  {idx + 1 >= questions.length ? t("finish") : t("next_q")}
                  <IcBolt size={15} />
                </span>
              </button>
            ) : (
              <p className="text-ink-400 text-[11px] tracking-widest font-display hidden sm:block" dir="ltr">1 – 5 ⌨</p>
            )}
          </div>
        </div>
      </main>

      {showPerson && <PersonModal p={showPerson} onClose={() => setShowPerson(null)} />}
    </div>
  );
}

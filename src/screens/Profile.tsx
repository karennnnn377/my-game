import { useMemo, useState } from "react";
import { Avatar } from "../components/Avatar";
import { IcBack, IcCheck, IcEdit, IcStar, LogoMark } from "../components/ui";
import { ACH } from "../i18n";
import { gregorianToJalali, jalaliMonthLen, jalaliToGregorian } from "../lib/calendar";
import { CAT_MAP } from "../data/cats";
import { bornOn } from "../data/people";
import { levelFromXp, xpForLevel } from "../lib/engine";
import { sfx } from "../lib/audio";
import { digits, num } from "../lib/num";
import { useStore } from "../store";
import { MONTHS, JALALI_MONTHS } from "../i18n";
import type { CatId } from "../data/people";
import { PEOPLE } from "../data/people";
import { PersonCard } from "../components/PersonCard";

type CalSys = "g" | "j";

export default function Profile() {
  const { t, cat, go, profile, setName, saveBday, pushToast, lang } = useStore();
  const [editing, setEditing] = useState(false);
  const [nameDraft, setNameDraft] = useState(profile.name);

  const level = levelFromXp(profile.xp);
  const curBase = xpForLevel(level);
  const nextBase = xpForLevel(level + 1);
  const prog = Math.min(1, (profile.xp - curBase) / Math.max(1, nextBase - curBase));

  /* ---- birthday editor state (always in the active calendar system) ---- */
  const [cal, setCal] = useState<CalSys>("g");
  const stored = profile.bday;
  const storedJ = useMemo(() => (stored ? gregorianToJalali(stored.gy, stored.gm, stored.gd) : null), [stored]);

  const [gy, setGy] = useState(stored?.gy ?? 1990);
  const [gm, setGm] = useState(stored?.gm ?? 1);
  const [gd, setGd] = useState(stored?.gd ?? 1);
  const [jy, setJy] = useState(storedJ?.jy ?? 1369);
  const [jm, setJm] = useState(storedJ?.jm ?? 1);
  const [jd, setJd] = useState(storedJ?.jd ?? 1);

  const acc = profile.answered ? Math.round((profile.correct / profile.answered) * 100) : 0;
  const favCat = useMemo<CatId | null>(() => {
    let best: CatId | null = null;
    let bv = 0;
    for (const c of Object.keys(profile.cats) as CatId[]) {
      const v = profile.cats[c] ?? 0;
      if (v > bv) { bv = v; best = c; }
    }
    return best;
  }, [profile.cats]);

  const twins = useMemo(() => (stored ? bornOn(stored.gm, stored.gd).slice(0, 12) : []), [stored]);

  const saveBirthday = () => {
    const b = cal === "g" ? { gy, gm, gd } : jalaliToGregorian(jy, jm, jd);
    saveBday(b);
    sfx.correct();
    pushToast("🎂", t("p_saved"));
  };

  const selCls = "chip glass border-ink-600/50 px-2 py-2 text-sm text-ink-200 bg-ink-900/60 focus:border-gold-500/60 outline-none cursor-pointer";

  const stats = [
    { l: t("p_games"), v: digits(profile.games, lang), c: "#ffb400" },
    { l: t("p_questions"), v: digits(profile.answered, lang), c: "#3fe3d6" },
    { l: t("p_correct"), v: digits(profile.correct, lang), c: "#22e584" },
    { l: t("accuracy"), v: `${digits(acc, lang)}${lang === "en" ? "%" : "٪"}`, c: "#ff6b7e" },
    { l: t("p_hiscore"), v: num(profile.bestScore, lang), c: "#ffd97a" },
    { l: t("best_streak"), v: `×${digits(profile.bestStreak, lang)}`, c: "#c084fc" },
    { l: t("p_run"), v: `×${digits(profile.bestRun, lang)}`, c: "#ff8a5c" },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "home" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("back_home")}</span>
      </button>

      <h1 className="font-display text-3xl sm:text-5xl text-ink-200 animate-fade-up">
        <span className="text-mint-400">▸</span> {t("p_title")}
      </h1>

      {/* identity card */}
      <div className="mt-8 glass chip p-5 sm:p-7 relative overflow-hidden scanlines animate-rise">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-mint-500 to-coral-500" />
        <div className="flex items-center gap-5 flex-wrap">
          <div className="hexclip w-20 h-24 shrink-0 bg-gradient-to-b from-gold-500/40 to-ink-800 flex items-center justify-center">
            <LogoMark size={44} />
          </div>
          <div className="flex-1 min-w-52">
            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={nameDraft}
                  maxLength={18}
                  onChange={(e) => setNameDraft(e.target.value)}
                  className="chip glass border-gold-500/50 bg-ink-900/70 px-3 py-2 font-display text-lg text-gold-400 outline-none w-56"
                  autoFocus
                />
                <button className="btn-game btn-primary px-4 py-2.5 text-xs" onClick={() => { setName(nameDraft.trim()); setEditing(false); sfx.correct(); }}>
                  <span className="flex items-center gap-1.5"><IcCheck size={14} /> {t("p_save")}</span>
                </button>
              </div>
            ) : (
              <button className="group flex items-center gap-2 cursor-pointer" onClick={() => { setEditing(true); setNameDraft(profile.name); sfx.click(); }}>
                <span className="font-display text-2xl sm:text-3xl text-gold-400 group-hover:text-gold-300 transition-colors">{profile.name}</span>
                <IcEdit size={16} className="text-ink-400 group-hover:text-gold-400 transition-colors" />
              </button>
            )}
            <p className="text-ink-400 text-xs mt-1">{t("p_name_hint")}</p>
            <div className="flex items-center gap-3 mt-3 flex-wrap">
              <span className="chip bg-mint-500/15 border border-mint-500/40 text-mint-400 font-display text-xs px-2.5 py-1">{t("th_level")} {digits(level, lang)}</span>
              <span className="chip bg-gold-500/15 border border-gold-500/40 text-gold-400 font-display text-xs px-2.5 py-1 inline-flex items-center gap-1.5">
                <IcStar size={12} /> {num(profile.xp, lang)} XP
              </span>
            </div>
            {/* xp bar */}
            <div className="mt-3 max-w-md">
              <div className="h-2.5 rounded-full bg-ink-800 overflow-hidden border border-ink-700/60">
                <div className="h-full rounded-full bg-gradient-to-r from-mint-500 to-gold-500 transition-all duration-700" style={{ width: `${prog * 100}%` }} />
              </div>
              <p className="text-[10px] text-ink-400 mt-1 font-display tracking-wider" dir="ltr">{profile.xp - curBase} / {nextBase - curBase} XP → LV {level + 1}</p>
            </div>
          </div>
          <div className="text-center">
            <p className="font-display text-4xl text-gold-400" dir="ltr">{digits(acc, lang)}{lang === "en" ? "%" : "٪"}</p>
            <p className="text-xs text-ink-300">{t("accuracy")}</p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6 mt-6">
        {/* birthday + calendar */}
        <div className="glass chip p-5 sm:p-6 animate-rise" style={{ animationDelay: "120ms" }}>
          <h2 className="font-display text-gold-400 text-lg">🎂 {t("p_birthday")}</h2>
          <div className="flex gap-2 mt-4">
            {(["g", "j"] as CalSys[]).map((c) => (
              <button
                key={c}
                onClick={() => { sfx.click(); setCal(c); }}
                className={`chip px-3 py-2 font-display text-[11px] tracking-wider border cursor-pointer transition-all ${cal === c ? "bg-mint-500 text-ink-950 border-mint-400" : "glass text-ink-300 border-ink-600/50 hover:border-mint-500/50"}`}
              >
                {t(c === "g" ? "p_gregorian" : "p_jalali")}
              </button>
            ))}
          </div>

          {cal === "g" ? (
            <div className="grid grid-cols-3 gap-2 mt-4">
              <select className={selCls} value={gm} onChange={(e) => { const m = +e.target.value; setGm(m); setGd(Math.min(gd, [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][m - 1])); }}>
                {MONTHS[lang].map((m, i) => <option key={i} value={i + 1} className="bg-ink-900">{m}</option>)}
              </select>
              <select className={selCls} value={gd} onChange={(e) => setGd(+e.target.value)}>
                {Array.from({ length: [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][gm - 1] }, (_, i) => <option key={i} value={i + 1} className="bg-ink-900">{i + 1}</option>)}
              </select>
              <select className={selCls} value={gy} onChange={(e) => setGy(+e.target.value)}>
                {Array.from({ length: 2026 - 1900 + 1 }, (_, i) => <option key={i} value={1900 + i} className="bg-ink-900">{1900 + i}</option>)}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2 mt-4">
              <select className={selCls} value={jm} onChange={(e) => { const m = +e.target.value; setJm(m); setJd(Math.min(jd, jalaliMonthLen(jy, m))); }}>
                {JALALI_MONTHS[lang].map((m, i) => <option key={i} value={i + 1} className="bg-ink-900">{m}</option>)}
              </select>
              <select className={selCls} value={jd} onChange={(e) => setJd(+e.target.value)}>
                {Array.from({ length: jalaliMonthLen(jy, jm) }, (_, i) => <option key={i} value={i + 1} className="bg-ink-900">{i + 1}</option>)}
              </select>
              <select className={selCls} value={jy} onChange={(e) => setJy(+e.target.value)}>
                {Array.from({ length: 1405 - 1280 + 1 }, (_, i) => <option key={i} value={1280 + i} className="bg-ink-900">{1280 + i}</option>)}
              </select>
            </div>
          )}

          {/* live conversion preview */}
          <p className="text-xs text-ink-400 mt-3" dir="ltr">
            {cal === "g"
              ? `≈ ${(() => { const j = gregorianToJalali(gy, gm, gd); return `${j.jd} ${JALALI_MONTHS[lang][j.jm - 1]} ${j.jy}`; })()}`
              : `≈ ${(() => { const g = jalaliToGregorian(jy, jm, jd); return `${g.gd} ${MONTHS[lang][g.gm - 1]} ${g.gy}`; })()}`}
          </p>

          <button className="btn-game btn-mint px-5 py-2.5 text-xs mt-4" onClick={saveBirthday}>
            <span className="flex items-center gap-2"><IcCheck size={14} /> {t("p_save")}</span>
          </button>

          {/* twins */}
          <div className="mt-6 pt-5 border-t border-ink-700/60">
            <h3 className="font-display text-sm text-mint-400">{t("p_twins")}</h3>
            <p className="text-[11px] text-ink-400 mt-1">{t("p_twins_sub")}</p>
            {twins.length === 0 ? (
              <p className="text-ink-300 text-sm mt-3 glass chip px-3 py-2.5 inline-block">{t("p_no_twins")}</p>
            ) : (
              <div className="mt-3 grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-64 overflow-y-auto pe-1">
                {twins.map((p) => (
                  <div key={p.id} className="chip glass p-1.5 text-center card-3d border-ink-600/40">
                    <div className="chip overflow-hidden aspect-square"><Avatar p={p} emblem={false} className="w-full h-full" /></div>
                    <p className="text-[10px] font-semibold text-ink-200 mt-1 truncate">{p.name}</p>
                    <p className="text-[9px] text-ink-400">{CAT_MAP[p.cat].icon}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* stats + achievements */}
        <div className="space-y-6">
          <div className="glass chip p-5 sm:p-6 animate-rise" style={{ animationDelay: "180ms" }}>
            <h2 className="font-display text-gold-400 text-lg">📊 {t("p_questions")}</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {stats.map((s, i) => (
                <div key={i} className="chip glass p-3 border-ink-600/40 hover:border-gold-500/40 transition-colors animate-fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                  <p className="font-display text-xl sm:text-2xl" style={{ color: s.c }} dir="ltr">{s.v}</p>
                  <p className="text-[11px] text-ink-300 mt-0.5">{s.l}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-2 text-sm text-ink-300">
              <span className="font-display text-xs tracking-wider text-ink-400">{t("p_fav")}:</span>
              {favCat ? (
                <span className="chip border px-2.5 py-1 font-display text-xs inline-flex items-center gap-1.5" style={{ borderColor: `${CAT_MAP[favCat].c1}66`, color: CAT_MAP[favCat].c1 }}>
                  {CAT_MAP[favCat].icon} {cat(favCat)}
                </span>
              ) : (
                <span>{t("p_none")}</span>
              )}
            </div>
          </div>

          <div className="glass chip p-5 sm:p-6 animate-rise" style={{ animationDelay: "240ms" }}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-gold-400 text-lg">🏅 {t("p_ach")}</h2>
              <span className="text-xs text-ink-300 font-display" dir="ltr">{profile.ach.length}/{Object.keys(ACH).length} {t("p_unlocked")}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {Object.entries(ACH).map(([id, a], i) => {
                const got = profile.ach.includes(id);
                return (
                  <div
                    key={id}
                    className={`chip p-3 border transition-all duration-300 animate-fade-up ${got ? "glass border-gold-500/50 shadow-[0_0_24px_-10px_rgba(255,180,0,0.5)]" : "border-ink-700/50 bg-ink-900/40 opacity-50 grayscale"}`}
                    style={{ animationDelay: `${i * 50}ms` }}
                    title={a.d[lang === "en" ? 0 : lang === "fa" ? 1 : 2]}
                  >
                    <span className="text-2xl">{got ? a.icon : "🔒"}</span>
                    <p className={`font-display text-xs mt-1.5 ${got ? "text-gold-400" : "text-ink-300"}`}>{a.n[lang === "en" ? 0 : lang === "fa" ? 1 : 2]}</p>
                    <p className="text-[10px] text-ink-400 mt-0.5 leading-snug">{a.d[lang === "en" ? 0 : lang === "fa" ? 1 : 2]}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* favorites */}
          <div className="glass chip p-5 sm:p-6 animate-rise" style={{ animationDelay: "300ms" }}>
            <div className="flex items-center justify-between">
              <h2 className="font-display text-gold-400 text-lg">❤️ {t("see_favs")}</h2>
              <span className="text-xs text-ink-300 font-display" dir="ltr">{profile.favs.length}</span>
            </div>
            {profile.favs.length === 0 ? (
              <div className="mt-4 text-center py-4">
                <p className="text-ink-300 text-sm">{t("no_favs")}</p>
                <button className="btn-game btn-ghost px-5 py-2.5 text-xs mt-4" onClick={() => { sfx.click(); go({ s: "search" }); }}>
                  <span className="flex items-center gap-2">🔍 {t("nav_search")}</span>
                </button>
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
                {profile.favs
                  .map((id) => PEOPLE.find((p) => p.id === id))
                  .filter((p): p is NonNullable<typeof p> => Boolean(p))
                  .map((p, i) => (
                    <PersonCard key={p.id} p={p} delay={i * 60} />
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

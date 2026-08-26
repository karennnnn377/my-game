import { useMemo, useState } from "react";
import { PersonCard } from "../components/PersonCard";
import { IcBack, IcCake, IcCheck, IcPlay } from "../components/ui";
import { PEOPLE, bornOn } from "../data/people";
import { gregorianToJalali, jalaliToGregorian, jalaliMonthLen } from "../lib/calendar";
import { MONTHS, JALALI_MONTHS } from "../i18n";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

const GLEN = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export default function Birthday() {
  const { t, go, lang, profile, saveBday, pushToast } = useStore();
  const stored = profile.bday;
  const storedJ = useMemo(() => (stored ? gregorianToJalali(stored.gy, stored.gm, stored.gd) : null), [stored]);

  const [cal, setCal] = useState<"g" | "j">(profile.calPref ?? "g");
  const [gy, setGy] = useState(stored?.gy ?? 1990);
  const [gm, setGm] = useState(stored?.gm ?? 1);
  const [gd, setGd] = useState(stored?.gd ?? 1);
  const [jy, setJy] = useState(storedJ?.jy ?? 1369);
  const [jm, setJm] = useState(storedJ?.jm ?? 1);
  const [jd, setJd] = useState(storedJ?.jd ?? 1);

  const bday = stored; // canonical gregorian
  const exact = useMemo(() => (bday ? bornOn(bday.gm, bday.gd) : []), [bday]);
  const monthFolks = useMemo(() => {
    if (bday) return PEOPLE.filter((p) => p.m === bday.gm).sort((a, b) => b.pop - a.pop).slice(0, 12);
    return [];
  }, [bday]);

  const save = () => {
    const b = cal === "g" ? { gy, gm, gd } : jalaliToGregorian(jy, jm, jd);
    saveBday(b);
    sfx.correct();
    pushToast("🎂", t("p_saved"));
  };

  const selCls = "chip glass border-ink-600/50 px-2 py-2.5 text-sm text-ink-200 bg-ink-900/60 focus:border-gold-500/60 outline-none cursor-pointer w-full";

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "home" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("back_home")}</span>
      </button>

      <h1 className="font-display text-3xl sm:text-5xl text-ink-200 animate-fade-up">
        <span className="text-coral-400">▸</span> <span className="inline-flex items-center gap-3">{t("bday_title")} <IcCake size={30} className="text-coral-400" /></span>
      </h1>
      <p className="text-ink-300 mt-3 max-w-2xl animate-fade-up" style={{ animationDelay: "80ms" }}>{t("bday_sub")}</p>

      {/* date picker */}
      <div className="mt-8 glass chip p-5 sm:p-7 max-w-2xl animate-rise relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-coral-500 via-gold-500 to-mint-500" />
        <h2 className="font-display text-gold-400 text-lg">🎂 {t("your_bday")}</h2>

        <div className="flex gap-2 mt-4">
          {(["g", "j"] as const).map((c) => (
            <button
              key={c}
              onClick={() => { setCal(c); sfx.click(); }}
              className={`chip px-3.5 py-2 font-display text-[11px] tracking-wider border cursor-pointer transition-all ${
                cal === c ? "bg-mint-500 text-ink-950 border-mint-400" : "glass text-ink-300 border-ink-600/50 hover:border-mint-500/50"
              }`}
            >
              {t(c === "g" ? "p_gregorian" : "p_jalali")}
            </button>
          ))}
        </div>

        {cal === "g" ? (
          <div className="grid grid-cols-3 gap-2 mt-4">
            <select className={selCls} value={gm} onChange={(e) => { const m = +e.target.value; setGm(m); setGd(Math.min(gd, GLEN[m - 1])); }}>
              {MONTHS[lang].map((m, i) => <option key={i} value={i + 1} className="bg-ink-900">{m}</option>)}
            </select>
            <select className={selCls} value={gd} onChange={(e) => setGd(+e.target.value)}>
              {Array.from({ length: GLEN[gm - 1] }, (_, i) => <option key={i} value={i + 1} className="bg-ink-900">{i + 1}</option>)}
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

        <p className="text-xs text-ink-400 mt-3" dir="ltr">
          {cal === "g"
            ? `≈ ${(() => { const j = gregorianToJalali(gy, gm, gd); return `${j.jd} ${JALALI_MONTHS[lang][j.jm - 1]} ${j.jy}`; })()}`
            : `≈ ${(() => { const g = jalaliToGregorian(jy, jm, jd); return `${g.gd} ${MONTHS[lang][g.gm - 1]} ${g.gy}`; })()}`}
        </p>

        <button className="btn-game btn-coral px-6 py-3 text-sm mt-4" onClick={save}>
          <span className="flex items-center gap-2"><IcCheck size={15} /> {t("p_save")}</span>
        </button>
      </div>

      {/* results */}
      {bday && (
        <div className="mt-10">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <h2 className="font-display text-2xl text-ink-200">
                <span className="text-gold-400">▸</span> {MONTHS[lang][bday.gm - 1]} {bday.gd}
              </h2>
              <p className="text-ink-400 text-sm mt-1">
                <span className="text-mint-400 font-display" dir="ltr">{exact.length}</span> {t("twins_found")}
              </p>
            </div>
            <button className="btn-game btn-primary px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "game", mode: "mix" }); }}>
              <span className="flex items-center gap-2"><IcPlay size={14} /> {t("play_now")}</span>
            </button>
          </div>

          {exact.length > 0 ? (
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
              {exact.slice(0, 12).map((p, i) => <PersonCard key={p.id} p={p} delay={i * 50} />)}
            </div>
          ) : (
            <div className="mt-5">
              <p className="glass chip inline-block px-4 py-2.5 text-sm text-ink-300">{t("no_twins")}</p>
              {monthFolks.length > 0 && (
                <>
                  <h3 className="font-display text-lg text-mint-400 mt-6">{t("month_twins")}</h3>
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                    {monthFolks.map((p, i) => <PersonCard key={p.id} p={p} delay={i * 50} />)}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

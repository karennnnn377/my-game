import { useState } from "react";
import { Avatar } from "../components/Avatar";
import { CreatorCard, IcBack, IcCheck, IcSound } from "../components/ui";
import { LANGS } from "../i18n";
import { TOTAL, CAT_IDS, type Person, type CatId } from "../data/people";
import { QUESTIONS_PER_GAME } from "../lib/engine";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

function fakePerson(seed: number): Person {
  return {
    id: `avatar:${seed}`,
    name: "You",
    cat: CAT_IDS[seed % CAT_IDS.length] as CatId,
    year: 1985 + seed,
    m: (seed % 12) + 1,
    d: ((seed * 7) % 27) + 1,
    pop: 80,
  };
}

export default function Settings() {
  const { t, go, lang, setLang, sound, toggleSound, profile, setAvatar, setCalPref, resetAll, pushToast } = useStore();
  const [confirming, setConfirming] = useState(false);

  const sectionCls = "glass chip p-5 sm:p-6 animate-rise";
  const headCls = "font-display text-gold-400 text-lg";

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "home" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("back_home")}</span>
      </button>

      <h1 className="font-display text-3xl sm:text-5xl text-ink-200 animate-fade-up">
        <span className="text-mint-400">▸</span> {t("set_title")}
      </h1>

      <div className="grid md:grid-cols-2 gap-5 mt-8">
        {/* language */}
        <div className={sectionCls}>
          <h2 className={headCls}>🌐 {t("set_lang")}</h2>
          <div className="grid grid-cols-3 gap-2.5 mt-4">
            {LANGS.map((l) => (
              <button
                key={l.id}
                onClick={() => setLang(l.id)}
                className={`chip border p-3 text-center transition-all cursor-pointer ${
                  lang === l.id
                    ? "bg-gold-500/15 border-gold-500/60 shadow-[0_0_24px_-8px_rgba(255,180,0,0.6)]"
                    : "glass border-ink-600/50 hover:border-gold-500/40"
                }`}
              >
                <span className="text-2xl">{l.flag}</span>
                <p className={`font-display text-xs mt-1.5 ${lang === l.id ? "text-gold-400" : "text-ink-300"}`}>{l.label}</p>
                <p className="text-[9px] text-ink-400 font-display tracking-widest mt-0.5" dir="ltr">{l.dir.toUpperCase()}</p>
              </button>
            ))}
          </div>
          <p className="text-[11px] text-ink-400 mt-3">{t("set_lang_d")}</p>
        </div>

        {/* sound + calendar */}
        <div className={sectionCls} style={{ animationDelay: "90ms" }}>
          <h2 className={headCls}>🔊 {t("set_sound")}</h2>
          <button
            onClick={toggleSound}
            className={`mt-4 w-full chip border p-3.5 flex items-center justify-between transition-all cursor-pointer ${
              sound ? "border-mint-500/50 bg-mint-500/10" : "border-ink-600/50 glass"
            }`}
          >
            <span className={`inline-flex items-center gap-2 font-display text-sm ${sound ? "text-mint-400" : "text-ink-300"}`}>
              <IcSound on={sound} size={18} />
              {sound ? t("on") : t("off")}
            </span>
            <span className={`w-11 h-6 rounded-full relative transition-colors ${sound ? "bg-mint-500" : "bg-ink-700"}`}>
              <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-ink-950 transition-all ${sound ? "start-[22px]" : "start-0.5"}`} />
            </span>
          </button>

          <h2 className={`${headCls} mt-6`}>📅 {t("set_cal")}</h2>
          <div className="grid grid-cols-2 gap-2.5 mt-4">
            {(["g", "j"] as const).map((c) => (
              <button
                key={c}
                onClick={() => { sfx.click(); setCalPref(c); }}
                className={`chip border p-3 font-display text-xs transition-all cursor-pointer ${
                  profile.calPref === c ? "bg-mint-500 text-ink-950 border-mint-400" : "glass border-ink-600/50 text-ink-300 hover:border-mint-500/50"
                }`}
              >
                {t(c === "g" ? "p_gregorian" : "p_jalali")}
              </button>
            ))}
          </div>
        </div>

        {/* avatar */}
        <div className={sectionCls} style={{ animationDelay: "160ms" }}>
          <h2 className={headCls}>👤 {t("set_avatar")}</h2>
          <div className="grid grid-cols-4 gap-2.5 mt-4">
            {Array.from({ length: 8 }, (_, i) => {
              const active = profile.avatar === i;
              return (
                <button
                  key={i}
                  onClick={() => { setAvatar(i); sfx.correct(); }}
                  className={`chip overflow-hidden border-2 transition-all cursor-pointer relative ${
                    active ? "border-gold-500 shadow-[0_0_20px_-6px_rgba(255,180,0,0.7)] scale-105" : "border-ink-700/60 hover:border-gold-500/50"
                  }`}
                >
                  <Avatar p={fakePerson(i)} emblem={false} className="w-full h-auto" />
                  {active && (
                    <span className="absolute inset-0 flex items-center justify-center bg-ink-950/40">
                      <span className="w-7 h-7 rounded-full bg-gold-500 text-ink-950 flex items-center justify-center animate-pop"><IcCheck size={15} /></span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* danger zone */}
        <div className="glass chip p-5 sm:p-6 animate-rise border border-bad-500/30" style={{ animationDelay: "220ms" }}>
          <h2 className="font-display text-bad-400 text-lg">⚠️ {t("set_danger")}</h2>
          <p className="text-ink-300 text-sm mt-2">{t("set_reset_desc")}</p>
          {!confirming ? (
            <button className="btn-game btn-coral px-5 py-3 text-xs mt-4" onClick={() => { sfx.click(); setConfirming(true); }}>
              <span className="flex items-center gap-2">🗑️ {t("set_reset")}</span>
            </button>
          ) : (
            <div className="mt-4 chip border border-bad-500/50 bg-bad-500/10 p-3.5 animate-pop">
              <p className="font-display text-bad-400 text-xs">{t("set_confirm_q")}</p>
              <div className="flex gap-2.5 mt-3">
                <button className="btn-game btn-coral px-4 py-2.5 text-[11px]" onClick={() => { resetAll(); setConfirming(false); sfx.wrong(); pushToast("🧹", t("set_reset_done")); }}>
                  {t("set_yes")}
                </button>
                <button className="btn-game btn-ghost px-4 py-2.5 text-[11px]" onClick={() => { sfx.click(); setConfirming(false); }}>
                  {t("set_cancel")}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* about */}
      <div className="glass chip p-5 sm:p-6 mt-5 animate-rise" style={{ animationDelay: "280ms" }}>
        <h2 className={headCls}>ℹ️ {t("set_about")}</h2>
        <p className="text-ink-300 text-sm leading-relaxed mt-3">{t("set_about_d")}</p>

        <div className="mt-6 max-w-md">
          <CreatorCard />
        </div>
        <div className="grid grid-cols-3 gap-3 mt-5">
          {[
            { v: `${TOTAL}+`, l: t("st_legends"), c: "#ffb400" },
            { v: String(CAT_IDS.length), l: t("st_cats"), c: "#3fe3d6" },
            { v: String(QUESTIONS_PER_GAME), l: t("st_questions"), c: "#ff6b7e" },
          ].map((s, i) => (
            <div key={i} className="chip glass p-3 text-center border-ink-600/40">
              <p className="font-display text-xl sm:text-2xl" style={{ color: s.c }} dir="ltr">{s.v}</p>
              <p className="text-[10px] sm:text-xs text-ink-300 mt-0.5">{s.l}</p>
            </div>
          ))}
        </div>
        <p className="text-[11px] text-ink-400 mt-4">{t("rights")}</p>
        <p className="font-display text-[10px] tracking-[0.3em] text-ink-500 mt-3" dir="ltr">GYFP · v2.0 · 2026</p>
      </div>
    </div>
  );
}

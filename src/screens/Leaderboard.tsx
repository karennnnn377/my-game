import { useMemo, useState } from "react";
import { IcBack, IcFlame, IcTarget, IcTrophy } from "../components/ui";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

type Tab = "global" | "daily" | "weekly";

export default function Leaderboard() {
  const { t, go, lbRows, profile } = useStore();
  const [tab, setTab] = useState<Tab>("global");
  const rows = useMemo(() => lbRows(tab), [lbRows, tab]);
  const tabs: { id: Tab; icon: string }[] = [
    { id: "global", icon: "🌍" },
    { id: "daily", icon: "📅" },
    { id: "weekly", icon: "🗓️" },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "home" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("back_home")}</span>
      </button>

      <div className="flex items-end justify-between flex-wrap gap-4">
        <h1 className="font-display text-3xl sm:text-5xl text-ink-200 animate-fade-up">
          <span className="text-gold-400">▸</span> <span className="inline-flex items-center gap-3">{t("nav_lb")} <IcTrophy size={30} className="text-gold-400" /></span>
        </h1>
        <div className="flex gap-2">
          {tabs.map((tb) => (
            <button
              key={tb.id}
              onClick={() => { sfx.click(); setTab(tb.id); }}
              className={`chip px-4 py-2.5 font-display text-xs tracking-wider transition-all cursor-pointer border ${
                tab === tb.id ? "bg-gold-500 text-ink-950 border-gold-400 shadow-[0_0_24px_-6px_rgba(255,180,0,0.6)]" : "glass text-ink-300 border-ink-600/50 hover:border-gold-500/50"
              }`}
            >
              <span className="flex items-center gap-1.5">{tb.icon} {t(`lb_${tb.id}`)}</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-ink-300 text-sm mt-3 animate-fade-up" style={{ animationDelay: "80ms" }}>{t("lb_note")}</p>

      <div key={tab} className="mt-8 glass chip overflow-hidden animate-rise">
        <div className="grid grid-cols-[2.4rem_1fr_3.6rem_3rem_3rem] sm:grid-cols-[4rem_1fr_6rem_5.5rem_5rem_5rem] gap-2 px-3 sm:px-5 py-3 border-b border-ink-700/60 bg-ink-900/60 font-display text-[10px] sm:text-[11px] tracking-[0.18em] text-ink-400 uppercase">
          <span>{t("rank")}</span>
          <span>{t("player")}</span>
          <span className="text-end">{t("th_score")}</span>
          <span className="text-end hidden sm:block"><span className="inline-flex items-center gap-1"><IcTarget size={12} /> {t("th_acc")}</span></span>
          <span className="text-end"><span className="inline-flex items-center gap-1"><IcFlame size={12} /> {t("th_streak")}</span></span>
          <span className="text-end">{t("th_level")}</span>
        </div>
        {rows.map((r, i) => {
          const medal = i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : null;
          return (
            <div
              key={`${r.name}-${i}`}
              className={`grid grid-cols-[2.4rem_1fr_3.6rem_3rem_3rem] sm:grid-cols-[4rem_1fr_6rem_5.5rem_5rem_5rem] gap-2 items-center px-3 sm:px-5 py-3 border-b border-ink-800/70 text-sm animate-fade-up transition-colors ${
                r.you ? "bg-gold-500/10 border-s-2 border-s-gold-500" : "hover:bg-ink-800/50"
              }`}
              style={{ animationDelay: `${Math.min(i * 40, 600)}ms` }}
            >
              <span className="font-display text-ink-300" dir="ltr">{medal ?? `#${i + 1}`}</span>
              <span className="flex items-center gap-2 min-w-0">
                <span
                  className="w-7 h-7 shrink-0 chip flex items-center justify-center font-display text-[10px]"
                  style={{ background: `hsl(${(i * 47) % 360} 60% 22%)`, color: `hsl(${(i * 47) % 360} 90% 70%)` }}
                >
                  {r.name.slice(0, 2).toUpperCase()}
                </span>
                <span className={`truncate font-semibold ${r.you ? "text-gold-400" : "text-ink-200"}`}>{r.you ? profile.name : r.name}</span>
                {r.you && <span className="chip bg-gold-500 text-ink-950 font-display text-[9px] px-1.5 py-0.5">{t("you_row")}</span>}
              </span>
              <span className="text-end font-display text-gold-400" dir="ltr">{r.score}</span>
              <span className="text-end text-ink-300 hidden sm:block" dir="ltr">{r.acc}%</span>
              <span className="text-end text-coral-400 font-display" dir="ltr">×{r.streak}</span>
              <span className="text-end text-mint-400 font-display" dir="ltr">{r.level}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

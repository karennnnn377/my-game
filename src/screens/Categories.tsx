import { CATS } from "../data/cats";
import { BY_CAT } from "../data/people";
import { sfx } from "../lib/audio";
import { useStore } from "../store";
import { IcBack, IcBolt, IcPlay } from "../components/ui";

export default function Categories() {
  const { t, cat, go } = useStore();

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "home" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("back_home")}</span>
      </button>

      <h1 className="font-display text-3xl sm:text-5xl text-ink-200 animate-fade-up">
        <span className="text-gold-400">▸</span> {t("choose_cat")}
      </h1>
      <p className="text-ink-300 mt-3 max-w-2xl animate-fade-up" style={{ animationDelay: "80ms" }}>{t("all_cats_sub")}</p>

      {/* featured random mix */}
      <button
        onClick={() => { sfx.click(); go({ s: "game", mode: "mix" }); }}
        className="mt-8 w-full chip relative overflow-hidden p-5 sm:p-6 text-start border border-gold-500/40 bg-gradient-to-r from-gold-500/15 via-ink-800/40 to-mint-500/10 card-3d group cursor-pointer animate-fade-up"
        style={{ animationDelay: "120ms" }}
      >
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-4xl animate-float inline-block" style={{ ["--rot" as string]: "0deg" }}>🎲</span>
          <span className="flex-1 min-w-40">
            <span className="font-display text-xl text-gold-400 block">{t("random_mix")}</span>
            <span className="text-ink-300 text-sm block mt-1">{t("random_mix_d")}</span>
          </span>
          <span className="btn-game btn-primary px-5 py-3 text-xs pointer-events-none">
            <span className="flex items-center gap-2"><IcPlay size={14} /> {t("play_now")}</span>
          </span>
        </div>
      </button>

      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4">
        {CATS.map((c, i) => (
          <button
            key={c.id}
            onClick={() => { sfx.click(); go({ s: "game", mode: c.id }); }}
            onMouseEnter={() => sfx.hover()}
            className="group relative chip glass card-3d p-4 sm:p-5 text-start border-ink-600/40 cursor-pointer animate-fade-up overflow-hidden"
            style={{ animationDelay: `${140 + i * 45}ms`, ["--gc" as string]: c.c1 }}
          >
            <span
              className="absolute -top-8 -end-8 w-24 h-24 rounded-full opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500"
              style={{ background: c.c1 }}
            />
            <div className="flex items-start justify-between">
              <span className="text-3xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">{c.icon}</span>
              <IcBolt size={14} className="text-ink-500 group-hover:text-[var(--gc)] transition-colors" />
            </div>
            <p className="font-display text-sm sm:text-base mt-4 text-ink-200 group-hover:text-[var(--gc)] transition-colors leading-snug">
              {cat(c.id)}
            </p>
            <p className="text-[11px] text-ink-400 mt-1 font-display tracking-wider" dir="ltr">
              {BY_CAT[c.id].length} {t("legends_count")}
            </p>
            <div className="h-1 rounded-full mt-3 w-10 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${c.c1}, ${c.c2})` }} />
          </button>
        ))}
      </div>
    </div>
  );
}

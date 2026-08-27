import { Avatar } from "./Avatar";
import { IcHeart, IcX } from "./ui";
import { pname, eraOf, ERA_KEYS, difficultyOf, rarityOf, type Person } from "../data/people";
import { CAT_MAP } from "../data/cats";
import { flagOf, countryName } from "../data/nations";
import { DIFF_STYLE, DiffBadge } from "./ui";
import { MONTHS } from "../i18n";
import { bioOf, factsOf } from "../lib/bio";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

const RARITY = [
  { key: "r_common", cls: "rarity-common", label: "text-ink-300", tick: "#8b9cc9" },
  { key: "r_rare", cls: "rarity-rare", label: "text-mint-400", tick: "#3fe3d6" },
  { key: "r_epic", cls: "rarity-epic", label: "text-[#d8b4fe]", tick: "#c084fc" },
  { key: "r_legend", cls: "rarity-legend", label: "text-gold-400", tick: "#ffc94d" },
];

interface Props {
  p: Person;
  delay?: number;
}

/** A collectible card auto-generated for any person record — used in grids everywhere. */
export function PersonCard({ p, delay = 0 }: Props) {
  const { go, lang, t, cat, isFav, toggleFav } = useStore();
  const meta = CAT_MAP[p.cat];
  const fav = isFav(p.id);
  const diff = difficultyOf(p.pop);
  const rarity = rarityOf(p.pop);
  const R = RARITY[rarity];
  const yearStr = p.year < 0 ? `${-p.year} ${t("bc")}` : String(p.year);

  return (
    <button
      onClick={() => { sfx.click(); go({ s: "person", id: p.id }); }}
      onMouseEnter={() => sfx.hover()}
      className={`group relative chip rarity ${R.cls} holo catbg card-3d p-2.5 text-start cursor-pointer animate-fade-up overflow-hidden w-full`}
      style={{
        animationDelay: `${delay}ms`,
        ["--gc" as string]: meta.c1,
        ["--tick" as string]: R.tick,
        ["--gcA" as string]: `${meta.c1}26`,
        ["--gcB" as string]: `${meta.c2}33`,
      }}
    >
      <span className="corner-ticks absolute inset-0 pointer-events-none" aria-hidden />

      {/* rarity tag */}
      <span className={`absolute top-2 start-2 z-[4] font-display text-[8px] tracking-[0.18em] uppercase ${R.label}`}>
        {t(R.key)}
      </span>

      {/* favorite button */}
      <span
        role="button"
        tabIndex={0}
        aria-label={fav ? t("remove_fav") : t("add_fav")}
        onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
        onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); toggleFav(p.id); } }}
        className={`absolute top-1.5 end-1.5 z-[5] w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
          fav ? "bg-coral-500 text-white scale-105 shadow-[0_0_14px_rgba(255,77,100,0.7)]" : "bg-ink-950/70 text-ink-300 hover:text-coral-400 hover:scale-110"
        }`}
      >
        <IcHeart size={14} filled={fav} />
      </span>

      <div className="relative chip overflow-hidden aspect-[10/11] bg-ink-900 mt-4">
        <Avatar p={p} className="w-full h-full transition-transform duration-500 group-hover:scale-110" />
        <span
          className="absolute top-1.5 end-1.5 w-2.5 h-2.5 rounded-full border border-ink-950/60"
          style={{ background: DIFF_STYLE[diff]?.bar ?? "#888" }}
          title={t(`diff${diff}`)}
        />
      </div>

      <p className="font-display text-sm text-ink-200 mt-2 leading-snug group-hover:text-[var(--gc)] transition-colors truncate">
        {pname(p, lang)}
      </p>
      <p className="text-[11px] text-ink-400 mt-0.5 inline-flex items-center gap-1 truncate">
        {meta.icon} <span className="truncate">{cat(p.cat)}</span>
      </p>
      <p className="text-[11px] text-ink-400 mt-1 flex items-center gap-1.5" dir="ltr">
        <span>{yearStr}</span>
        <span className="text-ink-600">•</span>
        <span>{t(ERA_KEYS[eraOf(p.year)])}</span>
        {p.cc && (
          <>
            <span className="text-ink-600">•</span>
            <span>{flagOf(p.cc)} {countryName(p.cc, lang)}</span>
          </>
        )}
      </p>

      <div className="h-1 rounded-full mt-2 w-8 group-hover:w-full transition-all duration-500" style={{ background: `linear-gradient(90deg, ${meta.c1}, ${meta.c2})` }} />
    </button>
  );
}

/** Quick-peek overlay card — used in-game during the reveal phase. */
export function PersonModal({ p, onClose }: { p: Person; onClose: () => void }) {
  const { lang, t, cat, go, isFav, toggleFav } = useStore();
  const meta = CAT_MAP[p.cat];
  const fav = isFav(p.id);
  const rarity = rarityOf(p.pop);
  const R = RARITY[rarity];
  const yearStr = p.year < 0 ? `${-p.year} ${t("bc")}` : String(p.year);
  const facts = factsOf(p, lang).slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:p-6" onClick={onClose}>
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" />
      <div
        className={`relative chip rarity ${R.cls} catbg w-full sm:max-w-md p-5 animate-rise max-h-[86vh] overflow-y-auto`}
        onClick={(e) => e.stopPropagation()}
        style={{ ["--gcA" as string]: `${meta.c1}26`, ["--gcB" as string]: `${meta.c2}33`, ["--tick" as string]: R.tick }}
      >
        <span className="corner-ticks absolute inset-0 pointer-events-none" aria-hidden />
        <button onClick={onClose} aria-label={t("exit")} className="absolute top-3 end-3 z-[5] text-ink-300 hover:text-coral-400 transition-colors cursor-pointer">
          <IcX size={19} />
        </button>

        <div className="flex items-center gap-4">
          <div className="chip overflow-hidden w-20 h-20 shrink-0 border" style={{ borderColor: `${meta.c1}66` }}>
            <Avatar p={p} className="w-full h-full" />
          </div>
          <div className="min-w-0">
            <p className={`font-display text-[9px] tracking-[0.22em] uppercase ${R.label}`}>{t(R.key)}</p>
            <p className="font-display text-lg leading-tight" style={{ color: meta.c1 }}>{pname(p, lang)}</p>
            {pname(p, lang) !== p.name && <p className="text-[11px] text-ink-400 mt-0.5 truncate" dir="ltr">{p.name}</p>}
            <div className="flex items-center gap-2 mt-1.5 flex-wrap">
              <span className="chip border border-ink-600/60 bg-ink-800/60 px-2 py-0.5 font-display text-[9px] tracking-wider text-ink-300">
                {meta.icon} {cat(p.cat).toUpperCase()}
              </span>
              <DiffBadge diff={difficultyOf(p.pop)} />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1 text-sm">
          <p className="text-ink-200">
            <span className="font-display text-[10px] tracking-[0.2em] text-mint-400 me-2">{t("born_in").toUpperCase()}</span>
            <span dir="ltr">{MONTHS[lang][p.m - 1]} {p.d}, {yearStr}</span>
          </p>
          {p.cc && (
            <p className="text-ink-200">
              <span className="font-display text-[10px] tracking-[0.2em] text-mint-400 me-2">{t("nationality").toUpperCase()}</span>
              {flagOf(p.cc)} {countryName(p.cc, lang)}
            </p>
          )}
          <p className="text-ink-200">
            <span className="font-display text-[10px] tracking-[0.2em] text-mint-400 me-2">{t("era").toUpperCase()}</span>
            {t(ERA_KEYS[eraOf(p.year)])}
          </p>
        </div>

        <p className="text-ink-300 text-sm leading-relaxed mt-3">{bioOf(p, lang)}</p>

        <div className="mt-3 space-y-1.5">
          {facts.map((f, i) => (
            <p key={i} className="text-[12px] text-gold-300/90 flex gap-2 leading-relaxed">
              <span className="font-display text-[9px] tracking-widest text-gold-500 shrink-0 mt-0.5">{t("q_fact")} ▸</span>
              <span>{f}</span>
            </p>
          ))}
        </div>

        <div className="mt-5 flex gap-2.5">
          <button className="btn-game btn-ghost flex-1 px-3 py-2.5 text-[11px]" onClick={() => { sfx.click(); go({ s: "person", id: p.id }); }}>
            <span className="flex items-center gap-1.5">👤 {t("nav_profile")}</span>
          </button>
          <button className={`btn-game flex-1 px-3 py-2.5 text-[11px] ${fav ? "btn-coral" : "btn-mint"}`} onClick={() => toggleFav(p.id)}>
            <span className="flex items-center gap-1.5"><IcHeart size={13} filled={fav} /> {fav ? t("remove_fav") : t("add_fav")}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import { Avatar } from "./Avatar";
import { IcHeart } from "./ui";
import { pname, eraOf, ERA_KEYS, difficultyOf, type Person } from "../data/people";
import { CAT_MAP } from "../data/cats";
import { flagOf, countryName } from "../data/nations";
import { DIFF_STYLE } from "./ui";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

interface Props {
  p: Person;
  delay?: number;
}

/** A card auto-generated for any person record — used in grids everywhere. */
export function PersonCard({ p, delay = 0 }: Props) {
  const { go, lang, t, cat, isFav, toggleFav } = useStore();
  const meta = CAT_MAP[p.cat];
  const fav = isFav(p.id);
  const diff = difficultyOf(p.pop);
  const era = t(ERA_KEYS[eraOf(p.year)]);
  const yearStr = p.year < 0 ? `${-p.year} ${t("bc")}` : String(p.year);

  return (
    <button
      onClick={() => { sfx.click(); go({ s: "person", id: p.id }); }}
      onMouseEnter={() => sfx.hover()}
      className="group relative chip glass card-3d p-3 text-start border border-ink-600/40 cursor-pointer animate-fade-up overflow-hidden w-full"
      style={{ animationDelay: `${delay}ms`, ["--gc" as string]: meta.c1 }}
    >
      <span
        className="absolute -top-10 -end-10 w-28 h-28 rounded-full opacity-0 group-hover:opacity-25 blur-2xl transition-opacity duration-500 pointer-events-none"
        style={{ background: meta.c1 }}
      />

      <div className="relative chip overflow-hidden aspect-[10/11] bg-ink-900">
        <Avatar p={p} className="w-full h-full transition-transform duration-500 group-hover:scale-108" />
        {/* difficulty dot */}
        <span
          className="absolute top-1.5 end-1.5 w-2.5 h-2.5 rounded-full border border-ink-950/60"
          style={{ background: DIFF_STYLE[diff]?.bar ?? "#888" }}
          title={t(`diff${diff}`)}
        />
        {/* favorite button */}
        <span
          role="button"
          tabIndex={0}
          aria-label={fav ? t("remove_fav") : t("add_fav")}
          onClick={(e) => { e.stopPropagation(); toggleFav(p.id); }}
          onKeyDown={(e) => { if (e.key === "Enter") { e.stopPropagation(); toggleFav(p.id); } }}
          className={`absolute bottom-1.5 end-1.5 w-7 h-7 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 ${
            fav ? "bg-coral-500 text-white scale-105 shadow-[0_0_14px_rgba(255,77,100,0.7)]" : "bg-ink-950/70 text-ink-300 hover:text-coral-400 hover:scale-110"
          }`}
        >
          <IcHeart size={14} filled={fav} />
        </span>
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
        <span>{era}</span>
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

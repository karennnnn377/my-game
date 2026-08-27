import { useMemo } from "react";
import { Avatar } from "../components/Avatar";
import { PersonCard } from "../components/PersonCard";
import { DiffBadge, IcBack, IcHeart, IcPlay, IcStar } from "../components/ui";
import { PEOPLE, pname, eraOf, ERA_KEYS, difficultyOf, rarityOf, bornOn, type Person } from "../data/people";
import { CAT_MAP } from "../data/cats";
import { flagOf, countryName } from "../data/nations";
import { bioOf, factsOf, professionOf } from "../lib/bio";
import { gregorianToJalali } from "../lib/calendar";
import { MONTHS, JALALI_MONTHS } from "../i18n";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

const RARITY_KEY = ["r_common", "r_rare", "r_epic", "r_legend"] as const;
const RARITY_BG = ["#8b9cc9", "#3fe3d6", "#c084fc", "#ffc94d"];

export default function PersonDetail({ id }: { id: string }) {
  const { t, cat, go, lang, isFav, toggleFav } = useStore();
  const p = useMemo<Person | undefined>(() => PEOPLE.find((x) => x.id === id), [id]);

  if (!p) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-4">
        <p className="text-5xl">🤔</p>
        <p className="font-display text-ink-300">{t("no_results")}</p>
        <button className="btn-game btn-ghost px-5 py-2.5 text-xs" onClick={() => { sfx.click(); go({ s: "search" }); }}>
          <span className="flex items-center gap-2"><IcBack size={14} /> {t("nav_search")}</span>
        </button>
      </div>
    );
  }

  const meta = CAT_MAP[p.cat];
  const fav = isFav(p.id);
  const diff = difficultyOf(p.pop);
  const era = t(ERA_KEYS[eraOf(p.year)]);
  const yearStr = p.year < 0 ? `${-p.year} ${t("bc")}` : String(p.year);
  const gDate = `${MONTHS[lang][p.m - 1]} ${p.d}, ${yearStr}`;
  const j = p.year > 622 ? gregorianToJalali(p.year, p.m, p.d) : null;
  const jDate = j ? `${j.jd} ${JALALI_MONTHS[lang][j.jm - 1]} ${j.jy}` : null;
  const twins = bornOn(p.m, p.d).filter((x) => x.id !== p.id).slice(0, 6);
  const facts = factsOf(p, lang);
  /* related: compatriots first, then legends of the same arena (deduped) */
  const related = useMemo<Person[]>(() => {
    const seen = new Set<string>([p.id]);
    const out: Person[] = [];
    const push = (x: Person) => { if (!seen.has(x.id)) { seen.add(x.id); out.push(x); } };
    if (p.cc) PEOPLE.filter((x) => x.cc === p.cc && x.id !== p.id).sort((a, b) => b.pop - a.pop).slice(0, 3).forEach(push);
    PEOPLE.filter((x) => x.cat === p.cat && x.id !== p.id).sort((a, b) => b.pop - a.pop).slice(0, 6).forEach(push);
    return out.slice(0, 6);
  }, [p]);

  const rows: { label: string; value: React.ReactNode }[] = [
    { label: t("profession"), value: professionOf(p, lang) },
    { label: t("q_category"), value: <span className="inline-flex items-center gap-1.5">{meta.icon} {cat(p.cat)}</span> },
    ...(p.cc ? [{ label: t("nationality"), value: <span>{flagOf(p.cc)} {countryName(p.cc, lang)}</span> }] : []),
    { label: t("era"), value: era },
    { label: t("born"), value: <span dir="ltr">{gDate}{jDate ? <span className="text-ink-400"> · ≈ {jDate}</span> : null}</span> },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "search" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("nav_search")}</span>
      </button>

      <div className="grid lg:grid-cols-[340px_1fr] gap-6">
        {/* portrait column */}
        <div className="animate-rise">
          <div className="relative chip overflow-hidden border-2" style={{ borderColor: `${meta.c1}66`, boxShadow: `0 0 60px -18px ${meta.c1}aa` }}>
            <Avatar p={p} className="w-full h-auto" />
            <span className="absolute top-2.5 start-2.5"><DiffBadge diff={diff} /></span>
            <span
              className="absolute bottom-2.5 start-2.5 chip px-2.5 py-1 font-display text-[10px] tracking-[0.2em] uppercase"
              style={{
                background: `${RARITY_BG[rarityOf(p.pop)]}22`,
                border: `1px solid ${RARITY_BG[rarityOf(p.pop)]}66`,
                color: RARITY_BG[rarityOf(p.pop)],
              }}
            >
              {t(RARITY_KEY[rarityOf(p.pop)])}
            </span>
          </div>

          <div className="mt-4 flex gap-2.5">
            <button
              onClick={() => { toggleFav(p.id); }}
              className={`btn-game flex-1 px-4 py-3 text-xs ${fav ? "btn-coral" : "btn-ghost"}`}
            >
              <span className="flex items-center gap-2"><IcHeart size={15} filled={fav} /> {fav ? t("remove_fav") : t("add_fav")}</span>
            </button>
            <button
              onClick={() => { sfx.click(); go({ s: "game", mode: p.cat }); }}
              className="btn-game btn-primary flex-1 px-4 py-3 text-xs"
            >
              <span className="flex items-center gap-2"><IcPlay size={15} /> {t("play_cat")}</span>
            </button>
          </div>

          {/* fame meter */}
          <div className="mt-4 glass chip p-4">
            <div className="flex items-center justify-between">
              <span className="font-display text-[11px] tracking-widest text-ink-300 inline-flex items-center gap-1.5"><IcStar size={12} /> {t("popularity")}</span>
              <span className="font-display text-gold-400 text-sm" dir="ltr">{p.pop}/100</span>
            </div>
            <div className="h-2.5 rounded-full bg-ink-800 overflow-hidden border border-ink-700/60 mt-2.5">
              <div className="h-full rounded-full transition-all duration-700" style={{ width: `${p.pop}%`, background: `linear-gradient(90deg, ${meta.c2}, ${meta.c1})` }} />
            </div>
          </div>

          <p className="text-[10px] text-ink-500 mt-3 font-display tracking-wider" dir="ltr">
            {t("person_id")}: <span className="text-ink-400">{p.id}</span>
          </p>
        </div>

        {/* info column */}
        <div className="animate-rise" style={{ animationDelay: "100ms" }}>
          <p className="font-display text-[11px] tracking-[0.3em]" style={{ color: meta.c1 }}>{cat(p.cat).toUpperCase()}</p>
          <h1 className="font-display text-3xl sm:text-5xl text-ink-200 mt-1.5 leading-tight">{pname(p, lang)}</h1>
          {p.nfa && lang !== "fa" && <p className="text-ink-400 text-sm mt-1" dir="rtl">{p.nfa}</p>}
          {p.nar && lang !== "ar" && <p className="text-ink-400 text-sm mt-0.5" dir="rtl">{p.nar}</p>}

          <p className="text-ink-300 text-base sm:text-lg leading-relaxed mt-4 max-w-2xl">{bioOf(p, lang)}</p>

          {/* attribute rows */}
          <div className="mt-5 grid sm:grid-cols-2 gap-2.5 max-w-2xl">
            {rows.map((r, i) => (
              <div key={i} className="chip glass border-ink-600/40 px-3.5 py-2.5 flex items-center justify-between gap-3">
                <span className="text-[11px] font-display tracking-wider text-ink-400 uppercase">{r.label}</span>
                <span className="text-sm text-ink-200 font-semibold text-end">{r.value}</span>
              </div>
            ))}
          </div>

          {/* facts */}
          <div className="mt-6 max-w-2xl">
            <h2 className="font-display text-gold-400 text-lg">💡 {t("facts_title")}</h2>
            <ul className="mt-3 space-y-2">
              {facts.map((f, i) => (
                <li key={i} className="chip glass border-ink-600/40 px-4 py-2.5 text-sm text-ink-300 leading-relaxed animate-fade-up" style={{ animationDelay: `${i * 90}ms` }}>
                  <span className="text-mint-400 font-display me-2">▸</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* birthday twins */}
      {twins.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl text-ink-200">
            <span className="text-coral-400">▸</span> {t("twins_title")}
          </h2>
          <p className="text-ink-400 text-sm mt-1">{t("p_twins_sub")}</p>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {twins.map((tw, i) => <PersonCard key={tw.id} p={tw} delay={i * 60} />)}
          </div>
        </div>
      )}

      {/* related legends: compatriots + same arena */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="font-display text-2xl text-ink-200">
            <span className="text-mint-400">▸</span> {t("related")}
          </h2>
          <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {related.map((rp, i) => <PersonCard key={rp.id} p={rp} delay={i * 60} />)}
          </div>
        </div>
      )}
    </div>
  );
}

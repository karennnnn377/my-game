import { useMemo, useState } from "react";
import { PersonCard } from "../components/PersonCard";
import { IcBack, IcHeart, IcSearch, IcX } from "../components/ui";
import { CATS } from "../data/cats";
import { PEOPLE, haystack, eraOf, difficultyOf, type CatId } from "../data/people";
import { COUNTRIES, countryName } from "../data/nations";
import { ERA_KEYS } from "../data/people";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

const PAGE = 24;

export default function Search() {
  const { t, cat, go, lang, isFav } = useStore();
  const [q, setQ] = useState("");
  const [fCat, setFCat] = useState<"all" | CatId>("all");
  const [fDiff, setFDiff] = useState<number>(-1);
  const [fEra, setFEra] = useState<number>(-1);
  const [fCC, setFCC] = useState<string>("all");
  const [favOnly, setFavOnly] = useState(false);
  const [shown, setShown] = useState(PAGE);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const toks = needle ? needle.split(/\s+/) : [];
    return PEOPLE.filter((p) => {
      if (fCat !== "all" && p.cat !== fCat) return false;
      if (fDiff !== -1 && difficultyOf(p.pop) !== fDiff) return false;
      if (fEra !== -1 && eraOf(p.year) !== fEra) return false;
      if (fCC !== "all" && p.cc !== fCC) return false;
      if (favOnly && !isFav(p.id)) return false;
      if (toks.length) {
        const hay = haystack(p) + " " + countryName(p.cc, "en").toLowerCase();
        if (!toks.every((tk) => hay.includes(tk))) return false;
      }
      return true;
    }).sort((a, b) => b.pop - a.pop);
  }, [q, fCat, fDiff, fEra, fCC, favOnly, isFav]);

  const reset = () => {
    setQ(""); setFCat("all"); setFDiff(-1); setFEra(-1); setFCC("all"); setFavOnly(false); setShown(PAGE);
  };
  const hasFilters = q !== "" || fCat !== "all" || fDiff !== -1 || fEra !== -1 || fCC !== "all" || favOnly;

  const selCls = "chip glass border-ink-600/50 px-2.5 py-2.5 text-sm text-ink-200 bg-ink-900/60 focus:border-gold-500/60 outline-none cursor-pointer w-full";
  const usedCountries = useMemo(() => {
    const s = new Set<string>();
    PEOPLE.forEach((p) => { if (p.cc) s.add(p.cc); });
    return [...s].sort((a, b) => countryName(a, lang).localeCompare(countryName(b, lang)));
  }, [lang]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 sm:py-14 min-h-screen">
      <button className="btn-game btn-ghost px-4 py-2.5 text-xs mb-6" onClick={() => { sfx.click(); go({ s: "home" }); }}>
        <span className="flex items-center gap-2"><IcBack size={14} /> {t("back_home")}</span>
      </button>

      <h1 className="font-display text-3xl sm:text-5xl text-ink-200 animate-fade-up">
        <span className="text-mint-400">▸</span> <span className="inline-flex items-center gap-3">{t("search_title")} <IcSearch size={30} className="text-mint-400" /></span>
      </h1>
      <p className="text-ink-300 mt-3 max-w-2xl animate-fade-up" style={{ animationDelay: "80ms" }}>{t("search_sub")}</p>

      {/* search + filters */}
      <div className="mt-8 space-y-3 animate-fade-up" style={{ animationDelay: "140ms" }}>
        <div className="relative">
          <span className="absolute top-1/2 -translate-y-1/2 start-3.5 text-mint-400 pointer-events-none"><IcSearch size={18} /></span>
          <input
            value={q}
            onChange={(e) => { setQ(e.target.value); setShown(PAGE); }}
            placeholder={t("search_ph")}
            className="w-full chip glass border-ink-600/50 focus:border-mint-500/60 outline-none bg-ink-900/60 text-ink-200 ps-11 pe-10 py-3.5 text-base"
          />
          {q && (
            <button onClick={() => setQ("")} className="absolute top-1/2 -translate-y-1/2 end-3 text-ink-400 hover:text-coral-400 cursor-pointer" aria-label="clear">
              <IcX size={16} />
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2.5">
          <select className={selCls} value={fCat} onChange={(e) => { setFCat(e.target.value as "all" | CatId); setShown(PAGE); }}>
            <option value="all" className="bg-ink-900">{t("all_cats")}</option>
            {CATS.map((c) => <option key={c.id} value={c.id} className="bg-ink-900">{c.icon} {cat(c.id)}</option>)}
          </select>

          <select className={selCls} value={fCC} onChange={(e) => { setFCC(e.target.value); setShown(PAGE); }}>
            <option value="all" className="bg-ink-900">{t("nationality")}: {t("all_cats")}</option>
            {usedCountries.map((cc) => <option key={cc} value={cc} className="bg-ink-900">{countryName(cc, lang)} ({COUNTRIES[cc]?.[0] ?? cc})</option>)}
          </select>

          <select className={selCls} value={fDiff} onChange={(e) => { setFDiff(+e.target.value); setShown(PAGE); }}>
            <option value={-1} className="bg-ink-900">{t("difficulty")}: —</option>
            {[0, 1, 2, 3].map((d) => <option key={d} value={d} className="bg-ink-900">{t(`diff${d}`)}</option>)}
          </select>

          <select className={selCls} value={fEra} onChange={(e) => { setFEra(+e.target.value); setShown(PAGE); }}>
            <option value={-1} className="bg-ink-900">{t("all_eras")}</option>
            {ERA_KEYS.map((k, i) => <option key={k} value={i} className="bg-ink-900">{t(k)}</option>)}
          </select>

          <button
            onClick={() => { setFavOnly((v) => !v); setShown(PAGE); sfx.click(); }}
            className={`chip px-2.5 py-2.5 font-display text-xs inline-flex items-center justify-center gap-1.5 border cursor-pointer transition-all ${
              favOnly ? "bg-coral-500/20 text-coral-400 border-coral-500/60" : "glass text-ink-300 border-ink-600/50 hover:border-coral-500/50"
            }`}
          >
            <IcHeart size={14} filled={favOnly} /> {t("fav_only")}
          </button>
        </div>

        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-ink-400 text-sm font-display tracking-wider" dir="ltr">
            <span className="text-gold-400">{results.length}</span> {t("found")}
          </p>
          {hasFilters && (
            <button onClick={() => { reset(); sfx.click(); }} className="text-xs text-coral-400 hover:text-coral-300 font-display tracking-wider inline-flex items-center gap-1 cursor-pointer">
              <IcX size={12} /> {t("reset_filters")}
            </button>
          )}
        </div>
      </div>

      {/* results grid */}
      {results.length === 0 ? (
        <div className="mt-16 text-center animate-rise">
          <p className="text-5xl">🔍</p>
          <p className="font-display text-ink-300 mt-4">{t("no_results")}</p>
          <button className="btn-game btn-ghost px-5 py-2.5 text-xs mt-5" onClick={() => { reset(); sfx.click(); }}>
            {t("reset_filters")}
          </button>
        </div>
      ) : (
        <>
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3">
            {results.slice(0, shown).map((p, i) => (
              <PersonCard key={p.id} p={p} delay={Math.min((i % PAGE) * 30, 500)} />
            ))}
          </div>
          {shown < results.length && (
            <div className="mt-8 text-center">
              <button className="btn-game btn-mint px-6 py-3 text-sm" onClick={() => { setShown((s) => s + PAGE); sfx.click(); }}>
                <span className="flex items-center gap-2">{t("load_more")} <span dir="ltr" className="text-xs opacity-80">({results.length - shown})</span></span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

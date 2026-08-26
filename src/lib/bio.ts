/* ============================================================
   Auto-generated biography + facts.
   Turns a structured Person record into localized, human text
   in all three languages — so EVERY one of the 1,000+ records
   gets a unique card with real content, no hand-written bios
   needed. Curated facts can be layered on top later.
   ============================================================ */

import { tr, fmt, MONTHS, PROF, type Lang } from "../i18n";
import { pname, eraOf, ERA_KEYS, bornOn, BY_CAT, type Person } from "../data/people";
import { countryName } from "../data/nations";

const idx = { en: 0, fa: 1, ar: 2 } as const;

function yearStr(p: Person, lang: Lang): string {
  return p.year < 0 ? `${-p.year} ${tr(lang, "bc")}` : String(p.year);
}

function eraLabel(p: Person, lang: Lang): string {
  return tr(lang, ERA_KEYS[eraOf(p.year)]);
}

export function professionOf(p: Person, lang: Lang): string {
  const prof = PROF[p.cat];
  return prof ? prof[idx[lang]] : p.cat;
}

/** one-line localized biography */
export function bioOf(p: Person, lang: Lang): string {
  const vars: Record<string, string | number> = {
    name: pname(p, lang),
    prof: professionOf(p, lang),
    country: p.cc ? countryName(p.cc, lang) : "",
    month: MONTHS[lang][p.m - 1],
    day: p.d,
    year: yearStr(p, lang),
    era: eraLabel(p, lang),
  };
  return fmt(tr(lang, p.cc ? "bio_t" : "bio_t_noc"), vars);
}

/** 2–4 localized "fast facts" derived from the data itself */
export function factsOf(p: Person, lang: Lang): string[] {
  const out: string[] = [];
  const month = MONTHS[lang][p.m - 1];
  const vars = { day: p.d, month, year: yearStr(p, lang), era: eraLabel(p, lang) };

  // era fact
  out.push(fmt(tr(lang, "fact_born_year"), vars));

  // birthday-twin fact
  const twins = bornOn(p.m, p.d).filter((x) => x.id !== p.id);
  if (twins.length > 0) {
    out.push(fmt(tr(lang, "fact_twins"), { ...vars, n: twins.length }));
  } else {
    out.push(fmt(tr(lang, "fact_twins_none"), vars));
  }

  // country-cohort fact
  if (p.cc) {
    const compatriots = Object.values(BY_CAT)
      .flat()
      .filter((x) => x.cc === p.cc && x.id !== p.id).length;
    if (compatriots > 0) {
      out.push(
        fmt(tr(lang, "fact_country"), {
          n: compatriots,
          country: countryName(p.cc, lang),
        })
      );
    }
  }

  // fame-tier fact
  const tierKey = p.pop >= 90 ? "fame_top" : p.pop >= 76 ? "fame_high" : p.pop >= 60 ? "fame_mid" : "fame_low";
  out.push(fmt(tr(lang, "fact_fame"), { pop: p.pop, tier: tr(lang, tierKey) }));

  return out;
}

/** one-line fact shown right after answering a question */
export function revealFact(p: Person, lang: Lang): string {
  const f = factsOf(p, lang);
  return f[1] ?? f[0];
}

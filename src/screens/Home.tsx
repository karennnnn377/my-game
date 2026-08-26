import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../components/Avatar";
import { IcBolt, IcCake, IcCal, IcFlame, IcGrid, IcPlay, IcSearch, IcTrophy, IcUser } from "../components/ui";
import { CATS } from "../data/cats";
import { BY_CAT, PEOPLE, TOTAL, bornOn, type Person } from "../data/people";
import { CAT_NAMES } from "../i18n";
import { mulberry32 } from "../lib/engine";
import { sfx } from "../lib/audio";
import { useStore } from "../store";

const HERO_IDS = ["football:0", "actresses:18", "scientists:0", "singers:4", "iran:0", "historical:10", "rappers:0"];

function useTodayTwins(): Person[] {
  return useMemo(() => {
    const now = new Date();
    let list = bornOn(now.getMonth() + 1, now.getDate());
    if (list.length < 4) {
      const monthFolks = PEOPLE.filter((p) => p.m === now.getMonth() + 1);
      const rnd = mulberry32(now.getMonth() * 97 + 13);
      const extra = [...monthFolks].sort(() => rnd() - 0.5).slice(0, 6);
      list = [...list, ...extra.filter((e) => !list.some((l) => l.id === e.id))];
    }
    return list.slice(0, 6);
  }, []);
}

export default function Home() {
  const { t, cat, go, lang } = useStore();
  const twins = useTodayTwins();
  const [twinIdx, setTwinIdx] = useState(0);
  const [par, setPar] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const iv = setInterval(() => setTwinIdx((i) => i + 1), 3400);
    return () => clearInterval(iv);
  }, []);

  const heroPeople = useMemo(
    () => HERO_IDS.map((id) => PEOPLE.find((p) => p.id === id)).filter(Boolean) as Person[],
    []
  );
  const twin = twins[twinIdx % Math.max(1, twins.length)];

  const floaters = [
    { p: heroPeople[0], cls: "w-32 sm:w-40 top-2 start-0", rot: -7, d: 26, delay: "0s" },
    { p: heroPeople[1], cls: "w-28 sm:w-36 top-0 end-4", rot: 6, d: 16, delay: "0.8s" },
    { p: heroPeople[2], cls: "w-24 sm:w-32 top-40 end-0 sm:top-44", rot: 4, d: 34, delay: "1.6s" },
    { p: heroPeople[3], cls: "w-24 sm:w-28 bottom-24 start-2", rot: -4, d: 20, delay: "0.4s" },
    { p: heroPeople[5], cls: "w-20 sm:w-28 bottom-40 end-10", rot: 8, d: 12, delay: "2s" },
  ];

  const stats = [
    { v: `${TOTAL}+`, l: t("st_legends") },
    { v: "25", l: t("st_cats") },
    { v: "15", l: t("st_questions") },
    { v: "3", l: t("st_langs") },
  ];

  return (
    <div className="overflow-x-clip">
      {/* ============ HERO ============ */}
      <section
        className="relative max-w-7xl mx-auto px-4 pt-10 sm:pt-16 pb-14"
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setPar({ x: (e.clientX - r.left) / r.width - 0.5, y: (e.clientY - r.top) / r.height - 0.5 });
        }}
        onMouseLeave={() => setPar({ x: 0, y: 0 })}
      >
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-center">
          {/* left: the pitch */}
          <div className="relative z-10">
            <span className="chip inline-flex items-center gap-2 border border-mint-500/40 bg-mint-500/10 px-3 py-1.5 text-mint-400 font-display text-[11px] tracking-[0.22em] animate-fade-up">
              <IcBolt size={13} /> THE ULTIMATE FAME QUIZ ARENA
            </span>
            <h1 className="mt-5 leading-[0.95] animate-fade-up" style={{ animationDelay: "90ms" }}>
              <span className="block font-display text-4xl sm:text-6xl xl:text-7xl text-outline">GUESS YOUR</span>
              <span className="block font-display text-4xl sm:text-6xl xl:text-7xl shimmer-text mt-2">FAMOUS PEOPLE</span>
            </h1>
            <p className="mt-5 text-ink-300 text-base sm:text-xl max-w-xl animate-fade-up" style={{ animationDelay: "180ms" }}>
              {t("hero_sub")}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3 animate-fade-up" style={{ animationDelay: "260ms" }}>
              <button className="btn-game btn-primary px-7 py-4 text-base" onClick={() => { sfx.click(); go({ s: "game", mode: "mix" }); }}>
                <span className="flex items-center gap-2"><IcPlay size={18} /> {t("play_now")}</span>
              </button>
              <button className="btn-game btn-mint px-5 py-4 text-sm" onClick={() => { sfx.click(); go({ s: "cats" }); }}>
                <span className="flex items-center gap-2"><IcCake size={16} /> {t("birthdate_quiz")}</span>
              </button>
              <button className="btn-game btn-coral px-5 py-4 text-sm" onClick={() => { sfx.click(); go({ s: "game", mode: "daily" }); }}>
                <span className="flex items-center gap-2"><IcFlame size={16} /> {t("daily_challenge")}</span>
              </button>
            </div>
            <div className="mt-3 flex flex-wrap gap-3 animate-fade-up" style={{ animationDelay: "330ms" }}>
              <button className="btn-game btn-ghost px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "cats" }); }}>
                <span className="flex items-center gap-2"><IcGrid size={14} /> {t("categories_btn")}</span>
              </button>
              <button className="btn-game btn-ghost px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "lb" }); }}>
                <span className="flex items-center gap-2"><IcTrophy size={14} /> {t("leaderboard_btn")}</span>
              </button>
              <button className="btn-game btn-ghost px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "search" }); }}>
                <span className="flex items-center gap-2"><IcSearch size={14} /> {t("nav_search")}</span>
              </button>
              <button className="btn-game btn-ghost px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "bday" }); }}>
                <span className="flex items-center gap-2"><IcCal size={14} /> {t("nav_mybday")}</span>
              </button>
            </div>

            <div className="mt-10 grid grid-cols-4 gap-2 sm:gap-4 max-w-xl animate-fade-up" style={{ animationDelay: "400ms" }}>
              {stats.map((s, i) => (
                <div key={i} className="chip glass px-2 py-3 text-center hover:border-gold-500/40 transition-colors">
                  <p className="font-display text-lg sm:text-2xl text-gold-400" dir="ltr">{s.v}</p>
                  <p className="text-[10px] sm:text-xs text-ink-300 mt-1">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* right: floating legends + born-today spotlight */}
          <div className="relative h-[380px] sm:h-[460px] hidden md:block" aria-hidden>
            {floaters.map(
              (f, i) =>
                f.p && (
                  <div
                    key={i}
                    className={`absolute ${f.cls} animate-float`}
                    style={{
                      ["--rot" as string]: `${f.rot}deg`,
                      animationDelay: f.delay,
                      transform: `translate3d(${par.x * f.d}px, ${par.y * f.d}px, 0)`,
                      zIndex: 5,
                    }}
                  >
                    <div className="chip overflow-hidden border border-ink-600/60 shadow-[0_18px_50px_-12px_rgba(0,0,0,0.7)]" style={{ transform: `rotate(${f.rot}deg)` }}>
                      <Avatar p={f.p} className="w-full h-auto" emblem={false} />
                    </div>
                  </div>
                )
            )}
            {/* spotlight */}
            {twin && (
              <div className="absolute bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 z-20 w-64">
                <div key={twin.id} className="glass chip p-3 border-gold-500/40 animate-rise shadow-[0_0_50px_-10px_rgba(255,180,0,0.35)]">
                  <p className="font-display text-[10px] tracking-[0.25em] text-mint-400 flex items-center gap-1.5">
                    <IcCake size={12} /> {t("born_today").toUpperCase()}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <div className="chip overflow-hidden w-16 h-16 shrink-0">
                      <Avatar p={twin} emblem={false} className="w-full h-full" />
                    </div>
                    <div>
                      <p className="font-display text-sm text-gold-400 leading-tight">{twin.name}</p>
                      <p className="text-[11px] text-ink-300 mt-0.5">{CATS.find((c) => c.id === twin.cat)?.icon} {cat(twin.cat)}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 mt-2.5">
                    {twins.map((_, i) => (
                      <span key={i} className={`h-1 flex-1 rounded-full transition-colors ${i === twinIdx % twins.length ? "bg-gold-500" : "bg-ink-700"}`} />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <p className="text-center mt-12 font-display text-[10px] tracking-[0.4em] text-ink-400 animate-blink">{t("scroll_hint")}</p>
      </section>

      {/* ============ MARQUEE ============ */}
      <div className="relative border-y border-ink-700/50 bg-ink-900/70 py-3 overflow-hidden" dir="ltr">
        <div className="flex whitespace-nowrap animate-marquee w-max">
          {[0, 1].map((k) => (
            <span key={k} className="flex items-center">
              {CATS.map((c) => (
                <span key={c.id} className="flex items-center gap-2 mx-4 font-display text-xs text-ink-300">
                  <span>{c.icon}</span> {CAT_NAMES[c.id][lang === "en" ? 0 : lang === "fa" ? 1 : 2]}
                  <span className="text-gold-500 ms-4">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ============ HOW TO PLAY ============ */}
      <section className="max-w-6xl mx-auto px-4 py-16 sm:py-24">
        <h2 className="font-display text-2xl sm:text-4xl text-ink-200">
          <span className="text-gold-400">▸</span> {t("how_title")}
        </h2>
        <div className="mt-10 grid md:grid-cols-3 gap-0 relative">
          <div className="hidden md:block absolute top-8 start-[16%] end-[16%] h-px bg-gradient-to-r from-gold-500/60 via-mint-500/50 to-coral-500/60" />
          {(["how1", "how2", "how3"] as const).map((k, i) => (
            <div key={k} className={`relative p-5 group animate-fade-up ${i === 1 ? "md:-translate-y-4" : ""}`} style={{ animationDelay: `${i * 140}ms` }}>
              <span className="font-display text-5xl sm:text-6xl text-ink-700 group-hover:text-gold-500/40 transition-colors" dir="ltr">0{i + 1}</span>
              <div className="chip glass p-5 mt-3 card-3d border-ink-600/40 group-hover:border-gold-500/40">
                <h3 className="font-display text-gold-400">{t(`${k}_t`)}</h3>
                <p className="text-ink-300 text-sm mt-2 leading-relaxed">{t(`${k}_d`)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CATEGORIES ============ */}
      <section className="max-w-7xl mx-auto px-4 pb-16 sm:pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-4xl text-ink-200">
              <span className="text-mint-400">▸</span> {t("all_cats_title")}
            </h2>
            <p className="text-ink-300 mt-2 max-w-xl text-sm sm:text-base">{t("all_cats_sub")}</p>
          </div>
          <button className="btn-game btn-ghost px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "cats" }); }}>
            <span className="flex items-center gap-2"><IcGrid size={14} /> {t("see_all")}</span>
          </button>
        </div>
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {CATS.slice(0, 10).map((c, i) => (
            <button
              key={c.id}
              onClick={() => { sfx.click(); go({ s: "game", mode: c.id }); }}
              className="group chip glass card-3d p-4 text-start border-ink-600/40 cursor-pointer animate-fade-up"
              style={{ animationDelay: `${i * 60}ms`, ["--gc" as string]: c.c1 }}
              onMouseEnter={() => sfx.hover()}
            >
              <div className="flex items-center justify-between">
                <span className="text-2xl transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-6">{c.icon}</span>
                <span className="font-display text-[10px] text-ink-400" dir="ltr">{BY_CAT[c.id].length}</span>
              </div>
              <p className="font-display text-sm mt-3 text-ink-200 group-hover:text-[var(--gc)] transition-colors">{cat(c.id)}</p>
              <div className="h-1 rounded-full mt-2 w-8 group-hover:w-full transition-all duration-500" style={{ background: c.c1 }} />
            </button>
          ))}
        </div>
      </section>

      {/* ============ LEADERBOARD TEASER ============ */}
      <section className="max-w-6xl mx-auto px-4 pb-16 sm:pb-24">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <h2 className="font-display text-2xl sm:text-4xl text-ink-200">
              <span className="text-coral-400">▸</span> {t("lb_teaser")}
            </h2>
            <p className="text-ink-300 mt-2 text-sm sm:text-base">{t("lb_teaser_sub")}</p>
          </div>
          <button className="btn-game btn-ghost px-5 py-3 text-xs" onClick={() => { sfx.click(); go({ s: "lb" }); }}>
            <span className="flex items-center gap-2"><IcTrophy size={14} /> {t("view_full")}</span>
          </button>
        </div>
        <LbPodium />
      </section>

      {/* ============ FINAL CTA ============ */}
      <section className="max-w-5xl mx-auto px-4 pb-20">
        <div className="relative glass chip overflow-hidden p-8 sm:p-12 text-center scanlines">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-gold-500 via-coral-500 to-mint-500" />
          <h2 className="font-display text-2xl sm:text-4xl shimmer-text">{t("cta_title")}</h2>
          <p className="text-ink-300 mt-3">{t("cta_sub")}</p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button className="btn-game btn-primary px-8 py-4" onClick={() => { sfx.click(); go({ s: "game", mode: "mix" }); }}>
              <span className="flex items-center gap-2"><IcPlay size={18} /> {t("play_now")}</span>
            </button>
            <button className="btn-game btn-ghost px-6 py-4" onClick={() => { sfx.click(); go({ s: "profile" }); }}>
              <span className="flex items-center gap-2"><IcUser size={16} /> {t("nav_profile")}</span>
            </button>
          </div>
          <div className="mt-6 flex justify-center gap-2 text-lg" aria-hidden>
            {["⚽", "🎬", "🎵", "🧠", "👑", "🇮🇷", "🚀", "🥊"].map((e, i) => (
              <span key={i} className="animate-float inline-block" style={{ animationDelay: `${i * 0.3}s`, ["--rot" as string]: "0deg" }}>{e}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

function LbPodium() {
  const { lbRows, lang, profile } = useStore();
  const top = lbRows("global").slice(0, 3);
  const order = [1, 0, 2];
  const heights = ["h-24", "h-32", "h-20"];
  const medals = ["🥈", "🥇", "🥉"];
  const colors = ["#c3cde8", "#ffd97a", "#ff9aa6"];
  return (
    <div className="mt-8 flex items-end justify-center gap-3 sm:gap-6">
      {order.map((pos, i) => {
        const r = top[pos];
        if (!r) return null;
        return (
          <div key={pos} className="text-center w-28 sm:w-36 animate-fade-up" style={{ animationDelay: `${i * 130}ms` }}>
            <span className="text-2xl sm:text-3xl">{medals[pos]}</span>
            <p className="font-display text-xs sm:text-sm mt-1 truncate" style={{ color: colors[pos] }}>{r.you ? profile.name + " ★" : r.name}</p>
            <p className="text-ink-300 text-xs" dir="ltr">{r.score}</p>
            <div className={`${heights[pos]} mt-2 chip glass border-t-2 flex items-start justify-center pt-2`} style={{ borderColor: colors[pos] }}>
              <span className="font-display text-lg" style={{ color: colors[pos] }} dir="ltr">{pos + 1}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

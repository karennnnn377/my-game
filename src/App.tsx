import React, { Suspense, useMemo } from "react";
import { AmbientBG, ConfettiLayer } from "./components/fx";
import { IcCake, IcCal, IcGear, IcGrid, IcPlay, IcSearch, IcSound, IcTrophy, IcUser, Logo, LogoMark } from "./components/ui";
import { LANGS } from "./i18n";
import { sfx } from "./lib/audio";
import { StoreProvider, useStore } from "./store";

const Home = React.lazy(() => import("./screens/Home"));
const Categories = React.lazy(() => import("./screens/Categories"));
const Game = React.lazy(() => import("./screens/Game"));
const Leaderboard = React.lazy(() => import("./screens/Leaderboard"));
const Profile = React.lazy(() => import("./screens/Profile"));
const Search = React.lazy(() => import("./screens/Search"));
const Person = React.lazy(() => import("./screens/Person"));
const Birthday = React.lazy(() => import("./screens/Birthday"));
const Settings = React.lazy(() => import("./screens/Settings"));

function LangSwitch() {
  const { lang, setLang } = useStore();
  return (
    <div className="flex items-center gap-1 chip glass border-ink-600/50 p-1">
      {LANGS.map((l) => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          title={l.label}
          className={`px-2 py-1 chip font-display text-[11px] transition-all cursor-pointer ${
            lang === l.id ? "bg-gold-500 text-ink-950 shadow-[0_0_16px_-4px_rgba(255,180,0,0.7)]" : "text-ink-300 hover:text-gold-400"
          }`}
        >
          <span className="flex items-center gap-1"><span>{l.flag}</span><span className="hidden sm:inline">{l.id.toUpperCase()}</span></span>
        </button>
      ))}
    </div>
  );
}

function SoundBtn() {
  const { sound, toggleSound, t } = useStore();
  return (
    <button
      onClick={toggleSound}
      title={t("sound")}
      className={`chip glass border-ink-600/50 p-2 transition-all cursor-pointer hover:border-gold-500/50 ${sound ? "text-mint-400" : "text-ink-400"}`}
    >
      <IcSound on={sound} size={17} />
    </button>
  );
}

function Nav() {
  const { t, go, screen } = useStore();
  const links = [
    { id: "play", icon: <IcPlay size={15} />, label: t("nav_play"), s: { s: "game", mode: "mix" } as const, active: screen.s === "game" },
    { id: "cats", icon: <IcGrid size={15} />, label: t("nav_cats"), s: { s: "cats" } as const, active: screen.s === "cats" },
    { id: "search", icon: <IcSearch size={15} />, label: t("nav_search"), s: { s: "search" } as const, active: screen.s === "search" || screen.s === "person" },
    { id: "lb", icon: <IcTrophy size={15} />, label: t("nav_lb"), s: { s: "lb" } as const, active: screen.s === "lb" },
    { id: "profile", icon: <IcUser size={15} />, label: t("nav_profile"), s: { s: "profile" } as const, active: screen.s === "profile" },
  ];
  return (
    <header className="sticky top-0 z-40 glass border-b border-ink-700/50">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 sm:gap-4">
        <Logo onClick={() => { sfx.click(); go({ s: "home" }); }} />
        <nav className="ms-auto flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => { sfx.click(); go(l.s); }}
              className={`chip px-2 sm:px-3.5 py-2 font-display text-[11px] sm:text-xs tracking-wide transition-all cursor-pointer border ${
                l.active ? "bg-gold-500/15 text-gold-400 border-gold-500/50" : "text-ink-300 border-transparent hover:text-gold-400 hover:border-gold-500/30"
              }`}
            >
              <span className="flex items-center gap-1.5">{l.icon}<span className="hidden lg:inline">{l.label}</span></span>
            </button>
          ))}
          <button
            onClick={() => { sfx.click(); go({ s: "game", mode: "daily" }); }}
            className={`chip px-2 sm:px-3.5 py-2 font-display text-[11px] sm:text-xs tracking-wide transition-all cursor-pointer border ${
              screen.s === "game" ? "text-ink-300 border-transparent hover:text-coral-400" : "text-coral-400 border-coral-500/40 bg-coral-500/10 hover:bg-coral-500/20"
            }`}
          >
            <span className="flex items-center gap-1.5"><IcCake size={15} /><span className="hidden lg:inline">{t("nav_daily")}</span></span>
          </button>
          <button
            onClick={() => { sfx.click(); go({ s: "bday" }); }}
            title={t("nav_mybday")}
            className={`chip px-2 sm:px-2.5 py-2 font-display text-[11px] sm:text-xs transition-all cursor-pointer border ${
              screen.s === "bday" ? "text-mint-400 border-mint-500/50 bg-mint-500/10" : "text-ink-300 border-transparent hover:text-mint-400 hover:border-mint-500/30"
            }`}
          >
            <span className="flex items-center gap-1.5"><IcCal size={15} /><span className="hidden lg:inline">{t("nav_mybday")}</span></span>
          </button>
          <button
            onClick={() => { sfx.click(); go({ s: "set" }); }}
            title={t("nav_settings")}
            className={`chip glass border-ink-600/50 p-2 transition-all cursor-pointer hover:border-gold-500/50 ${screen.s === "set" ? "text-gold-400" : "text-ink-400"}`}
          >
            <IcGear size={16} />
          </button>
          <span className="w-px h-6 bg-ink-700 mx-0.5 hidden sm:block" />
          <LangSwitch />
          <SoundBtn />
        </nav>
      </div>
    </header>
  );
}

function Toasts() {
  const { toasts } = useStore();
  return (
    <div className="fixed bottom-4 start-4 z-50 space-y-2 pointer-events-none">
      {toasts.map((tt) => (
        <div key={tt.id} className="glass chip border border-gold-500/50 px-4 py-2.5 flex items-center gap-2.5 animate-rise shadow-[0_10px_40px_-10px_rgba(255,180,0,0.4)]">
          <span className="text-xl">{tt.icon}</span>
          <span className="font-display text-xs text-gold-400">{tt.title}</span>
        </div>
      ))}
    </div>
  );
}

function Loader() {
  const { t } = useStore();
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
      <span className="animate-pulse-glow inline-block"><LogoMark size={64} /></span>
      <p className="font-display text-xs tracking-[0.3em] text-ink-400 animate-blink">{t("loading")}</p>
    </div>
  );
}

function Footer() {
  const { t, go } = useStore();
  return (
    <footer className="border-t border-ink-800 bg-ink-950/80 mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <Logo onClick={() => go({ s: "home" })} />
          <p className="text-ink-400 text-sm mt-4 leading-relaxed max-w-xs">{t("footer_tag")}</p>
        </div>
        <div>
          <p className="font-display text-xs tracking-[0.25em] text-mint-400">{t("footer_modes")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { l: t("play_now"), f: () => go({ s: "game", mode: "mix" }) },
              { l: t("daily_challenge"), f: () => go({ s: "game", mode: "daily" }) },
              { l: t("birthdate_quiz"), f: () => go({ s: "cats" }) },
              { l: t("nav_mybday"), f: () => go({ s: "bday" }) },
            ].map((x, i) => (
              <li key={i}>
                <button className="text-ink-300 hover:text-gold-400 transition-colors cursor-pointer" onClick={() => { sfx.click(); x.f(); }}>▸ {x.l}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-xs tracking-[0.25em] text-mint-400">{t("footer_links")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              { l: t("nav_search"), f: () => go({ s: "search" }) },
              { l: t("nav_cats"), f: () => go({ s: "cats" }) },
              { l: t("nav_lb"), f: () => go({ s: "lb" }) },
              { l: t("nav_profile"), f: () => go({ s: "profile" }) },
              { l: t("nav_settings"), f: () => go({ s: "set" }) },
            ].map((x, i) => (
              <li key={i}>
                <button className="text-ink-300 hover:text-gold-400 transition-colors cursor-pointer" onClick={() => { sfx.click(); x.f(); }}>▸ {x.l}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-800/80">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-2 text-[11px] text-ink-400">
          <span className="font-display tracking-wider">© 2026 GUESS YOUR FAMOUS PEOPLE</span>
          <span className="max-w-md text-center sm:text-end">{t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}

function Shell() {
  const { screen } = useStore();
  const inGame = screen.s === "game";
  const key = useMemo(() => {
    if (screen.s === "game") return `game-${screen.mode}-${screen.n ?? 0}`;
    if (screen.s === "person") return `person-${screen.id}`;
    return screen.s;
  }, [screen]);
  return (
    <div className="min-h-screen flex flex-col">
      <AmbientBG />
      <ConfettiLayer />
      {!inGame && <Nav />}
      <main className="flex-1">
        <Suspense fallback={<Loader />}>
          <div key={key} className={inGame ? "" : "animate-fade-up"}>
            {screen.s === "home" && <Home />}
            {screen.s === "cats" && <Categories />}
            {screen.s === "game" && <Game mode={screen.mode} />}
            {screen.s === "lb" && <Leaderboard />}
            {screen.s === "profile" && <Profile />}
            {screen.s === "search" && <Search />}
            {screen.s === "person" && <Person id={screen.id} />}
            {screen.s === "bday" && <Birthday />}
            {screen.s === "set" && <Settings />}
          </div>
        </Suspense>
      </main>
      {!inGame && <Footer />}
      <Toasts />
    </div>
  );
}

export default function App() {
  return (
    <StoreProvider>
      <Shell />
    </StoreProvider>
  );
}

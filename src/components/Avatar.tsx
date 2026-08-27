import { memo, useMemo } from "react";
import type { Person } from "../data/people";
import { CAT_MAP } from "../data/cats";
import { hashStr, mulberry32 } from "../lib/engine";

/* ============================================================
   Procedural premium portrait engine.
   Every person gets a deterministic, original, copyright-safe
   collectible-style portrait with:
   · category-specific visual theme (motif + palette variant)
   · diverse skin tones, hair styles & accessories
   · cinematic 3-point lighting (key, rim, under-glow)
   · floating particles + signature monogram
   ============================================================ */

type Theme = {
  group: "sport" | "film" | "music" | "stem" | "space" | "history" | "art" | "play" | "iran" | "world";
  bgs: [string, string, string][]; // palette variants: [top, mid, bottom]
};

const THEME: Record<string, Theme> = {
  football: { group: "sport", bgs: [["#052e1b", "#0d5c36", "#0a2318"], ["#04263a", "#0b5c4b", "#071c17"], ["#123a08", "#3f7a12", "#0c1f06"]] },
  basketball: { group: "sport", bgs: [["#3a1206", "#a34a12", "#1f0a04"], ["#33140a", "#c2601a", "#180a05"]] },
  tennis: { group: "sport", bgs: [["#1c2f06", "#6f9b12", "#101a05"], ["#0a2c2c", "#1f8f7a", "#061818"]] },
  racing: { group: "sport", bgs: [["#2b060c", "#8f1226", "#15040a"], ["#1c0a04", "#c25512", "#100503"]] },
  boxing: { group: "sport", bgs: [["#33060c", "#9e1230", "#190409"], ["#201204", "#8f6a12", "#120a03"]] },
  athletes: { group: "sport", bgs: [["#2e2405", "#a8880f", "#171204"], ["#05242e", "#0f7d8f", "#041317"]] },
  actors: { group: "film", bgs: [["#2e1e05", "#b07a0f", "#171004"], ["#240528", "#7d0f8f", "#130416"]] },
  actresses: { group: "film", bgs: [["#2e0520", "#b00f6e", "#170411"], ["#28101c", "#c25a8f", "#150810"]] },
  tv: { group: "film", bgs: [["#240528", "#8f0fa8", "#120415"], ["#1e2405", "#93a80f", "#101304"]] },
  comedians: { group: "film", bgs: [["#2e2405", "#c2a012", "#171204"], ["#2e0a05", "#c25a12", "#170805"]] },
  singers: { group: "music", bgs: [["#05202e", "#0f7fc2", "#041117"], ["#20052e", "#7f0fc2", "#110417"]] },
  musicians: { group: "music", bgs: [["#2e0a05", "#c25412", "#170804"], ["#0a052e", "#4a12c2", "#070417"]] },
  rappers: { group: "music", bgs: [["#17052e", "#6a12c2", "#0c0417"], ["#04142e", "#126ac2", "#030a17"]] },
  scientists: { group: "stem", bgs: [["#04182e", "#0f5ac2", "#030d17"], ["#04262e", "#0fb2c2", "#031417"]] },
  tech: { group: "stem", bgs: [["#04262a", "#0fc2b2", "#031416"], ["#0a2e0e", "#12c24a", "#06170a"]] },
  entrepreneurs: { group: "stem", bgs: [["#2e2004", "#c29412", "#171003"], ["#10242e", "#1288c2", "#081317"]] },
  astronauts: { group: "space", bgs: [["#050a2e", "#2612c2", "#030617"], ["#14052e", "#5a12c2", "#0a0317"]] },
  historical: { group: "history", bgs: [["#2e1c04", "#b28212", "#170f03"], ["#260404", "#8f3a12", "#140403"]] },
  leaders: { group: "history", bgs: [["#042033", "#1275b2", "#031019"], ["#2e0a14", "#b21252", "#170509"]] },
  artists: { group: "art", bgs: [["#2e0518", "#c21268", "#17040d"], ["#052e22", "#12c288", "#041712"]] },
  writers: { group: "art", bgs: [["#142e05", "#5ac212", "#0b1704"], ["#2e2a05", "#b2a212", "#171504"]] },
  gaming: { group: "play", bgs: [["#17052e", "#8812c2", "#0c0417"], ["#042e1c", "#12c276", "#041710"]] },
  internet: { group: "play", bgs: [["#052e12", "#12c252", "#04170a"], ["#2e0526", "#c2129c", "#170414"]] },
  iran: { group: "iran", bgs: [["#02201c", "#0f8f7d", "#021211"], ["#03242e", "#0f8fb2", "#02131a"], ["#1c2403", "#7d8f0f", "#101402"]] },
  world: { group: "world", bgs: [["#042033", "#1275b2", "#031019"], ["#2e2004", "#b29412", "#171003"]] },
};

/* skin diversity: [light, shade] */
const SKINS: [string, string][] = [
  ["#f6d7b8", "#c99a72"], ["#eec39a", "#b57f56"], ["#dfa878", "#9c6a44"], ["#c98a5b", "#8a5636"],
  ["#b06f45", "#74452a"], ["#94552f", "#5e351d"], ["#7a4526", "#4b2a16"], ["#5e3419", "#38200f"],
  ["#f2c9a8", "#bf8f66"], ["#e2b28a", "#a6764e"],
];

function hexA(hex: string, a: number) {
  const h = hex.replace("#", "");
  return `rgba(${parseInt(h.slice(0, 2), 16)},${parseInt(h.slice(2, 4), 16)},${parseInt(h.slice(4, 6), 16)},${a})`;
}

interface Props {
  p: Person;
  className?: string;
  emblem?: boolean;
}

export const Avatar = memo(function Avatar({ p, className, emblem = true }: Props) {
  const art = useMemo(() => {
    const rnd = mulberry32(hashStr(p.id));
    const meta = CAT_MAP[p.cat];
    const theme = THEME[p.cat] ?? THEME.world;
    const bg = theme.bgs[Math.floor(rnd() * theme.bgs.length)];
    const gid = `av${hashStr(p.id)}`;
    const skin = SKINS[Math.floor(rnd() * SKINS.length)];
    const hair = Math.floor(rnd() * 8);
    const rimLeft = rnd() < 0.5;
    const glasses = rnd() < 0.28;
    const beard = rnd() < 0.3;
    const keyX = 60 + rnd() * 80;
    const hairColor = ["#1c1410", "#2c1c10", "#3a2614", "#141014", "#5a4426", "#7a6240", "#9c8656", "#b8a678"][Math.floor(rnd() * 8)];
    const particles = Array.from({ length: 10 }, () => ({
      x: 8 + rnd() * 184, y: 8 + rnd() * 120, r: 0.7 + rnd() * 1.8, o: 0.2 + rnd() * 0.5,
    }));
    const initial = p.name.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
    return { meta, theme, bg, gid, skin, hair, rimLeft, glasses, beard, keyX, hairColor, particles, initial };
  }, [p]);

  const { meta, theme, bg, gid, skin, hair, rimLeft, glasses, beard, keyX, hairColor, particles, initial } = art;
  const [c1, c2, c3] = meta ? [meta.c1, meta.c2, meta.c1] : ["#ffb400", "#a35b00", "#ffb400"];
  const accent = theme.group === "iran" ? "#4dffb0" : c1;
  const rimX = rimLeft ? -1 : 1;

  /* ---------- category motif layers ---------- */
  const motif = () => {
    switch (theme.group) {
      case "sport":
        return (
          <g opacity="0.32">
            <circle cx="100" cy="70" r="56" fill="none" stroke={accent} strokeWidth="1.4" />
            <path d="M44 70h112" stroke={accent} strokeWidth="1" opacity="0.7" />
            <path d="M150 0 L200 50 M166 0 L200 34 M134 0 L200 66" stroke={accent} strokeWidth="2" opacity="0.5" />
          </g>
        );
      case "film":
        return (
          <g opacity="0.34">
            {[10, 32, 54, 76, 98, 120, 142, 164, 186, 208].map((y) => (
              <rect key={`l${y}`} x="4" y={y} width="7" height="12" rx="2" fill={accent} opacity="0.55" />
            ))}
            {[10, 32, 54, 76, 98, 120, 142, 164, 186, 208].map((y) => (
              <rect key={`r${y}`} x="189" y={y} width="7" height="12" rx="2" fill={accent} opacity="0.55" />
            ))}
            <path d="M100 -10 L160 90 L40 90 Z" fill={hexA(accent, 0.08)} />
          </g>
        );
      case "music":
        return (
          <g opacity="0.4">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
              <rect key={i} x={12 + i * 15.4} y={150 - ((i * 37) % 46)} width="6" height={20 + ((i * 37) % 46)} rx="3" fill={accent} opacity={0.3 + ((i * 13) % 10) / 22} />
            ))}
            <circle cx="166" cy="40" r="7" fill="none" stroke={accent} strokeWidth="1.6" />
            <path d="M173 40 V16 l10 -3 v8" stroke={accent} strokeWidth="1.6" fill="none" />
          </g>
        );
      case "stem":
        return (
          <g opacity="0.34">
            <ellipse cx="100" cy="72" rx="62" ry="20" fill="none" stroke={accent} strokeWidth="1.1" transform="rotate(-24 100 72)" />
            <ellipse cx="100" cy="72" rx="62" ry="20" fill="none" stroke={accent} strokeWidth="1.1" transform="rotate(24 100 72)" />
            <circle cx="100" cy="72" r="4.5" fill={accent} />
            {[0, 1, 2].map((i) => (
              <path key={i} d={`M${20 + i * 62} 190 v-24 h22 v-18 h18`} fill="none" stroke={accent} strokeWidth="1.2" opacity="0.6" />
            ))}
          </g>
        );
      case "space":
        return (
          <g opacity="0.5">
            {Array.from({ length: 22 }, (_, i) => (
              <circle key={i} cx={8 + ((i * 53) % 184)} cy={6 + ((i * 31) % 110)} r={(i % 3) * 0.5 + 0.6} fill="#cfe4ff" opacity={0.3 + (i % 4) * 0.14} />
            ))}
            <circle cx="158" cy="46" r="17" fill={hexA(accent, 0.35)} />
            <ellipse cx="158" cy="46" rx="30" ry="8" fill="none" stroke={accent} strokeWidth="1.4" transform="rotate(-16 158 46)" />
            <path d="M30 130 q14 -34 44 -40" fill="none" stroke={accent} strokeWidth="1.2" strokeDasharray="3 5" opacity="0.7" />
          </g>
        );
      case "history":
        return (
          <g opacity="0.36">
            <path d="M62 118 a40 40 0 0 1 -8 -52 M138 118 a40 40 0 0 0 8 -52" fill="none" stroke={accent} strokeWidth="2.4" strokeLinecap="round" />
            {[0, 1, 2].map((i) => (
              <g key={i} transform={`translate(${52 + i * 10} ${96 - i * 14})`}>
                <ellipse rx="6" ry="2.6" fill={accent} opacity="0.75" transform="rotate(-38)" />
              </g>
            ))}
            {[0, 1, 2].map((i) => (
              <g key={`b${i}`} transform={`translate(${148 - i * 10} ${96 - i * 14})`}>
                <ellipse rx="6" ry="2.6" fill={accent} opacity="0.75" transform="rotate(38)" />
              </g>
            ))}
            {Array.from({ length: 9 }, (_, i) => (
              <path key={`s${i}`} d={`M100 26 L${100 + Math.cos((i / 9) * Math.PI * 2) * 92} ${26 + Math.sin((i / 9) * Math.PI * 2) * 92}`} stroke={accent} strokeWidth="0.7" opacity="0.25" />
            ))}
          </g>
        );
      case "art":
        return (
          <g opacity="0.4">
            <circle cx="34" cy="42" r="13" fill={hexA(accent, 0.4)} />
            <circle cx="168" cy="66" r="9" fill={hexA("#ff6b7e", 0.4)} />
            <circle cx="150" cy="26" r="6" fill={hexA("#3fe3d6", 0.45)} />
            <path d="M20 150 q40 -26 80 -8 t80 -12" fill="none" stroke={accent} strokeWidth="3" strokeLinecap="round" opacity="0.55" />
            <path d="M30 170 q50 -20 100 -6" fill="none" stroke="#3fe3d6" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          </g>
        );
      case "play":
        return (
          <g opacity="0.38">
            {[0, 1, 2].map((r) => [0, 1, 2].map((cc) => (
              <rect key={`${r}${cc}`} x={10 + cc * 9} y={20 + r * 9} width="6" height="6" fill={accent} opacity={(r + cc) % 2 ? 0.7 : 0.3} />
            )))}
            <rect x="164" y="20" width="26" height="26" rx="6" fill="none" stroke={accent} strokeWidth="1.6" />
            <path d="M173 27 v12 l11 -6 Z" fill={accent} />
            <path d="M14 140 a40 40 0 0 1 26 -38 M14 122 a22 22 0 0 1 15 -21" fill="none" stroke={accent} strokeWidth="1.6" opacity="0.6" />
          </g>
        );
      case "iran":
        return (
          <g opacity="0.42">
            {/* eight-point khatam star */}
            <g transform="translate(100 62)" stroke={accent} strokeWidth="1.3" fill="none">
              <rect x="-26" y="-26" width="52" height="52" />
              <rect x="-26" y="-26" width="52" height="52" transform="rotate(45)" />
              <circle r="12" />
            </g>
            {/* tile lattice corners */}
            {[0, 1, 2, 3].map((i) => (
              <g key={i} transform={`translate(${i < 2 ? 16 : 184} ${i % 2 ? 16 : 188}) rotate(45)`}>
                <rect x="-9" y="-9" width="18" height="18" fill="none" stroke={accent} strokeWidth="1.1" opacity="0.7" />
                <rect x="-4" y="-4" width="8" height="8" fill={hexA(accent, 0.5)} />
              </g>
            ))}
            <path d="M0 200 q50 -30 100 0 t100 0" fill="none" stroke={accent} strokeWidth="1.2" opacity="0.5" />
          </g>
        );
      case "world":
        return (
          <g opacity="0.34">
            <circle cx="100" cy="70" r="54" fill="none" stroke={accent} strokeWidth="1.2" />
            <ellipse cx="100" cy="70" rx="54" ry="22" fill="none" stroke={accent} strokeWidth="0.9" />
            <ellipse cx="100" cy="70" rx="22" ry="54" fill="none" stroke={accent} strokeWidth="0.9" />
            <path d="M46 70h108" stroke={accent} strokeWidth="0.9" />
          </g>
        );
    }
  };

  /* ---------- hair variants ---------- */
  const hairShape = () => {
    const c = hairColor;
    switch (hair) {
      case 0: return null; /* shaved */
      case 1: return <path d="M72 62 q28 -26 56 0 q2 -14 -8 -22 q-20 -14 -40 0 q-10 8 -8 22Z" fill={c} />;
      case 2: return <path d="M70 66 q10 -24 30 -24 t30 24 q4 -20 -10 -30 q-20 -12 -40 0 q-14 10 -10 30Z" fill={c} />;
      case 3: return <path d="M68 84 q-6 -42 32 -46 t32 46 q6 -34 -14 -44 q-18 -9 -36 0 q-20 10 -14 44Z" fill={c} />;
      case 4: /* long */ return (
        <g fill={c}>
          <path d="M66 128 q-10 -70 34 -74 t34 74 q2 -18 -2 -30 q-4 8 -10 10 q6 -26 -6 -38 q-16 -14 -32 0 q-12 12 -6 38 q-6 -2 -10 -10 q-4 12 -2 30Z" />
        </g>
      );
      case 5: /* curly */ return (
        <g fill={c}>
          <circle cx="78" cy="48" r="9" /><circle cx="92" cy="42" r="10" /><circle cx="108" cy="42" r="10" />
          <circle cx="122" cy="48" r="9" /><circle cx="72" cy="60" r="7" /><circle cx="128" cy="60" r="7" />
        </g>
      );
      case 6: /* bun */ return (
        <g fill={c}>
          <path d="M72 60 q28 -24 56 0 q2 -14 -8 -21 q-20 -13 -40 0 q-10 7 -8 21Z" />
          <circle cx="100" cy="30" r="9" />
        </g>
      );
      default: /* side part */ return <path d="M70 64 q6 -24 30 -24 q26 0 30 24 q0 -16 -8 -22 q-4 -4 -12 -4 l-6 6 q-18 -2 -26 8 q-6 6 -8 12Z" fill={c} />;
    }
  };

  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={p.name} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${gid}bg`} x1="0" y1="0" x2="0.35" y2="1">
          <stop offset="0%" stopColor={bg[0]} />
          <stop offset="55%" stopColor={bg[1]} />
          <stop offset="100%" stopColor={bg[2]} />
        </linearGradient>
        <radialGradient id={`${gid}key`} cx="50%" cy="42%" r="58%">
          <stop offset="0%" stopColor={hexA(accent, 0.4)} />
          <stop offset="100%" stopColor={hexA(accent, 0)} />
        </radialGradient>
        <linearGradient id={`${gid}body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2c3a63" />
          <stop offset="40%" stopColor="#141d3d" />
          <stop offset="100%" stopColor="#070b18" />
        </linearGradient>
        <linearGradient id={`${gid}rim`} x1={rimLeft ? "0" : "1"} y1="0" x2={rimLeft ? "1" : "0"} y2="0.25">
          <stop offset="0%" stopColor={hexA(accent, 0.95)} />
          <stop offset="62%" stopColor={hexA(accent, 0)} />
        </linearGradient>
        <radialGradient id={`${gid}vig`} cx="50%" cy="46%" r="72%">
          <stop offset="62%" stopColor="rgba(0,0,0,0)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.5)" />
        </radialGradient>
      </defs>

      <rect width="200" height="220" fill={`url(#${gid}bg)`} />
      <circle cx={keyX} cy="66" r="92" fill={`url(#${gid}key)`} />
      {motif()}
      {particles.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={accent} opacity={s.o} />
      ))}

      {/* bust */}
      <g>
        <path d="M100 46 a29 31 0 1 1 -0.1 0 Z" fill={skin[0]} />
        <path d="M100 46 a29 31 0 0 1 0 62 a29 31 0 0 0 0 -62Z" fill={hexA(skin[1], 0.55)} transform="translate(3 0)" opacity="0.7" />
        {hairShape()}
        {beard && <path d="M80 92 q20 20 40 0 q-2 14 -12 18 q-8 3 -16 0 q-10 -4 -12 -18Z" fill={hexA(hairColor, 0.85)} />}
        {glasses && (
          <g stroke="#0c1226" strokeWidth="2.4" fill="none" opacity="0.85">
            <circle cx="88" cy="72" r="8" fill="rgba(12,18,38,0.35)" />
            <circle cx="112" cy="72" r="8" fill="rgba(12,18,38,0.35)" />
            <path d="M96 72h8M80 72l-6-2M120 72l6-2" />
          </g>
        )}
        {/* body */}
        <path d="M34 220 C40 168 62 146 100 142 C138 146 160 168 166 220 Z" fill={`url(#${gid}body)`} />
        <path d="M88 128 h24 v16 a12 8 0 0 1 -24 0 Z" fill={skin[1]} />
        {/* collar accent */}
        <path d="M70 152 q30 16 60 0 l6 10 q-36 18 -72 0 Z" fill={hexA(accent, 0.5)} />
        {/* rim light */}
        <path d="M100 46 a29 31 0 1 1 -0.1 0 Z" fill="none" stroke={`url(#${gid}rim)`} strokeWidth="3.2" transform={`translate(${rimX * -2.5} -1)`} opacity="0.95" />
        <path d="M34 220 C40 168 62 146 100 142 C138 146 160 168 166 220" fill="none" stroke={`url(#${gid}rim)`} strokeWidth="3" transform={`translate(${rimX * -2} 0)`} opacity="0.8" />
        {/* head halo crescent */}
        <path d={`M ${100 + rimX * 18} 52 a 26 28 0 0 ${rimLeft ? 0 : 1} ${rimX * 6} 34`} fill="none" stroke={accent} strokeWidth="2" opacity="0.5" strokeLinecap="round" />
      </g>

      {/* under-glow + horizon */}
      <rect x="0" y="206" width="200" height="14" fill={hexA(accent, 0.22)} />
      <rect x="0" y="214" width="200" height="6" fill="#05080f" opacity="0.65" />
      <rect width="200" height="220" fill={`url(#${gid}vig)`} />

      {/* monogram */}
      <text x={rimLeft ? 188 : 12} y="202" textAnchor={rimLeft ? "end" : "start"} fontFamily="'Bungee','Vazirmatn',sans-serif" fontSize="16" fill={hexA(accent, 0.9)}>
        {initial}
      </text>

      {emblem && (
        <g>
          <rect x="8" y="8" width="34" height="24" rx="6" fill="rgba(5,8,15,0.75)" stroke={hexA(accent, 0.4)} strokeWidth="1" />
          <text x="25" y="26" textAnchor="middle" fontSize="15">{meta.icon}</text>
        </g>
      )}
    </svg>
  );
});

import { memo, useMemo } from "react";
import type { Person } from "../data/people";
import { CAT_MAP } from "../data/cats";
import { hashStr, mulberry32 } from "../lib/engine";

/* Procedural premium portrait — deterministic per person, original artwork, copyright-safe. */

function hexToRgb(hex: string) {
  const h = hex.replace("#", "");
  return { r: parseInt(h.slice(0, 2), 16), g: parseInt(h.slice(2, 4), 16), b: parseInt(h.slice(4, 6), 16) };
}
function withA(hex: string, a: number) {
  const { r, g, b } = hexToRgb(hex);
  return `rgba(${r},${g},${b},${a})`;
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
    const c1 = meta.c1;
    const c2 = meta.c2;
    const gid = `g${hashStr(p.id)}`;
    const rimLeft = rnd() < 0.5;
    const glowX = 70 + rnd() * 60;
    const glowY = 50 + rnd() * 40;
    const rings = [
      { r: 52 + rnd() * 14, o: 0.25 + rnd() * 0.2, dash: rnd() < 0.5 },
      { r: 74 + rnd() * 16, o: 0.14 + rnd() * 0.14, dash: rnd() < 0.6 },
      { r: 96 + rnd() * 20, o: 0.08 + rnd() * 0.1, dash: true },
    ];
    const stars = Array.from({ length: 9 }, () => ({
      x: 8 + rnd() * 184,
      y: 6 + rnd() * 90,
      r: 0.7 + rnd() * 1.6,
      o: 0.25 + rnd() * 0.6,
    }));
    const stripes = rnd() < 0.5;
    const initial = p.name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
    return { c1, c2, gid, rimLeft, glowX, glowY, rings, stars, stripes, initial, meta };
  }, [p]);

  const { c1, c2, gid, rimLeft, glowX, glowY, rings, stars, stripes, initial, meta } = art;
  const rimX = rimLeft ? -1 : 1;

  return (
    <svg viewBox="0 0 200 220" className={className} role="img" aria-label={p.name} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`${gid}bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0d1630" />
          <stop offset="55%" stopColor={withA(c2, 0.85)} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
        <radialGradient id={`${gid}glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={withA(c1, 0.55)} />
          <stop offset="100%" stopColor={withA(c1, 0)} />
        </radialGradient>
        <linearGradient id={`${gid}body`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#233055" />
          <stop offset="45%" stopColor="#101a38" />
          <stop offset="100%" stopColor="#070b18" />
        </linearGradient>
        <linearGradient id={`${gid}rim`} x1={rimLeft ? "0" : "1"} y1="0" x2={rimLeft ? "1" : "0"} y2="0.2">
          <stop offset="0%" stopColor={withA(c1, 0.95)} />
          <stop offset="60%" stopColor={withA(c1, 0)} />
        </linearGradient>
      </defs>

      <rect width="200" height="220" fill={`url(#${gid}bg)`} />
      <circle cx={glowX} cy={glowY + 30} r="95" fill={`url(#${gid}glow)`} />

      {stripes && (
        <g opacity="0.16" stroke={c1} strokeWidth="2">
          <path d="M140 0 L200 60" />
          <path d="M156 0 L200 44" />
          <path d="M172 0 L200 28" />
        </g>
      )}
      {!stripes && (
        <g fill={c1} opacity="0.18">
          {Array.from({ length: 4 }, (_, i) => (
            <circle key={i} cx={168} cy={26 + i * 14} r="3" />
          ))}
        </g>
      )}

      {rings.map((r, i) => (
        <circle
          key={i}
          cx="100"
          cy="86"
          r={r.r}
          fill="none"
          stroke={c1}
          strokeOpacity={r.o}
          strokeWidth={i === 0 ? 1.6 : 1}
          strokeDasharray={r.dash ? "3 7" : undefined}
        />
      ))}

      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={c1} opacity={s.o} />
      ))}

      {/* bust silhouette */}
      <g>
        <path
          d="M100 46 a29 31 0 1 1 -0.1 0 Z"
          fill={`url(#${gid}body)`}
        />
        <path
          d="M34 220 C40 168 62 146 100 142 C138 146 160 168 166 220 Z"
          fill={`url(#${gid}body)`}
        />
        {/* neck */}
        <path d="M88 128 h24 v16 a12 8 0 0 1 -24 0 Z" fill="#101a38" />
        {/* rim light */}
        <path
          d="M100 46 a29 31 0 1 1 -0.1 0 Z"
          fill="none"
          stroke={`url(#${gid}rim)`}
          strokeWidth="3.4"
          transform={`translate(${rimX * -2.5} -1)`}
          opacity="0.9"
        />
        <path
          d="M34 220 C40 168 62 146 100 142 C138 146 160 168 166 220"
          fill="none"
          stroke={`url(#${gid}rim)`}
          strokeWidth="3"
          transform={`translate(${rimX * -2} 0)`}
          opacity="0.75"
        />
        {/* head halo crescent */}
        <path
          d={`M ${100 + rimX * 18} 52 a 26 28 0 0 ${rimLeft ? 0 : 1} ${rimX * 6} 34`}
          fill="none"
          stroke={c1}
          strokeWidth="2"
          opacity="0.5"
          strokeLinecap="round"
        />
      </g>

      {/* horizon */}
      <rect x="0" y="212" width="200" height="8" fill={withA(c1, 0.28)} />
      <rect x="0" y="216" width="200" height="4" fill="#060a17" opacity="0.6" />

      {/* monogram */}
      <text
        x={rimLeft ? 186 : 14}
        y="204"
        textAnchor={rimLeft ? "end" : "start"}
        fontFamily="'Bungee','Vazirmatn',sans-serif"
        fontSize="17"
        fill={withA(c1, 0.9)}
      >
        {initial}
      </text>

      {emblem && (
        <g>
          <rect x="8" y="8" width="34" height="24" rx="6" fill="#060a17" opacity="0.72" />
          <text x="25" y="26" textAnchor="middle" fontSize="15">
            {meta.icon}
          </text>
        </g>
      )}
    </svg>
  );
});

import React from "react";
import { useStore } from "../store";
import { sfx } from "../lib/audio";

/* ---------- brand logo ---------- */

export function LogoMark({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" aria-hidden>
      <path d="M32 2 58 17v30L32 62 6 47V17Z" fill="#FFB400" />
      <path d="M32 7.5 53.5 20v24L32 56.5 10.5 44V20Z" fill="#0A1124" />
      <path d="M32 2 58 17v30L32 62 6 47V17Z" fill="none" stroke="#FFD97A" strokeOpacity="0.5" strokeWidth="1.4" />
      <text x="32" y="44" textAnchor="middle" fontFamily="'Bungee',sans-serif" fontSize="30" fill="#FFC94D">
        ?
      </text>
      <circle cx="46" cy="14" r="2.4" fill="#3FE3D6" />
      <circle cx="18" cy="50" r="1.8" fill="#FF4D64" />
    </svg>
  );
}

export function Logo({ onClick, compact = false }: { onClick?: () => void; compact?: boolean }) {
  const { t } = useStore();
  return (
    <button onClick={onClick} className="flex items-center gap-2.5 group cursor-pointer select-none shrink-0" aria-label="Guess Your Famous People">
      <span className="transition-transform duration-300 group-hover:rotate-[18deg] group-hover:scale-110 inline-flex">
        <LogoMark size={compact ? 30 : 36} />
      </span>
      {!compact && (
        <span className="text-start leading-none hidden min-[430px]:block">
          <span className="block font-display text-[10px] tracking-[0.32em] text-mint-400">GUESS YOUR</span>
          <span className="block font-display text-base sm:text-lg text-gold-400 leading-tight">{t("brand_sub")}</span>
        </span>
      )}
    </button>
  );
}

/* ---------- inline SVG icons ---------- */

type IcProps = { size?: number; className?: string };
const S = ({ size = 18, className, children, vb = "0 0 24 24" }: IcProps & { children: React.ReactNode; vb?: string }) => (
  <svg width={size} height={size} viewBox={vb} fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
    {children}
  </svg>
);

export const IcPlay = (p: IcProps) => <S {...p}><path d="M7 4.5v15l13-7.5Z" fill="currentColor" stroke="none" /></S>;
export const IcCake = (p: IcProps) => <S {...p}><path d="M4 21v-8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8" /><path d="M4 17c1.5 1.2 3 1.2 4.5 0s3-1.2 4.5 0 3 1.2 4.5 0 2.5-.8 2.5-.8" /><path d="M12 11V7" /><path d="M12 4.5c.8-.7.8-1.8 0-2.5-.8.7-.8 1.8 0 2.5Z" fill="currentColor" /></S>;
export const IcBolt = (p: IcProps) => <S {...p}><path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" fill="currentColor" stroke="none" /></S>;
export const IcGrid = (p: IcProps) => <S {...p}><rect x="3" y="3" width="7" height="7" rx="1.4" /><rect x="14" y="3" width="7" height="7" rx="1.4" /><rect x="3" y="14" width="7" height="7" rx="1.4" /><rect x="14" y="14" width="7" height="7" rx="1.4" /></S>;
export const IcTrophy = (p: IcProps) => <S {...p}><path d="M8 4h8v5a4 4 0 0 1-8 0Z" /><path d="M8 5H4.5a0 0 0 0 0 0 0c0 3 1.5 5 3.5 5.4" /><path d="M16 5h3.5c0 3-1.5 5-3.5 5.4" /><path d="M12 13v3.5" /><path d="M8 21h8l-1-4.5h-6Z" /></S>;
export const IcUser = (p: IcProps) => <S {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21c.8-4 4-6 8-6s7.2 2 8 6" /></S>;
export const IcGlobe = (p: IcProps) => <S {...p}><circle cx="12" cy="12" r="9" /><path d="M3 12h18" /><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18" /></S>;
export const IcFlame = (p: IcProps) => <S {...p}><path d="M12 22c4 0 7-2.7 7-6.7 0-3-2-5-3.5-6.8C14 6.6 13 4.5 13 2c-3 2-5 5-5 8 0 .8.2 1.6.5 2.3C7.6 11.6 7 10.8 6.6 10 5.6 11.3 5 13.4 5 15.3 5 19.3 8 22 12 22Z" fill="currentColor" stroke="none" /></S>;
export const IcTarget = (p: IcProps) => <S {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1.4" fill="currentColor" /></S>;
export const IcSound = ({ on, ...p }: IcProps & { on: boolean }) =>
  on ? (
    <S {...p}><path d="M4 9v6h4l5 4V5L8 9Z" fill="currentColor" stroke="none" /><path d="M16.5 8.5a5 5 0 0 1 0 7" /><path d="M19 6a8.5 8.5 0 0 1 0 12" /></S>
  ) : (
    <S {...p}><path d="M4 9v6h4l5 4V5L8 9Z" fill="currentColor" stroke="none" /><path d="m17 9 5 6" /><path d="m22 9-5 6" /></S>
  );
export const IcStar = (p: IcProps) => <S {...p}><path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9Z" fill="currentColor" stroke="none" /></S>;
export const IcBack = (p: IcProps) => (
  <S {...p}><path d="M19 12H5" /><path d="m11 18-6-6 6-6" /></S>
);
export const IcCheck = (p: IcProps) => <S {...p}><path d="m4.5 12.5 5 5L19.5 6.5" /></S>;
export const IcX = (p: IcProps) => <S {...p}><path d="m6 6 12 12" /><path d="m18 6-12 12" /></S>;
export const IcEdit = (p: IcProps) => <S {...p}><path d="M4 20h4L19.5 8.5a2.1 2.1 0 0 0-3-3L5 17Z" /><path d="m14 7 3 3" /></S>;

/* ---------- difficulty ---------- */

export const DIFF_STYLE = [
  { cls: "bg-good-500/15 text-good-400 border-good-500/40", bar: "#22e584" },
  { cls: "bg-gold-500/15 text-gold-400 border-gold-500/40", bar: "#ffb400" },
  { cls: "bg-coral-500/15 text-coral-400 border-coral-500/40", bar: "#ff6b7e" },
  { cls: "bg-[#c084fc]/15 text-[#d8b4fe] border-[#c084fc]/40", bar: "#c084fc" },
];

export function DiffBadge({ diff }: { diff: number }) {
  const { t } = useStore();
  return (
    <span className={`chip inline-flex items-center gap-1 border px-2 py-0.5 font-display text-[10px] uppercase tracking-wider ${DIFF_STYLE[diff].cls}`}>
      <IcBolt size={11} />
      {t(`diff${diff}`)}
    </span>
  );
}

export function ClickableBtn(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return <button {...props} onClick={(e) => { sfx.click(); props.onClick?.(e); }} />;
}

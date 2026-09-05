import { useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import { fxBus } from "../store";

const PALETTE = ["#ffb400", "#3fe3d6", "#ff4d64", "#60a5fa", "#c084fc", "#ffd97a"];

/* Drifting starfield + ambient glows behind everything */
export function AmbientBG() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    let w = 0, h = 0, raf = 0;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    interface Dot { x: number; y: number; r: number; s: number; c: string; tw: number; ph: number }
    let dots: Dot[] = [];

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      cv.width = w * DPR;
      cv.height = h * DPR;
      cv.style.width = w + "px";
      cv.style.height = h + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(90, Math.floor((w * h) / 16000));
      dots = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.6 + Math.random() * 1.9,
        s: 0.12 + Math.random() * 0.4,
        c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
        tw: 0.5 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
      }));
    };

    let t = 0;
    const tick = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.y -= d.s;
        d.x += Math.sin(t * 0.6 + d.ph) * 0.14;
        if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
        const a = 0.25 + 0.5 * (0.5 + 0.5 * Math.sin(t * d.tw + d.ph));
        ctx.globalAlpha = a;
        ctx.fillStyle = d.c;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    tick();
    window.addEventListener("resize", resize);
    const vis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(tick);
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", vis);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      {/* deep base */}
      <div className="absolute inset-0 bg-[radial-gradient(1200px_700px_at_85%_-10%,#1b2a56_0%,transparent_60%),radial-gradient(900px_600px_at_-10%_110%,#123043_0%,transparent_55%),linear-gradient(180deg,#060a17_0%,#0a1124_55%,#070b18_100%)]" />
      <div className="absolute inset-0 grid-bg opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      {/* brand glows */}
      <div className="absolute -top-32 start-[-10%] w-[46rem] h-[46rem] rounded-full bg-gold-500/[0.07] blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-[-20%] end-[-12%] w-[42rem] h-[42rem] rounded-full bg-mint-500/[0.08] blur-3xl animate-pulse-glow [animation-delay:1.3s]" />
      <div className="absolute top-1/3 end-1/4 w-72 h-72 rounded-full bg-coral-500/[0.06] blur-3xl" />
      <canvas ref={ref} className="absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(4,7,16,0.75)_100%)]" />
    </div>
  );
}

/* Confetti layer wired to the fx bus */
export function ConfettiLayer() {
  useEffect(() => {
    return fxBus.on((e) => {
      if (e.type !== "confetti") return;
      if (e.power === "small") {
        confetti({ particleCount: 60, spread: 75, origin: { y: 0.55 }, colors: PALETTE, scalar: 0.85, ticks: 140 });
      } else {
        const fire = (angle: number, origin: { x: number; y: number }) =>
          confetti({ particleCount: 90, angle, spread: 62, startVelocity: 52, origin, colors: PALETTE, ticks: 200, scalar: 1.05 });
        fire(60, { x: 0, y: 0.7 });
        fire(120, { x: 1, y: 0.7 });
        setTimeout(() => fire(90, { x: 0.5, y: 0.9 }), 250);
        setTimeout(() => {
          fire(60, { x: 0, y: 0.6 });
          fire(120, { x: 1, y: 0.6 });
        }, 650);
      }
    });
  }, []);
  return null;
}

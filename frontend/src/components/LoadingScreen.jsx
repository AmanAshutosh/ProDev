"use client";
import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─── Label pool for each variant ─────────────────────────── */
const LABELS = [
  "INITIALIZING",
  "BUILDING",
  "PREPARING",
  "LOADING",
  "COMPILING",
];
const SUBS = [
  "PRODEV STUDIO",
  "DEVELOPER PLATFORM",
  "CAREER ENGINE",
  "CODE LAB",
  "SKILL FORGE",
];

/* ─── Easing functions ────────────────────────────────────── */
function easeOutExpo(t) {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
}
function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

const EASERS = [
  easeOutExpo,
  easeInOutCubic,
  easeOutCubic,
  easeOutExpo,
  easeInOutCubic,
];

/* ─── Variant 0 — "Precision" ─────────────────────────────── */
/* Huge centered white number, thin purple bar growing at bottom */
function V0({ count, label, sub }) {
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: "#07060f" }}
    >
      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(91,82,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(91,82,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 0.35, y: 0 }}
        className="absolute top-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.35em] uppercase"
        style={{ color: "#8b7fff" }}
      >
        {label}
      </motion.p>

      {/* Main number */}
      <div className="relative select-none" style={{ perspective: "600px" }}>
        <motion.span
          key={count}
          className="block font-extrabold font-display text-white leading-none tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            textShadow:
              "0 0 120px rgba(91,82,255,0.5), 0 20px 60px rgba(0,0,0,0.8)",
          }}
        >
          {String(count).padStart(2, "0")}
        </motion.span>
        <span
          className="absolute -bottom-2 -right-6 font-display font-black"
          style={{
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            color: "rgba(139,127,255,0.7)",
          }}
        >
          %
        </span>
      </div>

      {/* Sub text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.22 }}
        transition={{ delay: 0.3 }}
        className="font-mono text-[9px] tracking-[0.55em] uppercase mt-8"
        style={{ color: "#ffffff" }}
      >
        {sub}
      </motion.p>

      {/* Bottom progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: "rgba(91,82,255,0.12)" }}
      >
        <motion.div
          className="h-full"
          style={{
            width: `${count}%`,
            background: "linear-gradient(90deg, #5b52ff, #9b7aea)",
            boxShadow: "0 0 16px rgba(139,127,255,0.8)",
          }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </div>
  );
}

/* ─── Variant 1 — "Terminal" ──────────────────────────────── */
/* Bottom-left mono number, teal, scanlines, blinking cursor */
function V1({ count, label }) {
  const [blink, setBlink] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="absolute inset-0 flex flex-col justify-end p-10 md:p-16"
      style={{ background: "#030d0b" }}
    >
      {/* Scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.28) 2px, rgba(0,0,0,0.28) 4px)",
          zIndex: 2,
        }}
      />

      {/* Horizontal moving scan */}
      <motion.div
        className="absolute left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(13,148,136,0.6), transparent)",
          zIndex: 3,
        }}
        animate={{ top: ["0%", "100%", "0%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Corner label */}
      <p
        className="absolute top-10 left-10 font-mono text-[10px] tracking-widest"
        style={{ color: "rgba(13,148,136,0.5)" }}
      >
        {label}
      </p>

      {/* Number */}
      <div className="relative z-10 leading-none select-none">
        <span
          className="font-mono"
          style={{
            fontSize: "clamp(5rem, 18vw, 16rem)",
            color: "#0d9488",
            textShadow: "0 0 40px rgba(13,148,136,0.5)",
          }}
        >
          &gt;_{String(count).padStart(2, "0")}
        </span>
        <span
          style={{
            fontSize: "clamp(2rem, 6vw, 5rem)",
            color: "rgba(13,148,136,0.6)",
            fontFamily: "monospace",
          }}
        >
          %
        </span>
        <span
          style={{
            display: "inline-block",
            width: "0.55em",
            height: "1em",
            background: blink ? "#0d9488" : "transparent",
            marginLeft: "4px",
            verticalAlign: "middle",
            transition: "background 0.05s",
          }}
        />
      </div>

      {/* Bottom rule */}
      <div
        className="relative z-10 mt-4 h-px w-full"
        style={{ background: "rgba(13,148,136,0.3)" }}
      />
    </div>
  );
}

/* ─── Variant 2 — "Theatrical" ────────────────────────────── */
/* Split: number fills from bottom using clip-path, rose accent */
function V2({ count, label, sub }) {
  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: "#0f0308" }}
    >
      {/* Center divider */}
      <div
        className="absolute left-0 right-0 top-1/2 h-px"
        style={{ background: "rgba(244,63,94,0.20)" }}
      />

      {/* Number — unfilled (outline) */}
      <div className="absolute inset-0 flex items-center justify-center select-none">
        <span
          className="font-extrabold font-display leading-none tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            WebkitTextStroke: "1px rgba(244,63,94,0.18)",
            color: "transparent",
          }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Number — filled from bottom via clip-path */}
      <div
        className="absolute inset-0 flex items-center justify-center select-none"
        style={{
          clipPath: `inset(${100 - count}% 0 0 0)`,
          transition: "clip-path 0.08s linear",
        }}
      >
        <span
          className="font-extrabold font-display leading-none tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            color: "#f43f5e",
            textShadow: "0 0 80px rgba(244,63,94,0.60)",
          }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Labels */}
      <div
        className="absolute top-10 left-10 font-mono text-[10px] tracking-[0.4em] uppercase"
        style={{ color: "rgba(244,63,94,0.45)" }}
      >
        {label}
      </div>
      <div
        className="absolute bottom-10 right-10 font-mono text-[9px] tracking-[0.5em] uppercase"
        style={{ color: "rgba(244,63,94,0.30)" }}
      >
        {sub}
      </div>

      {/* % symbol */}
      <div
        className="absolute bottom-10 left-10 font-display font-black text-4xl"
        style={{ color: "rgba(244,63,94,0.5)" }}
      >
        %
      </div>
    </div>
  );
}

/* ─── Variant 3 — "Corner" ────────────────────────────────── */
/* Number top-right, vertical progress line on right edge, amber */
function V3({ count, label }) {
  return (
    <div
      className="absolute inset-0 flex items-end p-10 md:p-16"
      style={{ background: "#0c0800" }}
    >
      {/* Diagonal lines background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, rgba(245,158,11,1) 0px, rgba(245,158,11,1) 1px, transparent 1px, transparent 40px)",
        }}
      />

      {/* Top-right number */}
      <div className="absolute top-8 right-10 text-right select-none">
        <div
          className="font-display font-black tabular-nums leading-none"
          style={{
            fontSize: "clamp(5rem, 15vw, 13rem)",
            color: "#f59e0b",
            textShadow: "0 0 60px rgba(245,158,11,0.45)",
          }}
        >
          {String(count).padStart(2, "0")}
          <span
            style={{
              fontSize: "0.25em",
              verticalAlign: "super",
              color: "rgba(245,158,11,0.65)",
            }}
          >
            %
          </span>
        </div>
      </div>

      {/* Vertical right-edge progress bar */}
      <div
        className="absolute right-0 top-0 bottom-0 w-[3px]"
        style={{ background: "rgba(245,158,11,0.08)" }}
      >
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: `${count}%`,
            background: "linear-gradient(0deg, #f59e0b, rgba(245,158,11,0.3))",
            boxShadow: "0 0 14px rgba(245,158,11,0.7)",
          }}
          transition={{ duration: 0.05 }}
        />
      </div>

      {/* Bottom label */}
      <motion.p
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 0.35, x: 0 }}
        transition={{ delay: 0.2 }}
        className="font-mono text-[10px] tracking-[0.45em] uppercase"
        style={{ color: "#f59e0b" }}
      >
        {label}
      </motion.p>

      {/* Horizontal bottom bar indicator */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "rgba(245,158,11,0.08)" }}
      >
        <motion.div
          style={{
            width: `${count}%`,
            height: "100%",
            background: "#f59e0b",
            boxShadow: "0 0 12px rgba(245,158,11,0.7)",
          }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </div>
  );
}

/* ─── Variant 4 — "Glitch" ────────────────────────────────── */
/* Number with RGB split layers, diagonal wipe, indigo */
function V4({ count, label }) {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ background: "#040212" }}
    >
      {/* Noise dots */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(99,102,241,1) 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />

      {/* Diagonal wipe overlay */}
      <motion.div
        className="absolute inset-y-0 pointer-events-none"
        style={{
          width: "200%",
          background:
            "linear-gradient(105deg, transparent 40%, rgba(99,102,241,0.06) 50%, transparent 60%)",
        }}
        animate={{ x: ["-60%", "60%"] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
      />

      {/* RGB split — red layer */}
      <div
        className="absolute select-none"
        style={{ transform: "translate(-3px, 0)", mixBlendMode: "screen" }}
      >
        <span
          className="font-extrabold font-display leading-none tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            color: "rgba(255,30,30,0.25)",
          }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* RGB split — cyan layer */}
      <div
        className="absolute select-none"
        style={{ transform: "translate(3px, 0)", mixBlendMode: "screen" }}
      >
        <span
          className="font-extrabold font-display leading-none tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            color: "rgba(30,255,255,0.20)",
          }}
        >
          {String(count).padStart(2, "0")}
        </span>
      </div>

      {/* Main number */}
      <div className="relative z-10 select-none">
        <span
          className="font-extrabold font-display leading-none tabular-nums"
          style={{
            fontSize: "clamp(7rem, 22vw, 20rem)",
            color: "#818cf8",
            textShadow: "0 0 80px rgba(99,102,241,0.65)",
          }}
        >
          {String(count).padStart(2, "0")}
        </span>
        <span
          style={{
            fontSize: "clamp(1.8rem, 5vw, 4rem)",
            color: "rgba(129,140,248,0.55)",
            verticalAlign: "super",
          }}
        >
          %
        </span>
      </div>

      {/* Label */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.45em] uppercase"
        style={{ color: "rgba(99,102,241,0.45)" }}
      >
        {label}
      </div>

      {/* Bottom progress */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px]"
        style={{ background: "rgba(99,102,241,0.10)" }}
      >
        <motion.div
          style={{
            width: `${count}%`,
            height: "100%",
            background: "linear-gradient(90deg, #6366f1, #818cf8)",
            boxShadow: "0 0 14px rgba(99,102,241,0.8)",
          }}
          transition={{ duration: 0.05 }}
        />
      </div>
    </div>
  );
}

/* ─── Main component ──────────────────────────────────────── */
const SCREENS = [V0, V1, V2, V3, V4];

export default function LoadingScreen({ variant = 0, onComplete }) {
  const [count, setCount] = useState(0);
  const label = LABELS[variant % LABELS.length];
  const sub = SUBS[variant % SUBS.length];
  const Screen = SCREENS[variant % SCREENS.length];

  useEffect(() => {
    // Different speed per variant: some rush, some ease, some stutter
    const baseDuration = 1600 + variant * 140;
    const easer = EASERS[variant % EASERS.length];
    const start = performance.now();

    let raf;
    const tick = (now) => {
      const t = Math.min((now - start) / baseDuration, 1);
      const eased = easer(t);
      const nextCount = Math.floor(eased * 100);
      setCount(nextCount);

      if (t < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setTimeout(onComplete, 380);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{
        opacity: 0,
        transition: { duration: 0.45, ease: [0.76, 0, 0.24, 1] },
      }}
    >
      <Screen count={count} label={label} sub={sub} />
    </motion.div>
  );
}

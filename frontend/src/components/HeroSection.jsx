"use client";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useCallback } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import TransitionLink from "./TransitionLink";

const LETTERS = "ProDev".split("");

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } },
};

const letterVar = {
  hidden: { y: 50, opacity: 0, scale: 0.88 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 65, damping: 14 },
  },
};

const fadeUp = (delay = 0) => ({
  hidden: { y: 32, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
});

/* 8-layer stepped extrusion — bottom-right, light from top-left */
const EXTRUDE = [
  "rgba(138,126,255,0.95)",
  "rgba(116,104,245,0.88)",
  "rgba(95,84,228,0.80)",
  "rgba(76,66,210,0.70)",
  "rgba(58,50,190,0.60)",
  "rgba(42,34,168,0.50)",
  "rgba(20,16,130,0.38)",
  "rgba(0,0,0,0.30)",
];
const EXTRUDE_SHADOW = EXTRUDE.map(
  (c, i) => `${i + 1}px ${i + 1}px 0 ${c}`,
).join(", ");
const TEXT_3D_SHADOW = `${EXTRUDE_SHADOW}, 10px 10px 6px rgba(0,0,0,0.38), 14px 14px 22px rgba(0,0,0,0.26), 0 0 100px rgba(91,82,255,0.52), 0 0 45px rgba(91,82,255,0.32)`;

const PARTICLES = [
  {
    top: "12%",
    left: "7%",
    size: 3,
    dur: 8,
    del: 0,
    color: "rgba(91,82,255,0.75)",
  },
  {
    top: "25%",
    left: "93%",
    size: 2,
    dur: 12,
    del: 2,
    color: "rgba(13,148,136,0.65)",
  },
  {
    top: "68%",
    left: "4%",
    size: 4,
    dur: 10,
    del: 1,
    color: "rgba(91,82,255,0.55)",
  },
  {
    top: "78%",
    left: "89%",
    size: 2,
    dur: 14,
    del: 3,
    color: "rgba(244,63,94,0.65)",
  },
  {
    top: "38%",
    left: "18%",
    size: 3,
    dur: 9,
    del: 5,
    color: "rgba(99,102,241,0.65)",
  },
  {
    top: "85%",
    left: "52%",
    size: 2,
    dur: 11,
    del: 0.5,
    color: "rgba(13,148,136,0.55)",
  },
];

export default function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 60,
    damping: 28,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 60,
    damping: 28,
  });

  const handleMouseMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
      mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    },
    [mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "#07060f" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated dot grid */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* Primary ambient glow — centered behind heading, breathes */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 1.1, 1], opacity: [0.65, 1, 0.65] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: "72vw",
          height: "52vw",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          background:
            "radial-gradient(ellipse at center, rgba(91,82,255,0.32) 0%, rgba(91,82,255,0.12) 40%, rgba(99,102,241,0.06) 65%, transparent 78%)",
          filter: "blur(2px)",
        }}
      />

      {/* Secondary glow — teal, top-right drift */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 1.14, 1], opacity: [0.35, 0.58, 0.35] }}
        transition={{
          duration: 9,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
        style={{
          width: "42vw",
          height: "42vw",
          top: "8%",
          right: "4%",
          background:
            "radial-gradient(circle, rgba(13,148,136,0.22) 0%, transparent 65%)",
          filter: "blur(3px)",
        }}
      />

      {/* Tertiary glow — rose, bottom-left drift */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 1.18, 1], opacity: [0.28, 0.48, 0.28] }}
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 5,
        }}
        style={{
          width: "38vw",
          height: "38vw",
          bottom: "4%",
          left: "2%",
          background:
            "radial-gradient(circle, rgba(244,63,94,0.20) 0%, transparent 65%)",
          filter: "blur(3px)",
        }}
      />

      {/* Quaternary glow — indigo, right */}
      <motion.div
        className="absolute rounded-full pointer-events-none"
        animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        style={{
          width: "30vw",
          height: "30vw",
          top: "35%",
          right: "8%",
          background:
            "radial-gradient(circle, rgba(99,102,241,0.28) 0%, transparent 65%)",
          filter: "blur(2px)",
        }}
      />

      {/* Micro-particles */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            top: p.top,
            left: p.left,
            width: p.size,
            height: p.size,
            background: p.color,
            animation: `particle-float ${p.dur}s ease-in-out infinite ${p.del}s`,
            boxShadow: `0 0 ${p.size * 4}px ${p.color}`,
          }}
        />
      ))}

      {/* Edge vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 78% 68% at 50% 50%, transparent 28%, rgba(7,6,15,0.90) 100%)",
        }}
      />
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(7,6,15,0.50) 0%, transparent 100%)",
        }}
      />

      {/* Eyebrow pill */}
      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase"
        style={{
          background: "rgba(7,6,15,0.68)",
          border: "1px solid rgba(91,82,255,0.24)",
          color: "rgba(255,255,255,0.55)",
          boxShadow:
            "5px 5px 16px rgba(0,0,0,0.70), -2px -2px 8px rgba(255,255,255,0.035), inset 0 1px 0 rgba(255,255,255,0.06)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
        Practice · Optimize · Land the Job
      </motion.div>

      {/* 3D ProDev — letters animate freely, no per-letter clipping */}
      <motion.div
        variants={containerVar}
        initial="hidden"
        animate="visible"
        className="relative z-10 select-none"
        aria-label="ProDev"
        style={{ perspective: "700px" }}
      >
        <motion.div
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
            display: "flex",
            alignItems: "baseline",
          }}
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "mirror",
          }}
        >
          {LETTERS.map((char, i) => (
            <motion.span
              key={i}
              variants={letterVar}
              className="font-extrabold font-display leading-none tracking-tighter text-white"
              style={{
                fontSize: "clamp(4.5rem, 16vw, 14rem)",
                textShadow: TEXT_3D_SHADOW,
                display: "inline-block",
              }}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>

      {/* Sub-tagline */}
      <motion.p
        variants={fadeUp(0.72)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-7 text-sm md:text-base text-center max-w-md leading-relaxed"
        style={{ color: "rgba(255,255,255,0.50)" }}
      >
        Master 150+ topics · AI resume optimizer · Interview prep — all free.
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        variants={fadeUp(0.88)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center gap-4 mt-9"
      >
        <TransitionLink
          href="/auth?mode=register"
          className="flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.04] active:scale-[0.97]"
          style={{
            background:
              "linear-gradient(135deg, #5b52ff 0%, #7c6dff 50%, #9b7aea 100%)",
            boxShadow:
              "6px 6px 22px rgba(0,0,0,0.70), -3px -3px 10px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.20), 0 0 42px rgba(91,82,255,0.42)",
          }}
        >
          Get Started Free <ArrowRight size={14} />
        </TransitionLink>

        <TransitionLink
          href="/auth"
          className="rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
          style={{
            background: "rgba(7,6,15,0.52)",
            border: "1px solid rgba(255,255,255,0.09)",
            color: "rgba(255,255,255,0.78)",
            boxShadow:
              "4px 4px 16px rgba(0,0,0,0.65), -2px -2px 8px rgba(255,255,255,0.03), inset 3px 3px 10px rgba(0,0,0,0.55), inset -1px -1px 4px rgba(255,255,255,0.025)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
          }}
        >
          Sign In
        </TransitionLink>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
          style={{
            background: "rgba(7,6,15,0.55)",
            borderRadius: "50%",
            padding: "9px",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow:
              "4px 4px 12px rgba(0,0,0,0.65), -1px -1px 6px rgba(255,255,255,0.03), inset 2px 2px 6px rgba(0,0,0,0.5)",
          }}
        >
          <ChevronDown size={20} style={{ color: "rgba(255,255,255,0.30)" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

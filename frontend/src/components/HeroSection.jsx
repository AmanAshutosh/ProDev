'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

const LETTERS = 'ProDev'.split('')

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
}

const letterVar = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring', stiffness: 75, damping: 18 },
  },
}

const fadeUp = (delay = 0) => ({
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.72, ease: [0.22, 1, 0.36, 1] },
  },
})

const PARTICLES = [
  { top: '12%', left: '7%',  size: 3, dur: 8,  del: 0,   color: 'rgba(91,82,255,0.75)'  },
  { top: '25%', left: '93%', size: 2, dur: 12, del: 2,   color: 'rgba(13,148,136,0.65)' },
  { top: '68%', left: '4%',  size: 4, dur: 10, del: 1,   color: 'rgba(91,82,255,0.55)'  },
  { top: '78%', left: '89%', size: 2, dur: 14, del: 3,   color: 'rgba(244,63,94,0.65)'  },
  { top: '38%', left: '18%', size: 3, dur: 9,  del: 5,   color: 'rgba(99,102,241,0.65)' },
  { top: '85%', left: '52%', size: 2, dur: 11, del: 0.5, color: 'rgba(13,148,136,0.55)' },
  { top: '10%', left: '72%', size: 3, dur: 13, del: 4,   color: 'rgba(91,82,255,0.65)'  },
  { top: '55%', left: '96%', size: 2, dur: 7,  del: 2.5, color: 'rgba(245,158,11,0.55)' },
  { top: '48%', left: '3%',  size: 2, dur: 15, del: 1.5, color: 'rgba(244,63,94,0.55)'  },
  { top: '92%', left: '30%', size: 3, dur: 9,  del: 6,   color: 'rgba(99,102,241,0.65)' },
]

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#07060f' }}
    >
      {/* ── Animated dot grid ─────────────────────────────────────── */}
      <div className="hero-grid absolute inset-0 pointer-events-none" />

      {/* ── Breathing center glow ─────────────────────────────────── */}
      <div
        className="hero-breathe absolute rounded-full pointer-events-none"
        style={{
          width: '60vw',
          height: '60vw',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(91,82,255,0.14) 0%, rgba(91,82,255,0) 65%)',
        }}
      />

      {/* ── Aurora Orb 1 — deep purple (center-left) ──────────────── */}
      <motion.div
        className="aurora-1 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          width: '75vw',
          height: '75vw',
          top: '50%',
          left: '22%',
          marginTop: '-37.5vw',
          marginLeft: '-15vw',
          background: 'radial-gradient(circle, rgba(91,82,255,0.60) 0%, rgba(91,82,255,0.22) 36%, transparent 60%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Aurora Orb 2 — indigo (top-right) ────────────────────── */}
      <motion.div
        className="aurora-2 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: 'easeOut' }}
        style={{
          width: '58vw',
          height: '58vw',
          top: '5%',
          right: '0%',
          background: 'radial-gradient(circle, rgba(99,102,241,0.48) 0%, rgba(99,102,241,0.12) 38%, transparent 62%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Aurora Orb 3 — teal (right-center) ───────────────────── */}
      <motion.div
        className="aurora-3 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.6, ease: 'easeOut' }}
        style={{
          width: '46vw',
          height: '46vw',
          top: '32%',
          right: '10%',
          background: 'radial-gradient(circle, rgba(13,148,136,0.40) 0%, rgba(13,148,136,0.10) 40%, transparent 64%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Aurora Orb 4 — rose (bottom-left) ────────────────────── */}
      <motion.div
        className="aurora-4 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.6, delay: 0.9, ease: 'easeOut' }}
        style={{
          width: '50vw',
          height: '50vw',
          bottom: '0%',
          left: '4%',
          background: 'radial-gradient(circle, rgba(244,63,94,0.32) 0%, rgba(244,63,94,0.08) 40%, transparent 64%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Aurora Orb 5 — amber accent (bottom-right) ────────────── */}
      <motion.div
        className="aurora-5 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.8, delay: 1.2, ease: 'easeOut' }}
        style={{
          width: '32vw',
          height: '32vw',
          bottom: '16%',
          right: '6%',
          background: 'radial-gradient(circle, rgba(245,158,11,0.24) 0%, rgba(245,158,11,0.06) 40%, transparent 64%)',
          filter: 'blur(2px)',
        }}
      />

      {/* ── Floating micro-particles ──────────────────────────────── */}
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

      {/* ── Edge vignette ─────────────────────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 78% 68% at 50% 50%, transparent 28%, rgba(7,6,15,0.90) 100%)',
        }}
      />

      {/* ── Top fade for nav blend ────────────────────────────────── */}
      <div
        className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(7,6,15,0.50) 0%, transparent 100%)' }}
      />

      {/* ── Eyebrow ───────────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase"
        style={{
          background: 'rgba(7,6,15,0.68)',
          border: '1px solid rgba(91,82,255,0.24)',
          color: 'rgba(255,255,255,0.55)',
          boxShadow: '5px 5px 16px rgba(0,0,0,0.70), -2px -2px 8px rgba(255,255,255,0.035), inset 0 1px 0 rgba(255,255,255,0.06)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
        }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
        Practice · Optimize · Land the Job
      </motion.div>

      {/* ── Main word reveal ──────────────────────────────────────── */}
      <motion.div
        variants={containerVar}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex select-none"
        aria-label="ProDev"
      >
        {LETTERS.map((char, i) => (
          <div key={i} className="overflow-hidden">
            <motion.span
              variants={letterVar}
              className="block font-extrabold font-display leading-none tracking-tighter text-white"
              style={{
                fontSize: 'clamp(4.5rem, 16vw, 14rem)',
                textShadow: '0 0 80px rgba(91,82,255,0.40), 0 6px 40px rgba(0,0,0,0.85)',
              }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* ── Sub-tagline ───────────────────────────────────────────── */}
      <motion.p
        variants={fadeUp(0.68)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-6 text-sm md:text-base text-center max-w-md leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.50)' }}
      >
        Master 150+ topics · AI resume optimizer · Interview prep — all free.
      </motion.p>

      {/* ── CTA buttons ───────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.85)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center gap-4 mt-9"
      >
        {/* Primary — raised neumorphic */}
        <Link
          href="/auth?mode=register"
          className="flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
          style={{
            background: 'linear-gradient(135deg, #5b52ff 0%, #7c6dff 50%, #9b7aea 100%)',
            boxShadow: '6px 6px 22px rgba(0,0,0,0.70), -3px -3px 10px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.20), 0 0 42px rgba(91,82,255,0.42)',
          }}
        >
          Get Started Free <ArrowRight size={14} />
        </Link>

        {/* Secondary — inset neumorphic */}
        <Link
          href="/auth"
          className="rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
          style={{
            background: 'rgba(7,6,15,0.52)',
            border: '1px solid rgba(255,255,255,0.09)',
            color: 'rgba(255,255,255,0.78)',
            boxShadow: '4px 4px 16px rgba(0,0,0,0.65), -2px -2px 8px rgba(255,255,255,0.03), inset 3px 3px 10px rgba(0,0,0,0.55), inset -1px -1px 4px rgba(255,255,255,0.025)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          Sign In
        </Link>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          style={{
            background: 'rgba(7,6,15,0.55)',
            borderRadius: '50%',
            padding: '9px',
            border: '1px solid rgba(255,255,255,0.07)',
            boxShadow: '4px 4px 12px rgba(0,0,0,0.65), -1px -1px 6px rgba(255,255,255,0.03), inset 2px 2px 6px rgba(0,0,0,0.5)',
          }}
        >
          <ChevronDown size={20} style={{ color: 'rgba(255,255,255,0.30)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

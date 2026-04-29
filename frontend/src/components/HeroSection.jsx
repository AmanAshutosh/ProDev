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

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#07060f' }}
    >
      {/* ── Aurora background — CSS-keyframe animated, Framer-Motion entrance ── */}

      {/* Orb 1 — large purple (center-left) */}
      <motion.div
        className="aurora-1 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        style={{
          width: '72vw',
          height: '72vw',
          top: '50%',
          left: '20%',
          marginTop: '-36vw',
          marginLeft: '-16vw',
          background:
            'radial-gradient(circle, rgba(91,82,255,0.52) 0%, rgba(91,82,255,0.15) 45%, transparent 68%)',
        }}
      />

      {/* Orb 2 — teal (right) */}
      <motion.div
        className="aurora-2 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.2, delay: 0.3, ease: 'easeOut' }}
        style={{
          width: '55vw',
          height: '55vw',
          top: '20%',
          right: '5%',
          background:
            'radial-gradient(circle, rgba(13,148,136,0.42) 0%, rgba(13,148,136,0.10) 45%, transparent 68%)',
        }}
      />

      {/* Orb 3 — coral/rose (bottom) */}
      <motion.div
        className="aurora-3 absolute rounded-full pointer-events-none"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2.4, delay: 0.6, ease: 'easeOut' }}
        style={{
          width: '40vw',
          height: '40vw',
          bottom: '10%',
          left: '10%',
          background:
            'radial-gradient(circle, rgba(244,63,94,0.30) 0%, rgba(244,63,94,0.08) 45%, transparent 68%)',
        }}
      />

      {/* ── Noise overlay for depth ─────────────────────────── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 50%, rgba(7,6,15,0.6) 100%)' }}
      />

      {/* ── Eyebrow ──────────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.1)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-semibold tracking-[0.18em] uppercase"
        style={{ borderColor: 'rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.55)' }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 live-dot" />
        Practice · Optimize · Land the Job
      </motion.div>

      {/* ── Main word reveal ─────────────────────────────────── */}
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
              style={{ fontSize: 'clamp(4.5rem, 16vw, 14rem)' }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* ── Sub-tagline ──────────────────────────────────────── */}
      <motion.p
        variants={fadeUp(0.68)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-6 text-sm md:text-base text-center max-w-md leading-relaxed"
        style={{ color: 'rgba(255,255,255,0.50)' }}
      >
        Master 150+ topics · AI resume optimizer · Interview prep — all free.
      </motion.p>

      {/* ── CTA buttons ──────────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.85)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center gap-3 mt-9"
      >
        <Link
          href="/auth?mode=register"
          className="flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold text-white transition-opacity hover:opacity-90"
          style={{
            background: 'linear-gradient(135deg, #5b52ff, #9b7aea)',
            boxShadow: '0 6px 28px rgba(91,82,255,0.45)',
          }}
        >
          Get Started Free <ArrowRight size={14} />
        </Link>
        <Link
          href="/auth"
          className="rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all hover:bg-white/10"
          style={{
            border: '1px solid rgba(255,255,255,0.18)',
            color: 'rgba(255,255,255,0.80)',
          }}
        >
          Sign In
        </Link>
      </motion.div>

      {/* ── Scroll cue ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
        >
          <ChevronDown size={22} style={{ color: 'rgba(255,255,255,0.28)' }} />
        </motion.div>
      </motion.div>
    </section>
  )
}

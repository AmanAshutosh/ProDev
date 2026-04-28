'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

const LETTERS = 'ProDev'.split('')

const containerVar = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const letterVar = {
  hidden: { y: '110%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { type: 'spring', stiffness: 90, damping: 16 },
  },
}

const fadeUp = (delay = 0) => ({
  hidden: { y: 28, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { delay, duration: 0.75, ease: [0.22, 1, 0.36, 1] },
  },
})

export default function HeroSection() {
  return (
    <section
      className="relative h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'var(--neu-bg)' }}
    >
      {/* Soft radial glow — center */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 50% 52%, rgba(108,99,255,0.09) 0%, transparent 70%)',
        }}
      />

      {/* Subtle top-left accent */}
      <div
        className="absolute -top-40 -left-40 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(108,99,255,0.05) 0%, transparent 60%)',
        }}
      />

      {/* Main word reveal */}
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
              className="block font-extrabold font-display leading-none tracking-tighter"
              style={{
                fontSize: 'clamp(4rem, 14vw, 12rem)',
                color: 'var(--hero-text)',
              }}
            >
              {char}
            </motion.span>
          </div>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        variants={fadeUp(0.62)}
        initial="hidden"
        animate="visible"
        className="relative z-10 mt-5 text-xs md:text-sm font-semibold tracking-[0.22em] uppercase"
        style={{ color: 'var(--hero-text-muted)' }}
      >
        Practice&nbsp;&nbsp;·&nbsp;&nbsp;Optimize&nbsp;&nbsp;·&nbsp;&nbsp;Land the job
      </motion.p>

      {/* CTA row */}
      <motion.div
        variants={fadeUp(0.82)}
        initial="hidden"
        animate="visible"
        className="relative z-10 flex items-center gap-3 mt-10"
      >
        <Link
          href="/auth?mode=register"
          className="gradient-purple text-white rounded-2xl px-7 py-3 text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
          style={{ boxShadow: '0 6px 24px rgba(108,99,255,0.35)' }}
        >
          Get Started Free <ArrowRight size={14} />
        </Link>
        <Link
          href="/auth"
          className="rounded-2xl px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-80"
          style={{
            background: 'var(--card-bg)',
            color: 'var(--card-text)',
            boxShadow: 'var(--card-shadow-out)',
          }}
        >
          Sign In
        </Link>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.7 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown
            size={20}
            style={{ color: 'var(--hero-text-muted)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

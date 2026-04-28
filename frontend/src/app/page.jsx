import Link from 'next/link'
import HeroSection from '../components/HeroSection'
import LandingNav from '../components/LandingNav'
import {
  Code2, Mic, FileText, BarChart2, Map, Radio,
  CheckCircle2, Bot, Zap, Sparkles, ArrowRight,
  TrendingUp, Server, GitBranch, Database, Cloud,
  Network, Star,
} from 'lucide-react'

export const metadata = {
  title: 'ProDev — Coding Practice, Interview Prep & AI Resume Optimizer',
  description:
    'Ace your tech interview and land your dream coding job. Practice 150+ topics in Frontend, Backend, DSA, DevOps & System Design. Optimize your resume with AI for maximum ATS score. Completely free.',
  alternates: { canonical: '/' },
}

/* ─── Data ────────────────────────────────────────────── */

const DOMAINS = [
  { icon: Code2,     label: 'Frontend',     color: 'text-violet-400' },
  { icon: Server,    label: 'Backend',       color: 'text-teal-400'   },
  { icon: GitBranch, label: 'DSA',           color: 'text-amber-400'  },
  { icon: Database,  label: 'Databases',     color: 'text-pink-400'   },
  { icon: Cloud,     label: 'DevOps',        color: 'text-indigo-400' },
  { icon: Network,   label: 'System Design', color: 'text-emerald-400'},
]

const FEATURES = [
  {
    icon: Code2, gradient: 'gradient-purple',
    shadow: '0 8px 24px rgba(108,99,255,0.30)',
    label: 'Practice Hub',
    desc: 'Master 150+ topics across Frontend, Backend, DSA, Databases, DevOps, and System Design with interactive challenges.',
    stats: [{ v: '150+', l: 'Topics' }, { v: '6', l: 'Domains' }, { v: '∞', l: 'Practice' }],
    wide: true,
  },
  {
    icon: FileText, gradient: 'gradient-amber',
    shadow: '0 8px 24px rgba(245,158,11,0.25)',
    label: 'AI Resume Optimizer',
    desc: 'Upload your resume + paste a job description. AI rewrites it for ATS, boosts keyword score, and exports as PDF or DOCX.',
    stats: [{ v: 'ATS', l: 'Ready' }, { v: 'AI', l: 'Powered' }, { v: 'PDF', l: '+ DOCX' }],
    badge: 'NEW',
    wide: true,
  },
  {
    icon: Mic, gradient: 'gradient-teal',
    shadow: '0 8px 24px rgba(20,184,166,0.25)',
    label: 'Interview Prep',
    desc: 'Curated Q&A from top companies across all tech stacks.',
  },
  {
    icon: BarChart2, gradient: 'gradient-green',
    shadow: '0 8px 24px rgba(16,185,129,0.25)',
    label: 'Progress Tracking',
    desc: 'Activity heatmaps, weekly velocity charts, and domain completion metrics.',
  },
  {
    icon: Map, gradient: 'gradient-pink',
    shadow: '0 8px 24px rgba(236,72,153,0.25)',
    label: 'Learning Roadmap',
    desc: 'Interactive roadmap with your personal progress overlaid across every stage.',
  },
  {
    icon: Radio, gradient: 'gradient-indigo',
    shadow: '0 8px 24px rgba(99,102,241,0.25)',
    label: 'Live Coding',
    desc: 'Stream your learning sessions live on YouTube and build your developer audience.',
  },
]

/* ─── Card base classes ───────────────────────────────── */

const CARD     = 'bg-(--card-bg) rounded-3xl card-out'
const CARD_IN  = 'bg-(--card-bg) rounded-3xl card-in'
const CARD_CODE = 'rounded-3xl card-dark'

/* ─── Feature card ────────────────────────────────────── */

function FeatureCard({ f }) {
  const Icon = f.icon
  return (
    <div
      className={`${CARD} p-6 flex flex-col gap-3 relative overflow-hidden ${f.wide ? 'sm:col-span-2 lg:col-span-2' : ''}`}
    >
      {f.badge && (
        <span className="absolute top-4 right-4 gradient-amber text-white text-[9px] font-black px-2.5 py-1 rounded-lg z-10 tracking-wider">
          {f.badge}
        </span>
      )}
      <div
        className={`w-11 h-11 ${f.gradient} rounded-2xl flex items-center justify-center shrink-0`}
        style={{ boxShadow: f.shadow }}
      >
        <Icon size={20} className="text-white" />
      </div>
      <div>
        <h3
          className="font-bold mb-1 text-[15px]"
          style={{ color: 'var(--card-text)' }}
        >
          {f.label}
        </h3>
        <p
          className="text-sm leading-relaxed"
          style={{ color: 'var(--card-text-muted)' }}
        >
          {f.desc}
        </p>
      </div>
      {f.stats && (
        <div className="flex gap-2 mt-auto pt-1">
          {f.stats.map(s => (
            <div
              key={s.l}
              className="rounded-2xl px-3 py-2 text-center flex-1 border"
              style={{
                background: 'var(--card-bg-2)',
                borderColor: 'var(--card-border)',
              }}
            >
              <div className="text-sm font-extrabold font-display text-grad-purple">{s.v}</div>
              <div
                className="text-[9px] font-semibold mt-0.5"
                style={{ color: 'var(--card-text-muted)' }}
              >
                {s.l}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Page ────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-(--neu-bg) text-slate-800 dark:text-slate-100">

      <LandingNav />

      {/* Full-viewport animated hero — scrolls to bento grid below */}
      <HeroSection />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-20 space-y-3">

        {/* ── HERO CARD ──────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-3">

          {/* Gradient feature card */}
          <div className="lg:flex-1 gradient-purple rounded-3xl p-8 md:p-10 text-white relative overflow-hidden min-h-90 flex flex-col justify-between">
            <div className="absolute -top-16 -right-16 w-60 h-60 bg-white/8 rounded-full pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-44 h-44 bg-white/5 rounded-full pointer-events-none" />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 text-xs font-semibold mb-6">
                <Sparkles size={11} /> v1.1 — AI Resume Optimizer
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold font-display leading-tight mb-4">
                Your Developer<br />Career,{' '}
                <span className="text-white/70">Accelerated.</span>
              </h1>
              <p className="text-white/70 text-sm md:text-base leading-relaxed max-w-md">
                From practice to placement — master the full stack with AI tools and curated interview prep. Free forever.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-6">
              <Link
                href="/auth?mode=register"
                className="bg-white text-violet-700 rounded-2xl px-6 py-3 text-sm font-bold hover:bg-white/90 transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                Get Started Free <ArrowRight size={15} />
              </Link>
              <Link
                href="/auth"
                className="bg-white/15 text-white rounded-2xl px-6 py-3 text-sm font-bold hover:bg-white/25 transition-colors flex items-center justify-center border border-white/20"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stat stack */}
          <div className="flex flex-row lg:flex-col gap-3 lg:w-56">
            <div className={`${CARD} flex-1 lg:flex-none p-6 flex flex-col justify-between`}>
              <p
                className="text-[10px] font-bold uppercase tracking-widest mb-3"
                style={{ color: 'var(--card-text-muted)' }}
              >
                Practice Topics
              </p>
              <div>
                <div className="text-5xl font-extrabold font-display text-grad-purple leading-none">150+</div>
                <p
                  className="text-xs mt-2 flex items-center gap-1"
                  style={{ color: 'var(--card-text-muted)' }}
                >
                  <TrendingUp size={11} className="text-emerald-400" /> Across 6 domains
                </p>
              </div>
            </div>

            <div className={`${CARD_CODE} flex-1 lg:flex-none p-6 flex flex-col justify-between`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Active Devs</p>
              <div>
                <div className="text-5xl font-extrabold font-display text-white leading-none">2.4K</div>
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <TrendingUp size={11} /> +10% this month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2 ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <div className={`${CARD} sm:col-span-2 p-8 flex flex-col justify-between min-h-50`}>
            <Bot size={26} className="text-violet-400 mb-4" />
            <div>
              <h2
                className="text-2xl md:text-3xl font-extrabold font-display leading-tight mb-3"
                style={{ color: 'var(--card-text)' }}
              >
                We help you land your<br />
                <span className="text-grad-purple">dream tech job.</span>
              </h2>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--card-text-muted)' }}
              >
                AI resume optimizer, curated interview prep, and 150+ practice topics — all in one free platform.
              </p>
            </div>
          </div>

          {/* Code terminal — always dark */}
          <div className={`${CARD_CODE} p-5 font-mono flex flex-col justify-between min-h-45`}>
            <div>
              <div className="flex items-center gap-1.5 mb-4">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[10px] text-slate-500">resume.optimize.js</span>
              </div>
              <div className="space-y-1.5 text-[11px] leading-relaxed">
                <div>
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-teal-400">result</span>{' '}
                  <span className="text-slate-500">=</span>{' '}
                  <span className="text-amber-400">await</span>{' '}
                  <span className="text-slate-300">optimize(resume, jd)</span>
                </div>
                <div className="text-slate-600">{'// '}ATS Score improved</div>
                <div>
                  <span className="text-violet-400">return</span>{' '}
                  <span className="text-slate-500">{'{ '}</span>
                  <span className="text-slate-300">score: </span>
                  <span className="text-emerald-400">94</span>
                  <span className="text-slate-300">, keywords: </span>
                  <span className="text-emerald-400">15</span>
                  <span className="text-slate-500">{' }'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-semibold">AI optimization complete</span>
            </div>
          </div>
        </div>

        {/* ── DOMAINS STRIP ────────────────────── */}
        <div className={`${CARD} p-4`}>
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8">
            {DOMAINS.map(d => (
              <div key={d.label} className="flex items-center gap-2">
                <d.icon size={14} className={d.color} />
                <span
                  className="text-sm font-semibold"
                  style={{ color: 'var(--card-text-muted)' }}
                >
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ─────────────────────────── */}
        <section aria-labelledby="features-heading">
          <div className="text-center mb-4 pt-2">
            <h2
              id="features-heading"
              className="text-2xl md:text-3xl font-extrabold font-display text-slate-800 dark:text-slate-100 mb-2"
            >
              Everything you need to land the job
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-sm">
              One platform. Zero fluff. Built for developers who take their career seriously.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {FEATURES.map(f => <FeatureCard key={f.label} f={f} />)}
          </div>
        </section>

        {/* ── STATS ROW ────────────────────────── */}
        <section aria-label="Platform statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { number: '150+', label: 'Practice Topics',    accent: 'text-grad-purple', icon: Code2    },
              { number: '6',    label: 'Tech Domains',       accent: 'text-grad-teal',   icon: Network  },
              { number: '94%',  label: 'Avg ATS Score Lift', accent: 'text-grad-amber',  icon: FileText },
              { number: '100%', label: 'Free Forever',       accent: 'text-grad-green',  icon: Star     },
            ].map(s => (
              <div
                key={s.label}
                className={`${CARD} p-5 text-center flex flex-col items-center gap-2`}
              >
                <s.icon size={17} style={{ color: 'var(--card-text-muted)' }} />
                <div className={`text-4xl font-extrabold font-display ${s.accent}`}>{s.number}</div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: 'var(--card-text-muted)' }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHECKLIST ────────────────────────── */}
        <section aria-labelledby="checklist-heading">
          <h2 id="checklist-heading" className="sr-only">Platform features checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {[
              'Track progress across 6 tech domains',
              'AI-powered ATS resume optimization with keyword analysis',
              'Curated interview questions by domain and company',
              'Interactive developer roadmap with progress tracking',
              'Activity heatmaps and weekly velocity charts',
              'Live stream your coding sessions to YouTube',
              'Download optimized resume as PDF or DOCX',
              'Practice JavaScript, React, Node.js, DSA & more',
              'Free forever — no credit card needed',
            ].map(item => (
              <div
                key={item}
                className={`${CARD} flex items-start gap-3 px-4 py-3`}
              >
                <CheckCircle2 size={15} className="text-emerald-400 shrink-0 mt-0.5" />
                <span
                  className="text-sm font-medium"
                  style={{ color: 'var(--card-text-muted)' }}
                >
                  {item}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────── */}
        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="text-xl md:text-2xl font-extrabold font-display text-slate-800 dark:text-slate-100 text-center mb-4 pt-2"
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-2.5">
            {[
              {
                q: 'Is ProDev free?',
                a: 'Yes. ProDev is completely free. No credit card, no trial — just sign up and start practicing.',
              },
              {
                q: 'What coding topics can I practice?',
                a: 'ProDev covers 150+ topics across Frontend (HTML, CSS, JavaScript, React), Backend (Node.js, REST APIs), DSA (arrays, trees, dynamic programming), Databases (SQL, MongoDB), DevOps (Docker, CI/CD), and System Design.',
              },
              {
                q: 'How does the AI resume optimizer work?',
                a: 'Upload your resume (PDF or DOCX) and paste a job description. Our AI analyzes keyword gaps, rewrites your resume to maximize ATS score, and lets you download the optimized version instantly.',
              },
              {
                q: 'Is this good for preparing for Google, Amazon, or Meta?',
                a: "Absolutely. ProDev's DSA and System Design modules cover the exact topics tested at top tech companies. The interview prep section includes curated questions from FAANG and other top firms.",
              },
            ].map(({ q, a }) => (
              <div key={q} className={`${CARD} px-5 py-4`}>
                <h3
                  className="font-bold text-sm mb-1.5"
                  style={{ color: 'var(--card-text)' }}
                >
                  {q}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--card-text-muted)' }}
                >
                  {a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────── */}
        <section className="gradient-purple rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-52 h-52 bg-white/8 rounded-full pointer-events-none" />
          <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-white/5 rounded-full pointer-events-none" />
          <div className="relative z-10">
            <Zap size={34} className="text-white/75 mx-auto mb-4" />
            <h2 className="text-2xl md:text-4xl font-extrabold font-display mb-4 leading-tight">
              Start your journey today
            </h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto text-sm md:text-base">
              Free forever. No credit card. Just you and the code.
            </p>
            <Link
              href="/auth?mode=register"
              className="bg-white text-violet-700 rounded-2xl px-10 py-3.5 text-sm font-bold hover:bg-white/90 transition-colors inline-flex items-center gap-2 shadow-xl"
            >
              <Zap size={15} /> Create Free Account
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ───────────────────────────── */}
      <footer
        className="py-8 px-4 md:px-6"
        style={{ borderTop: '1px solid rgba(128,128,160,0.15)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2025 ProDev. Built for developers, by{' '}
            <a
              href="https://www.linkedin.com/in/ashutoshhify/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors font-semibold"
            >
              Ashutosh
            </a>.
          </p>
          <div className="flex gap-5 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/practice"  className="hover:text-violet-500 transition-colors">Practice</Link>
            <Link href="/interview" className="hover:text-violet-500 transition-colors">Interview Prep</Link>
            <Link href="/resume"    className="hover:text-violet-500 transition-colors">Resume Optimizer</Link>
            <Link href="/roadmap"   className="hover:text-violet-500 transition-colors">Roadmap</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

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
    'Ace your tech interview and land your dream coding job. Practice 150+ topics in Frontend, Backend, DSA, DevOps & System Design. Optimize your resume with AI. Completely free.',
  alternates: { canonical: '/' },
}

/* ─── Domains ─────────────────────────────────────────── */

const DOMAINS = [
  { icon: Code2,     label: 'Frontend',     color: 'text-violet-500' },
  { icon: Server,    label: 'Backend',       color: 'text-teal-500'   },
  { icon: GitBranch, label: 'DSA',           color: 'text-amber-500'  },
  { icon: Database,  label: 'Databases',     color: 'text-pink-500'   },
  { icon: Cloud,     label: 'DevOps',        color: 'text-indigo-500' },
  { icon: Network,   label: 'System Design', color: 'text-emerald-500'},
]

/* ─── Features ────────────────────────────────────────── */

const FEATURES = [
  {
    icon: Code2,
    cardClass: 'card-purple-soft',
    iconBg: 'bg-violet-600',
    label: 'Practice Hub',
    desc: 'Master 150+ topics across Frontend, Backend, DSA, Databases, DevOps, and System Design with interactive challenges.',
    stats: [{ v: '150+', l: 'Topics' }, { v: '6', l: 'Domains' }, { v: '∞', l: 'Practice' }],
    wide: true,
  },
  {
    icon: FileText,
    cardClass: 'card-amber',
    iconBg: 'bg-amber-500',
    label: 'AI Resume Optimizer',
    desc: 'Upload your resume + paste a job description. AI rewrites it for ATS, boosts keyword score, and exports as PDF or DOCX.',
    stats: [{ v: 'ATS', l: 'Ready' }, { v: 'AI', l: 'Powered' }, { v: 'PDF', l: '+ DOCX' }],
    badge: 'NEW',
    wide: true,
  },
  {
    icon: Mic,
    cardClass: 'card-teal',
    iconBg: 'bg-teal-600',
    label: 'Interview Prep',
    desc: 'Curated Q&A from top companies across all tech stacks.',
  },
  {
    icon: BarChart2,
    cardClass: 'card-green',
    iconBg: 'bg-emerald-600',
    label: 'Progress Tracking',
    desc: 'Activity heatmaps, weekly velocity charts, and domain completion metrics.',
  },
  {
    icon: Map,
    cardClass: 'card-coral',
    iconBg: 'bg-rose-600',
    label: 'Learning Roadmap',
    desc: 'Interactive roadmap with your personal progress overlaid across every stage.',
  },
  {
    icon: Radio,
    cardClass: 'card-dark',
    iconBg: 'bg-indigo-600',
    label: 'Live Coding',
    desc: 'Stream your learning sessions live on YouTube and build your developer audience.',
  },
]

/* ─── Feature card ────────────────────────────────────── */

function FeatureCard({ f }) {
  const Icon = f.icon
  const isDark = f.cardClass === 'card-dark'

  return (
    <div
      className={`${f.cardClass} rounded-3xl p-6 flex flex-col gap-4 relative overflow-hidden ${
        f.wide ? 'sm:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {f.badge && (
        <span className="absolute top-4 right-4 bg-amber-400 text-white text-[9px] font-black px-2.5 py-1 rounded-lg z-10 tracking-wider">
          {f.badge}
        </span>
      )}

      <div
        className={`w-12 h-12 ${f.iconBg} rounded-2xl flex items-center justify-center shrink-0`}
        style={{
          boxShadow: '5px 5px 16px rgba(0,0,0,0.28), -2px -2px 8px rgba(255,255,255,0.18), inset 0 1px 0 rgba(255,255,255,0.22)',
        }}
      >
        <Icon size={22} className="text-white" />
      </div>

      <div className="flex-1">
        <h3 className={`font-bold text-base mb-1.5 ${isDark ? 'text-white' : 'text-slate-800 dark:text-slate-100'}`}>
          {f.label}
        </h3>
        <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-slate-600 dark:text-slate-400'}`}>
          {f.desc}
        </p>
      </div>

      {f.stats && (
        <div className="flex gap-2 mt-auto">
          {f.stats.map(s => (
            <div
              key={s.l}
              className="neu-chip rounded-xl px-3 py-2 text-center flex-1"
            >
              <div className={`text-sm font-extrabold font-display ${isDark ? 'text-violet-400' : 'text-violet-600 dark:text-violet-400'}`}>
                {s.v}
              </div>
              <div className="text-[9px] font-semibold mt-0.5 text-slate-500 dark:text-slate-400">{s.l}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

/* ─── Shared card class ───────────────────────────────── */

const CARD = 'bg-(--card-bg) rounded-3xl card-out'

/* ─── Page ────────────────────────────────────────────── */

export default function LandingPage() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <LandingNav />
      <HeroSection />

      <main className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-24 space-y-5">

        {/* ── ROW 1: Headline + Stat pair ─────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">

          {/* Headline card */}
          <div
            className="lg:col-span-3 gradient-purple rounded-3xl p-8 md:p-10 text-white relative overflow-hidden flex flex-col justify-between min-h-80"
            style={{ boxShadow: '8px 8px 32px rgba(91,82,255,0.40), -4px -4px 16px rgba(255,255,255,0.12), inset 0 1px 0 rgba(255,255,255,0.22)' }}
          >
            <div
              className="absolute -top-20 -right-20 w-72 h-72 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 60%)' }}
            />
            <div
              className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
            />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-3 py-1.5 text-xs font-semibold mb-7">
                <Sparkles size={11} /> v1.1 — AI Resume Optimizer
              </div>
              <h1
                className="font-extrabold font-display leading-[0.95] mb-5 tracking-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                Your Developer<br />Career,{' '}
                <span className="text-white/65">Accelerated.</span>
              </h1>
              <p className="text-white/65 text-sm md:text-base leading-relaxed max-w-sm">
                From practice to placement — master the full stack with AI tools and curated interview prep. Free forever.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-3 mt-8">
              <Link
                href="/auth?mode=register"
                className="bg-white text-violet-700 rounded-2xl px-6 py-3 text-sm font-bold hover:bg-white/92 transition-colors flex items-center justify-center gap-2"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.20)' }}
              >
                Get Started Free <ArrowRight size={14} />
              </Link>
              <Link
                href="/auth"
                className="bg-white/15 text-white rounded-2xl px-6 py-3 text-sm font-bold hover:bg-white/22 transition-colors flex items-center justify-center border border-white/20"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Stat pair */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-5">
            {/* Topics */}
            <div className={`${CARD} p-7 flex flex-col justify-between`}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-2">
                Practice Topics
              </p>
              <div>
                <div
                  className="font-black font-display text-grad-purple leading-none"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}
                >
                  150+
                </div>
                <p className="text-xs mt-2 flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <TrendingUp size={11} className="text-emerald-500" /> Across 6 domains
                </p>
              </div>
            </div>

            {/* Devs */}
            <div className="card-dark rounded-3xl p-7 flex flex-col justify-between">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">
                Active Devs
              </p>
              <div>
                <div
                  className="font-black font-display text-white leading-none"
                  style={{ fontSize: 'clamp(3.5rem, 8vw, 5.5rem)' }}
                >
                  2.4K
                </div>
                <p className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                  <TrendingUp size={11} /> +10% this month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── ROW 2: About + Code terminal ────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

          <div className={`${CARD} sm:col-span-2 p-8 md:p-10 flex flex-col justify-between`}>
            <Bot size={30} className="text-violet-500 mb-6" />
            <div>
              <h2
                className="font-extrabold font-display leading-tight mb-4 text-slate-800 dark:text-slate-100"
                style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.5rem)' }}
              >
                We help you land your<br />
                <span className="text-grad-purple">dream tech job.</span>
              </h2>
              <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-sm">
                AI resume optimizer, curated interview prep, and 150+ practice topics — all in one free platform.
              </p>
            </div>
          </div>

          {/* Code terminal */}
          <div className="card-dark rounded-3xl p-6 font-mono flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-1.5 mb-5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <span className="ml-2 text-[10px] text-slate-600">resume.optimize.js</span>
              </div>
              <div className="space-y-2 text-[11px] leading-relaxed">
                <div>
                  <span className="text-violet-400">const</span>{' '}
                  <span className="text-teal-400">result</span>{' '}
                  <span className="text-slate-600">=</span>{' '}
                  <span className="text-amber-400">await</span>{' '}
                  <span className="text-slate-300">optimize(resume, jd)</span>
                </div>
                <div className="text-slate-600">{'// ATS Score improved'}</div>
                <div>
                  <span className="text-violet-400">return</span>{' '}
                  <span className="text-slate-600">{'{ '}</span>
                  <span className="text-slate-300">score: </span>
                  <span className="text-emerald-400">94</span>
                  <span className="text-slate-300">, keywords: </span>
                  <span className="text-emerald-400">15</span>
                  <span className="text-slate-600">{' }'}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] text-emerald-400 font-semibold">AI optimization complete</span>
            </div>
          </div>
        </div>

        {/* ── DOMAINS STRIP ───────────────────────────────── */}
        <div className={`${CARD} p-5`}>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {DOMAINS.map(d => (
              <div key={d.label} className="flex items-center gap-2">
                <d.icon size={15} className={d.color} />
                <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                  {d.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── FEATURES ────────────────────────────────────── */}
        <section aria-labelledby="features-heading">
          <div className="text-center mb-7 pt-2">
            <h2
              id="features-heading"
              className="font-extrabold font-display text-slate-800 dark:text-slate-100 mb-3"
              style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)' }}
            >
              Everything you need to land the job
            </h2>
            <p className="max-w-md mx-auto text-sm text-slate-500 dark:text-slate-400">
              One platform. Zero fluff. Built for developers who take their career seriously.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map(f => <FeatureCard key={f.label} f={f} />)}
          </div>
        </section>

        {/* ── STATS ROW ───────────────────────────────────── */}
        <section aria-label="Platform statistics">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { number: '150+', label: 'Practice Topics',    grad: 'text-grad-purple', icon: Code2    },
              { number: '6',    label: 'Tech Domains',       grad: 'text-grad-teal',   icon: Network  },
              { number: '94%',  label: 'Avg ATS Score Lift', grad: 'text-grad-amber',  icon: FileText },
              { number: '100%', label: 'Free Forever',       grad: 'text-grad-green',  icon: Star     },
            ].map(s => (
              <div key={s.label} className={`${CARD} p-6 text-center flex flex-col items-center gap-3`}>
                <s.icon size={18} className="text-slate-400" />
                <div
                  className={`font-black font-display ${s.grad} leading-none`}
                  style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
                >
                  {s.number}
                </div>
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── CHECKLIST ───────────────────────────────────── */}
        <section aria-labelledby="checklist-heading">
          <h2 id="checklist-heading" className="sr-only">Platform features checklist</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
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
              <div key={item} className={`${CARD} flex items-start gap-3 px-5 py-4`}>
                <CheckCircle2 size={15} className="text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-sm font-medium text-slate-600 dark:text-slate-400">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading">
          <h2
            id="faq-heading"
            className="font-extrabold font-display text-slate-800 dark:text-slate-100 text-center mb-6 pt-2"
            style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.25rem)' }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
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
              <div key={q} className={`${CARD} px-6 py-5`}>
                <h3 className="font-bold text-sm mb-2 text-slate-800 dark:text-slate-100">{q}</h3>
                <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">{a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section
          className="gradient-purple rounded-3xl p-10 md:p-14 text-center text-white relative overflow-hidden"
          style={{ boxShadow: '10px 10px 36px rgba(91,82,255,0.45), -5px -5px 18px rgba(255,255,255,0.14), inset 0 1px 0 rgba(255,255,255,0.20)' }}
        >
          <div
            className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, transparent 60%)' }}
          />
          <div
            className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 60%)' }}
          />
          <div className="relative z-10">
            <Zap size={36} className="text-white/70 mx-auto mb-5" />
            <h2
              className="font-extrabold font-display mb-4 leading-tight"
              style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
            >
              Start your journey today
            </h2>
            <p className="text-white/65 mb-9 max-w-md mx-auto text-sm md:text-base">
              Free forever. No credit card. Just you and the code.
            </p>
            <Link
              href="/auth?mode=register"
              className="bg-white text-violet-700 rounded-2xl px-10 py-4 text-sm font-bold hover:bg-white/92 transition-colors inline-flex items-center gap-2"
              style={{ boxShadow: '0 8px 28px rgba(0,0,0,0.22)' }}
            >
              <Zap size={15} /> Create Free Account
            </Link>
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────── */}
      <footer
        className="py-8 px-4 md:px-6"
        style={{ borderTop: '1px solid var(--card-border)' }}
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            © 2025 ProDev. Built by{' '}
            <a
              href="https://www.linkedin.com/in/ashutoshhify/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-violet-500 hover:text-violet-600 transition-colors font-semibold"
            >
              Ashutosh
            </a>.
          </p>
          <div className="flex gap-6 text-xs text-slate-500 dark:text-slate-400">
            <Link href="/practice"  className="hover:text-violet-500 transition-colors">Practice</Link>
            <Link href="/interview" className="hover:text-violet-500 transition-colors">Interview</Link>
            <Link href="/resume"    className="hover:text-violet-500 transition-colors">Resume</Link>
            <Link href="/roadmap"   className="hover:text-violet-500 transition-colors">Roadmap</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

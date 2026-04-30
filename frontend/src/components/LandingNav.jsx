'use client'
import Link from 'next/link'
import { Briefcase, Moon, Sun } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function LandingNav() {
  const { dark, toggle } = useTheme()
  const { user } = useAuth()

  return (
    <motion.nav
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 h-16"
      style={{
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--nav-border)',
        backdropFilter: 'blur(14px)',
        WebkitBackdropFilter: 'blur(14px)',
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2.5">
        <div
          className="w-9 h-9 gradient-purple rounded-xl flex items-center justify-center shrink-0"
          style={{ boxShadow: '0 4px 14px rgba(91,82,255,0.35)' }}
        >
          <Briefcase size={17} className="text-white" />
        </div>
        <span className="font-display font-extrabold text-xl text-grad-purple">ProDev</span>
      </Link>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200 cursor-pointer text-slate-500 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400 active:scale-95"
          style={{
            background: 'var(--card-bg)',
            boxShadow: 'var(--card-shadow)',
          }}
          onMouseDown={e => e.currentTarget.style.boxShadow = 'var(--card-shadow-in)'}
          onMouseUp={e => e.currentTarget.style.boxShadow = 'var(--card-shadow)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--card-shadow)'}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {user ? (
          <Link
            href="/dashboard"
            className="gradient-purple text-white rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            style={{ boxShadow: '0 4px 14px rgba(91,82,255,0.30)' }}
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/auth"
              className="rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 text-slate-600 hover:text-violet-500 dark:text-slate-400 dark:hover:text-violet-400"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=register"
              className="gradient-purple text-white rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
              style={{ boxShadow: '0 4px 14px rgba(91,82,255,0.30)' }}
            >
              Sign Up Free
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  )
}

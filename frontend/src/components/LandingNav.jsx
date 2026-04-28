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
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="sticky top-0 z-50 flex items-center justify-between px-5 md:px-10 h-16"
      style={{
        background: 'var(--nav-bg)',
        borderBottom: '1px solid var(--nav-border)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <Link href="/" className="flex items-center gap-2.5">
        <div className="w-9 h-9 gradient-purple rounded-xl flex items-center justify-center shrink-0 neu-out">
          <Briefcase size={18} className="text-white" />
        </div>
        <span className="font-display font-extrabold text-xl text-grad-purple">ProDev</span>
      </Link>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors cursor-pointer hover:text-violet-500"
          style={{
            background: 'var(--card-bg)',
            color: 'var(--card-text-muted)',
            boxShadow: 'var(--card-shadow-out)',
          }}
        >
          {dark ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {user ? (
          <Link
            href="/dashboard"
            className="gradient-purple text-white rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Dashboard
          </Link>
        ) : (
          <>
            <Link
              href="/auth"
              className="rounded-xl px-4 py-2 text-sm font-semibold transition-colors hover:text-violet-500"
              style={{
                background: 'var(--card-bg)',
                color: 'var(--card-text-muted)',
                boxShadow: 'var(--card-shadow-out)',
              }}
            >
              Sign In
            </Link>
            <Link
              href="/auth?mode=register"
              className="gradient-purple text-white rounded-xl px-4 py-2 text-sm font-semibold hover:opacity-90 transition-opacity"
            >
              Sign Up Free
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  )
}

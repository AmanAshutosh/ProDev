'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSearchParams } from 'next/navigation'
import {
  Briefcase, Mail, Lock, User, Eye, EyeOff, AlertCircle, CheckCircle2,
} from 'lucide-react'
import { NeuCard, NeuButton } from '../components/ui'
import { useAuth } from '../context/AuthContext'
import { usePageTransition } from '../context/TransitionContext'

const validateEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

function Field({ label, type, value, onChange, placeholder, icon: Icon, rightSlot, error }) {
  return (
    <div>
      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={15}
          className={`absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${error ? 'text-red-400' : 'text-slate-400'}`}
        />
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`w-full rounded-xl pl-9 pr-10 py-3 text-sm bg-transparent outline-none transition-all ${
            error
              ? 'neu-in border border-red-300 dark:border-red-700/60 text-red-500 dark:text-red-400'
              : 'neu-in border border-transparent text-slate-700 dark:text-slate-200'
          } placeholder-slate-400`}
        />
        {rightSlot && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightSlot}</div>
        )}
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -4, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-[10px] text-red-400 mt-1 flex items-center gap-1 overflow-hidden"
          >
            <AlertCircle size={10} className="shrink-0" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Auth() {
  const searchParams  = useSearchParams()
  const initialMode   = searchParams.get('mode') === 'register' ? 'register' : 'login'
  const from          = searchParams.get('from') || '/dashboard'

  const [mode,        setMode]        = useState(initialMode)
  const [name,        setName]        = useState('')
  const [email,       setEmail]       = useState('')
  const [password,    setPass]        = useState('')
  const [showPass,    setShow]        = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [success,     setSuccess]     = useState(false)
  const [apiError,    setApiError]    = useState('')
  const [fieldErrors, setFieldErrors] = useState({})

  const { login, register, user, authLoading } = useAuth()
  const { navigateTo } = usePageTransition()

  // Already authenticated → redirect immediately
  useEffect(() => {
    if (!authLoading && user) navigateTo(from)
  }, [user, authLoading]) // eslint-disable-line

  const clearFieldError = (field) =>
    setFieldErrors(prev => ({ ...prev, [field]: '' }))

  const validate = () => {
    const errs = {}
    if (mode === 'register') {
      if (!name.trim()) errs.name = 'Name is required'
      else if (name.trim().length < 2) errs.name = 'Name must be at least 2 characters'
    }
    if (!email)                  errs.email    = 'Email is required'
    else if (!validateEmail(email)) errs.email = 'Enter a valid email address'
    if (!password)               errs.password = 'Password is required'
    else if (password.length < 6) errs.password = 'Password must be at least 6 characters'
    return errs
  }

  const submit = async (e) => {
    e.preventDefault()
    setApiError('')
    setSuccess(false)

    const errs = validate()
    if (Object.keys(errs).length) {
      setFieldErrors(errs)
      return
    }
    setFieldErrors({})
    setLoading(true)

    try {
      if (mode === 'login') await login(email, password)
      else                  await register(name, email, password)
      setSuccess(true)
      // Short pause so user sees the success state, then trigger curtain transition
      setTimeout(() => navigateTo(from), 650)
    } catch (err) {
      setApiError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const switchMode = (next) => {
    setMode(next)
    setApiError('')
    setFieldErrors({})
    setSuccess(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--neu-bg)]">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="w-16 h-16 gradient-purple rounded-2xl flex items-center justify-center mx-auto mb-4 neu-out"
          >
            <Briefcase size={28} className="text-white" />
          </motion.div>
          <h1 className="text-2xl font-extrabold text-grad-purple">ProDev</h1>
          <p className="text-sm text-slate-400 mt-1">Your career, accelerated.</p>
        </div>

        <NeuCard>
          {/* Mode tabs */}
          <div className="flex neu-in rounded-xl p-1 mb-6">
            {[{ key: 'login', label: 'Sign In' }, { key: 'register', label: 'Sign Up' }].map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => switchMode(key)}
                className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer border-0 ${
                  mode === key
                    ? 'neu-out bg-[var(--neu-bg)] text-violet-500'
                    : 'bg-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit} noValidate className="space-y-4">
            {/* Name field (register only) */}
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  style={{ overflow: 'hidden' }}
                >
                  <Field
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); clearFieldError('name') }}
                    placeholder="Jane Developer"
                    icon={User}
                    error={fieldErrors.name}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); clearFieldError('email') }}
              placeholder="jane@example.com"
              icon={Mail}
              error={fieldErrors.email}
            />

            <Field
              label="Password"
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={(e) => { setPass(e.target.value); clearFieldError('password') }}
              placeholder="••••••••"
              icon={Lock}
              error={fieldErrors.password}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShow(s => !s)}
                  className="text-slate-400 hover:text-violet-500 cursor-pointer border-0 bg-transparent transition-colors"
                >
                  {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              }
            />

            {/* Status banner */}
            <AnimatePresence>
              {apiError && (
                <motion.div
                  key="err"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 text-red-500 rounded-xl px-3 py-2.5 text-xs"
                >
                  <AlertCircle size={13} className="shrink-0" />
                  {apiError}
                </motion.div>
              )}
              {success && (
                <motion.div
                  key="ok"
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-xl px-3 py-2.5 text-xs font-semibold"
                >
                  <CheckCircle2 size={13} className="shrink-0" />
                  {mode === 'login' ? 'Signed in! Taking you in…' : 'Account created! Taking you in…'}
                </motion.div>
              )}
            </AnimatePresence>

            <NeuButton
              variant="primary"
              className="w-full py-3!"
              disabled={loading || success}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  {mode === 'login' ? 'Signing in…' : 'Creating account…'}
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 size={15} /> Redirecting…
                </span>
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </NeuButton>
          </form>
        </NeuCard>

        <p className="text-center text-xs text-slate-400 mt-5">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => switchMode(mode === 'login' ? 'register' : 'login')}
            className="text-violet-500 font-bold cursor-pointer border-0 bg-transparent hover:underline"
          >
            {mode === 'login' ? 'Sign up free' : 'Sign in'}
          </button>
        </p>
      </motion.div>
    </div>
  )
}

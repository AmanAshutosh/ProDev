'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  GitFork, Link2, Edit2, Award, CheckCircle2,
  Plus, ExternalLink, X, Save, Camera, TrendingUp,
  Zap, Target, Flame, Clock, Code2
} from 'lucide-react'
import { NeuCard, NeuButton, ProgressBar, SectionHeader } from '../components/ui'
import Heatmap from '../components/Heatmap'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { PRACTICE_DOMAINS } from '../data/appData'
import { useRouter } from 'next/navigation'
import { api } from '../api/api'

const CERT_GRADIENTS = {
  frontend:  'gradient-purple',
  backend:   'gradient-teal',
  dsa:       'gradient-amber',
  database:  'gradient-pink',
  devops:    'gradient-indigo',
  sysdesign: 'gradient-green',
}

function CertCard({ cert }) {
  const grad = CERT_GRADIENTS[cert.domain] || 'gradient-purple'
  return (
    <div className={`${grad} rounded-2xl p-4 text-white relative overflow-hidden`}>
      <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full" />
      <div className="absolute -right-1 bottom-2 w-10 h-10 bg-white/5 rounded-full" />
      <Award size={20} className="mb-2.5" />
      <div className="font-bold text-sm leading-tight">{cert.domainLabel}</div>
      <div className="text-xs opacity-80 mt-0.5">Score: {cert.score}%</div>
      <div className="text-[9px] opacity-50 mt-2 font-mono">{cert.certificateId}</div>
      <div className="text-[9px] opacity-50">{new Date(cert.earnedAt).toLocaleDateString()}</div>
    </div>
  )
}

function ProjectCard({ project, i }) {
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
      <NeuCard>
        <div className="flex items-start justify-between mb-2">
          <div className="font-bold text-sm text-slate-700 dark:text-slate-200 flex-1 mr-2">{project.name}</div>
          <div className="flex gap-1.5 shrink-0">
            {project.github && (
              <a href={project.github} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 neu-in rounded-lg flex items-center justify-center text-slate-400 hover:text-violet-500 transition-colors">
                <GitFork size={13} />
              </a>
            )}
            {project.live && (
              <a href={project.live} target="_blank" rel="noopener noreferrer"
                className="w-7 h-7 neu-in rounded-lg flex items-center justify-center text-slate-400 hover:text-teal-500 transition-colors">
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
        {project.description && (
          <p className="text-xs text-slate-400 mb-3 leading-relaxed">{project.description}</p>
        )}
        <div className="flex flex-wrap gap-1.5">
          {(project.tech || []).map((t, ti) => (
            <span key={ti} className="text-[9px] font-bold neu-in px-2 py-0.5 rounded-md text-violet-500">{t}</span>
          ))}
        </div>
      </NeuCard>
    </motion.div>
  )
}

function EditModal({ user, onSave, onClose }) {
  const [form, setForm] = useState({
    name:     user?.name || '',
    bio:      user?.bio || '',
    github:   user?.github || '',
    linkedin: user?.linkedin || '',
    skills:   (user?.skills || []).join(', '),
  })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onSave({ ...form, skills: form.skills.split(',').map(s => s.trim()).filter(Boolean) })
    setSaving(false)
  }

  const fields = [
    { key: 'name',     label: 'Display Name',          placeholder: 'Jane Developer' },
    { key: 'bio',      label: 'Bio',                   placeholder: 'Full-Stack Developer in training…' },
    { key: 'github',   label: 'GitHub URL',            placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn URL',          placeholder: 'https://linkedin.com/in/username' },
    { key: 'skills',   label: 'Skills (comma-separated)', placeholder: 'React, Node.js, MongoDB, TypeScript…' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }}
        className="w-full max-w-md bg-(--neu-bg) rounded-2xl p-5 neu-out"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-slate-700 dark:text-slate-200">Edit Profile</h3>
          <button onClick={onClose}
            className="w-8 h-8 neu-in rounded-lg flex items-center justify-center cursor-pointer border-0 bg-transparent text-slate-400 hover:text-red-400 transition-colors">
            <X size={15} />
          </button>
        </div>
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {fields.map(({ key, label, placeholder }) => (
            <div key={key}>
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">{label}</label>
              <input
                value={form[key]}
                onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                placeholder={placeholder}
                className="w-full neu-in rounded-xl px-3 py-2.5 text-sm bg-transparent text-slate-700 dark:text-slate-200 outline-none border-0 placeholder-slate-400"
              />
            </div>
          ))}
        </div>
        <NeuButton variant="primary" className="w-full mt-4" onClick={handleSave} disabled={saving}>
          {saving
            ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</span>
            : <><Save size={14} /> Save Changes</>
          }
        </NeuButton>
      </motion.div>
    </motion.div>
  )
}

export default function Profile() {
  const { user, updateUser } = useAuth()
  const { getDomainPercentage, getActivityDates } = useProgress()
  const router = useRouter()

  const [editing, setEditing] = useState(false)
  const [certs, setCerts]     = useState([])

  useEffect(() => {
    if (!user) { router.push('/auth'); return }
    api.get('/progress/certifications').then(setCerts).catch(() => {})
  }, [user, router])

  if (!user) return null

  const handleSave = async (updates) => {
    await updateUser(updates)
    setEditing(false)
  }

  const overallProgress = Math.round(
    PRACTICE_DOMAINS.reduce((s, d) => s + getDomainPercentage(d.id), 0) / PRACTICE_DOMAINS.length
  )

  const avatarSrc = user.avatar ||
    `https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(user.email)}&backgroundColor=b6e3f4`

  return (
    <div className="p-4 md:p-5 pb-24 md:pb-6">
      <AnimatePresence>
        {editing && <EditModal user={user} onSave={handleSave} onClose={() => setEditing(false)} />}
      </AnimatePresence>

      <SectionHeader title="My Profile" sub="Track your progress, certifications & projects" />

      {/* Hero Card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
        <NeuCard className="mb-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <div className="relative shrink-0">
              <img
                src={avatarSrc} alt="avatar"
                className="w-20 h-20 rounded-2xl neu-out object-cover bg-slate-100"
              />
              <button
                onClick={() => setEditing(true)}
                className="absolute -bottom-1.5 -right-1.5 w-7 h-7 gradient-purple rounded-lg flex items-center justify-center cursor-pointer border-0 shadow-lg"
              >
                <Camera size={12} className="text-white" />
              </button>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                <h1 className="font-extrabold text-xl text-slate-800 dark:text-slate-100">{user.name}</h1>
                <span className="gradient-purple text-white text-[10px] font-bold px-2.5 py-0.5 rounded-lg self-center sm:self-auto">
                  Lvl {user.level || 1}
                </span>
              </div>
              <p className="text-sm text-slate-400 mb-3 max-w-xs mx-auto sm:mx-0">
                {user.bio || 'Full-Stack Developer in training'}
              </p>
              <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                {user.github && (
                  <a href={user.github} target="_blank" rel="noopener noreferrer">
                    <NeuButton className="py-1.5! text-[11px]! px-3!gap-1.5">
                      <GitFork size={12} /> GitHub
                    </NeuButton>
                  </a>
                )}
                {user.linkedin && (
                  <a href={user.linkedin} target="_blank" rel="noopener noreferrer">
                    <NeuButton className="py-1.5! text-[11px]! px-3!gap-1.5">
                      <Link2 size={12} /> LinkedIn
                    </NeuButton>
                  </a>
                )}
                <NeuButton onClick={() => setEditing(true)} className="py-1.5! text-[11px]! px-3!gap-1.5">
                  <Edit2 size={12} /> Edit Profile
                </NeuButton>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[
              { val: user.problemsSolved || 0, label: 'Problems', color: 'text-grad-purple', icon: Code2 },
              { val: user.totalHours || 0,     label: 'Hours',    color: 'text-grad-amber',  icon: Clock },
              { val: `${user.streak || 0}🔥`,  label: 'Streak',   color: 'text-grad-green',  icon: Flame },
              { val: certs.length,             label: 'Certs',    color: 'text-grad-teal',   icon: Award },
            ].map(({ val, label, color }) => (
              <div key={label} className="neu-in rounded-xl py-3 text-center">
                <div className={`text-base font-extrabold ${color}`}>{val}</div>
                <div className="text-[9px] text-slate-400 font-semibold mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-slate-400 mb-1.5">
              <span>Overall Progress</span>
              <span className="font-bold text-violet-500">{overallProgress}%</span>
            </div>
            <ProgressBar value={overallProgress} />
          </div>
        </NeuCard>
      </motion.div>

      {/* Skills / Domain Progress */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }}>
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp size={15} className="text-violet-500" />
          <h2 className="font-bold text-slate-700 dark:text-slate-200 text-sm">Skill Progress</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {PRACTICE_DOMAINS.map((d, i) => {
            const pct = getDomainPercentage(d.id)
            return (
              <motion.div key={d.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.04 }}>
                <div
                  className="neu-in rounded-xl px-4 py-3 flex items-center gap-3 cursor-pointer hover:neu-out transition-all duration-200"
                  onClick={() => router.push('/practice')}
                >
                  <div className={`w-9 h-9 rounded-xl ${d.gradient} flex items-center justify-center shrink-0`}>
                    <Target size={15} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{d.label}</span>
                      <span className={`text-xs font-bold ${d.textGrad}`}>{pct}%</span>
                    </div>
                    <ProgressBar value={pct} color={d.gradient} />
                  </div>
                  {pct >= 100 && <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />}
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* Skills Tags */}
      {user.skills?.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}>
          <NeuCard className="mb-4">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={15} className="text-amber-400" />
              <h2 className="font-bold text-slate-700 dark:text-slate-200 text-sm">Skills</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {user.skills.map((skill, i) => (
                <span key={i} className="neu-in px-3 py-1.5 rounded-xl text-xs font-semibold text-violet-500">{skill}</span>
              ))}
            </div>
          </NeuCard>
        </motion.div>
      )}

      {/* Certifications */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="flex items-center gap-2 mb-3">
          <Award size={15} className="text-amber-400" />
          <h2 className="font-bold text-slate-700 dark:text-slate-200 text-sm">Certifications</h2>
        </div>
        {certs.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
            {certs.map((cert, i) => (
              <motion.div key={cert._id || i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 + i * 0.05 }}>
                <CertCard cert={cert} />
              </motion.div>
            ))}
          </div>
        ) : (
          <NeuCard className="mb-4 text-center py-8">
            <Award size={32} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Complete a full domain to earn your first certificate!</p>
            <NeuButton variant="primary" className="py-2! text-xs!" onClick={() => router.push('/practice')}>
              Start Practicing
            </NeuButton>
          </NeuCard>
        )}
      </motion.div>

      {/* Projects */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <GitFork size={15} className="text-slate-500 dark:text-slate-400" />
            <h2 className="font-bold text-slate-700 dark:text-slate-200 text-sm">Projects</h2>
          </div>
          <NeuButton onClick={() => setEditing(true)} className="py-1!text-[11px]! px-2.5! gap-1">
            <Plus size={11} /> Add
          </NeuButton>
        </div>
        {user.projects?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {user.projects.map((p, i) => <ProjectCard key={i} project={p} i={i} />)}
          </div>
        ) : (
          <NeuCard className="mb-4 text-center py-6">
            <GitFork size={28} className="text-slate-300 mx-auto mb-2" />
            <p className="text-sm text-slate-400 mb-3">Showcase your GitHub projects here</p>
            <NeuButton onClick={() => setEditing(true)} className="py-1.5! text-xs! gap-1">
              <Plus size={11} /> Add First Project
            </NeuButton>
          </NeuCard>
        )}
      </motion.div>

      {/* Activity */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <NeuCard>
          <h2 className="font-bold text-slate-700 dark:text-slate-200 text-sm mb-3">Activity</h2>
          <Heatmap weeks={26} compact activityDates={getActivityDates()} />
        </NeuCard>
      </motion.div>
    </div>
  )
}

'use client'
import { useMemo } from 'react'
import { motion } from 'framer-motion'

const LEVEL_STYLES = [
  'bg-slate-200 dark:bg-slate-700/50',
  'bg-violet-200 dark:bg-violet-900/50',
  'bg-violet-400 dark:bg-violet-700',
  'bg-violet-500 dark:bg-violet-500',
  'bg-violet-600 dark:bg-violet-400',
]

export default function Heatmap({ weeks = 26, compact = false, activityDates = [] }) {
  const cells = useMemo(() => {
    const dateMap = {}
    activityDates.forEach(iso => {
      const d = iso.split('T')[0]
      dateMap[d] = (dateMap[d] || 0) + 1
    })

    const today = new Date()
    const totalDays = weeks * 7
    const startDate = new Date(today)
    startDate.setDate(today.getDate() - (totalDays - 1))

    return Array.from({ length: totalDays }, (_, i) => {
      const col = i % weeks
      const row = Math.floor(i / weeks)
      const d = new Date(startDate)
      d.setDate(startDate.getDate() + col * 7 + row)
      const dateStr = d.toISOString().split('T')[0]
      const count = dateMap[dateStr] || 0
      const level = count === 0 ? 0 : count <= 1 ? 1 : count <= 3 ? 2 : count <= 5 ? 3 : 4
      return { level, dateStr, count }
    })
  }, [activityDates, weeks])

  return (
    <div>
      <div
        className="grid gap-[3px]"
        style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))` }}
      >
        {cells.map(({ level, dateStr, count }, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.001, duration: 0.2 }}
            whileHover={{ scale: 1.6, zIndex: 10 }}
            className={`${compact ? 'h-2' : 'aspect-square'} rounded-[2px] cursor-pointer transition-colors ${LEVEL_STYLES[level]}`}
            title={`${dateStr}: ${count} topic${count !== 1 ? 's' : ''} completed`}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-1.5 mt-2">
        <span className="text-[10px] text-slate-400">Less</span>
        {LEVEL_STYLES.map((s, i) => (
          <div key={i} className={`w-2.5 h-2.5 rounded-[2px] ${s}`} />
        ))}
        <span className="text-[10px] text-slate-400">More</span>
      </div>
    </div>
  )
}

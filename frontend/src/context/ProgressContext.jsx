'use client'
import { createContext, useContext, useState, useEffect } from 'react'
import { api } from '../api/api'
import { useAuth } from './AuthContext'
import { PRACTICE_DOMAINS } from '../data/appData'

const ProgressContext = createContext()

const buildDefault = () =>
  Object.fromEntries(
    PRACTICE_DOMAINS.map(d => [d.id, { percentage: 0, topics: {}, hoursSpent: 0 }])
  )

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [progress, setProgress] = useState(buildDefault)
  const [activityDates, setActivityDates] = useState([])
  const [syncing, setSyncing] = useState(false)

  useEffect(() => {
    if (!user) {
      setProgress(buildDefault())
      setActivityDates([])
      return
    }
    setSyncing(true)
    api.get('/progress')
      .then(data => {
        const map = buildDefault()
        const dates = []
        data.forEach(p => {
          map[p.domain] = {
            percentage: p.percentage,
            topics: Object.fromEntries((p.topics || []).map(t => [t.id, t.completed])),
            hoursSpent: p.hoursSpent || 0,
          }
          ;(p.topics || []).forEach(t => {
            if (t.completed && t.completedAt) dates.push(t.completedAt)
          })
        })
        setProgress(map)
        setActivityDates(dates)
      })
      .catch(() => {})
      .finally(() => setSyncing(false))
  }, [user])

  const markTopic = async (domainId, topicId, completed) => {
    const domain = PRACTICE_DOMAINS.find(d => d.id === domainId)
    if (!domain?.allTopics) return

    if (completed) {
      setActivityDates(prev => [...prev, new Date().toISOString()])
    }

    setProgress(prev => {
      const cur = prev[domainId] || { percentage: 0, topics: {}, hoursSpent: 0 }
      const topics = { ...cur.topics, [topicId]: completed }
      const done = domain.allTopics.filter(t => topics[t.id]).length
      const percentage = Math.round((done / domain.allTopics.length) * 100)
      const next = { ...prev, [domainId]: { ...cur, topics, percentage } }

      if (user) {
        const topicsArr = domain.allTopics.map(t => ({
          id: t.id, label: t.label, group: t.group,
          completed: !!topics[t.id],
          completedAt: topics[t.id] ? new Date().toISOString() : null,
        }))
        api.put(`/progress/${domainId}`, { topics: topicsArr, percentage, domainLabel: domain.label })
          .catch(() => {})
      }

      return next
    })
  }

  const getTopicStatus      = (domainId, topicId) => !!progress[domainId]?.topics[topicId]
  const getDomainPercentage = (domainId) => progress[domainId]?.percentage ?? 0
  const getActivityDates    = () => activityDates

  const getWeeklyActivity = () => {
    const now = new Date()
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(now)
      d.setDate(now.getDate() - 6 + i)
      const dayStr = d.toISOString().split('T')[0]
      const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][d.getDay()]
      const count = activityDates.filter(dt => dt.startsWith(dayStr)).length
      return { day: dayName, topics: count }
    })
  }

  return (
    <ProgressContext.Provider value={{ progress, syncing, markTopic, getTopicStatus, getDomainPercentage, getActivityDates, getWeeklyActivity }}>
      {children}
    </ProgressContext.Provider>
  )
}

export const useProgress = () => useContext(ProgressContext)

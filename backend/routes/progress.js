import express from 'express'
import Progress from '../models/Progress.js'
import Certification from '../models/Certification.js'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/', protect, async (req, res) => {
  const progress = await Progress.find({ userId: req.user._id })
  res.json(progress)
})

router.put('/:domain', protect, async (req, res) => {
  try {
    const { topics, percentage, domainLabel, hoursSpent } = req.body
    const update = { topics, percentage, lastActive: Date.now() }
    if (hoursSpent !== undefined) update.hoursSpent = hoursSpent

    const progress = await Progress.findOneAndUpdate(
      { userId: req.user._id, domain: req.params.domain },
      update,
      { upsert: true, new: true }
    )

    if (percentage >= 100) {
      const exists = await Certification.findOne({ userId: req.user._id, domain: req.params.domain })
      if (!exists) {
        await Certification.create({
          userId: req.user._id,
          domain: req.params.domain,
          domainLabel: domainLabel || req.params.domain,
          score: 95,
        })
        await User.findByIdAndUpdate(req.user._id, { $inc: { xp: 500 } })
      }
    }

    res.json(progress)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.get('/certifications', protect, async (req, res) => {
  const certs = await Certification.find({ userId: req.user._id }).sort({ earnedAt: -1 })
  res.json(certs)
})

export default router

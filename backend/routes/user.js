import express from 'express'
import User from '../models/User.js'
import { protect } from '../middleware/auth.js'

const router = express.Router()

router.get('/me', protect, (req, res) => res.json(req.user))

router.put('/me', protect, async (req, res) => {
  try {
    const allowed = ['name', 'bio', 'github', 'linkedin', 'website', 'skills', 'projects', 'avatar', 'totalHours', 'problemsSolved']
    const updates = {}
    allowed.forEach(key => { if (req.body[key] !== undefined) updates[key] = req.body[key] })
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true }).select('-password')
    res.json(user)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

export default router

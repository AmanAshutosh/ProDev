import mongoose from 'mongoose'

const topicSchema = new mongoose.Schema({
  id:          String,
  label:       String,
  group:       String,
  completed:   { type: Boolean, default: false },
  completedAt: Date,
}, { _id: false })

const progressSchema = new mongoose.Schema({
  userId:     { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  domain:     { type: String, required: true, enum: ['frontend','backend','dsa','database','devops','sysdesign'] },
  percentage: { type: Number, default: 0, min: 0, max: 100 },
  topics:     [topicSchema],
  hoursSpent: { type: Number, default: 0 },
  lastActive: { type: Date, default: Date.now },
}, { timestamps: true })

progressSchema.index({ userId: 1, domain: 1 }, { unique: true })

export default mongoose.model('Progress', progressSchema)

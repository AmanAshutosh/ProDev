import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  github: String,
  live: String,
  tech: [String],
}, { _id: false })

const userSchema = new mongoose.Schema({
  name:     { type: String, required: true, trim: true },
  email:    { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true, minlength: 6 },
  avatar:   { type: String, default: '' },
  bio:      { type: String, default: 'Full-Stack Developer in training', maxlength: 250 },
  github:   { type: String, default: '' },
  linkedin: { type: String, default: '' },
  website:  { type: String, default: '' },
  skills:   [{ type: String }],
  projects: [projectSchema],
  level:          { type: Number, default: 1 },
  xp:             { type: Number, default: 0 },
  streak:         { type: Number, default: 0 },
  lastActive:     { type: Date, default: Date.now },
  totalHours:     { type: Number, default: 0 },
  problemsSolved: { type: Number, default: 0 },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = function (candidate) {
  return bcrypt.compare(candidate, this.password)
}

export default mongoose.model('User', userSchema)

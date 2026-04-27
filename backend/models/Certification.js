import mongoose from 'mongoose'

const certificationSchema = new mongoose.Schema({
  userId:        { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  domain:        { type: String, required: true },
  domainLabel:   { type: String, required: true },
  score:         { type: Number, default: 95, min: 0, max: 100 },
  earnedAt:      { type: Date, default: Date.now },
  certificateId: { type: String, unique: true },
}, { timestamps: true })

certificationSchema.pre('save', function (next) {
  if (!this.certificateId) {
    this.certificateId = `PD-${this.domain.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`
  }
  next()
})

export default mongoose.model('Certification', certificationSchema)

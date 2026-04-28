import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDB } from './config/db.js'
import authRoutes     from './routes/auth.js'
import userRoutes     from './routes/user.js'
import progressRoutes from './routes/progress.js'
import resumeRoutes   from './routes/resume.js'

dotenv.config()
connectDB()

const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))

app.use('/api/auth',     authRoutes)
app.use('/api/user',     userRoutes)
app.use('/api/progress', progressRoutes)
app.use('/api/resume',   resumeRoutes)

app.get('/api/health', (_, res) =>
  res.json({ status: 'ok', env: process.env.NODE_ENV })
)

app.use((err, req, res, _next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Internal server error' })
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () =>
  console.log(`🚀 ProDev API running on http://localhost:${PORT}`)
)

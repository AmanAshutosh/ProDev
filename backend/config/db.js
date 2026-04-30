import mongoose from 'mongoose'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Persistent data folder — survives server restarts
const LOCAL_DB_PATH = path.join(__dirname, '..', '.mongo-data')
fs.mkdirSync(LOCAL_DB_PATH, { recursive: true })

export const connectDB = async () => {
  // 1. Try Atlas first (fast timeout so we fail quickly if IP is blocked)
  if (process.env.MONGO_URI) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 4000,
      })
      console.log(`✅ MongoDB Atlas Connected: ${conn.connection.host}`)
      return
    } catch {
      console.log('⚠️  Atlas unreachable — starting local MongoDB fallback...')
    }
  }

  // 2. Fall back to a local persistent MongoDB instance
  try {
    const { MongoMemoryServer } = await import('mongodb-memory-server')
    const mongod = await MongoMemoryServer.create({
      instance: {
        dbPath: LOCAL_DB_PATH,
        storageEngine: 'wiredTiger',
      },
    })
    const uri = mongod.getUri()
    await mongoose.connect(uri)
    console.log(`✅ Local MongoDB running at ${uri}`)
    console.log(`   Data stored in: ${LOCAL_DB_PATH}`)

    // Keep the mongod instance alive — attach it so it doesn't get GC'd
    globalThis.__mongod = mongod
  } catch (err) {
    console.error('❌ All MongoDB options failed:', err.message)
    process.exit(1)
  }
}

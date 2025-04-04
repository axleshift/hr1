import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'
import authRouter from './routes/auth.js'
import jobRouter from './routes/jobRoutes.js' // <-- New import

dotenv.config()
connectToDatabase()

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRouter)
app.use('/api/v1/request', jobRouter) // <-- Add job posting endpoint

// Server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})

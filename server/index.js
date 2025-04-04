import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'
import authRouter from './routes/auth.js'
import jobRouter from './routes/Jobroutes.js' // ✅ relative path
import employeeRouter from './routes/employeeRoutes.js' // ✅ add this route
import path from 'path'
import { fileURLToPath } from 'url'

// Required to fix __dirname issue in ES Modules
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
connectToDatabase()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folder for profile pictures
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/v1/request', jobRouter)
app.use('/api/employees', employeeRouter) // ✅ Add employee upload/view route

// Server start
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`)
})
export default app
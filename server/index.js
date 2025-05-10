import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectToDatabase from './db/db.js'
import authRouter from './routes/auth.js'
import jobRouter from './routes/Jobroutes.js'
import employeeRouter from './routes/employeeRoutes.js'
import newHireRouter from './routes/newHireroutes.js'
import employeeProfileRoutes from './routes/employeeProfileRoutes.js' // ✅ ADDED
import authSyncRouter from './routes/authSync.js'
import otpRoutes from './routes/otpRoutes.js'
import attendanceRoutes from './routes/attendanceRoutes.js'

import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

dotenv.config()
connectToDatabase()

const app = express()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

// Routes
app.use('/api/auth', authRouter)
app.use('/api/v1/request', jobRouter)
app.use('/api/employees', employeeRouter)
app.use('/api/employees', employeeProfileRoutes) // ✅ ADDED
app.use('/api/newhires', newHireRouter)
app.use('/api/auth', authSyncRouter) // 🔄 Auth sync for admin system integration
app.use('/api/otp', otpRoutes)
app.use('/api/attendance', attendanceRoutes)

// Endpoint to get current user profile from token
import { authMiddleware } from './middleware/authMiddleware.js'
import Employee from './models/employeeModel.js'

app.get('/api/employees/me', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findOne({ email: req.user.email })
    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }
    res.json({ success: true, employee })
  } catch (err) {
    console.error('Error fetching profile:', err)
    res.status(500).json({ success: false, message: 'Server error' })
  }
})

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`✅ Server is running on port ${process.env.PORT}`)
})

export default app

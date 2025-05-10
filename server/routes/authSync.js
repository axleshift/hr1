// 📁 backend/routes/authSync.js
import express from 'express'
import jwt from 'jsonwebtoken'
import Employee from '../models/employeeModel.js'
import dotenv from 'dotenv'

dotenv.config()
const router = express.Router()

// POST /api/auth/sync
router.post('/sync', async (req, res) => {
  const { email, name, role: incomingRole } = req.body

  try {
    let user = await Employee.findOne({ email })

    // If new, create employee with defaulted position/role
    if (!user) {
      const finalRole = incomingRole || 'user'

      user = await Employee.create({
        email,
        name,
        role: finalRole,                      // 💡 Stored as field
        position: finalRole,                  // 💡 Align role with position
        department: 'Not Assigned',
        status: 'Active',
        dateHired: new Date(),
      })
    }

    // 🧠 Determine actual role from DB (or fallback)
    const actualRole = user.role || user.position || 'user'

    // Generate token with correct role
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: actualRole, // ✅ Critical
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ success: true, token, user: { ...user.toObject(), role: actualRole } })
  } catch (err) {
    console.error('Auth sync error:', err)
    res.status(500).json({ success: false, error: 'User sync failed.' })
  }
})

export default router

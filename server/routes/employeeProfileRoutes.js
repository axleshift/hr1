import express from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js'
import Employee from '../models/employeeModel.js'

const router = express.Router()

// ✅ GET /api/employees/me - Get current logged-in user's profile
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id)

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }

    res.json({ success: true, employee })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error fetching profile' })
  }
})

// ✅ PUT /api/employees/profile - Update logged-in user's editable fields
router.put('/profile', authMiddleware, async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id)

    if (!employee) {
      return res.status(404).json({ success: false, message: 'Employee not found' })
    }

    const { address, phoneNumber, birthdate, gender, civilStatus } = req.body

    employee.address = address || employee.address
    employee.phoneNumber = phoneNumber || employee.phoneNumber
    employee.birthdate = birthdate || employee.birthdate
    employee.gender = gender || employee.gender
    employee.civilStatus = civilStatus || employee.civilStatus

    await employee.save()

    res.status(200).json({ success: true, message: 'Profile updated successfully' })
  } catch (err) {
    console.error('Error updating profile:', err)
    res.status(500).json({ success: false, message: 'Server error while updating profile' })
  }
})

export default router

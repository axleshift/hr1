// controller/authController.js

import jwt from 'jsonwebtoken'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid email or password' })
    }

    // ✅ DEBUG: Log the secret from .env
    console.log('DEBUG: JWT_SECRET from .env =>', process.env.JWT_SECRET)

    // Attempt to sign token
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '100d' }
    )

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('❌ Login error:', error)
    res.status(500).json({ success: false, error: 'Server error' })
  }
}

// ✅ Export verifyUser
export const verifyUser = async (req, res) => {
  try {
    const user = req.user
    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}

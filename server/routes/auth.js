// routes/auth.js

import express from 'express'
import { login, verifyUser } from '../controller/authController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'


const router = express.Router()

// Login route
router.post('/login', login)

// ✅ Token verification route (uses middleware to decode the JWT)
router.get('/verify', authMiddleware, verifyUser)

export default router

 
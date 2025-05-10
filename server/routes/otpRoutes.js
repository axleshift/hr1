import express from 'express'
import {
  sendOtp,
  verifyOtp,
  sendOtpForLogin,
  verifyOtpForLogin,
} from '../controller/otpController.js'

const router = express.Router()

// 🔁 Forgot Password OTP
router.post('/send', sendOtp)
router.post('/verify', verifyOtp)

// 🔐 Login 2FA OTP
router.post('/send-login', sendOtpForLogin)
router.post('/verify-login', verifyOtpForLogin)

export default router

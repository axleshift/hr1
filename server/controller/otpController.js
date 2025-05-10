import transporter from '../config/nodemailer.js'

// 💾 In-memory store (simple, dev-safe)
let otpStore = {} // Stores both forgot-password & login OTPs

// 📤 Forgot Password OTP
export const sendOtp = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email required' })

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 5 * 60 * 1000

  otpStore[email] = { otp, expiresAt }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Password Reset OTP',
    text: `Your OTP for resetting your password is: ${otp} (valid for 5 minutes)`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true, message: 'OTP sent' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message })
  }
}

// ✅ Login 2FA OTP
export const sendOtpForLogin = async (req, res) => {
  const { email } = req.body
  if (!email) return res.status(400).json({ message: 'Email required' })

  const otp = Math.floor(100000 + Math.random() * 900000).toString()
  const expiresAt = Date.now() + 5 * 60 * 1000

  // Store separately using suffix for clarity
  otpStore[`${email}_login`] = { otp, expiresAt }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Login 2FA OTP',
    text: `Your login OTP is: ${otp} (valid for 5 minutes)`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ success: true, message: 'Login OTP sent' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to send OTP', error: error.message })
  }
}

// 📥 Forgot Password OTP verify
export const verifyOtp = (req, res) => {
  const { email, otp } = req.body
  const record = otpStore[email]

  if (!record) return res.status(400).json({ success: false, message: 'OTP not found' })

  const isExpired = Date.now() > record.expiresAt
  const isMatch = otp === record.otp

  if (isExpired) {
    delete otpStore[email]
    return res.status(400).json({ success: false, message: 'OTP expired' })
  }

  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' })
  }

  delete otpStore[email]
  res.status(200).json({ success: true, message: 'OTP verified' })
}

// ✅ Login 2FA OTP verify
export const verifyOtpForLogin = (req, res) => {
  const { email, otp } = req.body
  const record = otpStore[`${email}_login`]

  if (!record) return res.status(400).json({ success: false, message: 'OTP not found' })

  const isExpired = Date.now() > record.expiresAt
  const isMatch = otp === record.otp

  if (isExpired) {
    delete otpStore[`${email}_login`]
    return res.status(400).json({ success: false, message: 'OTP expired' })
  }

  if (!isMatch) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' })
  }

  delete otpStore[`${email}_login`]
  res.status(200).json({ success: true, message: 'Login OTP verified' })
}

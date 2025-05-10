import OTP from '../models/otpModel.js'
import nodemailer from 'nodemailer'

export const sendLoginOtp = async (req, res) => {
  const { email } = req.body

  if (!email) return res.status(400).json({ message: 'Email is required.' })

  try {
    const code = Math.floor(100000 + Math.random() * 900000).toString()

    await OTP.findOneAndUpdate(
      { email },
      { otp: code, createdAt: new Date(), type: 'login' },
      { upsert: true, new: true }
    )

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password
      },
    })

    await transporter.sendMail({
      from: `"AxleShift HR 1 Login" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: '🔐 Your AxleShift HR 1 Login Verification Code',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 30px; background-color: #f9f9f9; border: 1px solid #ddd; border-radius: 8px;">
          <div style="text-align: center; margin-bottom: 20px;">
            <img src="https://backend-hr1.axleshift.com/uploads/logo.png" alt="AxleShift Logo" style="max-width: 120px;" />
            <h2 style="color: #004080; margin-top: 10px;">AxleShift HR 1</h2>
          </div>

          <p style="font-size: 16px; color: #333;">Hi,</p>

          <p style="font-size: 15px; color: #333;">
            Your <strong>login verification code</strong> is:
          </p>

          <div style="text-align: center; font-size: 32px; font-weight: bold; color: #222; background: #e6f0ff; padding: 15px; border-radius: 6px; letter-spacing: 10px; margin: 20px 0;">
            ${code}
          </div>

          <p style="font-size: 14px; color: #555;">
            This code will expire in <strong>5 minutes</strong>. If you did not attempt to log in, please ignore this message.
          </p>

          <hr style="margin: 30px 0;" />

          <p style="font-size: 12px; color: #999;">
            Sent by <strong>AxleShift HR 1</strong> — secure HRMS for logistics and operations.
          </p>
        </div>
      `,
    })

    return res.status(200).json({ message: 'OTP sent to your email.' })
  } catch (err) {
    console.error('Send OTP error:', err)
    return res.status(500).json({ message: 'Failed to send OTP.' })
  }
}

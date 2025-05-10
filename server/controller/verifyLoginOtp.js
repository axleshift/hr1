import OTP from '../models/otpModel.js'

export const verifyLoginOtp = async (req, res) => {
  const { email, otp } = req.body

  if (!email || !otp) {
    return res.status(400).json({ message: 'Email and OTP are required.' })
  }

  try {
    const record = await OTP.findOne({ email })

    if (!record) {
      return res.status(400).json({ message: 'No OTP found or it expired.' })
    }

    if (record.code !== otp) {
      return res.status(401).json({ message: 'Invalid OTP. Please try again.' })
    }

    // Valid OTP — delete it manually
    await OTP.deleteOne({ email })

    return res.status(200).json({ message: 'OTP verified successfully!' })
  } catch (err) {
    console.error('Verify OTP error:', err)
    return res.status(500).json({ message: 'Server error verifying OTP.' })
  }
}

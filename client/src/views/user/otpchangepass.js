import React, { useEffect, useState, useRef } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormInput,
  CAlert,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'

const VerifyOTP = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [email, setEmail] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const [resentSuccess, setResentSuccess] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300)
  const inputsRef = useRef([])
  const hasSentOTP = useRef(false)

  const userEmail = JSON.parse(localStorage.getItem('user'))?.email

  useEffect(() => {
    if (userEmail) {
      setEmail(maskEmail(userEmail))
      if (!hasSentOTP.current) {
        hasSentOTP.current = true
        sendOTP()
      }
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const maskEmail = (email) => {
    const [username, domain] = email.split('@')
    const masked = username.slice(0, 2) + '*'.repeat(username.length - 2)
    return masked + '@' + domain
  }

  const sendOTP = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/otp/send`,
        { email: userEmail },
      )
    } catch (err) {
      console.error('Send OTP Error:', err)
      setError('⚠️ Failed to send OTP. Please try resending.')
    }
  }

  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/, '')
    if (!value) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (index < 5) inputsRef.current[index + 1]?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp]
      if (newOtp[index]) {
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        inputsRef.current[index - 1]?.focus()
        const updatedOtp = [...otp]
        updatedOtp[index - 1] = ''
        setOtp(updatedOtp)
      }
    }
  }

  const handleOTPSubmit = async (e) => {
    e.preventDefault()
    const finalOtp = otp.join('')
    if (finalOtp.length !== 6) {
      setError('Please enter a valid 6-digit OTP.')
      return
    }

    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/otp/verify`,
        { email: userEmail, otp: finalOtp },
      )

      if (res.data.success) {
        setSuccess('✅ OTP Verified! Redirecting...')
        setTimeout(() => {
          window.location.href = '/change-password'
        }, 2000)
      } else {
        setError('❌ Invalid OTP. Please try again.')
      }
    } catch (err) {
      console.error('Verification error', err)
      setError('⚠️ Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setResending(true)
    setError(null)
    setResentSuccess(false)

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/otp/send`,
        { email: userEmail },
      )

      if (res.data.success) {
        setResentSuccess(true)
        setTimeLeft(300)
      } else {
        setError('Failed to resend OTP.')
      }
    } catch (err) {
      console.error('Resend error', err)
      setError('Server error while resending OTP.')
    } finally {
      setResending(false)
    }
  }

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <CCol md={6} lg={4}>
        <CCard style={{ borderRadius: '1rem' }}>
          <CCardHeader className="text-center bg-transparent border-0 pt-4">
            <h4 className="fw-bold">Verify Your Account</h4>
            <p className="text-muted small mt-2">
              Enter the 6-digit code that was sent to <br />
              <strong>{email}</strong>
            </p>
          </CCardHeader>
          <CCardBody className="pb-4 px-4">
            {error && (
              <CAlert color="danger" className="text-center">
                {error}
              </CAlert>
            )}
            {success && (
              <CAlert color="success" className="text-center">
                {success}
              </CAlert>
            )}
            {resentSuccess && (
              <CAlert color="info" className="text-center">
                ✅ OTP resent successfully!
              </CAlert>
            )}

            <form onSubmit={handleOTPSubmit}>
              <div className="d-flex justify-content-center gap-2 mb-3">
                {otp.map((digit, index) => (
                  <CFormInput
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className="text-center"
                    style={{
                      fontSize: '1.5rem',
                      width: '3rem',
                      height: '3.5rem',
                      borderRadius: '0.5rem',
                    }}
                    required
                  />
                ))}
              </div>

              <CButton color="primary" className="w-100 mb-2" type="submit" disabled={loading}>
                {loading ? <CSpinner size="sm" /> : 'Confirm Code'}
              </CButton>

              <p className="text-center small text-muted mb-0">
                This helps protect your account and data.
              </p>
              <p className="text-center small mt-2">
                {timeLeft > 0 ? (
                  `Resend OTP in: ${formatTime(timeLeft)}`
                ) : (
                  <CButton
                    type="button"
                    color="link"
                    className="px-0"
                    onClick={handleResend}
                    disabled={resending}
                  >
                    {resending ? <CSpinner size="sm" /> : 'Resend OTP'}
                  </CButton>
                )}
              </p>
            </form>
          </CCardBody>
        </CCard>
      </CCol>
    </div>
  )
}

export default VerifyOTP

import React, { useEffect, useRef, useState } from 'react'
import { CButton, CCard, CCardBody, CForm, CAlert, CSpinner } from '@coreui/react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const Login2FA = () => {
  const navigate = useNavigate()
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendCooldown, setResendCooldown] = useState(60)
  const [error, setError] = useState('')
  const [sendError, setSendError] = useState('')
  const inputRefs = useRef([])
  const hasSentInitialOtp = useRef(false)

  const email =
    useSelector((state) => state.auth?.user?.email) ||
    JSON.parse(localStorage.getItem('user') || '{}')?.email

  const maskedEmail = email
    ? email.replace(/(.{2})(.*)(?=@)/, (match, p1, p2) => p1 + '*'.repeat(p2.length))
    : ''

  useEffect(() => {
    if (!email) {
      navigate('/login')
      return
    }

    if (!hasSentInitialOtp.current) {
      sendOtp()
      hasSentInitialOtp.current = true
    }

    const timer = setInterval(() => {
      setResendCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [email, navigate])

  const sendOtp = async () => {
    setSendError('')
    try {
      await axios.post('https://backend-hr1.axleshift.com/api/otp/send-login', { email })
    } catch (err) {
      setSendError('Failed to send OTP. Please try again later.')
      console.error('OTP send error:', err)
    }
  }

  const handleChange = (e, index) => {
    const value = e.target.value
    if (!/^\d?$/.test(value)) return

    const updatedOtp = [...otp]
    updatedOtp[index] = value
    setOtp(updatedOtp)

    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (otp[index]) {
        const updatedOtp = [...otp]
        updatedOtp[index] = ''
        setOtp(updatedOtp)
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const fullOtp = otp.join('')
      const res = await axios.post('https://backend-hr1.axleshift.com/api/otp/verify-login', {
        email,
        otp: fullOtp,
      })

      localStorage.setItem('otpVerified', 'true')
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid OTP. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center"
      style={{ background: '#121321' }}
    >
      <div className="p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <CCard
          className="text-white shadow-lg border-0 rounded-4"
          style={{ backgroundColor: '#1f1f2e' }}
        >
          <CCardBody className="p-5 text-center">
            <h3 className="fw-bold mb-3">Verify Your Account</h3>
            <p className="text-light mb-1">
              Enter the 6-digit code that was sent to <strong>{maskedEmail}</strong>
            </p>

            {sendError && <CAlert color="danger">{sendError}</CAlert>}
            {error && <CAlert color="danger">{error}</CAlert>}

            <CForm onSubmit={handleSubmit}>
              <div className="d-flex justify-content-center gap-2 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    ref={(el) => (inputRefs.current[index] = el)}
                    className="form-control text-center fw-bold"
                    style={{
                      width: '50px',
                      height: '60px',
                      fontSize: '1.5rem',
                      backgroundColor: '#2d2d44',
                      border: '2px solid #444',
                      color: '#fff',
                      borderRadius: '8px',
                    }}
                  />
                ))}
              </div>

              <CButton
                type="submit"
                color="primary"
                className="w-100 py-2 mb-2 rounded-pill"
                disabled={loading}
                style={{
                  backgroundColor: '#6c63ff',
                  border: 'none',
                  fontWeight: 'bold',
                }}
              >
                {loading ? <CSpinner size="sm" /> : 'Confirm Code'}
              </CButton>
            </CForm>

            <p className="mt-3 text-muted small">
              Want to switch account?{' '}
              <span
                onClick={() => {
                  localStorage.clear()
                  navigate('/login')
                }}
                style={{ color: '#8fb8ff', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Logout
              </span>
            </p>

            <p
              className="text-white mt-3 small"
              style={{
                cursor: resendCooldown > 0 ? 'not-allowed' : 'pointer',
                textDecoration: 'underline',
                fontWeight: 'bold',
                color: resendCooldown > 0 ? '#aaa' : '#8fb8ff',
              }}
              onClick={() => {
                if (resendCooldown === 0) {
                  sendOtp()
                  setResendCooldown(60)
                }
              }}
            >
              {resendCooldown > 0 ? `Resend OTP in ${resendCooldown}s` : 'Resend OTP'}
            </p>
          </CCardBody>
        </CCard>
      </div>
    </div>
  )
}

export default Login2FA

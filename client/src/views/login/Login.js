// ✅ Updated Login Component with Redirect to 2FA
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { useAuth } from '../../context/authContext'
import bgImage from '../../assets/images/hr1-sea-bg.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const [forgotModalVisible, setForgotModalVisible] = useState(false)
  const [forgotEmail, setForgotEmail] = useState('')
  const [forgotLoading, setForgotLoading] = useState(false)
  const [forgotMessage, setForgotMessage] = useState(null)

  const { login } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    if (token && user) {
      login(JSON.parse(user))
      navigate('/dashboard', { replace: true })
    }
  }, [navigate, login])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const loginRes = await axios.post(
        'https://backend-admin.axleshift.com/integ/external-login/HR',
        { email, password },
        {
          headers: {
            Authorization: 'Bearer admin1229102',
          },
        },
      )

      if (loginRes.data.success) {
        const externalUser = loginRes.data.user

        const syncRes = await axios.post(
          'https://backend-hr1.axleshift.com/api/auth/sync',
          externalUser,
        )

        if (syncRes.data.success) {
          const token = syncRes.data.token
          const user = syncRes.data.user

          localStorage.setItem('token', token)
          localStorage.setItem('user', JSON.stringify(user))
          login(user)

          // 🚫 Reset 2FA verification flag before redirecting
          localStorage.removeItem('otpVerified')

          // 🔐 Go to 2FA verification
          navigate('/login-2fa')
        } else {
          setError('User sync failed.')
        }
      } else {
        setError('Invalid credentials. Please try again.')
      }
    } catch (err) {
      console.error('Login error:', err)
      if (err.response) {
        setError(err.response.data?.error || 'Invalid credentials. Please try again.')
      } else {
        setError('Server error. Please try again later.')
      }
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setForgotLoading(true)
    setForgotMessage(null)

    try {
      const response = await axios.post(
        'https://backend-admin.axleshift.com/general/forgot-password',
        { email: forgotEmail },
        {
          headers: {
            Authorization: 'Bearer admin1229102',
          },
        },
      )

      if (response.data.success) {
        setForgotMessage('Password reset instructions have been sent to your email.')
      } else {
        setForgotMessage(response.data.message || 'Unable to process your request.')
      }
    } catch (err) {
      console.error('Forgot Password Error:', err)
      setForgotMessage('Server error. Please try again later.')
    } finally {
      setForgotLoading(false)
    }
  }

  return (
    <div
      className="min-vh-100 d-flex flex-row align-items-center"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <div
        className="min-vh-100 w-100 d-flex align-items-center"
        style={{ backdropFilter: 'brightness(0.5)' }}
      >
        <CContainer>
          <CRow className="justify-content-center">
            <CCol md={6} lg={5} xl={4}>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {error && (
                      <CAlert color="danger">
                        <FontAwesomeIcon icon={faXmarkCircle} className="me-2" />
                        {error}
                      </CAlert>
                    )}
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        placeholder="Email or ID Number"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" disabled={loading}>
                          {loading ? 'Logging in...' : 'Login'}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-end">
                        <CButton
                          color="link"
                          className="px-0"
                          onClick={() => setForgotModalVisible(true)}
                        >
                          Forgot Password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </CContainer>
      </div>

      <CModal
        visible={forgotModalVisible}
        onClose={() => setForgotModalVisible(false)}
        backdrop="static"
        alignment="center"
      >
        <CModalHeader>
          <CModalTitle>Forgot Password</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <p>Please enter your email address to receive password reset instructions.</p>
          <CFormInput
            type="email"
            placeholder="Enter your email"
            value={forgotEmail}
            onChange={(e) => setForgotEmail(e.target.value)}
            required
          />
          {forgotMessage && (
            <CAlert color="info" className="mt-3">
              {forgotMessage}
            </CAlert>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setForgotModalVisible(false)}>
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={handleForgotPassword}
            disabled={forgotLoading || !forgotEmail}
          >
            {forgotLoading ? <CSpinner size="sm" /> : 'Send Request'}
          </CButton>
        </CModalFooter>
      </CModal>
    </div>
  )
}

export default Login

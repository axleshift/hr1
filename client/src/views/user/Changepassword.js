import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CContainer,
  CForm,
  CFormInput,
  CFormLabel,
  CButton,
  CAlert,
  CRow,
  CCol,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'

const ChangePassword = () => {
  const [email, setEmail] = useState('')
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user && user.email) {
      setEmail(user.email)
    }
  }, [])

  const isValidPassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      return setError("❌ New passwords don't match.")
    }

    if (!isValidPassword(newPassword)) {
      return setError(
        '⚠️ Password must have at least 8 characters, including 1 uppercase, 1 lowercase, and 1 special character.',
      )
    }

    try {
      setLoading(true)

      const response = await axios.post(
        'https://backend-admin.axleshift.com/integ/change-password',
        {
          email,
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: 'Bearer admin1229102', // ✅ hardcoded token
          },
        },
      )

      if (response.data.success) {
        setSuccess('✅ Password changed successfully!')
        setCurrentPassword('')
        setNewPassword('')
        setConfirmPassword('')
      } else {
        setError(response.data.message || '❌ Failed to change password.')
      }
    } catch (err) {
      console.error('Password change error:', err.message)
      setError('❌ Server error. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <CContainer className="mt-5">
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard>
            <CCardHeader className="fw-bold">🔐 Change Password</CCardHeader>
            <CCardBody>
              {error && <CAlert color="danger">{error}</CAlert>}
              {success && <CAlert color="success">{success}</CAlert>}

              <CForm onSubmit={handleSubmit}>
                <CFormLabel>Email</CFormLabel>
                <CFormInput value={email} disabled />

                <CFormLabel className="mt-3">Current Password</CFormLabel>
                <CFormInput
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />

                <CFormLabel className="mt-3">New Password</CFormLabel>
                <CFormInput
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />

                <CFormLabel className="mt-3">Confirm Password</CFormLabel>
                <CFormInput
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />

                <CButton type="submit" color="primary" className="mt-4" disabled={loading}>
                  {loading ? <CSpinner size="sm" /> : 'Update Password'}
                </CButton>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default ChangePassword

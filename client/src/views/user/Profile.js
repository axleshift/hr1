import React, { useEffect, useState } from 'react'
import {
  CAvatar,
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CFormInput,
  CFormLabel,
  CRow,
  CAlert,
} from '@coreui/react'
import axios from 'axios'

const Profile = () => {
  const [employee, setEmployee] = useState(null)
  const [editable, setEditable] = useState({
    phoneNumber: '',
    address: '',
    birthdate: '',
    gender: '',
    civilStatus: '',
  })
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('https://backend-hr1.axleshift.com/api/employees/me', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        setEmployee(res.data.employee)
        setEditable({
          phoneNumber: res.data.employee.phoneNumber || '',
          address: res.data.employee.address || '',
          birthdate: res.data.employee.birthdate || '',
          gender: res.data.employee.gender || '',
          civilStatus: res.data.employee.civilStatus || '',
        })
      } catch (err) {
        console.error('Failed to fetch profile info', err)
        setError('Failed to load profile.')
      }
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setEditable((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async () => {
    try {
      const res = await axios.put(
        'https://backend-hr1.axleshift.com/api/employees/profile',
        editable,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      setSuccess('Profile updated successfully.')
      setEmployee((prev) => ({ ...prev, ...editable }))
    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Failed to update profile.')
    }
  }

  return (
    <CContainer className="mt-4">
      <CRow>
        <CCol md={10} className="mx-auto">
          <CCard>
            <CCardHeader className="fw-bold">👤 My Profile</CCardHeader>
            <CCardBody>
              {error && <CAlert color="danger">{error}</CAlert>}
              {success && <CAlert color="success">{success}</CAlert>}

              {employee ? (
                <>
                  <CRow className="mb-4">
                    <CCol md={4} className="text-center">
                      <CAvatar
                        size="xxl"
                        src={
                          employee.photo?.startsWith('/uploads')
                            ? `https://backend-hr1.axleshift.com${employee.photo}`
                            : employee.photo
                        }
                        shape="circle"
                        color="info"
                        className="mb-2"
                      />
                      <p className="text-muted mt-2">
                        {employee.firstName} {employee.lastName}
                      </p>
                      <CBadge color="success" className="text-capitalize">
                        {employee.employmentStatus}
                      </CBadge>
                    </CCol>
                    <CCol md={8}>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CFormLabel>Employee ID</CFormLabel>
                          <CFormInput disabled value={employee.employeeId} />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel>Department</CFormLabel>
                          <CFormInput disabled value={employee.department} />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CFormLabel>Position</CFormLabel>
                          <CFormInput disabled value={employee.position} />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel>Status</CFormLabel>
                          <CFormInput disabled value={employee.employmentStatus} />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CFormLabel>Email</CFormLabel>
                          <CFormInput disabled value={employee.email} />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel>Phone Number</CFormLabel>
                          <CFormInput
                            name="phoneNumber"
                            value={editable.phoneNumber}
                            onChange={handleChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CFormLabel>Address</CFormLabel>
                          <CFormInput
                            name="address"
                            value={editable.address}
                            onChange={handleChange}
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel>Date Hired</CFormLabel>
                          <CFormInput disabled value={employee.dateHired} />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CFormLabel>Birthdate</CFormLabel>
                          <CFormInput
                            type="date"
                            name="birthdate"
                            value={editable.birthdate}
                            onChange={handleChange}
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel>Gender</CFormLabel>
                          <CFormInput
                            name="gender"
                            value={editable.gender}
                            onChange={handleChange}
                          />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={6}>
                          <CFormLabel>Civil Status</CFormLabel>
                          <CFormInput
                            name="civilStatus"
                            value={editable.civilStatus}
                            onChange={handleChange}
                          />
                        </CCol>
                        <CCol md={6}>
                          <CFormLabel>SSS Number</CFormLabel>
                          <CFormInput disabled value={employee?.governmentIds?.sss || '-'} />
                        </CCol>
                      </CRow>
                      <CRow className="mb-3">
                        <CCol md={4}>
                          <CFormLabel>PhilHealth Number</CFormLabel>
                          <CFormInput disabled value={employee?.governmentIds?.philhealth || '-'} />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel>Pag-IBIG Number</CFormLabel>
                          <CFormInput disabled value={employee?.governmentIds?.pagibig || '-'} />
                        </CCol>
                        <CCol md={4}>
                          <CFormLabel>TIN Number</CFormLabel>
                          <CFormInput disabled value={employee?.governmentIds?.tin || '-'} />
                        </CCol>
                      </CRow>

                      <div className="text-end mt-4">
                        <CButton color="primary" onClick={handleSave}>
                          Save Changes
                        </CButton>
                      </div>
                    </CCol>
                  </CRow>
                </>
              ) : (
                <p>Loading profile...</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile

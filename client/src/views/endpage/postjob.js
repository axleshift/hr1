import React, { useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CFormSelect,
  CButton,
  CAlert,
  CRow,
  CCol,
} from '@coreui/react'

const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: '',
    responsibilities: '',
    requirements: '',
    qualifications: '',
    benefits: '',
    category: '',
    capacity: 1,
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    setError(false)

    try {
      const response = await axios.post(
        'https://backend-hr2.axleshift.com/api/v1/request/jobposting',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '107a396b-6eed-42ee-89e8-3eecc8acf73b',
          },
        },
      )
      setMessage(response.data.message || 'Job created successfully!')
    } catch (err) {
      setMessage(err.response?.data?.message || 'An unexpected error occurred')
      setError(true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CCard>
      <CCardHeader className="fw-bold">📢 Post a New Job</CCardHeader>
      <CCardBody>
        {message && (
          <CAlert color={error ? 'danger' : 'success'} dismissible>
            {message}
          </CAlert>
        )}

        <CForm onSubmit={handleSubmit}>
          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Job Title</CFormLabel>
              <CFormInput
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Frontend Developer"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Category</CFormLabel>
              <CFormSelect
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select category</option>
                <option value="internship">Internship</option>
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="temporary">Temporary</option>
                <option value="freelance">Freelance</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Responsibilities</CFormLabel>
              <CFormTextarea
                name="responsibilities"
                value={formData.responsibilities}
                onChange={handleChange}
                placeholder="List the job responsibilities here..."
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Requirements</CFormLabel>
              <CFormTextarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                placeholder="List the job requirements here..."
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormLabel>Qualifications</CFormLabel>
              <CFormInput
                name="qualifications"
                value={formData.qualifications}
                onChange={handleChange}
                placeholder="e.g. Bachelor’s degree in IT"
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormLabel>Benefits</CFormLabel>
              <CFormInput
                name="benefits"
                value={formData.benefits}
                onChange={handleChange}
                placeholder="e.g. Health insurance, remote work"
                required
              />
            </CCol>
          </CRow>

          <CRow className="mb-4">
            <CCol md={4}>
              <CFormLabel>Capacity</CFormLabel>
              <CFormInput
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                placeholder="e.g. 3"
              />
            </CCol>
          </CRow>

          <div className="d-flex justify-content-end">
            <CButton type="submit" color="primary" disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </CButton>
          </div>
        </CForm>
      </CCardBody>
    </CCard>
  )
}

export default JobPosting

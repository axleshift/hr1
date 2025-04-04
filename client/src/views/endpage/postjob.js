import React, { useState } from 'react'
import axios from 'axios'
import {
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CInputGroup,
  CInputGroupText,
  CFormSelect,
  CButton,
} from '@coreui/react'

const JobPosting = () => {
  const [formData, setFormData] = useState({
    title: '',
    responsibilities: '',
    requirements: '',
    qualifications: '',
    benefits: '',
    category: '',
    capacity: 1
  })

  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      const response = await axios.post(
        'https://backend-hr2.axleshift.com/api/v1/request/jobposting',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': '107a396b-6eed-42ee-89e8-3eecc8acf73b', // ✅ API key set here
          },
        }
      )

      setMessage(response.data.message || 'Job created successfully!')
      console.log(response.data.data)
    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message)
      } else {
        setMessage('An unexpected error occurred')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <CFormLabel htmlFor="title">Job Title</CFormLabel>
      <CFormInput
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="mb-3"
        required
      />

      <CFormLabel htmlFor="category">Job Category</CFormLabel>
      <CFormSelect
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="mb-3"
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

      <CFormLabel>Responsibilities</CFormLabel>
      <CFormTextarea
        name="responsibilities"
        value={formData.responsibilities}
        onChange={handleChange}
        className="mb-3"
        required
      />

      <CFormLabel>Requirements</CFormLabel>
      <CFormTextarea
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        className="mb-3"
        required
      />

      <CFormLabel>Qualifications</CFormLabel>
      <CFormInput
        name="qualifications"
        value={formData.qualifications}
        onChange={handleChange}
        className="mb-3"
        required
      />

      <CFormLabel>Benefits</CFormLabel>
      <CFormInput
        name="benefits"
        value={formData.benefits}
        onChange={handleChange}
        className="mb-3"
        required
      />

      <CFormLabel>Capacity</CFormLabel>
      <CFormInput
        type="number"
        name="capacity"
        value={formData.capacity}
        onChange={handleChange}
        className="mb-3"
      />

      <div className="d-flex justify-content-center mt-3">
        <CButton type="submit" color="primary" disabled={loading}>
          {loading ? 'Posting...' : 'POST JOB'}
        </CButton>
      </div>

      {message && (
        <p className="text-center mt-3">
          <strong>{message}</strong>
        </p>
      )}
    </form>
  )
}

export default JobPosting

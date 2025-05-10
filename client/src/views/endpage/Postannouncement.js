import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormTextarea,
  CFormSelect,
  CButton,
  CContainer,
  CRow,
  CCol,
  CAlert,
  CSpinner,
  CBadge,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faArchive } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

const PostAnnouncement = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [tag, setTag] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')
  const [announcements, setAnnouncements] = useState([])

  const tagOptions = [
    { label: '📢 Mandatory', value: 'mandatory' },
    { label: '🕒 Upcoming', value: 'upcoming' },
    { label: '🚨 Urgent', value: 'urgent' },
    { label: '📅 Schedule', value: 'schedule' },
    { label: '🆕 New Policy', value: 'new-policy' },
    { label: '✅ Completed', value: 'completed' },
  ]

  useEffect(() => {
    fetchAnnouncements()
  }, [])

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/announcements`,
      )
      setAnnouncements(res.data)
    } catch (err) {
      console.error(err)
      setError('Failed to load announcements.')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/announcements`,
        { title, description, tag },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )

      setSuccess(true)
      setTitle('')
      setDescription('')
      setTag('')
      fetchAnnouncements()
    } catch {
      setError('Failed to post announcement.')
    } finally {
      setLoading(false)
    }
  }

  const archiveAnnouncement = async (id) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/announcements/${id}/archive`,
        {},
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )
      fetchAnnouncements()
    } catch (err) {
      console.error(err)
      alert('Failed to archive.')
    }
  }

  const getTagBadge = (tag) => {
    const tagMap = {
      mandatory: { label: '📢 Mandatory', color: 'danger' },
      upcoming: { label: '🕒 Upcoming', color: 'info' },
      urgent: { label: '🚨 Urgent', color: 'warning' },
      schedule: { label: '📅 Schedule', color: 'primary' },
      'new-policy': { label: '🆕 New Policy', color: 'secondary' },
      completed: { label: '✅ Completed', color: 'success' },
    }
    const badge = tagMap[tag]
    return badge ? <CBadge color={badge.color}>{badge.label}</CBadge> : null
  }

  return (
    <CContainer className="mt-5">
      <CRow className="justify-content-center">
        <CCol md={8}>
          <CCard className="shadow-lg border-0 rounded-4 mb-4">
            <CCardHeader className="bg-primary text-white fs-5 fw-semibold d-flex align-items-center gap-2">
              <FontAwesomeIcon icon={faBullhorn} />
              Post New Announcement
            </CCardHeader>
            <CCardBody className="p-4">
              <CForm onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Title</label>
                  <CFormInput
                    type="text"
                    placeholder="What's the announcement about?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Description</label>
                  <CFormTextarea
                    rows={6}
                    placeholder="Type the full announcement here..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Tag</label>
                  <CFormSelect value={tag} onChange={(e) => setTag(e.target.value)} required>
                    <option value="">Select Tag</option>
                    {tagOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </CFormSelect>
                </div>

                {error && <CAlert color="danger">{error}</CAlert>}
                {success && <CAlert color="success">✅ Announcement posted successfully!</CAlert>}

                <div className="d-grid">
                  <CButton
                    type="submit"
                    color="primary"
                    size="lg"
                    className="rounded-pill shadow-sm"
                    disabled={loading}
                  >
                    {loading ? <CSpinner size="sm" /> : '📢 Publish Announcement'}
                  </CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>

          {/* 📜 Existing Announcements */}
          <CCard className="shadow-sm rounded-4">
            <CCardHeader className="bg-light fw-semibold">📜 Past Announcements</CCardHeader>
            <CCardBody className="p-3">
              {announcements.length === 0 ? (
                <p className="text-muted">No announcements posted yet.</p>
              ) : (
                announcements.map((a) => (
                  <div key={a._id} className="border-bottom pb-2 mb-3">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="mb-0 fw-bold">{a.title}</h6>
                      {getTagBadge(a.tag)}
                    </div>
                    <p className="mb-1">{a.description}</p>
                    <small className="text-muted">
                      Posted: {new Date(a.createdAt).toLocaleString()}
                    </small>
                    <div className="mt-2 text-end">
                      <CButton
                        color="danger"
                        size="sm"
                        variant="outline"
                        onClick={() => archiveAnnouncement(a._id)}
                      >
                        <FontAwesomeIcon icon={faArchive} className="me-1" />
                        Archive
                      </CButton>
                    </div>
                  </div>
                ))
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default PostAnnouncement

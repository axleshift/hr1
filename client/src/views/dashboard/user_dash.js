import React, { useEffect, useState } from 'react'
import {
  CBadge,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CRow,
  CWidgetStatsB,
  CAlert,
  CSpinner,
  CCollapse,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
} from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBullhorn, faCalendarAlt, faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const UserDashboard = () => {
  const [employee, setEmployee] = useState(null)
  const [attendanceRecords, setAttendanceRecords] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showAnnouncement, setShowAnnouncement] = useState(false)
  const [announcements, setAnnouncements] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [activeAnnouncement, setActiveAnnouncement] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    fetchProfile()
    fetchAnnouncements()
  }, [])

  useEffect(() => {
    if (employee) {
      const now = new Date()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const year = String(now.getFullYear())
      fetchAttendance(employee.employeeId, month, year)
    }
  }, [employee])

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/employees/me`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )
      setEmployee(res.data.employee)
    } catch {
      setError('Failed to load profile.')
    }
  }

  const fetchAnnouncements = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/announcements`,
      )
      setAnnouncements(res.data)
    } catch {
      setError('Failed to load announcements.')
    }
  }

  const fetchAttendance = async (employeeId, month, year) => {
    setLoading(true)
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/attendance/${employeeId}`,
      )
      const filtered = res.data.filter((r) => {
        const d = new Date(r.date)
        return d.getMonth() + 1 === parseInt(month) && d.getFullYear() === parseInt(year)
      })
      setAttendanceRecords(filtered)
    } catch {
      setError('Failed to load attendance.')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalHours = () =>
    attendanceRecords.reduce((total, r) => total + parseFloat(r.hoursWorked || 0), 0)

  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good Morning'
    if (hour < 18) return 'Good Afternoon'
    return 'Good Evening'
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
    <CContainer fluid className="px-4 py-4">
      {/* 👋 Greeting */}
      <CRow className="mb-4">
        <CCol>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="fw-bold display-3"
            style={{
              color: '#ffffff',
              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.8)',
              marginBottom: '1rem',
            }}
          >
            {employee ? `${getGreeting()}! ${employee.firstName}` : 'Welcome!'}
          </motion.h1>
        </CCol>
      </CRow>

      {/* 📢 Announcement */}
      <CRow className="mb-4">
        <CCol md={12}>
          <div
            className="bg-dark text-white p-4 rounded-3 shadow-sm border-start border-warning border-4"
            style={{ cursor: 'pointer' }}
            onClick={() => setShowAnnouncement(!showAnnouncement)}
          >
            <h5 className="fw-semibold mb-0">
              <FontAwesomeIcon icon={faBullhorn} className="me-2" />
              HR Announcements ({announcements.length})
            </h5>
          </div>
          <CCollapse visible={showAnnouncement}>
            <div className="bg-body p-4 shadow-sm border-start border-3 border-warning rounded-bottom">
              {announcements.length === 0 ? (
                <p className="mb-0">No announcements available.</p>
              ) : (
                announcements.map((a) => (
                  <div
                    key={a._id}
                    className="mb-3 p-2 rounded border border-light hover-shadow"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      setActiveAnnouncement(a)
                      setModalVisible(true)
                    }}
                  >
                    <div className="d-flex justify-content-between align-items-center">
                      <h6 className="fw-bold mb-0">{a.title}</h6>
                      {getTagBadge(a.tag)}
                    </div>
                    <p className="text-truncate">{a.description}</p>
                    <small className="text-muted">
                      Posted: {new Date(a.createdAt).toLocaleString()}
                    </small>
                    <hr />
                  </div>
                ))
              )}
            </div>
          </CCollapse>
        </CCol>
      </CRow>

      {/* 📊 Widgets */}
      <CRow className="mb-4">
        {/* 🕒 ATTENDANCE (auto month total) */}
        <CCol xl={4} md={6}>
          <CWidgetStatsB
            className="mb-4 shadow-sm"
            progress={{ color: 'info', value: 100 }}
            text={<span className="text-medium-emphasis small">Total hours worked this month</span>}
            title="Attendance Hours"
            value={loading ? 'Loading...' : `${calculateTotalHours().toFixed(2)} hrs`}
            icon={<FontAwesomeIcon icon={faCalendarAlt} size="lg" />}
            color="info"
          />
        </CCol>

        {/* 💵 PAYSLIP */}
        <CCol xl={4} md={6}>
          <CWidgetStatsB
            className="mb-4 shadow-sm"
            progress={{ color: 'success', value: 100 }}
            text={
              <span className="text-medium-emphasis small">
                Latest net pay issued on April 30, 2025
              </span>
            }
            title="Latest Payslip"
            value="₱18,700.00"
            icon={<FontAwesomeIcon icon={faMoneyBill} size="lg" />}
            color="success"
          />
        </CCol>
      </CRow>

      {/* ❌ Error Fallback */}
      {error && (
        <CRow>
          <CCol>
            <CAlert color="danger">{error}</CAlert>
          </CCol>
        </CRow>
      )}

      {/* 🔍 Announcement Modal */}
      <CModal visible={modalVisible} onClose={() => setModalVisible(false)}>
        <CModalHeader>
          <CModalTitle>{activeAnnouncement?.title}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {getTagBadge(activeAnnouncement?.tag)}
          <p className="mt-3">{activeAnnouncement?.description}</p>
          <hr />
          <small className="text-muted">
            Posted by: {activeAnnouncement?.postedBy || 'Admin'} <br />
            Date: {activeAnnouncement && new Date(activeAnnouncement.createdAt).toLocaleString()}
          </small>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setModalVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default UserDashboard

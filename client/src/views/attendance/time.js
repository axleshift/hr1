import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CButton,
  CAlert,
  CSpinner,
  CBadge,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormSelect,
} from '@coreui/react'
import axios from 'axios'

const EmployeeAttendance = () => {
  const [employee, setEmployee] = useState(null)
  const [status, setStatus] = useState('loading')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [currentTime, setCurrentTime] = useState('')
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')

  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  useEffect(() => {
    fetchEmployee()
    const interval = setInterval(() => {
      const now = new Date()
      setCurrentTime(now.toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (selectedMonth && selectedYear) {
      const filtered = records.filter((r) => {
        const d = new Date(r.date)
        return (
          d.getMonth() + 1 === parseInt(selectedMonth) && d.getFullYear() === parseInt(selectedYear)
        )
      })
      setFilteredRecords(filtered)
    } else {
      setFilteredRecords(records)
    }
  }, [records, selectedMonth, selectedYear])

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/employees/me`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )
      setEmployee(res.data.employee)
      fetchTodayStatus(res.data.employee.employeeId)
      fetchAttendanceHistory(res.data.employee.employeeId)
    } catch {
      setMessage('❌ Failed to load employee.')
    }
  }

  const fetchTodayStatus = async (employeeId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/attendance/today-status/${employeeId}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )
      setStatus(res.data.status)
    } catch (error) {
      console.error("Error fetching today's status:", error)
      setMessage("⚠️ Failed to check today's status.")
      setStatus('out')
    }
  }

  const fetchAttendanceHistory = async (employeeId) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/attendance/${employeeId}`,
      )
      setRecords(res.data.reverse())
    } catch {
      setMessage('⚠️ Failed to load attendance history.')
    }
  }

  const handleClock = async (type) => {
    if (!employee) return
    setLoading(true)
    setMessage('')
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/attendance/clock`,
        { employeeId: employee.employeeId, type },
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } },
      )
      setMessage(res.data.message)
      setStatus(type === 'in' ? 'in' : 'out')
      fetchAttendanceHistory(employee.employeeId)
    } catch {
      setMessage('❌ Failed to record attendance.')
    } finally {
      setLoading(false)
    }
  }

  const handleDownloadCSV = () => {
    const header = ['Date', 'Check In', 'Check Out', 'Hours Worked']
    const rows = filteredRecords.map((r) => [
      r.date,
      r.checkIn || '--',
      r.checkOut || '--',
      r.hoursWorked || '0',
    ])
    const csvContent = [header, ...rows]
      .map((row) => row.map((val) => `"${val}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `attendance_${employee?.employeeId || 'records'}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <CContainer className="py-5">
      {/* Clock In/Out */}
      <CRow className="justify-content-center mb-4">
        <CCol md={6}>
          <CCard className="text-center shadow rounded-4">
            <CCardHeader className="bg-dark text-white fs-5 fw-semibold">
              ⏱ Time & Attendance
            </CCardHeader>
            <CCardBody>
              <h5>
                {employee?.firstName}, you are currently{' '}
                <CBadge color={status === 'in' ? 'success' : 'secondary'}>
                  {status === 'in' ? 'Clocked In' : 'Clocked Out'}
                </CBadge>
              </h5>
              <p className="text-muted mb-1">
                Current Time: <strong>{currentTime}</strong>
              </p>
              {message && (
                <CAlert color="info" className="mt-2">
                  {message}
                </CAlert>
              )}
              <div className="d-flex justify-content-center gap-3 mt-3">
                {status === 'out' ? (
                  <CButton
                    color="success"
                    size="lg"
                    className="px-4 rounded-pill"
                    onClick={() => handleClock('in')}
                    disabled={loading}
                  >
                    {loading ? <CSpinner size="sm" /> : '🕒 Clock In'}
                  </CButton>
                ) : (
                  <CButton
                    color="danger"
                    size="lg"
                    className="px-4 rounded-pill"
                    onClick={() => handleClock('out')}
                    disabled={loading}
                  >
                    {loading ? <CSpinner size="sm" /> : '⏹ Clock Out'}
                  </CButton>
                )}
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Filters */}
      <CRow className="mb-3 justify-content-end">
        <CCol md={3}>
          <CFormSelect value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
            <option value="">Select Month</option>
            {months.map((m) => (
              <option key={m.value} value={m.value}>
                {m.name}
              </option>
            ))}
          </CFormSelect>
        </CCol>
        <CCol md={2}>
          <CFormSelect value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
            <option value="">Select Year</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </CFormSelect>
        </CCol>
      </CRow>

      {/* Export */}
      <CRow className="mb-2">
        <CCol className="text-end">
          <CButton color="info" className="me-2 text-white" onClick={handleDownloadCSV}>
            📥 Download CSV
          </CButton>
          <CButton color="secondary" onClick={() => window.print()}>
            🖨️ Print
          </CButton>
        </CCol>
      </CRow>

      {/* Table */}
      <CRow>
        <CCol>
          <CCard className="shadow-sm rounded-4">
            <CCardHeader className="fw-semibold">📋 Attendance Records</CCardHeader>
            <CCardBody>
              <CTable hover responsive bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Check In</CTableHeaderCell>
                    <CTableHeaderCell>Check Out</CTableHeaderCell>
                    <CTableHeaderCell>Hours Worked</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {filteredRecords.length === 0 ? (
                    <CTableRow>
                      <CTableDataCell colSpan={4} className="text-center text-muted">
                        No records found.
                      </CTableDataCell>
                    </CTableRow>
                  ) : (
                    filteredRecords.map((r, idx) => (
                      <CTableRow key={idx}>
                        <CTableDataCell>{r.date}</CTableDataCell>
                        <CTableDataCell>{r.checkIn || '--'}</CTableDataCell>
                        <CTableDataCell>{r.checkOut || '--'}</CTableDataCell>
                        <CTableDataCell>{r.hoursWorked || '0'}</CTableDataCell>
                      </CTableRow>
                    ))
                  )}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default EmployeeAttendance

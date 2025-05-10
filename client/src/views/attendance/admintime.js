import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CFormSelect,
  CButton,
  CSpinner,
  CAlert,
  CBadge,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'

const AdminAttendance = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [status, setStatus] = useState('loading')
  const [loading, setLoading] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [message, setMessage] = useState('')
  const [userRecords, setUserRecords] = useState([])

  const [allEmployees, setAllEmployees] = useState([])
  const [attendanceToday, setAttendanceToday] = useState([])

  const [departments, setDepartments] = useState([])
  const [selectedDept, setSelectedDept] = useState('')
  const [selectedEmpId, setSelectedEmpId] = useState('')
  const [selectedEmpRecords, setSelectedEmpRecords] = useState([])

  useEffect(() => {
    fetchCurrentUser()
    fetchAllEmployees()
    fetchTodayAttendance()
    const interval = setInterval(() => {
      const now = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' })
      setCurrentTime(new Date(now).toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/employees/me`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setCurrentUser(res.data.employee)
      fetchStatus(res.data.employee.employeeId)
      fetchUserRecords(res.data.employee.employeeId)
    } catch {
      setMessage('❌ Failed to load your profile.')
    }
  }

  const fetchStatus = async (empId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/today-status/${empId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setStatus(res.data.status)
    } catch {
      setStatus('out')
    }
  }

  const fetchUserRecords = async (empId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/${empId}`)
      setUserRecords(res.data.reverse())
    } catch {
      setMessage('⚠️ Failed to load your attendance history.')
    }
  }

  const handleClock = async (type) => {
    if (!currentUser) return
    setLoading(true)
    setMessage('')
    try {
      const res = await axios.post(
        `${BASE_URL}/api/attendance/clock`,
        { employeeId: currentUser.employeeId, type },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        },
      )
      setMessage(res.data.message)
      setStatus(type === 'in' ? 'in' : 'out')
      fetchUserRecords(currentUser.employeeId)
    } catch {
      setMessage('❌ Failed to record attendance.')
    } finally {
      setLoading(false)
    }
  }

  const fetchAllEmployees = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setAllEmployees(res.data)
      const uniqueDepts = [...new Set(res.data.map((e) => e.department || 'Others'))]
      setDepartments(uniqueDepts.sort())
    } catch (err) {
      console.error('Error fetching employees:', err)
    }
  }

  const fetchTodayAttendance = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/today`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      setAttendanceToday(res.data || [])
    } catch (err) {
      console.error('Error fetching today attendance:', err)
    }
  }

  const handleDeptSelect = (e) => {
    setSelectedDept(e.target.value)
    setSelectedEmpId('')
    setSelectedEmpRecords([])
  }

  const handleEmpSelect = async (e) => {
    const empId = e.target.value
    setSelectedEmpId(empId)
    try {
      const res = await axios.get(`${BASE_URL}/api/attendance/${empId}`)
      setSelectedEmpRecords(res.data.reverse())
    } catch {
      setSelectedEmpRecords([])
    }
  }

  const handleDownloadCSV = () => {
    if (!selectedEmpRecords.length) return
    const header = ['Date', 'Check In', 'Check Out', 'Hours Worked']
    const rows = selectedEmpRecords.map((r) => [
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
    link.setAttribute('download', `attendance_${selectedEmpId}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatus = (empId) => {
    const record = attendanceToday.find((r) => r.employeeId === empId)
    if (!record) return 'out'
    if (record.checkIn && !record.checkOut) return 'in'
    return 'out'
  }

  return (
    <CContainer className="py-4">
      {/* Admin/User Clock In/Out */}
      <CCard className="text-center shadow mb-4">
        <CCardHeader className="bg-dark text-white fw-bold">⏱ Your Attendance</CCardHeader>
        <CCardBody>
          <h5>
            {currentUser?.firstName}, you are currently{' '}
            <CBadge color={status === 'in' ? 'success' : 'secondary'}>
              {status === 'in' ? 'Clocked In' : 'Clocked Out'}
            </CBadge>
          </h5>
          <p>
            Current Time: <strong>{currentTime}</strong>
          </p>
          {message && <CAlert color="info">{message}</CAlert>}
          <div className="d-flex justify-content-center gap-3 mt-3">
            {status === 'out' ? (
              <CButton color="success" onClick={() => handleClock('in')} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '🕒 Clock In'}
              </CButton>
            ) : (
              <CButton color="danger" onClick={() => handleClock('out')} disabled={loading}>
                {loading ? <CSpinner size="sm" /> : '⏹ Clock Out'}
              </CButton>
            )}
          </div>
        </CCardBody>
      </CCard>

      {/* Department & Employee Selection */}
      <CCard className="mb-4">
        <CCardHeader className="fw-bold bg-primary text-white">🎯 Filter Employees</CCardHeader>
        <CCardBody>
          <CRow className="mb-3">
            <CCol md={6}>
              <label className="fw-semibold">🏢 Department</label>
              <CFormSelect value={selectedDept} onChange={handleDeptSelect}>
                <option value="">-- Select Department --</option>
                {departments.map((d, i) => (
                  <option key={i} value={d}>
                    {d}
                  </option>
                ))}
              </CFormSelect>
            </CCol>
            <CCol md={6}>
              <label className="fw-semibold"> Employee</label>
              <CFormSelect
                value={selectedEmpId}
                onChange={handleEmpSelect}
                disabled={!selectedDept}
              >
                <option value="">-- Select Employee --</option>
                {allEmployees
                  .filter((e) => e.department === selectedDept)
                  .map((emp) => (
                    <option key={emp._id} value={emp.employeeId}>
                      {emp.firstName} {emp.lastName} ({emp.employeeId})
                    </option>
                  ))}
              </CFormSelect>
            </CCol>
          </CRow>

          {selectedEmpId && (
            <>
              <div className="text-end mb-2">
                <CButton color="info" onClick={handleDownloadCSV}>
                  📥 Download CSV
                </CButton>
              </div>
              <CTable striped hover responsive bordered>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Check In</CTableHeaderCell>
                    <CTableHeaderCell>Check Out</CTableHeaderCell>
                    <CTableHeaderCell>Hours Worked</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {selectedEmpRecords.length > 0 ? (
                    selectedEmpRecords.map((r, idx) => (
                      <CTableRow key={idx}>
                        <CTableDataCell>{r.date}</CTableDataCell>
                        <CTableDataCell>{r.checkIn || '--'}</CTableDataCell>
                        <CTableDataCell>{r.checkOut || '--'}</CTableDataCell>
                        <CTableDataCell>{r.hoursWorked || '0'}</CTableDataCell>
                      </CTableRow>
                    ))
                  ) : (
                    <CTableRow>
                      <CTableDataCell colSpan={4} className="text-center text-muted">
                        No attendance records found.
                      </CTableDataCell>
                    </CTableRow>
                  )}
                </CTableBody>
              </CTable>
            </>
          )}
        </CCardBody>
      </CCard>

      {/* Company-wide Attendance Today */}
      <CCard className="shadow-sm">
        <CCardHeader className="bg-dark text-white fw-bold">
          🧾 Attendance Summary for Today
        </CCardHeader>
        <CCardBody>
          <CTable bordered hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell>Employee ID</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Status</CTableHeaderCell>
                <CTableHeaderCell>Check In</CTableHeaderCell>
                <CTableHeaderCell>Check Out</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {allEmployees.map((emp) => {
                const status = getStatus(emp.employeeId)
                const today = attendanceToday.find((r) => r.employeeId === emp.employeeId) || {}
                return (
                  <CTableRow key={emp._id}>
                    <CTableDataCell>{emp.employeeId}</CTableDataCell>
                    <CTableDataCell>
                      {emp.firstName} {emp.lastName}
                    </CTableDataCell>
                    <CTableDataCell>{emp.department || 'N/A'}</CTableDataCell>
                    <CTableDataCell>
                      <CBadge color={status === 'in' ? 'success' : 'secondary'}>
                        {status === 'in' ? 'Clocked In' : 'Clocked Out'}
                      </CBadge>
                    </CTableDataCell>
                    <CTableDataCell>{today.checkIn || '--'}</CTableDataCell>
                    <CTableDataCell>{today.checkOut || '--'}</CTableDataCell>
                  </CTableRow>
                )
              })}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default AdminAttendance

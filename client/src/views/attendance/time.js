import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CButton,
  CAlert,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react'

const Time = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const userId = user?._id
  const [records, setRecords] = useState([])
  const [message, setMessage] = useState('')
  const [todayRecord, setTodayRecord] = useState(null)

  const fetchMyAttendance = async () => {
    const res = await axios.get(`http://localhost:5000/api/attendance/my/${userId}`)
    setRecords(res.data)

    const today = new Date().toISOString().split('T')[0]
    const todayRec = res.data.find((r) => r.date.startsWith(today))
    setTodayRecord(todayRec || null)
  }

  useEffect(() => {
    if (userId) fetchMyAttendance()
  }, [userId])

  const handleClockIn = async () => {
    try {
      await axios.post(`http://localhost:5000/api/attendance/clockin`, { userId })
      setMessage('✅ Clocked in successfully')
      fetchMyAttendance()
    } catch {
      setMessage('⚠ Already clocked in today')
    }
  }

  const handleClockOut = async () => {
    try {
      await axios.put(`http://localhost:5000/api/attendance/clockout/${todayRecord._id}`)
      setMessage('✅ Clocked out successfully')
      fetchMyAttendance()
    } catch {
      setMessage('⚠ Clock out failed')
    }
  }

  return (
    <CCard>
      <CCardHeader>My Time Tracker</CCardHeader>
      <CCardBody>
        {message && <CAlert color="info">{message}</CAlert>}

        <div className="mb-3 d-flex gap-2">
          {!todayRecord ? (
            <CButton color="success" onClick={handleClockIn}>
              Clock In
            </CButton>
          ) : !todayRecord.clockOut ? (
            <CButton color="danger" onClick={handleClockOut}>
              Clock Out
            </CButton>
          ) : (
            <CButton color="secondary" disabled>
              ✔ Already Clocked Out
            </CButton>
          )}
        </div>

        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Clock In</CTableHeaderCell>
              <CTableHeaderCell>Clock Out</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {records.map((r) => (
              <CTableRow key={r._id}>
                <CTableDataCell>{r.date.split('T')[0]}</CTableDataCell>
                <CTableDataCell>
                  {r.clockIn ? new Date(r.clockIn).toLocaleTimeString() : '-'}
                </CTableDataCell>
                <CTableDataCell>
                  {r.clockOut ? new Date(r.clockOut).toLocaleTimeString() : '-'}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Time

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CFormInput,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CRow,
  CCol,
} from '@coreui/react'

const Admintime = () => {
  const [records, setRecords] = useState([])
  const [search, setSearch] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/attendance/all')
      .then((res) => setRecords(res.data))
      .catch((err) => console.error('Admin fetch error:', err))
  }, [])

  const filtered = records.filter((rec) =>
    rec.userId?.username?.toLowerCase().includes(search.toLowerCase()),
  )

  return (
    <CCard>
      <CCardHeader>Admin | Time & Attendance Logs</CCardHeader>
      <CCardBody>
        <CRow className="mb-3">
          <CCol md={6}>
            <CFormInput
              placeholder="Search by username"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </CCol>
        </CRow>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>Employee</CTableHeaderCell>
              <CTableHeaderCell>Role</CTableHeaderCell>
              <CTableHeaderCell>Date</CTableHeaderCell>
              <CTableHeaderCell>Clock In</CTableHeaderCell>
              <CTableHeaderCell>Clock Out</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {filtered.map((rec) => (
              <CTableRow key={rec._id}>
                <CTableDataCell>{rec.userId?.username}</CTableDataCell>
                <CTableDataCell>{rec.userId?.role}</CTableDataCell>
                <CTableDataCell>{rec.date?.split('T')[0]}</CTableDataCell>
                <CTableDataCell>
                  {rec.clockIn ? new Date(rec.clockIn).toLocaleTimeString() : '-'}
                </CTableDataCell>
                <CTableDataCell>
                  {rec.clockOut ? new Date(rec.clockOut).toLocaleTimeString() : '-'}
                </CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  )
}

export default Admintime

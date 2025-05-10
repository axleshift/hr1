import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CSpinner,
  CAlert,
} from '@coreui/react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import axios from 'axios'

const HRAnalytics = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [employeeData, setEmployeeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [dateRange, setDateRange] = useState('')

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    try {
      const [attendanceRes, employeeRes] = await Promise.all([
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/attendance/all`,
        ),
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL || 'https://backend-hr1.axleshift.com'}/api/employees`,
        ),
      ])

      setAttendanceData(attendanceRes.data)
      setEmployeeData(employeeRes.data)

      if (attendanceRes.data.length > 0) {
        const dates = attendanceRes.data.map((rec) => new Date(rec.date))
        const minDate = new Date(Math.min(...dates))
        const maxDate = new Date(Math.max(...dates))
        setDateRange(
          `${minDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })} - ${maxDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
          })}`,
        )
      }
    } catch (err) {
      console.error('Error fetching data:', err)
      setError('Failed to load analytics data.')
    } finally {
      setLoading(false)
    }
  }

  const calculateAnalytics = () => {
    if (attendanceData.length === 0 || employeeData.length === 0) return {}

    const employeeHours = {}
    attendanceData.forEach((record) => {
      const id = record.employeeId
      if (!employeeHours[id]) {
        employeeHours[id] = 0
      }
      employeeHours[id] += record.hoursWorked || 0
    })

    const totalEmployees = employeeData.length
    const totalDays = attendanceData.length
    const totalHours = Object.values(employeeHours).reduce((sum, hours) => sum + hours, 0)
    const averageHoursPerDay = totalHours / totalDays

    const topEmployees = Object.entries(employeeHours)
      .map(([employeeId, hours]) => {
        const employee = employeeData.find((emp) => emp.employeeId === employeeId)
        const nameWithDept = employee
          ? `${employee.firstName} ${employee.lastName} (${employee.department})`
          : employeeId
        return { name: nameWithDept, hours }
      })
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 5)

    return {
      totalEmployees,
      totalDays,
      totalHours,
      averageHoursPerDay,
      topEmployees,
    }
  }

  const analytics = calculateAnalytics()

  return (
    <CContainer className="mt-5">
      <h2 className="text-center mb-4 fw-bold text-primary">
        📊 HR Attendance Analytics Dashboard
      </h2>

      {error && <CAlert color="danger">{error}</CAlert>}

      {loading ? (
        <div className="text-center">
          <CSpinner color="primary" />
        </div>
      ) : (
        <>
          <CRow className="mb-4">
            <CCol md={3}>
              <CCard className="shadow-sm text-center">
                <CCardHeader className="bg-primary text-white fw-bold">
                  🧑‍💻 Total Employees
                </CCardHeader>
                <CCardBody>
                  <h3>{analytics.totalEmployees || 0}</h3>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="shadow-sm text-center">
                <CCardHeader className="bg-info text-white fw-bold">📆 Attendance Days</CCardHeader>
                <CCardBody>
                  <h3>{analytics.totalDays || 0}</h3>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="shadow-sm text-center">
                <CCardHeader className="bg-success text-white fw-bold">
                  ⏳ Average Hours/Day
                </CCardHeader>
                <CCardBody>
                  <h3>{analytics.averageHoursPerDay?.toFixed(2) || 0} hrs</h3>
                </CCardBody>
              </CCard>
            </CCol>
            <CCol md={3}>
              <CCard className="shadow-sm text-center">
                <CCardHeader className="bg-warning text-white fw-bold">
                  🧮 Total Hours
                  <div className="small fw-light">{dateRange && `(${dateRange})`}</div>
                </CCardHeader>
                <CCardBody>
                  <h3>{analytics.totalHours?.toFixed(2) || 0} hrs</h3>
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          <CRow className="mb-5">
            <CCol md={12}>
              <CCard className="shadow-sm">
                <CCardHeader className="bg-dark text-white fw-bold">
                  🥇 Top 5 Hardworking Employees
                </CCardHeader>
                <CCardBody style={{ height: '400px' }}>
                  {analytics.topEmployees && analytics.topEmployees.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={analytics.topEmployees}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="hours" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  ) : (
                    <p className="text-center text-muted">No data available</p>
                  )}
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>
        </>
      )}
    </CContainer>
  )
}

export default HRAnalytics

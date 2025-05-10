import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCol,
  CRow,
  CWidgetStatsB,
  CButton,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CSpinner,
} from '@coreui/react'
import { cilUser, cilPeople, cilCheckCircle } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const AdminDashboard = () => {
  const [totalEmployees, setTotalEmployees] = useState(0)
  const [presentToday, setPresentToday] = useState([])
  const [employeeData, setEmployeeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const today = new Date(new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila' }))
    .toISOString()
    .split('T')[0]

  const fetchData = async () => {
    setLoading(true)
    try {
      const [employeeRes, attendanceRes] = await Promise.all([
        axios.get('https://backend-hr1.axleshift.com/api/employees'),
        axios.get('https://backend-hr1.axleshift.com/api/attendance/today'),
      ])

      const employees = employeeRes.data || []
      const attendance = attendanceRes.data || []

      setEmployeeData(employees)
      setTotalEmployees(employees.length)

      const present = attendance.filter(
        (r) => (r.checkIn && !r.checkOut) || (r.checkIn && r.checkOut),
      )
      setPresentToday(present)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const findEmployeeName = (employeeId) => {
    const emp = employeeData.find((e) => e.employeeId === employeeId)
    return emp ? `${emp.firstName} ${emp.lastName}` : employeeId
  }

  const performanceData = {
    labels: ['John Luis G. Liu', 'Jane Doe', 'Samuel Tan'],
    datasets: [
      {
        label: 'Achievements (%)',
        backgroundColor: '#20c997',
        data: [95, 80, 75],
      },
      {
        label: 'Goals Achieved',
        backgroundColor: '#6610f2',
        data: [10, 7, 5],
      },
    ],
  }

  const attendanceData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [presentToday.length, totalEmployees - presentToday.length],
        backgroundColor: ['#0d6efd', '#dc3545'],
        borderColor: ['#fff'],
        borderWidth: 2,
      },
    ],
  }

  return (
    <div className="p-4">
      <h2 className="mb-4 text-center fw-bold">Admin Dashboard</h2>

      {loading ? (
        <div className="text-center my-5">
          <CSpinner color="primary" />
        </div>
      ) : (
        <>
          <CRow className="mb-4 g-4 text-center">
            <CCol xs={12} md={4}>
              <Link to="/recordmanagement/employeeinfo" style={{ textDecoration: 'none' }}>
                <CWidgetStatsB
                  className="mb-3"
                  color="primary"
                  value={totalEmployees}
                  title="Total Employees"
                  icon={<CIcon icon={cilPeople} height={52} />}
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </CCol>
            <CCol xs={12} md={4}>
              <CWidgetStatsB
                className="mb-3"
                color="success"
                value={presentToday.length}
                title="Present Employees"
                icon={<CIcon icon={cilUser} height={52} />}
                style={{ cursor: 'pointer' }}
                onClick={() => setModalVisible(true)}
              />
            </CCol>
            <CCol xs={12} md={4}>
              <CWidgetStatsB
                className="mb-3"
                color="info"
                value="1 Approved"
                title="Leave Requests"
                icon={<CIcon icon={cilCheckCircle} height={52} />}
              />
            </CCol>
          </CRow>

          <CRow className="g-4">
            <CCol md={8}>
              <CCard>
                <CCardHeader>
                  <CCardTitle>Performance Overview</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <Bar data={performanceData} />
                </CCardBody>
              </CCard>
            </CCol>

            <CCol md={4}>
              <CCard>
                <CCardHeader>
                  <CCardTitle>Attendance Overview</CCardTitle>
                </CCardHeader>
                <CCardBody>
                  <Doughnut data={attendanceData} />
                </CCardBody>
              </CCard>
            </CCol>
          </CRow>

          {/* Modal for Present Employee Details */}
          <CModal
            alignment="center"
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            size="lg"
          >
            <CModalHeader>
              <CModalTitle>Employees Present Today - {today}</CModalTitle>
            </CModalHeader>
            <CModalBody>
              {presentToday.length > 0 ? (
                <CTable responsive hover striped align="middle">
                  <CTableHead color="light">
                    <CTableRow>
                      <CTableHeaderCell>Employee ID</CTableHeaderCell>
                      <CTableHeaderCell>Full Name</CTableHeaderCell>
                      <CTableHeaderCell>Check-In</CTableHeaderCell>
                      <CTableHeaderCell>Check-Out</CTableHeaderCell>
                      <CTableHeaderCell>Hours Worked</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {presentToday.map((emp) => (
                      <CTableRow key={`${emp.employeeId}-${emp.date}`}>
                        <CTableDataCell>{emp.employeeId}</CTableDataCell>
                        <CTableDataCell>{findEmployeeName(emp.employeeId)}</CTableDataCell>
                        <CTableDataCell>{emp.checkIn || '--'}</CTableDataCell>
                        <CTableDataCell>{emp.checkOut || '--'}</CTableDataCell>
                        <CTableDataCell>{emp.hoursWorked || '0'} hrs</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              ) : (
                <p className="text-muted text-center">No employees present today.</p>
              )}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setModalVisible(false)}>
                Close
              </CButton>
            </CModalFooter>
          </CModal>
        </>
      )}
    </div>
  )
}

export default AdminDashboard

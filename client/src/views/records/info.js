import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CFormSelect,
  CTable,
  CTableHead,
  CTableBody,
  CTableRow,
  CTableHeaderCell,
  CTableDataCell,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CRow,
  CCol,
  CAvatar,
  CBadge,
} from '@coreui/react'

const EmployeeDirectory = () => {
  const [employees, setEmployees] = useState([])
  const [searchId, setSearchId] = useState('')
  const [selectedDept, setSelectedDept] = useState('All')
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/employees')
        setEmployees(res.data)
      } catch (err) {
        console.error('Failed to fetch employees:', err)
      }
    }

    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((emp) => {
    const matchId = emp.id?.toLowerCase().includes(searchId.toLowerCase())
    const matchDept = selectedDept === 'All' || emp.department === selectedDept
    return matchId && matchDept
  })

  const handleRowClick = (emp) => {
    setSelectedEmployee(emp)
    setVisible(true)
  }

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold">👥 Employee Directory</CCardHeader>
        <CCardBody>
          <CRow className="mb-4">
            <CCol md={6}>
              <CFormInput
                placeholder="🔍 Search by Employee ID"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
              />
            </CCol>
            <CCol md={6}>
              <CFormSelect value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                <option value="All">All Departments</option>
                <option value="Logistics">Logistics</option>
                <option value="IT">IT</option>
                <option value="HR">HR</option>
              </CFormSelect>
            </CCol>
          </CRow>

          <CTable striped hover responsive align="middle">
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Employee ID</CTableHeaderCell>
                <CTableHeaderCell>Profile</CTableHeaderCell>
                <CTableHeaderCell>Name</CTableHeaderCell>
                <CTableHeaderCell>Department</CTableHeaderCell>
                <CTableHeaderCell>Role</CTableHeaderCell>
                <CTableHeaderCell>Email</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {filteredEmployees.map((emp) => (
                <CTableRow
                  key={emp._id}
                  onClick={() => handleRowClick(emp)}
                  style={{ cursor: 'pointer' }}
                >
                  <CTableDataCell>{emp.id}</CTableDataCell>
                  <CTableDataCell>
                    <CAvatar
                      src={
                        emp.photo?.startsWith('/uploads')
                          ? `http://localhost:5000${emp.photo}`
                          : emp.photo
                      }
                      size="lg"
                      shape="rounded"
                      textColor="white"
                      color="info"
                    >
                      {!emp.photo && emp.name?.charAt(0)}
                    </CAvatar>
                  </CTableDataCell>
                  <CTableDataCell>{emp.name}</CTableDataCell>
                  <CTableDataCell>{emp.department}</CTableDataCell>
                  <CTableDataCell>{emp.role}</CTableDataCell>
                  <CTableDataCell>{emp.email}</CTableDataCell>
                </CTableRow>
              ))}
              {filteredEmployees.length === 0 && (
                <CTableRow>
                  <CTableDataCell colSpan="6" className="text-center text-muted">
                    No employees found.
                  </CTableDataCell>
                </CTableRow>
              )}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>

      {/* Modal */}
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Employee Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedEmployee && (
            <>
              <div className="text-center mb-4">
                <CAvatar
                  src={
                    selectedEmployee.photo?.startsWith('/uploads')
                      ? `http://localhost:5000${selectedEmployee.photo}`
                      : selectedEmployee.photo
                  }
                  size="xxl"
                  shape="circle"
                  className="mb-2"
                />
                <h5 className="mt-2">{selectedEmployee.name}</h5>
                <CBadge color={selectedEmployee.status === 'Active' ? 'success' : 'secondary'}>
                  {selectedEmployee.status}
                </CBadge>
              </div>

              <CRow className="mb-3">
                <CCol md={6}>
                  <strong>Employee ID:</strong> {selectedEmployee.id}
                </CCol>
                <CCol md={6}>
                  <strong>Department:</strong> {selectedEmployee.department}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <strong>Role:</strong> {selectedEmployee.role}
                </CCol>
                <CCol md={6}>
                  <strong>Email:</strong> {selectedEmployee.email}
                </CCol>
              </CRow>
              <CRow className="mb-3">
                <CCol md={6}>
                  <strong>Phone:</strong> {selectedEmployee.phone}
                </CCol>
                <CCol md={6}>
                  <strong>Address:</strong> {selectedEmployee.address}
                </CCol>
              </CRow>
              <CRow>
                <CCol md={6}>
                  <strong>Date Hired:</strong> {selectedEmployee.dateHired}
                </CCol>
              </CRow>
            </>
          )}
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default EmployeeDirectory

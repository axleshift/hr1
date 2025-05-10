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
        const res = await axios.get('https://backend-hr1.axleshift.com/api/employees')
        setEmployees(res.data)
      } catch (err) {
        console.error('Failed to fetch employees:', err)
      }
    }

    fetchEmployees()
  }, [])

  const filteredEmployees = employees.filter((emp) => {
    const matchId = emp.employeeId?.toLowerCase().includes(searchId.toLowerCase())
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
                <option value="Warehouse">Warehouse</option>
                <option value="Operations">Operations</option>
                <option value="Freight Forwarding">Freight Forwarding</option>
                <option value="Customs Clearance">Customs Clearance</option>
                <option value="Accounting">Accounting</option>
                <option value="Human Resource">Human Resource</option>
                <option value="Customer Service">Customer Service</option>
                <option value="IT Department">IT Department</option>
                <option value="Dispatch">Dispatch</option>
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
                  <CTableDataCell>{emp.employeeId}</CTableDataCell>
                  <CTableDataCell>
                    <CAvatar
                      src={
                        emp.photo?.startsWith('/uploads')
                          ? `https://backend-hr1.axleshift.com${emp.photo}`
                          : emp.photo
                      }
                      size="lg"
                      shape="rounded"
                      textColor="white"
                      color="info"
                    >
                      {!emp.photo && emp.firstName?.charAt(0)}
                    </CAvatar>
                  </CTableDataCell>
                  <CTableDataCell>{`${emp.firstName} ${emp.lastName}`}</CTableDataCell>
                  <CTableDataCell>{emp.department}</CTableDataCell>
                  <CTableDataCell>{emp.position}</CTableDataCell>
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

      {/* Employee Details Modal */}
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
                      ? `https://backend-hr1.axleshift.com${selectedEmployee.photo}`
                      : selectedEmployee.photo
                  }
                  size="xxl"
                  shape="circle"
                  className="mb-2"
                />
                <h5 className="mt-2">{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</h5>
                <CBadge
                  color={
                    selectedEmployee.employmentStatus?.toLowerCase() === 'active'
                      ? 'success'
                      : 'secondary'
                  }
                >
                  {selectedEmployee.employmentStatus}
                </CBadge>
              </div>

              <CRow className="mb-2">
                <CCol md={6}>
                  <strong>Employee ID:</strong> {selectedEmployee.employeeId}
                </CCol>
                <CCol md={6}>
                  <strong>Department:</strong> {selectedEmployee.department}
                </CCol>
              </CRow>
              <CRow className="mb-2">
                <CCol md={6}>
                  <strong>Role:</strong> {selectedEmployee.position}
                </CCol>
                <CCol md={6}>
                  <strong>Email:</strong> {selectedEmployee.email}
                </CCol>
              </CRow>
              <CRow className="mb-2">
                <CCol md={6}>
                  <strong>Phone:</strong> {selectedEmployee.phoneNumber}
                </CCol>
                <CCol md={6}>
                  <strong>Address:</strong> {selectedEmployee.address}
                </CCol>
              </CRow>
              <CRow className="mb-2">
                <CCol md={6}>
                  <strong>Date Hired:</strong> {selectedEmployee.dateHired}
                </CCol>
                <CCol md={6}>
                  <strong>Birthdate:</strong> {selectedEmployee.birthdate}
                </CCol>
              </CRow>
              <CRow className="mb-2">
                <CCol md={6}>
                  <strong>Gender:</strong> {selectedEmployee.gender}
                </CCol>
                <CCol md={6}>
                  <strong>Civil Status:</strong> {selectedEmployee.civilStatus}
                </CCol>
              </CRow>
              <CRow>
                <CCol>
                  <strong>Government IDs:</strong>
                  <ul className="mt-2">
                    <li>SSS: {selectedEmployee.governmentIds?.sss}</li>
                    <li>PhilHealth: {selectedEmployee.governmentIds?.philhealth}</li>
                    <li>Pag-IBIG: {selectedEmployee.governmentIds?.pagibig}</li>
                    <li>TIN: {selectedEmployee.governmentIds?.tin}</li>
                  </ul>
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

import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardHeader,
  CCardBody,
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CBadge,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CAvatar,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import { cilUser, cilEnvelopeClosed, cilCalendar } from '@coreui/icons'
import CIcon from '@coreui/icons-react'

const NewHireDashboard = () => {
  const [employees, setEmployees] = useState([])
  const [visible, setVisible] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  const fetchNewHires = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/employees')
      setEmployees(res.data)
    } catch (err) {
      console.error('Failed to fetch new hires', err)
    }
  }

  useEffect(() => {
    fetchNewHires()
  }, [])

  const grouped = employees.reduce((acc, emp) => {
    const dept = emp.department || 'Unassigned'
    if (!acc[dept]) acc[dept] = []
    acc[dept].push(emp)
    return acc
  }, {})

  const handleSend = async (emp, type) => {
    try {
      await axios.post(`http://localhost:5000/api/send/${type}`, emp)
      alert(`${type} data sent for ${emp.name}`)
    } catch (err) {
      console.error(`Error sending ${type}`, err)
      alert(`Failed to send ${type}`)
    }
  }

  const handleViewDetails = (emp) => {
    setSelectedEmployee(emp)
    setVisible(true)
  }

  return (
    <>
      <CCard>
        <CCardHeader className="fw-bold">📥 New Hire Dashboard</CCardHeader>
        <CCardBody>
          {Object.keys(grouped).length === 0 ? (
            <p className="text-muted">No new hires have been received yet.</p>
          ) : (
            <CAccordion alwaysOpen>
              {Object.entries(grouped).map(([dept, list], idx) => (
                <CAccordionItem itemKey={idx + 1} key={dept}>
                  <CAccordionHeader>
                    <strong>{dept}</strong>{' '}
                    <CBadge color="info" className="ms-2">
                      {list.length}
                    </CBadge>
                  </CAccordionHeader>
                  <CAccordionBody>
                    <CTable responsive hover striped align="middle">
                      <CTableHead>
                        <CTableRow>
                          <CTableHeaderCell>
                            <CIcon icon={cilUser} className="me-1" /> Name
                          </CTableHeaderCell>
                          <CTableHeaderCell>
                            <CIcon icon={cilEnvelopeClosed} className="me-1" /> Email
                          </CTableHeaderCell>
                          <CTableHeaderCell>Role</CTableHeaderCell>
                          <CTableHeaderCell>Phone</CTableHeaderCell>
                          <CTableHeaderCell>
                            <CIcon icon={cilCalendar} className="me-1" /> Date Hired
                          </CTableHeaderCell>
                          <CTableHeaderCell>Status</CTableHeaderCell>
                        </CTableRow>
                      </CTableHead>
                      <CTableBody>
                        {list.map((emp) => (
                          <CTableRow
                            key={emp._id}
                            onClick={() => handleViewDetails(emp)}
                            style={{ cursor: 'pointer' }}
                          >
                            <CTableDataCell>{emp.name}</CTableDataCell>
                            <CTableDataCell>{emp.email}</CTableDataCell>
                            <CTableDataCell>{emp.role}</CTableDataCell>
                            <CTableDataCell>{emp.phone}</CTableDataCell>
                            <CTableDataCell>{emp.dateHired}</CTableDataCell>
                            <CTableDataCell>
                              <CBadge color={emp.status === 'Active' ? 'success' : 'secondary'}>
                                {emp.status}
                              </CBadge>
                            </CTableDataCell>
                          </CTableRow>
                        ))}
                      </CTableBody>
                    </CTable>
                  </CAccordionBody>
                </CAccordionItem>
              ))}
            </CAccordion>
          )}
        </CCardBody>
      </CCard>

      {/* Modal for Employee Details */}
      <CModal alignment="center" visible={visible} onClose={() => setVisible(false)} size="lg">
        <CModalHeader>
          <CModalTitle>Employee Details</CModalTitle>
        </CModalHeader>
        <CModalBody>
          {selectedEmployee && (
            <>
              <div className="text-center mb-3">
                <CAvatar
                  src={
                    selectedEmployee.photo?.startsWith('/uploads')
                      ? `http://localhost:5000${selectedEmployee.photo}`
                      : selectedEmployee.photo
                  }
                  size="xl"
                  className="mb-2"
                />
                <h5>{selectedEmployee.name}</h5>
                <CBadge color={selectedEmployee.status === 'Active' ? 'success' : 'secondary'}>
                  {selectedEmployee.status}
                </CBadge>
              </div>
              <CRow className="text-start mb-3">
                <CCol md={6}>
                  <strong>Employee ID:</strong> {selectedEmployee.id}
                </CCol>
                <CCol md={6}>
                  <strong>Department:</strong> {selectedEmployee.department}
                </CCol>
              </CRow>
              <CRow className="text-start mb-3">
                <CCol md={6}>
                  <strong>Role:</strong> {selectedEmployee.role}
                </CCol>
                <CCol md={6}>
                  <strong>Email:</strong> {selectedEmployee.email}
                </CCol>
              </CRow>
              <CRow className="text-start mb-3">
                <CCol md={6}>
                  <strong>Phone:</strong> {selectedEmployee.phone}
                </CCol>
                <CCol md={6}>
                  <strong>Address:</strong> {selectedEmployee.address}
                </CCol>
              </CRow>
              <CRow className="text-start mb-4">
                <CCol md={6}>
                  <strong>Date Hired:</strong> {selectedEmployee.dateHired}
                </CCol>
              </CRow>
              <div className="text-center">
                <CButton
                  color="primary"
                  className="me-2"
                  onClick={() => handleSend(selectedEmployee, 'account')}
                >
                  Send to Account Creation
                </CButton>
                <CButton
                  color="warning"
                  className="me-2"
                  onClick={() => handleSend(selectedEmployee, 'training')}
                >
                  Send to Training
                </CButton>
                <CButton color="success" onClick={() => handleSend(selectedEmployee, 'benefits')}>
                  Send to Benefits
                </CButton>
              </div>
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

export default NewHireDashboard

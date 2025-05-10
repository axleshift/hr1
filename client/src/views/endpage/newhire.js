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
      const res = await axios.get('https://backend-hr1.axleshift.com/api/newhires')
      const filtered = res.data.filter((emp) => emp.employmentStatus === 'New Hire')
      setEmployees(filtered)
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
      if (emp.employmentStatus !== 'Active') {
        alert('Only Active employees can be sent to the main database.')
        return
      }

      await axios.post(`https://backend-hr1.axleshift.com/api/newhires/send/${type}`, emp)
      alert(`${type} data sent for ${emp.firstName} ${emp.lastName}`)
      setVisible(false)
      fetchNewHires()
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
            <p className="text-muted">No new hires with status &quot;New Hire&quot;.</p>
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
                          <CTableHeaderCell>Position</CTableHeaderCell>
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
                            <CTableDataCell>{`${emp.firstName} ${emp.lastName}`}</CTableDataCell>
                            <CTableDataCell>{emp.email}</CTableDataCell>
                            <CTableDataCell>{emp.position}</CTableDataCell>
                            <CTableDataCell>{emp.phoneNumber}</CTableDataCell>
                            <CTableDataCell>{emp.dateHired}</CTableDataCell>
                            <CTableDataCell>
                              <CBadge
                                color={emp.employmentStatus === 'Active' ? 'success' : 'secondary'}
                              >
                                {emp.employmentStatus || 'Pending'}
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
                      ? `https://backend-hr1.axleshift.com${selectedEmployee.photo}`
                      : selectedEmployee.photo
                  }
                  size="xl"
                  className="mb-2"
                />
                <h5>{`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}</h5>
                <CBadge
                  color={selectedEmployee.employmentStatus === 'Active' ? 'success' : 'secondary'}
                >
                  {selectedEmployee.employmentStatus || 'Pending'}
                </CBadge>
              </div>

              <CRow className="text-start mb-3">
                <CCol md={6}>
                  <strong>Employee ID:</strong> {selectedEmployee.employeeId}
                </CCol>
                <CCol md={6}>
                  <strong>Department:</strong> {selectedEmployee.department}
                </CCol>
              </CRow>
              <CRow className="text-start mb-3">
                <CCol md={6}>
                  <strong>Position:</strong> {selectedEmployee.position}
                </CCol>
                <CCol md={6}>
                  <strong>Email:</strong> {selectedEmployee.email}
                </CCol>
              </CRow>
              <CRow className="text-start mb-3">
                <CCol md={6}>
                  <strong>Phone:</strong> {selectedEmployee.phoneNumber}
                </CCol>
                <CCol md={6}>
                  <strong>Address:</strong> {selectedEmployee.address}
                </CCol>
              </CRow>
              <CRow className="text-start mb-4">
                <CCol md={6}>
                  <strong>Date Hired:</strong> {selectedEmployee.dateHired}
                </CCol>
                <CCol md={6}>
                  <div className="d-flex align-items-center mt-2">
                    <strong className="me-2">Mark as Active:</strong>
                    <input
                      type="checkbox"
                      checked={selectedEmployee.employmentStatus === 'Active'}
                      onChange={async (e) => {
                        const updatedStatus = e.target.checked ? 'Active' : 'New Hire'
                        const updated = { ...selectedEmployee, employmentStatus: updatedStatus }
                        setSelectedEmployee(updated)

                        if (updatedStatus === 'Active') {
                          await handleSend(updated, 'active')
                        }
                      }}
                    />
                  </div>
                </CCol>
              </CRow>

              <div className="text-center">
                <CButton
                  color="primary"
                  className="me-2"
                  onClick={() => handleSend(selectedEmployee, 'account')}
                >
                  Account Creation
                </CButton>
                <CButton
                  color="warning"
                  className="me-2"
                  onClick={() => handleSend(selectedEmployee, 'training')}
                >
                  Send for Training
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

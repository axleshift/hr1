import React, { useState } from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'

const LeaveManagement = () => {
  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      employeeName: 'John Luis G. lu',
      employeeId: '21012265',
      leaveType: 'Sick Leave',
      startDate: '2023-11-20',
      endDate: '2023-11-22',
      status: 'Pending',
    },
    {
      id: 2,
      employeeName: 'Jane Doe',
      employeeId: '21012266',
      leaveType: 'Vacation Leave',
      startDate: '2023-12-01',
      endDate: '2023-12-05',
      status: 'Approved',
    },
    {
      id: 3,
      employeeName: 'Samuel Tan',
      employeeId: '21012267',
      leaveType: 'Emergency Leave',
      startDate: '2023-11-15',
      endDate: '2023-11-15',
      status: 'Denied',
    },
  ])

  const handleApprove = (id) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status: 'Approved' } : request,
    )
    setLeaveRequests(updatedRequests)
  }

  const handleDeny = (id) => {
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status: 'Denied' } : request,
    )
    setLeaveRequests(updatedRequests)
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
        padding: '10px',
      }}
    >
      <h2
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
        }}
      >
        Leave Management System
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
        <thead>
          <tr>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
              Employee ID
            </th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
              Employee Name
            </th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
              Leave Type
            </th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
              Start Date
            </th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>End Date</th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Status</th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td style={{ padding: '10px' }}>{request.employeeId}</td>
              <td style={{ padding: '10px' }}>{request.employeeName}</td>
              <td style={{ padding: '10px' }}>{request.leaveType}</td>
              <td style={{ padding: '10px' }}>{request.startDate}</td>
              <td style={{ padding: '10px' }}>{request.endDate}</td>
              <td
                style={{
                  padding: '10px',
                  color:
                    request.status === 'Pending'
                      ? 'orange'
                      : request.status === 'Approved'
                        ? 'green'
                        : 'red',
                }}
              >
                {request.status}
              </td>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                {request.status === 'Pending' && (
                  <>
                    <CButton color="success" onClick={() => handleApprove(request.id)}>
                      Approve
                    </CButton>
                    <CButton color="success" onClick={() => handleDeny(request.id)}>
                      Deny
                    </CButton>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveManagement

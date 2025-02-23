import React, { useState } from 'react'

const OffboardingManagement = () => {
  const [offboardingRequests, setOffboardingRequests] = useState([
    {
      id: 1,
      employeeId: '21012265',
      name: 'John Luis G. lu',
      department: 'Human Resources',
      jobRole: 'HR Manager',
      status: 'Pending',
    },
    {
      id: 2,
      employeeId: '21012266',
      name: 'Jane Doe',
      department: 'Freight Management',
      jobRole: 'Operations Supervisor',
      status: 'Pending',
    },
    {
      id: 3,
      employeeId: '21012267',
      name: 'Samuel Tan',
      department: 'Logistics',
      jobRole: 'Logistics Coordinator',
      status: 'Pending',
    },
  ])

  const handleUpdateStatus = (id, newStatus) => {
    const updatedRequests = offboardingRequests.map((request) =>
      request.id === id ? { ...request, status: newStatus } : request,
    )
    setOffboardingRequests(updatedRequests)
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
        Offboarding Management
      </h2>
      <div>
        <h3
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Offboarding Requests
        </h3>
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
                Department
              </th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
                Job Role
              </th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Status</th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {offboardingRequests.map((request) => (
              <tr key={request.id}>
                <td style={{ padding: '10px' }}>{request.employeeId}</td>
                <td style={{ padding: '10px' }}>{request.name}</td>
                <td style={{ padding: '10px' }}>{request.department}</td>
                <td style={{ padding: '10px' }}>{request.jobRole}</td>
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
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'Approved')}
                        style={{
                          padding: '5px 10px',
                          marginRight: '10px',
                          backgroundColor: '#28a745',
                          color: '#fff',
                          borderRadius: '5px',
                        }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleUpdateStatus(request.id, 'Denied')}
                        style={{
                          padding: '5px 10px',
                          backgroundColor: '#dc3545',
                          color: '#fff',
                          borderRadius: '5px',
                        }}
                      >
                        Deny
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OffboardingManagement

import React, { useState, useEffect } from 'react'

const DocumentManagement = () => {
  const [documents, setDocuments] = useState([])
  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [employees] = useState([
    {
      id: 1,
      name: 'John Luis G. lu',
      employeeId: '21012265',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      jobRole: 'HR Manager',
      department: 'Human Resources',
    },
    {
      id: 2,
      name: 'Jane Doe',
      employeeId: '21012266',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      jobRole: 'Operations Supervisor',
      department: 'Freight Management',
    },
    {
      id: 3,
      name: 'Samuel Tan',
      employeeId: '21012267',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      jobRole: 'Logistics Coordinator',
      department: 'Logistics',
    },
    {
      id: 4,
      name: 'Maria Santos',
      employeeId: '21012268',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      jobRole: 'Customer Service Rep',
      department: 'Customer Service',
    },
  ])

  const [departments] = useState([
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Freight Management' },
    { id: 3, name: 'Logistics' },
    { id: 4, name: 'Customer Service' },
  ])

  const handleDocumentUpload = (e) => {
    if (selectedEmployee) {
      const file = e.target.files[0]
      if (file) {
        const updatedDocuments = [
          ...documents,
          {
            employeeId: selectedEmployee.employeeId,
            employeeName: selectedEmployee.name,
            fileName: file.name,
            file,
          },
        ]
        setDocuments(updatedDocuments)
      }
    } else {
      alert('Please select an employee first')
    }
  }

  const handleDocumentView = (document) => {
    const fileURL = URL.createObjectURL(document.file)
    window.open(fileURL, '_blank')
  }

  // Filter employees based on selected department
  const filteredEmployees = selectedDepartment
    ? employees.filter((emp) => emp.department === selectedDepartment)
    : []

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
        padding: '10px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '200px',
            backgroundColor: '#6f42c1',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
          }}
        >
          <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>
            Profile
          </h3>
          <img
            src={selectedEmployee ? selectedEmployee.avatar : 'default-profile-picture.jpg'}
            alt="Profile Picture"
            style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '10px' }}
          />
          {selectedEmployee ? (
            <>
              <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff' }}>
                {selectedEmployee.name}
              </p>
              <p style={{ fontSize: '16px', color: '#fff' }}>
                Employee ID: {selectedEmployee.employeeId}
              </p>
              <p style={{ fontSize: '16px', color: '#fff' }}>
                Job Role: {selectedEmployee.jobRole}
              </p>
            </>
          ) : (
            <p style={{ fontSize: '16px', color: '#fff' }}>Please select an employee</p>
          )}
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          style={{ padding: '5px', fontSize: '16px' }}
        >
          <option value="">-- Select Department --</option>
          {departments.map((department) => (
            <option key={department.id} value={department.name}>
              {department.name}
            </option>
          ))}
        </select>

        <select
          value={selectedEmployee ? selectedEmployee.employeeId : ''}
          onChange={(e) => {
            const employee = filteredEmployees.find((emp) => emp.employeeId === e.target.value)
            setSelectedEmployee(employee)
          }}
          style={{ padding: '5px', fontSize: '16px', marginLeft: '10px' }}
          disabled={!selectedDepartment} // Disable until a department is selected
        >
          <option value="">-- Select Employee --</option>
          {filteredEmployees.map((employee) => (
            <option key={employee.employeeId} value={employee.employeeId}>
              {employee.name}
            </option>
          ))}
        </select>

        <input
          type="file"
          onChange={handleDocumentUpload}
          style={{ marginLeft: '10px' }}
          disabled={!selectedEmployee} // Disable until an employee is selected
        />
      </div>

      <div>
        <h2
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            marginBottom: '10px',
            textAlign: 'center',
          }}
        >
          Documents
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
                Document Name
              </th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {documents.map((doc, index) => (
              <tr key={index}>
                <td style={{ padding: '10px' }}>{doc.employeeId}</td>
                <td style={{ padding: '10px' }}>{doc.employeeName}</td>
                <td style={{ padding: '10px' }}>{doc.fileName}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  <button
                    onClick={() => handleDocumentView(doc)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      borderRadius: '5px',
                    }}
                  >
                    View Document
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default DocumentManagement

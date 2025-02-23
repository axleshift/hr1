import React, { useState, useEffect } from 'react'

const WeeklyAttendanceView = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [departments] = useState([
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Freight Management' },
    { id: 3, name: 'Logistics' },
    { id: 4, name: 'Customer Service' },
  ])
  const [employees] = useState([
    {
      id: 1,
      name: 'John Luis G. lu',
      employeeId: '21012265',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      role: 'HR Manager',
      department: 'Human Resources',
    },
    {
      id: 2,
      name: 'Jane Doe',
      employeeId: '21012266',
      avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
      role: 'Operations Supervisor',
      department: 'Freight Management',
    },
    {
      id: 3,
      name: 'Samuel Tan',
      employeeId: '21012267',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
      role: 'Logistics Coordinator',
      department: 'Logistics',
    },
    {
      id: 4,
      name: 'Maria Santos',
      employeeId: '21012268',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
      role: 'Customer Service Rep',
      department: 'Customer Service',
    },
    {
      id: 5,
      name: 'Michael Smith',
      employeeId: '21012269',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      role: 'Recruitment Specialist',
      department: 'Human Resources',
    },
  ])
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedEmployee, setSelectedEmployee] = useState(null)

  useEffect(() => {
    if (selectedEmployee) {
      // Simulate fetching attendance data for the week
      const mockData = []
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date()
        currentDate.setDate(currentDate.getDate() - i)
        mockData.push({
          date: currentDate.toLocaleDateString(),
          inTime: '09:00 AM',
          outTime: '05:00 PM',
        })
      }
      setAttendanceData(mockData.reverse())
    } else {
      setAttendanceData([])
    }
  }, [selectedEmployee])

  const filteredEmployees = selectedDepartment
    ? employees.filter((emp) => emp.department === selectedDepartment)
    : []

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Weekly Employee Attendance</h1>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <select
          value={selectedDepartment}
          onChange={(e) => {
            setSelectedDepartment(e.target.value)
            setSelectedEmployee(null) // Reset selected employee when department changes
          }}
          style={{ padding: '10px', fontSize: '16px', marginRight: '10px' }}
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
          style={{ padding: '10px', fontSize: '16px' }}
          disabled={!selectedDepartment} // Disable until a department is selected
        >
          <option value="">-- Select Employee --</option>
          {filteredEmployees.map((employee) => (
            <option key={employee.employeeId} value={employee.employeeId}>
              {employee.name}
            </option>
          ))}
        </select>
      </div>

      {selectedEmployee && (
        <>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img
              src={selectedEmployee.avatar}
              alt={`${selectedEmployee.name}'s avatar`}
              style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }}
            />
            <h2>{selectedEmployee.name}</h2>
            <h3>Employee ID: {selectedEmployee.employeeId}</h3>
            <h4>Role: {selectedEmployee.role}</h4>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Date</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Time In</th>
                <th style={{ border: '1px solid #ccc', padding: '10px' }}>Time Out</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.map((record, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{record.date}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{record.inTime}</td>
                  <td style={{ border: '1px solid #ccc', padding: '10px' }}>{record.outTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  )
}

export default WeeklyAttendanceView

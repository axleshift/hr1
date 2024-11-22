import React, { useState, useEffect } from 'react'

const AttendanceRegularization = () => {
  const [attendanceData, setAttendanceData] = useState([])
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString())
  const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString())
  const [departments] = useState([
    { id: 1, name: 'Human Resources' },
    { id: 2, name: 'Freight Management' },
    { id: 3, name: 'Logistics' },
    { id: 4, name: 'Customer Service' },
  ])

  // Updated employees list with department affiliation
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
    {
      id: 5,
      name: 'Michael Smith',
      employeeId: '21012269',
      avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
      jobRole: 'Recruitment Specialist',
      department: 'Human Resources',
    },
    {
      id: 6,
      name: 'Linda Johnson',
      employeeId: '21012270',
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
      jobRole: 'HR Assistant',
      department: 'Human Resources',
    },
    {
      id: 7,
      name: 'David Lee',
      employeeId: '21012271',
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
      jobRole: 'Freight Coordinator',
      department: 'Freight Management',
    },
    {
      id: 8,
      name: 'Emma Brown',
      employeeId: '21012272',
      avatar: 'https://randomuser.me/api/portraits/women/8.jpg',
      jobRole: 'Freight Analyst',
      department: 'Freight Management',
    },
    {
      id: 9,
      name: 'Olivia Davis',
      employeeId: '21012273',
      avatar: 'https://randomuser.me/api/portraits/women/9.jpg',
      jobRole: 'Logistics Manager',
      department: 'Logistics',
    },
    {
      id: 10,
      name: 'James Wilson',
      employeeId: '21012274',
      avatar: 'https://randomuser.me/api/portraits/men/10.jpg',
      jobRole: 'Warehouse Supervisor',
      department: 'Logistics',
    },
    {
      id: 11,
      name: 'Sophia Taylor',
      employeeId: '21012275',
      avatar: 'https://randomuser.me/api/portraits/women/11.jpg',
      jobRole: 'Customer Service Manager',
      department: 'Customer Service',
    },
    {
      id: 12,
      name: 'Lucas Martinez',
      employeeId: '21012276',
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
      jobRole: 'Customer Support Rep',
      department: 'Customer Service',
    },
  ])

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [selectedDepartment, setSelectedDepartment] = useState('')

  const handleMarkIn = () => {
    if (selectedEmployee) {
      const updatedData = [...attendanceData]
      const index = updatedData.findIndex(
        (record) => record.employeeId === selectedEmployee.employeeId,
      )
      if (index !== -1) {
        updatedData[index].date = currentDate
        updatedData[index].inTime = currentTime
        updatedData[index].markInComplete = true
      } else {
        updatedData.push({
          date: currentDate,
          inTime: currentTime,
          outTime: '',
          employeeId: selectedEmployee.employeeId,
          markInComplete: true,
          markOutComplete: false,
        })
      }
      setAttendanceData(updatedData)
    }
  }

  const handleMarkOut = (index) => {
    const updatedData = [...attendanceData]
    updatedData[index].outTime = currentTime
    updatedData[index].markOutComplete = true
    setAttendanceData(updatedData)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
      setCurrentDate(new Date().toLocaleDateString())
    }, 1000)
    return () => clearInterval(intervalId)
  }, [])

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

        {!selectedEmployee?.markInComplete && (
          <button
            onClick={handleMarkIn}
            style={{
              padding: '5px 10px',
              marginLeft: '10px',
              backgroundColor: '#007bff',
              color: '#fff',
              borderRadius: '5px',
            }}
          >
            Mark In
          </button>
        )}
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
          Attendance
        </h2>
        <p>Current Time: {currentTime}</p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
          <thead>
            <tr>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
                Employee ID
              </th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Date</th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
                Time In
              </th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
                Time Out
              </th>
              <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {attendanceData.map((record, index) => (
              <tr key={index}>
                <td style={{ padding: '10px' }}>{record.employeeId}</td>
                <td style={{ padding: '10px' }}>{record.date}</td>
                <td style={{ padding: '10px' }}>{record.inTime}</td>
                <td style={{ padding: '10px' }}>{record.outTime}</td>
                <td style={{ padding: '10px', textAlign: 'center' }}>
                  {record.markInComplete && !record.markOutComplete ? (
                    <button
                      onClick={() => handleMarkOut(index)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        borderRadius: '5px',
                      }}
                    >
                      Mark Out
                    </button>
                  ) : (
                    <span style={{ color: 'green' }}>Completed</span>
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

export default AttendanceRegularization

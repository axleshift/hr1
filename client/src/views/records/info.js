import React, { useState } from 'react'
import {
  FaUserTie,
  FaUserPlus,
  FaMoneyCheckAlt,
  FaHandshake,
  FaChartLine,
  FaUsers,
  FaSearch,
} from 'react-icons/fa'

const EmployeeInformationManagement = () => {
  const jobDescriptions = [
    {
      title: 'HR Manager',
      icon: <FaUserTie />,
      bulletPoints: [
        'Oversees overall HR operations',
        'Ensures staffing needs are met',
        'Manages employee relations and development',
        'Enforces company policies and standards',
      ],
      funFact:
        'Did you know? HR Managers spend about 14% of their time dealing with conflict resolution!',
      employees: [{ name: 'Vincent Go', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }],
    },
    {
      title: 'Recruitment Specialist',
      icon: <FaUserPlus />,
      bulletPoints: [
        'Handles recruitment of drivers, warehouse staff, and admin roles',
        'Manages job postings, interviews, and onboarding processes',
        'Ensures the company hires qualified candidates',
        'Manages the interview process',
      ],
      funFact: 'Fun Fact: The average time to fill a job role is 42 days!',
      employees: [{ name: 'Jane Doe', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }],
    },
    {
      title: 'Logistics HR Specialist',
      icon: <FaHandshake />,
      bulletPoints: [
        'Oversees recruitment for logistics roles such as drivers and dispatchers',
        'Collaborates with department heads for seasonal staffing',
        'Develops HR policies for logistics and transportation',
      ],
      funFact: 'Logistics hiring typically spikes by 20% during the holiday season!',
      employees: [{ name: 'John Lennon', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' }],
    },
    {
      title: 'Fleet Safety and Compliance Manager',
      icon: <FaChartLine />,
      bulletPoints: [
        'Ensures compliance with transportation laws and regulations',
        'Implements driver safety training programs',
        'Manages accident investigations and reporting',
      ],
      funFact: 'Fleet safety programs can reduce incidents by up to 25%!',
      employees: [{ name: 'Mr.Bean', avatar: 'https://randomuser.me/api/portraits/men/4.jpg' }],
    },
    {
      title: 'Warehouse Employee Engagement Coordinator',
      icon: <FaUsers />,
      bulletPoints: [
        'Improves warehouse morale and employee engagement',
        'Organizes recognition programs for staff',
        'Conducts feedback sessions to improve warehouse operations',
      ],
      funFact: 'Engaged employees increase warehouse efficiency by 30%.',
      employees: [
        { name: 'Claire Grady', avatar: 'https://randomuser.me/api/portraits/women/5.jpg' },
      ],
    },
    {
      title: 'Payroll Specialist for Cargo Operations',
      icon: <FaMoneyCheckAlt />,
      bulletPoints: [
        'Processes payroll and benefits for logistics staff',
        'Ensures accurate payment tracking for contracted drivers',
        'Handles incentives for long-haul trips and extended hours',
      ],
      funFact: 'Automated payroll systems can reduce processing time by 40%.',
      employees: [
        { name: 'Linda Martinez', avatar: 'https://randomuser.me/api/portraits/women/6.jpg' },
      ],
    },
  ]

  const [selectedEmployee, setSelectedEmployee] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmployees = jobDescriptions
    .flatMap((job) => job.employees.map((employee) => ({ ...employee, job })))
    .filter((employee) => employee.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const selectEmployee = (employee) => {
    setSelectedEmployee(employee)
  }

  const clearSelection = () => {
    setSelectedEmployee(null)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#212529',
        padding: '40px',
        color: '#f8f9fa',
      }}
    >
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', color: '#f8f9fa' }}>
        Employee Information Management
      </h1>

      {/* Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FaSearch style={{ marginRight: '10px', color: '#f8f9fa' }} />
        <input
          type="text"
          placeholder="Search Employees"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #6f42c1',
            backgroundColor: '#343a40',
            color: '#f8f9fa',
          }}
        />
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        {filteredEmployees.map((employee, index) => (
          <div
            key={index}
            style={{
              margin: '20px 0',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#343a40',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              width: '100%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={() => selectEmployee(employee)}
          >
            <img
              src={employee.avatar}
              alt={`${employee.name} avatar`}
              style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                marginRight: '20px',
              }}
            />
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#f8f9fa' }}>
                {employee.name}
              </h2>
              <p style={{ fontSize: '16px', color: '#adb5bd' }}>{employee.job.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Detailed view of selected employee */}
      {selectedEmployee && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(33, 37, 41, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              backgroundColor: '#343a40',
              padding: '30px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '500px',
              color: '#f8f9fa',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              {selectedEmployee.name}
            </h2>
            <img
              src={selectedEmployee.avatar}
              alt={`${selectedEmployee.name} avatar`}
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                marginBottom: '15px',
              }}
            />
            <h3 style={{ fontSize: '20px', color: '#ffcc00', marginBottom: '10px' }}>
              Job Role: {selectedEmployee.job.title}
            </h3>
            <h4 style={{ fontSize: '18px', marginBottom: '10px', color: '#adb5bd' }}>
              Responsibilities:
            </h4>
            <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: '#ced4da' }}>
              {selectedEmployee.job.bulletPoints.map((point, index) => (
                <li key={index} style={{ marginBottom: '8px' }}>
                  {point}
                </li>
              ))}
            </ul>
            <button
              onClick={clearSelection}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#ffa500',
                color: '#1a1a1a',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmployeeInformationManagement

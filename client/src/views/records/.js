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

const JobDescriptions = () => {
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
      employees: [{ name: '	Jane Doe', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' }],
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

  const [selectedJob, setSelectedJob] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [currentJob, setCurrentJob] = useState(null)

  const filteredJobDescriptions =
    selectedJob === 'All'
      ? jobDescriptions.filter((job) => job.title.toLowerCase().includes(searchTerm.toLowerCase()))
      : jobDescriptions.filter(
          (job) =>
            job.title === selectedJob && job.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )

  const openModal = (job) => {
    setCurrentJob(job)
    setShowModal(true)
  }

  const closeModal = () => {
    setCurrentJob(null)
    setShowModal(false)
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#1a1a1a',
        padding: '40px',
        color: '#e0e0e0',
      }}
    >
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '30px', color: '#fff' }}>
        HR Management Job Descriptions
      </h1>

      {/* Search bar */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <FaSearch style={{ marginRight: '10px', color: '#fff' }} />
        <input
          type="text"
          placeholder="Search Job Titles"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
            backgroundColor: '#333',
            color: '#fff',
          }}
        />
      </div>

      {/* Dropdown to filter job titles */}
      <select
        onChange={(e) => setSelectedJob(e.target.value)}
        style={{
          padding: '10px',
          marginBottom: '20px',
          fontSize: '16px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          backgroundColor: '#333',
          color: '#fff',
        }}
      >
        <option value="All">All Jobs</option>
        {jobDescriptions.map((job, index) => (
          <option key={index} value={job.title}>
            {job.title}
          </option>
        ))}
      </select>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '100%',
          maxWidth: '1000px',
        }}
      >
        {filteredJobDescriptions.map((job, index) => (
          <div
            key={index}
            style={{
              margin: '20px 0',
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#2b2b2b',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => openModal(job)}
          >
            <h2
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                marginBottom: '10px',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {job.icon} <span style={{ marginLeft: '10px' }}>{job.title}</span>
            </h2>

            <h3 style={{ fontSize: '20px', marginBottom: '10px', color: '#ddd' }}>
              Responsibilities:
            </h3>

            <ul style={{ listStyle: 'disc', paddingLeft: '20px' }}>
              {job.bulletPoints.map((bulletPoint, index) => (
                <li key={index} style={{ fontSize: '16px', color: '#ccc', marginBottom: '8px' }}>
                  {bulletPoint}
                </li>
              ))}
            </ul>

            <div style={{ marginTop: '10px', color: '#bbb', fontStyle: 'italic' }}>
              {job.funFact}
            </div>
          </div>
        ))}
      </div>

      {/* Modal for showing employees */}
      {showModal && currentJob && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
        >
          <div
            style={{
              backgroundColor: '#333',
              padding: '30px',
              borderRadius: '8px',
              width: '90%',
              maxWidth: '500px',
              color: '#fff',
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '10px' }}>
              {currentJob.title}
            </h2>
            <h3 style={{ fontSize: '20px', color: '#ffa500', marginBottom: '10px' }}>
              Assigned Employees:
            </h3>
            <ul style={{ paddingLeft: '20px', listStyleType: 'none', margin: 0 }}>
              {currentJob.employees.map((employee, index) => (
                <li
                  key={index}
                  style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}
                >
                  <img
                    src={employee.avatar}
                    alt={`${employee.name} avatar`}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px',
                    }}
                  />
                  <span style={{ fontSize: '16px' }}>{employee.name}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={closeModal}
              style={{
                marginTop: '20px',
                padding: '10px 20px',
                fontSize: '16px',
                backgroundColor: '#ffa500',
                color: '#333',
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

export default JobDescriptions

import React, { useState } from 'react'
import { Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement)

const Dashboard = () => {
  const [performanceData] = useState([
    {
      id: 1,
      employeeId: '21012265',
      name: 'John Luis G. lu',
      goals: 'Improve HR efficiency',
      performanceRating: 'Excellent',
      achievements: 95,
      goalsAchieved: 10,
    },
    {
      id: 2,
      employeeId: '21012266',
      name: 'Jane Doe',
      goals: 'Optimize freight operations',
      performanceRating: 'Good',
      achievements: 80,
      goalsAchieved: 8,
    },
    {
      id: 3,
      employeeId: '21012267',
      name: 'Samuel Tan',
      goals: 'Enhance logistics coordination',
      performanceRating: 'Satisfactory',
      achievements: 70,
      goalsAchieved: 7,
    },
  ])

  const [attendanceData] = useState([
    { employeeId: '21012265', name: 'John Luis G. lu', status: 'Present' },
    { employeeId: '21012266', name: 'Jane Doe', status: 'Present' },
    { employeeId: '21012267', name: 'Samuel Tan', status: 'Absent' },
  ])

  const [leaveRequests] = useState([
    { employeeId: '21012265', name: 'John Luis G. lu', status: 'Approved' },
    { employeeId: '21012267', name: 'Samuel Tan', status: 'Pending' },
  ])

  const totalEmployees = attendanceData.length

  const totalEmployeesData = {
    labels: ['Total Employees'],
    datasets: [
      {
        data: [totalEmployees],
        backgroundColor: ['#FFA726'],
        hoverBackgroundColor: ['#FB8C00'],
        borderWidth: 0,
      },
    ],
  }

  const analyticsData = {
    labels: performanceData.map((data) => data.name),
    datasets: [
      {
        label: 'Achievements (%)',
        data: performanceData.map((data) => data.achievements),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Goals Achieved',
        data: performanceData.map((data) => data.goalsAchieved),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  }

  const presentCount = attendanceData.filter((data) => data.status === 'Present').length
  const absentCount = attendanceData.filter((data) => data.status === 'Absent').length

  const presentData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [presentCount, absentCount],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
        borderWidth: 0,
      },
    ],
  }

  const leaveRequestData = {
    labels: ['Approved', 'Pending'],
    datasets: [
      {
        data: [
          leaveRequests.filter((r) => r.status === 'Approved').length,
          leaveRequests.filter((r) => r.status === 'Pending').length,
        ],
        backgroundColor: ['#4CAF50', '#FF9800'],
        hoverBackgroundColor: ['#4CAF50', '#FF9800'],
        borderWidth: 0,
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#333',
        },
      },
      tooltip: {
        bodyColor: '#333',
        titleColor: '#333',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    layout: {
      padding: 0,
      backgroundColor: 'transparent',
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
        },
      },
      y: {
        ticks: {
          color: '#333',
        },
      },
    },
  }

  return (
    <div style={{ height: '100vh', backgroundColor: '#F4F5FA', padding: '20px', color: '#333' }}>
      {/* Top Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          backgroundColor: '#6C63FF',
          padding: '10px 20px',
          borderRadius: '10px',
          color: '#fff',
        }}
      >
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>Welcome, John</span>
          <img src="https://via.placeholder.com/40" alt="Profile" style={{ borderRadius: '50%' }} />
        </div>
      </div>

      {/* Metrics Section */}
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Total Employees</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6C63FF' }}>{totalEmployees}</p>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Present Employees</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6C63FF' }}>{presentCount}</p>
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Leave Requests</h3>
          <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#6C63FF' }}>
            {leaveRequests.filter((r) => r.status === 'Approved').length} Approved
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div
          style={{
            flex: 2,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Employee Performance Overview</h3>
          <Bar data={analyticsData} options={chartOptions} />
        </div>
        <div
          style={{
            flex: 1,
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3>Attendance</h3>
          <Doughnut data={presentData} options={chartOptions} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

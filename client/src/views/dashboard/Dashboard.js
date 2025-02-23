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
        borderWidth: 0, // Removed border
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
        borderWidth: 0, // Removed border
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
        borderWidth: 0, // Removed border
      },
    ],
  }

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff', // White text for legend
        },
      },
      tooltip: {
        bodyColor: '#fff', // White text for tooltips
        titleColor: '#fff',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#fff', // White text for x-axis
        },
      },
      y: {
        ticks: {
          color: '#fff', // White text for y-axis
        },
      },
    },
  }

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        fontSize: '16px',
        lineHeight: '1.5',
        padding: '20px',
        backgroundColor: 'transparent', // Transparent background
        color: '#fff',
      }}
    >
      <h2
        style={{
          fontSize: '28px',
          fontWeight: 'bold',
          marginBottom: '30px',
          textAlign: 'center',
        }}
      >
        Dashboard
      </h2>

      <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
          }}
        >
          <h3>Total Employees</h3>
          <Doughnut data={totalEmployeesData} options={chartOptions} />
          <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>
            {totalEmployees} Employees
          </p>
        </div>

        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
          }}
        >
          <h3>Employee Attendance</h3>
          <Doughnut data={presentData} options={chartOptions} />
          <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>
            {presentCount} Present / {absentCount} Absent
          </p>
        </div>

        <div
          style={{
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.2)',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            width: '250px',
          }}
        >
          <h3>Leave Requests</h3>
          <Doughnut data={leaveRequestData} options={chartOptions} />
          <p style={{ fontSize: '20px', fontWeight: 'bold', margin: '10px 0' }}>
            {leaveRequests.filter((r) => r.status === 'Approved').length} Approved /{' '}
            {leaveRequests.filter((r) => r.status === 'Pending').length} Pending
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: '600px',
          height: '350px',
          margin: '30px auto',
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>Employee Performance Overview</h3>
        <Bar data={analyticsData} options={chartOptions} />
      </div>
    </div>
  )
}

export default Dashboard

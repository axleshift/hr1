import React, { useState } from 'react'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const PerformanceManagement = () => {
  const [performanceData, setPerformanceData] = useState([
    {
      id: 1,
      employeeId: '21012265',
      name: 'John Luis G. lu',
      goals: 'Improve HR efficiency',
      performanceRating: 'Excellent',
      comments: 'Consistently exceeded expectations in managing HR tasks.',
      achievements: 95,
      goalsAchieved: 10,
    },
    {
      id: 2,
      employeeId: '21012266',
      name: 'Jane Doe',
      goals: 'Optimize freight operations',
      performanceRating: 'Good',
      comments: 'Met all operational targets and improved freight processes.',
      achievements: 80,
      goalsAchieved: 8,
    },
    {
      id: 3,
      employeeId: '21012267',
      name: 'Samuel Tan',
      goals: 'Enhance logistics coordination',
      performanceRating: 'Satisfactory',
      comments: 'Handled logistics coordination effectively but room for improvement.',
      achievements: 70,
      goalsAchieved: 7,
    },
  ])

  const handleUpdateRating = (id, newRating) => {
    const updatedData = performanceData.map((data) =>
      data.id === id ? { ...data, performanceRating: newRating } : data,
    )
    setPerformanceData(updatedData)
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
        Performance Management System
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
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Goals</th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>
              Performance Rating
            </th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Comments</th>
            <th style={{ padding: '10px', backgroundColor: '#6f42c1', color: '#fff' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {performanceData.map((data) => (
            <tr key={data.id}>
              <td style={{ padding: '10px' }}>{data.employeeId}</td>
              <td style={{ padding: '10px' }}>{data.name}</td>
              <td style={{ padding: '10px' }}>{data.goals}</td>
              <td style={{ padding: '10px' }}>{data.performanceRating}</td>
              <td style={{ padding: '10px' }}>{data.comments}</td>
              <td
                style={{
                  padding: '10px',
                  textAlign: 'center',
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '10px',
                }}
              >
                <button
                  onClick={() => handleUpdateRating(data.id, 'Excellent')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    borderRadius: '5px',
                  }}
                >
                  Set Excellent
                </button>
                <button
                  onClick={() => handleUpdateRating(data.id, 'Good')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#ffc107',
                    color: '#fff',
                    borderRadius: '5px',
                  }}
                >
                  Set Good
                </button>
                <button
                  onClick={() => handleUpdateRating(data.id, 'Satisfactory')}
                  style={{
                    padding: '5px 10px',
                    backgroundColor: '#dc3545',
                    color: '#fff',
                    borderRadius: '5px',
                  }}
                >
                  Set Satisfactory
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ maxWidth: '600px', height: '400px', margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Employee Performance Analytics
        </h3>
        <Bar data={analyticsData} options={{ responsive: true, maintainAspectRatio: true }} />
      </div>
    </div>
  )
}

export default PerformanceManagement

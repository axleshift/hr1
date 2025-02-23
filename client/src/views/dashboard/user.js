import React from 'react'

const EmployeePortal = () => {
  const employee = {
    name: 'Vincent Go',
    role: 'HR Manager',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    company: 'AXELSHIFT',
    email: 'admin@gmail.com',
    phone: '0912-345-6789',
    department: 'Human Resources',
    location: 'Philippines',
    hireDate: '1/16/2024',
    memberSince: '7/3/2024',
    tasks: 5,
    points: 6290,
    achievements: ['Implemented a company-wide HR system', 'Reduced turnover by 20% in 2023'],
  }

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Open Sans', sans-serif" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: '250px',
          backgroundColor: 'transparent',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px',
          boxShadow: '2px 0 8px rgba(0, 0, 0, 0.1)',
          borderRight: '1px solid rgba(255, 255, 255, 0.2)', // Added line to divide sidebar
        }}
      >
        <img
          src={employee.avatar}
          alt={employee.name}
          style={{
            width: '100px',
            height: '100px',
            borderRadius: '50%',
            border: '4px solid #fff',
            marginBottom: '15px',
          }}
        />
        <h2 style={{ fontSize: '22px', margin: '10px 0 5px', textAlign: 'center' }}>
          {employee.name}
        </h2>
        <p style={{ fontSize: '14px', color: '#aaa', marginBottom: '20px', textAlign: 'center' }}>
          {employee.role}
        </p>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '40px', backgroundColor: 'transparent', color: '#e0e0e0' }}>
        {/* Welcome Section */}
        <section style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '600' }}>Welcome, {employee.name}</h1>
          <p style={{ fontSize: '16px', color: '#bbb' }}>
            <strong>Role:</strong> {employee.role} | <strong>Company:</strong> {employee.company}
          </p>
          <p style={{ fontSize: '16px', color: '#bbb' }}>
            <strong>Location:</strong> {employee.location} | <strong>Hire Date:</strong>{' '}
            {employee.hireDate}
          </p>
          <p style={{ fontSize: '16px', color: '#bbb' }}>
            <strong>Member Since:</strong> {employee.memberSince}
          </p>
        </section>

        {/* Quick Stats */}
        <section style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
          <div style={statCardStyle('#007bff')}>
            <h3 style={statNumberStyle}>{employee.tasks}</h3>
            <p>Pending Tasks</p>
          </div>
          <div style={statCardStyle('#ffc107')}>
            <h3 style={statNumberStyle}>{employee.points}</h3>
            <p>Reward Points</p>
          </div>
        </section>

        {/* Contact Information */}
        <section style={{ marginBottom: '30px' }}>
          <h2 style={sectionTitleStyle}>Contact Information</h2>
          <p style={{ fontSize: '16px', color: '#bbb' }}>
            <strong>Email:</strong> {employee.email}
          </p>
          <p style={{ fontSize: '16px', color: '#bbb' }}>
            <strong>Phone:</strong> {employee.phone}
          </p>
          <p style={{ fontSize: '16px', color: '#bbb' }}>
            <strong>Department:</strong> {employee.department}
          </p>
        </section>

        {/* Achievements */}
        <section>
          <h2 style={sectionTitleStyle}>Achievements</h2>
          <ul style={{ listStyleType: 'circle', paddingLeft: '20px' }}>
            {employee.achievements.map((achievement, index) => (
              <li key={index} style={{ fontSize: '16px', color: '#bbb', marginBottom: '5px' }}>
                {achievement}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}

const statCardStyle = (bgColor) => ({
  backgroundColor: bgColor,
  color: '#fff',
  padding: '20px',
  borderRadius: '8px',
  textAlign: 'center',
  flex: 1,
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
})

const statNumberStyle = {
  fontSize: '28px',
  fontWeight: '700',
  margin: '0 0 8px',
}

const sectionTitleStyle = {
  fontSize: '22px',
  fontWeight: '600',
  marginBottom: '10px',
  color: '#ddd',
}

export default EmployeePortal

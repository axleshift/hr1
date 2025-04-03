import React, { useState } from 'react'
import {
  FaUser,
  FaCalendarCheck,
  FaPlaneDeparture,
  FaFileInvoiceDollar,
  FaChartLine,
  FaEdit,
  FaSave,
} from 'react-icons/fa'

const AccountUI = () => {
  const [activeTab, setActiveTab] = useState('profile')
  const [editMode, setEditMode] = useState(false)
  const [leaveRequest, setLeaveRequest] = useState({
    type: 'vacation',
    startDate: '',
    endDate: '',
    reason: '',
  })
  const [leaveRequests, setLeaveRequests] = useState([])
  const [userData, setUserData] = useState({
    name: 'John Luis',
    email: 'john.Luis@company.com',
    phone: '+1 234 567 890',
    address: '123 Main St, New York, USA',
  })

  const [attendanceData] = useState([
    { date: '2023-09-01', checkIn: '09:00', checkOut: '17:00', hours: 8 },
    { date: '2023-09-02', checkIn: '08:55', checkOut: '17:10', hours: 8.25 },
    { date: '2023-09-03', checkIn: '09:15', checkOut: '17:05', hours: 7.83 },
  ])

  const [payslips] = useState([
    { month: 'January 2023', downloadLink: '#' },
    { month: 'February 2023', downloadLink: '#' },
    { month: 'March 2023', downloadLink: '#' },
  ])

  const [performanceData] = useState([
    { date: '2023-03-01', rating: '4.5/5', feedback: 'Excellent performance this quarter' },
    { date: '2023-06-01', rating: '4.2/5', feedback: 'Great teamwork and communication' },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prev) => ({ ...prev, [name]: value }))
  }

  const handleLeaveChange = (e) => {
    const { name, value } = e.target
    setLeaveRequest((prev) => ({ ...prev, [name]: value }))
  }

  const submitLeaveRequest = (e) => {
    e.preventDefault()
    setLeaveRequests([...leaveRequests, { ...leaveRequest, id: Date.now(), status: 'Pending' }])
    setLeaveRequest({ type: 'vacation', startDate: '', endDate: '', reason: '' })
  }

  const tabIcons = {
    profile: <FaUser />,
    attendance: <FaCalendarCheck />,
    leave: <FaPlaneDeparture />,
    payslip: <FaFileInvoiceDollar />,
    performance: <FaChartLine />,
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div style={styles.card}>
            <form style={styles.form}>
              {['name', 'email', 'phone', 'address'].map((field) => (
                <label key={field} style={styles.label}>
                  {field.charAt(0).toUpperCase() + field.slice(1)}:
                  <input
                    type="text"
                    name={field}
                    value={userData[field]}
                    onChange={handleInputChange}
                    style={styles.input}
                    disabled={!editMode}
                  />
                </label>
              ))}
              <div style={{ marginTop: '10px' }}>
                {!editMode ? (
                  <button style={styles.editButton} onClick={() => setEditMode(true)}>
                    <FaEdit /> Edit
                  </button>
                ) : (
                  <button style={styles.saveButton} onClick={() => setEditMode(false)}>
                    <FaSave /> Save
                  </button>
                )}
              </div>
            </form>
          </div>
        )
      case 'attendance':
        return (
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Check In</th>
                  <th>Check Out</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.checkIn}</td>
                    <td>{record.checkOut}</td>
                    <td>{record.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      case 'leave':
        return (
          <div style={styles.card}>
            <form onSubmit={submitLeaveRequest} style={styles.form}>
              <label style={styles.label}>
                Type:
                <select
                  name="type"
                  value={leaveRequest.type}
                  onChange={handleLeaveChange}
                  style={styles.input}
                >
                  <option value="vacation">Vacation</option>
                  <option value="sick">Sick</option>
                  <option value="personal">Personal</option>
                </select>
              </label>
              <label style={styles.label}>
                Start Date:
                <input
                  type="date"
                  name="startDate"
                  value={leaveRequest.startDate}
                  onChange={handleLeaveChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                End Date:
                <input
                  type="date"
                  name="endDate"
                  value={leaveRequest.endDate}
                  onChange={handleLeaveChange}
                  style={styles.input}
                />
              </label>
              <label style={styles.label}>
                Reason:
                <textarea
                  name="reason"
                  value={leaveRequest.reason}
                  onChange={handleLeaveChange}
                  style={styles.input}
                />
              </label>
              <button type="submit" style={styles.submitButton}>
                Submit
              </button>
            </form>
          </div>
        )
      case 'payslip':
        return (
          <div style={styles.card}>
            <ul>
              {payslips.map((p, i) => (
                <li key={i}>
                  <a href={p.downloadLink} style={styles.link}>
                    {p.month}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )
      case 'performance':
        return (
          <div style={styles.card}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Rating</th>
                  <th>Feedback</th>
                </tr>
              </thead>
              <tbody>
                {performanceData.map((p, i) => (
                  <tr key={i}>
                    <td>{p.date}</td>
                    <td>{p.rating}</td>
                    <td>{p.feedback}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <aside style={styles.sidebar}>
          <div style={styles.profileHeader}>JL</div>
          <div style={styles.userInfo}>
            <strong>John Luis</strong>
            <small>john.Luis@company.com</small>
          </div>
          <ul style={styles.sidebarList}>
            {['profile', 'attendance', 'leave', 'payslip', 'performance'].map((tab) => (
              <li key={tab} style={styles.sidebarItem}>
                <button style={styles.sidebarButton} onClick={() => setActiveTab(tab)}>
                  {tabIcons[tab]} {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </aside>
        <main style={styles.mainContent}>
          <h1 style={styles.pageTitle}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          {renderTabContent()}
        </main>
      </div>
    </div>
  )
}

const styles = {
  wrapper: {
    margin: 0,
    padding: 0,
    height: '100vh',
    width: '100%',
    overflow: 'hidden',
    display: 'flex',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
    backgroundColor: '#0d1117', // Dark base
    color: '#c9d1d9', // Light text
  },
  container: {
    display: 'flex',
    flexGrow: 1,
    width: '100%',
    maxWidth: '1500px',
    margin: '0 auto',
    boxSizing: 'border-box',
  },
  sidebar: {
    width: '240px',
    backgroundColor: '#161b22', // Darker sidebar
    color: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  profileHeader: {
    backgroundColor: '#21262d',
    borderRadius: '50%',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    color: '#58a6ff',
  },
  userInfo: {
    fontSize: '14px',
    display: 'flex',
    flexDirection: 'column',
    gap: '2px',
  },
  sidebarList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    flexGrow: 1,
  },
  sidebarItem: {
    marginBottom: '10px',
  },
  sidebarButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px',
    border: 'none',
    backgroundColor: '#21262d',
    color: '#c9d1d9',
    cursor: 'pointer',
    borderRadius: '8px',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  mainContent: {
    flexGrow: 1,
    padding: '20px',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    overflowY: 'auto',
    overflowX: 'hidden',
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
  },
  pageTitle: {
    fontSize: '24px',
    fontWeight: '700',
    marginBottom: '20px',
    color: '#58a6ff',
  },
  card: {
    backgroundColor: '#161b22',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.3)',
    color: '#c9d1d9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
  },
  input: {
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #30363d',
    marginTop: '5px',
    width: '100%',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
  },
  editButton: {
    backgroundColor: '#238636',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  saveButton: {
    backgroundColor: '#2f81f7',
    color: '#fff',
    border: 'none',
    padding: '10px 14px',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  submitButton: {
    backgroundColor: '#2f81f7',
    color: 'white',
    border: 'none',
    padding: '10px',
    cursor: 'pointer',
    borderRadius: '8px',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '10px',
    backgroundColor: '#161b22',
    color: '#c9d1d9',
  },
  link: {
    color: '#2f81f7',
    textDecoration: 'none',
  },
}

export default AccountUI

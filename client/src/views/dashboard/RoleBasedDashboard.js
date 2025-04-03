import React from 'react'
const AdminDashboard = React.lazy(() => import('./Dashboard'))
const UserDashboard = React.lazy(() => import('./user_dash'))

const RoleBasedDashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role || 'employee' // fallback to employee

  if (role === 'admin') {
    return <AdminDashboard />
  }

  return <UserDashboard />
}

export default RoleBasedDashboard

import React, { Suspense } from 'react'

const Admintime = React.lazy(() => import('./admintime'))
const Usertime = React.lazy(() => import('./time'))

const RoleBasedAttendance = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role || 'employee' // fallback to employee

  return (
    <Suspense fallback={<div className="text-center mt-5">Loading dashboard...</div>}>
      {role === 'admin' ? <Admintime /> : <Usertime />}
    </Suspense>
  )
}

export default RoleBasedAttendance

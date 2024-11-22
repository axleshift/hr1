import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TimeandAttendance = React.lazy(() => import('./views/records/time'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/recordmanagement/timeandattendance',
    name: 'Time and Attendance',
    element: TimeandAttendance,
  },
]

export default routes

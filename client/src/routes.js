import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TimeandAttendance = React.lazy(() => import('./views/records/time'))
const Jobdescription = React.lazy(() => import('./views/records/job'))
const login = React.lazy(() => import('./views/login/Login.js'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {
    path: '/recordmanagement/timeandattendance',
    name: 'Time and Attendance',
    element: TimeandAttendance,
  },
  {
    path: '/recordmanagement/jobdescription',
    name: 'Job Description',
    element: Jobdescription,
  },
  { path: '/logintesting', name: 'Login', element: login },
]

export default routes

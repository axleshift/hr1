import { element } from 'prop-types'
import React from 'react'

const TimeandAttendance = React.lazy(() => import('./views/records/time'))
const DocumentManagement = React.lazy(() => import('./views/records/docu'))
const req = React.lazy(() => import('./views/records/leave'))
const perfor = React.lazy(() => import('./views/records/perfo'))
const off = React.lazy(() => import('./views/records/off'))
const profile = React.lazy(() => import('./views/dashboard/user'))
const info = React.lazy(() => import('./views/records/info'))
const hr_analytics = React.lazy(() => import('./views/records/hr_analytics'))
const RoleBasedDashboard = React.lazy(() => import('./views/dashboard/RoleBasedDashboard'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: RoleBasedDashboard },
  {
    path: '/recordmanagement/timeandattendance',
    name: 'Time and Attendance',
    element: TimeandAttendance,
  },
  {
    path: '/recordmanagement/document',
    name: 'Document',
    element: DocumentManagement,
  },
  {
    path: '/request/leaverequest',
    name: 'Leave Request',
    element: req,
  },
  {
    path: '/performanemanagement/',
    name: 'Performance',
    element: perfor,
  },
  {
    path: '/request/offboarding',
    name: 'Off Boarding Request',
    element: off,
  },
  {
    path: '/profile',
    name: 'Profile',
    element: profile,
  },
  {
    path: '/recordmanagement/employeeinfo',
    name: 'Employee Information',
    element: info,
  },
  {
    path: '/record/hranalytics',
    name: 'HR Analytics',
    element: hr_analytics,
  },
]

export default routes

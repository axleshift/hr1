import { element } from 'prop-types'
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const TimeandAttendance = React.lazy(() => import('./views/records/time'))
const Jobdescription = React.lazy(() => import('./views/records/job'))
const DocumentManagement = React.lazy(() => import('./views/records/docu'))
const req = React.lazy(() => import('./views/records/leave'))
const perfor = React.lazy(() => import('./views/records/perfo'))
const off = React.lazy(() => import('./views/records/off'))
const profile = React.lazy(() => import('./views/dashboard/user'))
const info = React.lazy(() => import('./views/records/info'))

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
]

export default routes

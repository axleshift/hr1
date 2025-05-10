import { element } from 'prop-types'
import React from 'react'

const RoleBaseattendance = React.lazy(() => import('./views/attendance/RoleBaseattendance'))
const DocumentManagement = React.lazy(() => import('./views/records/docu'))
const off = React.lazy(() => import('./views/records/off'))
const profile = React.lazy(() => import('./views/user/Profile'))
const info = React.lazy(() => import('./views/records/info'))
const hr_analytics = React.lazy(() => import('./views/records/hranalytics'))
const RoleBasedDashboard = React.lazy(() => import('./views/dashboard/RoleBasedDashboard'))
const pj = React.lazy(() => import('./views/endpage/postjob'))
const hw = React.lazy(() => import('./views/endpage/newhire'))
const an = React.lazy(() => import('./views/endpage/Postannouncement'))

// 🆕 Add these two:
const VerifyOtp = React.lazy(() => import('./views/user/otpchangepass'))
const ChangePassword = React.lazy(() => import('./views/user/Changepassword'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: RoleBasedDashboard },
  {
    path: '/recordmanagement/timeandattendance',
    name: 'Time and Attendance',
    element: RoleBaseattendance,
  },
  {
    path: '/recordmanagement/document',
    name: 'Document',
    element: DocumentManagement,
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
  {
    path: '/postjob',
    name: 'Post job Posting',
    element: pj,
  },
  {
    path: '/newhired',
    name: 'New Hire',
    element: hw,
  },

  // 🆕 OTP Verification and Change Password
  {
    path: '/verify-otp',
    name: 'Verify OTP',
    element: VerifyOtp,
  },
  {
    path: '/change-password',
    name: 'Change Password',
    element: ChangePassword,
  },
  {
    path: '/announcement',
    name: 'announcement',
    element: an,
  },
]

export default routes

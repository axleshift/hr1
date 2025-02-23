import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faDashboard,
  faDatabase,
  faGear,
  faGears,
  faUserCheck,
  faUsers,
  faFolder,
  faArrowRight,
  faChartColumn,
  faCircleExclamation,
} from '@fortawesome/free-solid-svg-icons'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <FontAwesomeIcon icon={faDashboard} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'RECORD MANAGEMENT',
  },
  {
    component: CNavItem,
    name: 'Employee Information',
    to: '/recordmanagement/employeeinfo',
    icon: <FontAwesomeIcon icon={faDatabase} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Time and Attendance',
    to: 'recordmanagement/timeandattendance',
    icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Document Management',
    to: 'recordmanagement/document',
    icon: <FontAwesomeIcon icon={faFolder} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Job Description',
    to: 'recordmanagement/jobdescription',
    icon: <FontAwesomeIcon icon={faUsers} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Peformance Management',
  },
  {
    component: CNavItem,
    name: 'Performance',
    to: '/performanemanagement/',
    icon: <FontAwesomeIcon icon={faChartColumn} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Leave Application',
  },
  {
    component: CNavItem,
    name: 'Leave Request',
    to: '/request/leaverequest',
    icon: <FontAwesomeIcon icon={faArrowRight} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Off Boarding Management',
  },
  {
    component: CNavItem,
    name: 'Off Boarding Request',
    to: '/request/offboarding',
    icon: <FontAwesomeIcon icon={faCircleExclamation} className="nav-icon" />,
  },
]

export default _nav

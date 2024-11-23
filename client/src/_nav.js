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
  faChartColumn,
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
    name: 'Manage Employee',
    to: 'recordmanagement/manageemployee',
    icon: <FontAwesomeIcon icon={faUsers} className="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'testing page',
    icon: <FontAwesomeIcon icon={faGears} className="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'login',
    to: '/logintesting',
    icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
  },
]

export default _nav

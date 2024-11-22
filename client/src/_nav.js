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
    icon: <FontAwesomeIcon icon={faDashboard} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'RECORD MANAGEMENT',
    icon: <FontAwesomeIcon icon={faDatabase} className=" me-3" />,
  },
  {
    component: CNavItem,
    name: 'Time and Attendance',
    to: 'recordmanagement/timeandattendance',
    icon: <FontAwesomeIcon icon={faCalendarDays} className=" me-3" />,
  },
  {
    component: CNavItem,
    name: 'Manage Employee',
    icon: <FontAwesomeIcon icon={faUsers} className=" me-3 " />,
  },
  {
    component: CNavTitle,
    name: 'testing page',
    icon: <FontAwesomeIcon icon={faGears} className=" me-3" />,
  },
  {
    component: CNavItem,
    name: 'login',
    to: '/logintesting',
    icon: <FontAwesomeIcon icon={faCalendarDays} className=" me-3" />,
  },
]

export default _nav

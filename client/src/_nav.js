import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faDashboard,
  faDatabase,
  faFolder,
  faCircleExclamation,
  faSignsPost,
  faUserTie,
  faChartColumn,
  faBullhorn,
} from '@fortawesome/free-solid-svg-icons'

const getNavItems = (role, newHireCount = 0) => {
  const baseNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <FontAwesomeIcon icon={faDashboard} className="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'My Records',
    },
    {
      component: CNavItem,
      name: 'Time and Attendance',
      to: '/recordmanagement/timeandattendance',
      icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
    },
  ]

  const adminNav = [
    {
      component: CNavTitle,
      name: 'Announcement',
    },
    {
      component: CNavItem,
      name: 'Post Announcement',
      to: '/announcement',
      icon: <FontAwesomeIcon icon={faBullhorn} className="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Employee Onboarding',
    },
    {
      component: CNavItem,
      name: 'Post Job Posting',
      to: '/postjob',
      icon: <FontAwesomeIcon icon={faSignsPost} className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'New Hired',
      to: '/newhired',
      icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />,
      badge: {
        color: 'danger',
        text: `${newHireCount}`,
      },
    },
    {
      component: CNavTitle,
      name: 'Record Management',
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
      to: '/recordmanagement/timeandattendance',
      icon: <FontAwesomeIcon icon={faCalendarDays} className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'Document Management',
      to: '/recordmanagement/document',
      icon: <FontAwesomeIcon icon={faFolder} className="nav-icon" />,
    },
    {
      component: CNavTitle,
      name: 'Performance Management',
    },
    {
      component: CNavItem,
      name: 'HR Analytics Report',
      to: '/record/hranalytics',
      icon: <FontAwesomeIcon icon={faChartColumn} className="nav-icon" />,
    },
  ]

  if (role === 'admin') {
    return [...baseNav, ...adminNav]
  } else if (role === '') {
    return [...baseNav]
  } else {
    return baseNav
  }
}

export default getNavItems

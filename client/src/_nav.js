import React from 'react'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCalendarDays,
  faDashboard,
  faDatabase,
  faFolder,
  faArrowRight,
  faChartColumn,
  faCircleExclamation,
  faSignsPost,
  faUserTie
} from '@fortawesome/free-solid-svg-icons'

// Function that returns nav items based on role
const getNavItems = (role) => {
  const baseNav = [
    {
      component: CNavItem,
      name: 'Dashboard',
      to: '/dashboard',
      icon: <FontAwesomeIcon icon={faDashboard} className="nav-icon" />,
    },
  ]

  const adminNav = [
    {
      component: CNavTitle,
      name: 'Employee Onboarding',
    },
    {
      component: CNavItem,
      name: 'Post job Posting',
      to: '/postjob',
      icon: <FontAwesomeIcon icon={faSignsPost} className="nav-icon" />,
    },
    {
      component: CNavItem,
      name: 'NeW Hired',
      to: '/postjob',
      icon: <FontAwesomeIcon icon={faUserTie} className="nav-icon" />,
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
      component: CNavItem,
      name: 'HR Analytics Report',
      to: '/record/hranalytics',
      icon: <FontAwesomeIcon icon={faChartColumn} className="nav-icon" />,
    },
  ]

  const employeeNav = [
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

  // Combine based on role
  if (role === 'admin') {
    return [...baseNav, ...adminNav, ...employeeNav] // Admin sees all
  } else if (role === 'employee') {
    return [...baseNav, ...employeeNav] // Employee sees limited
  } else {
    return baseNav // default
  }
}

export default getNavItems

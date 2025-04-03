import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
  CImage,
} from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import getNavItems from '../_nav' // ✅ Use the function

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  // ✅ Get user role
  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role || 'employee' // fallback to employee

  const navigation = getNavItems(role) // ✅ Generate role-based nav

  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/">
          <CImage
            fluid
            src="/images/hr1.png"
            alt="Logo"
            height={30}
            className="sidebar-brand-full"
          />
          <CImage src="/favicon.ico" alt="Logo" height={30} className="sidebar-brand-narrow" />
        </CSidebarBrand>
        <CCloseButton
          className="d-lg-none"
          dark
          onClick={() => dispatch({ type: 'set', sidebarShow: false })}
        />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} /> {/* ✅ Fixed */}
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

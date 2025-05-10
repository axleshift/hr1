import React, { useEffect, useState } from 'react'
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
import getNavItems from '../_nav'
import axios from 'axios'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  const user = JSON.parse(localStorage.getItem('user'))
  const role = user?.role || 'employee'

  const [newHireCount, setNewHireCount] = useState(0)

  // 🔁 Automatically fetch new hire count every 10 seconds
  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get('https://backend-hr1.axleshift.com/api/newhires/count')
        setNewHireCount(response.data.count || 0)
      } catch (err) {
        console.error('Error fetching new hire count:', err)
        setNewHireCount(0)
      }
    }

    fetchCount()
    const interval = setInterval(fetchCount, 10000)
    return () => clearInterval(interval)
  }, [])

  const navigation = getNavItems(role, newHireCount)

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

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

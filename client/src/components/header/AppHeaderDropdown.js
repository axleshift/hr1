import React from 'react'
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import CIcon from '@coreui/icons-react'
import { Link, useNavigate } from 'react-router-dom'

const AppHeaderDropdown = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem('user')) || {}

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/login')
  }

  const handleChangePasswordClick = () => {
    navigate('/verify-otp')
  }

  const getAvatarContent = () => {
    if (user?.photo?.startsWith('/uploads')) {
      return `https://backend-hr1.axleshift.com${user.photo}`
    }
    return null
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0 pe-0" caret={false}>
        <CAvatar src={getAvatarContent()} size="md" color="info" textColor="white">
          {!user?.photo && user?.firstName?.charAt(0)}
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem>
          <Link to="/profile" className="dropdown-item">
            <CIcon icon={cilUser} className="me-2" />
            Profile
          </Link>
        </CDropdownItem>
        <CDropdownItem onClick={handleChangePasswordClick}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Change Password
        </CDropdownItem>
        <CDropdownDivider />
        <CDropdownItem onClick={handleLogout}>
          <CIcon icon={cilLockLocked} className="me-2" />
          Log out
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default AppHeaderDropdown

import React, { Suspense, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import PropTypes from 'prop-types'

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/login/Login'))
const Login2FA = React.lazy(() => import('./views/login/Login2fa'))
const Page404 = React.lazy(() => import('./views/error/page404/Page404'))
const Page500 = React.lazy(() => import('./views/error/page500/Page500'))

// 🔒 Route Guard for token
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

// 🔒 Route Guard for 2FA
const Require2FA = ({ children }) => {
  const verified = localStorage.getItem('otpVerified') === 'true'
  if (!verified) return <Navigate to="/login-2fa" replace />
  return children
}

RequireAuth.propTypes = {
  children: PropTypes.node.isRequired,
}
Require2FA.propTypes = {
  children: PropTypes.node.isRequired,
}

const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (!isColorModeSet()) {
      setColorMode(storedTheme)
    }
  }, [isColorModeSet, setColorMode, storedTheme])

  return (
    <Router>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login-2fa" element={<Login2FA />} />
          <Route path="/404" element={<Page404 />} />
          <Route path="/500" element={<Page500 />} />

          {/* ✅ Protect all routes with token and 2FA */}
          <Route
            path="*"
            element={
              <RequireAuth>
                <Require2FA>
                  <DefaultLayout />
                </Require2FA>
              </RequireAuth>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App

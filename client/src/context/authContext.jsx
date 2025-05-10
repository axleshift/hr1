import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const userContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // ✅ Restore user from localStorage on reload
  useEffect(() => {
    const token = localStorage.getItem('token')
    const storedUser = localStorage.getItem('user')

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
    } else {
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    }
  }, [])

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return <userContext.Provider value={{ user, login, logout }}>{children}</userContext.Provider>
}

export const useAuth = () => useContext(userContext)
export default AuthProvider

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

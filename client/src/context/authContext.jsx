// src/context/authContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const userContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
        return
      }

      try {
        const response = await axios.get('http://localhost:5000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token to backend
          },
        })

        if (response.data.success) {
          setUser(response.data.user)
        }
      } catch (error) {
        console.error('Token verification failed:', error)
        localStorage.removeItem('token')
        localStorage.removeItem('user') // optional
        if (window.location.pathname !== '/login') {
          window.location.href = '/login'
        }
      }
    }

    verifyUser()
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

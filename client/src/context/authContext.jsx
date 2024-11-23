import React, { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'

const userContext = createContext()

const authContext = ({ children }) => {
  const [user, setUser] = useState(null)

  const login = (user) => {
    setUser(user)
  }

  const logout = () => {
    localStorage.removeItem('token')
  }
  return <userContext.Provider value={{ user, login, logout }}>{children}</userContext.Provider>
}

export const useAuth = () => useContext(userContext)
export default authContext

authContext.propTypes = {
  children: PropTypes.node.isRequired,
}

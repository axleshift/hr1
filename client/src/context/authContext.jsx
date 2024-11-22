import React, { Children } from 'react'

const userContext = createContext()

const authContext = (children) => {
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

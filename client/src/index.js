import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import AuthContext from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContext>
    <App />
  </AuthContext>,
)

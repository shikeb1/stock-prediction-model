import { useState, useEffect, createContext } from 'react'


const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(
    !!localStorage.getItem('accessToken')
  )
  
  return (
    < AuthContext.Provider value={{ isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
export { AuthContext }

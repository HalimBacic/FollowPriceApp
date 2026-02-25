import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        // Provjeri nije li token istekao
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded)
        } else {
          localStorage.removeItem("jwt")
        }
      } catch {
        localStorage.removeItem("jwt")
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("jwt")
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
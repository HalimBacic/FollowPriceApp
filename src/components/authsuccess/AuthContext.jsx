import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import UtilService from "../../util/UtilService"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [hasCartItems, setHasCartItems] = useState(false)
  const [location, setLocation] = useState(() => UtilService.getUserLocation())

  useEffect(() => {
    const token = localStorage.getItem("jwt")
    if (token) {
      try {
        const decoded = jwtDecode(token)
        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded)
          const existingLocation = UtilService.getUserLocation()
          if (existingLocation) {
            setLocation(existingLocation)
          } else {
            UtilService.requestAndStoreUserLocation().then((saved) => {
              if (saved) setLocation(saved)
            })
          }
        } else {
          localStorage.removeItem("jwt")
          UtilService.clearUserLocation()
          setLocation(null)
        }
      } catch {
        localStorage.removeItem("jwt")
        UtilService.clearUserLocation()
        setLocation(null)
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("jwt")
    UtilService.clearUserLocation()
    setUser(null)
    setLocation(null)
    setHasCartItems(false)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, hasCartItems, setHasCartItems, location, setLocation }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

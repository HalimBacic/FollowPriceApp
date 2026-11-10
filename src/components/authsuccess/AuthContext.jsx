import { createContext, useContext, useState, useEffect } from "react"
import { jwtDecode } from "jwt-decode"
import UtilService from "../../util/UtilService"
import productService from "../../service/ProductService"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [cartIds, setCartIds] = useState(() => UtilService.getCartIds())
  const [hasCartItems, setHasCartItems] = useState(
    () => UtilService.getCartIds().length > 0
  )
  const [location, setLocation] = useState(() => UtilService.getUserLocation())

  const syncCart = (cart) => {
    const ids = UtilService.saveCartIds(cart)
    setCartIds(ids)
    setHasCartItems(ids.length > 0)
    return ids
  }

  const addCartItem = (barcode, storeId) => {
    const ids = UtilService.addCartIds(barcode, storeId)
    setCartIds(ids)
    setHasCartItems(ids.length > 0)
    return ids
  }

  const removeCartItem = (barcode, storeId) => {
    const ids = UtilService.removeCartIds(barcode, storeId)
    setCartIds(ids)
    setHasCartItems(ids.length > 0)
    return ids
  }

  const isInCart = (barcode, storeId) =>
    Boolean(
      (barcode != null && cartIds.includes(String(barcode))) ||
        (storeId != null && cartIds.includes(String(storeId)))
    )

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
          if (decoded.email) {
            productService.getUserCart(decoded.email).then((cart) => {
              syncCart(cart)
            })
          }
        } else {
          localStorage.removeItem("jwt")
          UtilService.clearUserLocation()
          UtilService.clearCartIds()
          setCartIds([])
          setLocation(null)
          setHasCartItems(false)
        }
      } catch {
        localStorage.removeItem("jwt")
        UtilService.clearUserLocation()
        UtilService.clearCartIds()
        setCartIds([])
        setLocation(null)
        setHasCartItems(false)
      }
    }
  }, [])

  const logout = () => {
    localStorage.removeItem("jwt")
    UtilService.clearUserLocation()
    UtilService.clearCartIds()
    setUser(null)
    setLocation(null)
    setCartIds([])
    setHasCartItems(false)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        logout,
        hasCartItems,
        setHasCartItems,
        location,
        setLocation,
        cartIds,
        syncCart,
        addCartItem,
        removeCartItem,
        isInCart,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

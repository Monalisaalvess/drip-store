import { createContext, useCallback, useContext, useMemo } from "react"
import { useLocalStorage } from "../utils/useLocalStorage.js"

const AuthContext = createContext(null)
const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1)

export function AuthProvider({ children }) {

  const [user, setUser] = useLocalStorage("drip-user", null)
  const [accounts, setAccounts] = useLocalStorage("drip-accounts", {})
  const [orders, setOrders] = useLocalStorage("drip-orders", [])
  const saveAccount = useCallback(
    (profile) => setAccounts((all) => ({ ...all, [profile.email.toLowerCase()]: profile })),[setAccounts])
  const register = useCallback(
    (profile) => {
      saveAccount(profile)
      setUser(profile)
    },
    [saveAccount, setUser]
  )

  const login = useCallback(
    (email) => {
      const saved = accounts[email.trim().toLowerCase()]
      const profile = saved ?? {
        name: capitalize(email.split("@")[0]),
        email: email.trim(),
        cpf: "",
        phone: "",
        address: "",
        district: "",
        city: "",
        cep: "",
        complement: "",
      }
      setUser(profile)
    },
    [accounts, setUser]
  )

  const logout = useCallback(() => setUser(null), [setUser])
  const updateUser = useCallback(
    (patch) => {
      const next = { ...user, ...patch }
      setUser(next)
      saveAccount(next)
    },
    [user, setUser, saveAccount]
  )

  const addOrder = useCallback((order) => setOrders((all) => [order, ...all]), [setOrders])
  const value = useMemo(
    () => ({ user, orders, register, login, logout, updateUser, addOrder }),
    [user, orders, register, login, logout, updateUser, addOrder]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error("useAuth deve ser usado dentro de <AuthProvider>")
  return context
}

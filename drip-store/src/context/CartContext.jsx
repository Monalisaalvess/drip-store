import { createContext, useCallback, useContext, useMemo } from "react"
import { useLocalStorage } from "../utils/useLocalStorage.js"

const CartContext = createContext(null)
const COUPONS = { DRIP10: 10, NIKE15: 15 }

export const FREE_SHIPPING_FROM = 400
export const SHIPPING_PRICE = 19.9
export const calcShipping = (subtotal) =>
  subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_PRICE

const initialState = { items: [], coupon: null, cep: null }

export function CartProvider({ children }) {
  const [state, setState] = useLocalStorage("drip-cart", initialState)

  const addItem = useCallback(
    ({ product, size, color, qty = 1 }) => {
      const key = `${product.id}-${size ?? "x"}-${color ?? "x"}`
      const unitPrice = product.priceDiscount ?? product.price
      setState((s) => {
        const existing = s.items.find((item) => item.key === key)
        const items = existing
          ? s.items.map((item) =>
              item.key === key ? { ...item, qty: item.qty + qty } : item
            )
          : [
              ...s.items,
              {
                key,
                id: product.id,
                name: product.name,
                image: product.image,
                reference: product.reference,
                price: unitPrice,
                originalPrice: product.price,
                size,
                color,
                qty,
              },
            ]
        return { ...s, items }
      })
    },
    [setState]
  )

  const updateQty = useCallback(
    (key, qty) =>
      setState((s) => ({
        ...s,
        items: s.items.map((item) =>
          item.key === key ? { ...item, qty: Math.min(99, Math.max(1, qty)) } : item
        ),
      })),
    [setState]
  )

  const removeItem = useCallback(
    (key) => setState((s) => ({ ...s, items: s.items.filter((item) => item.key !== key) })),
    [setState]
  )

  const clearCart = useCallback(() => setState(initialState), [setState])

  const applyCoupon = useCallback(
    (code) => {
      const normalized = String(code).trim().toUpperCase()
      const percent = COUPONS[normalized]
      if (!percent) return false
      setState((s) => ({ ...s, coupon: { code: normalized, percent } }))
      return true
    },
    [setState]
  )

  const setCep = useCallback((cep) => setState((s) => ({ ...s, cep })), [setState])

  const value = useMemo(() => {
    const count = state.items.reduce((total, item) => total + item.qty, 0)
    const subtotal = state.items.reduce((total, item) => total + item.price * item.qty, 0)
    const discount = state.coupon ? (subtotal * state.coupon.percent) / 100 : 0
    const shipping = state.cep ? calcShipping(subtotal) : 0
    const total = subtotal - discount + shipping
    return {
      items: state.items,
      coupon: state.coupon,
      cep: state.cep,
      count,
      subtotal,
      discount,
      shipping,
      total,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      applyCoupon,
      setCep,
    }
  }, [state, addItem, updateQty, removeItem, clearCart, applyCoupon, setCep])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart deve ser usado dentro de <CartProvider>")
  return context
}

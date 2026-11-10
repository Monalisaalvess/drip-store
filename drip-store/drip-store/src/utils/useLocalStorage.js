import { useEffect, useState } from "react"

// useState que também grava no localStorage (com proteção contra erros)
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* armazenamento indisponível: segue só em memória */
    }
  }, [key, value])

  return [value, setValue]
}

import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom"
import Logo from "./Logo.jsx"
import MiniCart from "./MiniCart.jsx"
import { accountLinks } from "./AccountSidebar.jsx"
import { useCart } from "../context/CartContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import miniCart from "../assets/icons/mini-cart.svg"
import "./Header.css"

const navLinks = [
  { text: "Home", to: "/", end: true },
  { text: "Produtos", to: "/produtos" },
  { text: "Categorias", to: "/categorias" },
  { text: "Meus Pedidos", to: "/meus-pedidos" },
]

// simple: versão enxuta (só logo) usada nas telas de login e cadastro
function Header({ simple = false }) {
  const [term, setTerm] = useState("")
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const cartRef = useRef(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { count } = useCart()
  const { user, logout } = useAuth()

  // fecha menu e mini carrinho ao trocar de página
  useEffect(() => {
    setMenuOpen(false)
    setCartOpen(false)
  }, [pathname])

  // fecha o mini carrinho com clique fora ou Esc
  useEffect(() => {
    if (!cartOpen) return
    const onClick = (e) => {
      if (cartRef.current && !cartRef.current.contains(e.target)) setCartOpen(false)
    }
    const onKey = (e) => e.key === "Escape" && setCartOpen(false)
    document.addEventListener("mousedown", onClick)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      document.removeEventListener("keydown", onKey)
    }
  }, [cartOpen])

  // busca ao clicar na lupa ou apertar Enter -> /products?filter=termo
  function handleSearch(event) {
    event.preventDefault()
    const value = term.trim()
    navigate(value ? `/products?filter=${encodeURIComponent(value)}` : "/products")
  }

  function handleLogout() {
    logout()
    navigate("/")
  }

  if (simple) {
    return (
      <header className="header header--simple">
        <div className="header__inner header__inner--simple container">
          <Link to="/" className="header__logo" aria-label="Digital Store - Home">
            <Logo />
          </Link>
        </div>
      </header>
    )
  }

  const firstName = user?.name?.split(" ")[0]

  return (
    <header className={`header${menuOpen ? " header--open" : ""}`}>
      <div className="header__inner container">
        <button
          type="button"
          className="header__menu-button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>

        <Link to="/" className="header__logo" aria-label="Digital Store - Home">
          <Logo />
        </Link>

        <form className="header__search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Pesquisar produto..."
            aria-label="Pesquisar produto"
          />
          <button type="submit" aria-label="Buscar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="#8f8f8f" strokeWidth="2" />
              <path d="M16.5 16.5L21 21" stroke="#8f8f8f" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <div className="header__auth">
          {user ? (
            <>
              <Link to="/minhas-informacoes" className="header__user">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="12" cy="8" r="4" stroke="#c92071" strokeWidth="1.8" />
                  <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" stroke="#c92071" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
                Olá, {firstName}
              </Link>
              <button type="button" className="header__logout" onClick={handleLogout}>
                Sair
              </button>
            </>
          ) : (
            <>
              <Link to="/cadastro" className="header__signup">
                Cadastre-se
              </Link>
              <Link to="/login" className="header__login">
                Entrar
              </Link>
            </>
          )}
        </div>

        <div className="header__cart" ref={cartRef}>
          <button
            type="button"
            className="header__cart-button"
            onClick={() => setCartOpen((open) => !open)}
            aria-label={`Carrinho de compras, ${count} ${count === 1 ? "item" : "itens"}`}
            aria-expanded={cartOpen}
          >
            <img src={miniCart} alt="" width={20} height={21} />
            {count > 0 && <span className="header__cart-badge">{count > 99 ? "99+" : count}</span>}
          </button>
          {cartOpen && <MiniCart onClose={() => setCartOpen(false)} />}
        </div>

        <nav className="header__nav" aria-label="Navegação principal">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `header__nav-link${isActive ? " header__nav-link--active" : ""}`
              }
            >
              {link.text}
            </NavLink>
          ))}
          {user && (
            <div className="header__account-links">
              <p>Minha Conta</p>
              {accountLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `header__nav-link${isActive ? " header__nav-link--active" : ""}`
                  }
                >
                  {link.text}
                </NavLink>
              ))}
              <button type="button" className="header__logout" onClick={handleLogout}>
                Sair
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Header

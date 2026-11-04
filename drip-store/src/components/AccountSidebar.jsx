import { NavLink } from "react-router-dom"
import "./AccountSidebar.css"

const links = [
  { text: "Meus Pedidos", to: "/meus-pedidos" },
  { text: "Minhas Informações", to: "/minhas-informacoes" },
  { text: "Métodos de Pagamento", to: "/metodos-pagamento" },
]

export { links as accountLinks }

function AccountSidebar() {
  return (
    <nav className="account-sidebar card" aria-label="Minha conta">
      <h2 className="account-sidebar__title">Minha Conta</h2>
      <ul>
        {links.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `account-sidebar__link${isActive ? " account-sidebar__link--active" : ""}`
              }
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default AccountSidebar

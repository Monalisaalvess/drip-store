import { Link } from "react-router-dom"

import AccountLayout from "./AccountLayout.jsx"
import { useAuth }   from "../context/AuthContext.jsx"

import "./pages-CSS/PaymentMethodsPage.css"

function PaymentMethodsPage() {
  const { orders: allOrders, user } = useAuth()
  const orders = allOrders.filter(
    (o) => o.profile.email.toLowerCase() === (user?.email ?? "").toLowerCase()
  )

  const cards = []
  orders.forEach((order) => {
    const { payment } = order
    if (payment.method === "card" && !cards.some((c) => c.last4 === payment.cardLast4)) {
      cards.push({ last4: payment.cardLast4, name: payment.cardName })
    }
  })

  return (
    <AccountLayout title="Métodos de Pagamento">
      {cards.length === 0 ? (
        <div className="payments__empty">
          <p>Você ainda não usou nenhum cartão nas suas compras.</p>
          <Link to="/produtos" className="btn btn--primary">
            Ver produtos
          </Link>
        </div>
      ) : (
        <ul className="payments">
          {cards.map((card) => (
            <li key={card.last4}>
              <span className="payments__label">Cartão de Crédito</span>
              <strong>•••• •••• •••• {card.last4}</strong>
              <span>{card.name}</span>
            </li>
          ))}
        </ul>
      )}
    </AccountLayout>
  )
}

export default PaymentMethodsPage

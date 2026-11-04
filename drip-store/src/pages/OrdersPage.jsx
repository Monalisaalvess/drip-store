import AccountLayout from "./AccountLayout.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import "./OrdersPage.css"

const statusClass = {
  "Pagamento pendente": "pending",
  "Pagamento aprovado": "approved",
  Finalizado: "done",
  Cancelado: "canceled",
}

// Pedidos de exemplo exibidos enquanto a pessoa ainda não fez nenhuma compra
const demoOrders = [
  { id: "20240114", date: "2024-01-14", status: "Pagamento pendente", name: "Tênis Nike Revolution 6 Next Nature Masculino", image: "/product-thumb-1.jpeg" },
  { id: "20231202", date: "2023-12-02", status: "Finalizado", name: "Tênis Nike Air Max Ultra Feminino", image: "/product-thumb-5.jpeg" },
  { id: "20231118", date: "2023-11-18", status: "Cancelado", name: "Sapatênis Levi's Marrom Masculino", image: "/product-thumb-3.jpeg" },
  { id: "20231009", date: "2023-10-09", status: "Finalizado", name: "Tênis Karhu Synchron Unissex", image: "/product-thumb-4.jpeg" },
  { id: "20230821", date: "2023-08-21", status: "Finalizado", name: "Air Jordan 1 Chicago Masculino", image: "/product-thumb-2.jpeg" },
]

const formatDate = (iso) => new Date(iso).toLocaleDateString("pt-BR")

function OrdersPage() {
  const { orders: allOrders, user } = useAuth()
  // só os pedidos feitos com o e-mail da conta logada
  const orders = allOrders.filter(
    (o) => o.profile.email.toLowerCase() === (user?.email ?? "").toLowerCase()
  )

  const rows =
    orders.length > 0
      ? orders.map((order) => ({
          id: order.id,
          date: order.date,
          status: order.status,
          image: order.items[0].image,
          name:
            order.items.length > 1
              ? `${order.items[0].name} e mais ${order.items.length - 1} ${order.items.length - 1 === 1 ? "item" : "itens"}`
              : order.items[0].name,
        }))
      : demoOrders

  return (
    <AccountLayout title="Meus Pedidos">
      <ul className="orders">
        {rows.map((order) => (
          <li className="orders__row" key={order.id}>
            <img src={order.image} alt="" width={64} height={64} />
            <div className="orders__info">
              <p className="orders__meta">
                Pedido nº {order.id} · {formatDate(order.date)}
              </p>
              <p className="orders__name">{order.name}</p>
            </div>
            <span className={`orders__status orders__status--${statusClass[order.status]}`}>{order.status}</span>
          </li>
        ))}
      </ul>
    </AccountLayout>
  )
}

export default OrdersPage

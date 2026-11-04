import { Link, Navigate, useLocation } from "react-router-dom"
import Layout from "./Layout.jsx"

import { formatPrice } from "../components/ProductCard.jsx"
import { useAuth }    from "../context/AuthContext.jsx"

import "./pages-CSS/SuccessPage.css"

function SuccessPage() {
  const { state } = useLocation()
  const { orders } = useAuth()
  const order = orders.find((o) => o.id === state?.orderId)


  if (!order) return <Navigate to="/" replace />

  const { profile, payment } = order

  return (
    <Layout>
      <div className="success page container">
        <section className="card success__card" aria-labelledby="success-title">
          <p className="success__emoji" aria-hidden="true">
            🎉
          </p>
          <h1 id="success-title" className="success__title">
            Compra Realizada
            <br />
            com sucesso!
          </h1>
          <p className="success__order">Pedido nº {order.id}</p>

          <div className="success__block">
            <h2>Informações Pessoais</h2>
            <p><span>Nome:</span> {profile.name}</p>
            <p><span>CPF:</span> {profile.cpf}</p>
            <p><span>E-mail:</span> {profile.email}</p>
            <p><span>Celular:</span> {profile.phone}</p>
          </div>

          <div className="success__block">
            <h2>Informações de Entrega</h2>
            <p><span>Endereço:</span> {profile.address}{profile.complement ? `, ${profile.complement}` : ""}</p>
            <p><span>Bairro:</span> {profile.district}</p>
            <p><span>Cidade:</span> {profile.city}</p>
            <p><span>CEP:</span> {profile.cep}</p>
          </div>

          <div className="success__block">
            <h2>Informações de Pagamento</h2>
            {payment.method === "card" ? (
              <>
                <p><span>Cartão de Crédito:</span> final {payment.cardLast4}</p>
                <p><span>Titular:</span> {payment.cardName}</p>
              </>
            ) : (
              <p><span>Boleto Bancário:</span> aguardando pagamento</p>
            )}
          </div>

          <div className="success__block">
            <h2>Resumo</h2>
            <ul className="success__items">
              {order.items.map((item) => (
                <li key={item.key}>
                  <img src={item.image} alt="" width={48} height={48} />
                  <div>
                    <p>{item.name}</p>
                    <span>
                      Tamanho {item.size} · {item.qty} x {formatPrice(item.price)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="success__total">
            <div>
              <span>Total</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
            <p>ou em até 10x de {formatPrice(order.total / 10)} sem juros</p>
          </div>

          <Link to="/meus-pedidos" className="success__link">
            Ver meus pedidos
          </Link>
        </section>

        <Link to="/produtos" className="btn btn--warning success__button">
          Continuar comprando
        </Link>
      </div>
    </Layout>
  )
}

export default SuccessPage

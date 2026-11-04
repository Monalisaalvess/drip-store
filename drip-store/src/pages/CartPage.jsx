import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import Layout from "./Layout.jsx"
import Section         from "../components/Section.jsx"
import ProductListing  from "../components/ProductListing.jsx"
import { formatPrice } from "../components/ProductCard.jsx"

import { useCart, FREE_SHIPPING_FROM } from "../context/CartContext.jsx"

import { products }       from "../data/products.js"
import { isCEP, maskCEP } from "../utils/forms.js"

import "./pages-CSS/CartPage.css"

function CartPage() {
  const navigate = useNavigate()
  const { items, subtotal, discount, shipping, total, coupon, cep, updateQty, removeItem, applyCoupon, setCep } =
    useCart()

  const [cepInput, setCepInput] = useState(cep ?? "")
  const [cepMessage, setCepMessage] = useState("")
  const [couponInput, setCouponInput] = useState(coupon?.code ?? "")
  const [couponMessage, setCouponMessage] = useState(null)

  const isEmpty = items.length === 0
  const related = products.filter((p) => !items.some((item) => item.id === p.id)).slice(0, 4)

  function handleCep() {
    if (!isCEP(cepInput)) {
      setCepMessage("Informe um CEP válido.")
      return
    }
    setCep(cepInput)
    setCepMessage("")
  }

  function handleCoupon() {
    const ok = applyCoupon(couponInput)
    setCouponMessage(
      ok
        ? { type: "success", text: "Cupom aplicado!" }
        : { type: "error", text: "Cupom inválido." }
    )
  }

  return (
    <Layout>
      <div className="cart page container">
        <section className="card cart__items" aria-label="Meu carrinho">
            <div className="cart__head">
              <h1 className="cart__title">Meu Carrinho</h1>
              <span>Quantidade</span>
              <span>Unitário</span>
              <span>Total</span>
            </div>

            {isEmpty ? (
              <div className="cart__empty">
                <p>Seu carrinho está vazio.</p>
                <Link to="/produtos" className="btn btn--primary">
                  Ver produtos
                </Link>
              </div>
            ) : (
              <ul>
                {items.map((item) => (
                  <li className="cart__row" key={item.key}>
                    <div className="cart__product">
                      <Link to={`/product/${item.id}`} className="cart__thumb">
                        <img src={item.image} alt="" width={114} height={114} />
                      </Link>
                      <div>
                        <Link to={`/product/${item.id}`} className="cart__name">
                          {item.name}
                        </Link>
                        <p className="cart__meta">Ref: {item.reference}</p>
                        <p className="cart__meta">
                          Cor: <span className="cart__swatch" style={{ background: item.color }} />
                          Tamanho: {item.size}
                        </p>
                      </div>
                    </div>

                    <div className="cart__qty">
                      <div className="cart__stepper">
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          disabled={item.qty <= 1}
                          aria-label="Diminuir quantidade"
                        >
                          −
                        </button>
                        <span aria-live="polite">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          aria-label="Aumentar quantidade"
                        >
                          +
                        </button>
                      </div>
                      <button type="button" className="cart__remove" onClick={() => removeItem(item.key)}>
                        Remover item
                      </button>
                    </div>

                    <div className="cart__unit" data-label="Unitário">
                      {item.originalPrice !== item.price && (
                        <span className="cart__old">{formatPrice(item.originalPrice)}</span>
                      )}
                      <span>{formatPrice(item.price)}</span>
                    </div>

                    <div className="cart__line-total" data-label="Total">
                      {item.originalPrice !== item.price && (
                        <span className="cart__old">{formatPrice(item.originalPrice * item.qty)}</span>
                      )}
                      <strong>{formatPrice(item.price * item.qty)}</strong>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            {!isEmpty && (
              <div className="cart__extras">
                <div className="cart__extra">
                  <label htmlFor="cart-cep">Calcular frete</label>
                  <div className="cart__extra-field">
                    <input
                      id="cart-cep"
                      value={cepInput}
                      onChange={(e) => setCepInput(maskCEP(e.target.value))}
                      placeholder="Insira seu CEP"
                      inputMode="numeric"
                    />
                    <button type="button" onClick={handleCep}>
                      OK
                    </button>
                  </div>
                  {cepMessage && <p className="cart__message cart__message--error">{cepMessage}</p>}
                  {cep && !cepMessage && (
                    <p className="cart__message">
                      {shipping === 0
                        ? "Frete grátis para o CEP " + cep
                        : `Frete para o CEP ${cep}: ${formatPrice(shipping)}`}
                    </p>
                  )}
                  {!cep && (
                    <p className="cart__hint">Frete grátis em compras acima de {formatPrice(FREE_SHIPPING_FROM)}.</p>
                  )}
                </div>

                <div className="cart__extra">
                  <label htmlFor="cart-coupon">Cupom de desconto</label>
                  <div className="cart__extra-field">
                    <input
                      id="cart-coupon"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Insira seu código"
                    />
                    <button type="button" onClick={handleCoupon}>
                      OK
                    </button>
                  </div>
                  {couponMessage && (
                    <p className={`cart__message cart__message--${couponMessage.type}`}>{couponMessage.text}</p>
                  )}
                  {!couponMessage && <p className="cart__hint">Teste com o cupom DRIP10.</p>}
                </div>
              </div>
            )}
        </section>

        <div className="cart__related">
          <Section title="Produtos Relacionados" titleAlign="left" link={{ text: "Ver todos", href: "/produtos" }}>
            <ProductListing products={related} columns={4} />
          </Section>
        </div>
        <aside className="card cart__summary" aria-label="Resumo do pedido">
          <h2 className="card__title">Resumo</h2>
          <dl className="cart__lines">
            <div>
              <dt>Subtotal:</dt>
              <dd>{formatPrice(subtotal)}</dd>
            </div>
            <div>
              <dt>Frete:</dt>
              <dd>{cep ? (shipping === 0 ? "Grátis" : formatPrice(shipping)) : "—"}</dd>
            </div>
            <div>
              <dt>Desconto{coupon ? ` (${coupon.code})` : ""}:</dt>
              <dd>{discount > 0 ? `- ${formatPrice(discount)}` : formatPrice(0)}</dd>
            </div>
          </dl>
          <div className="cart__total">
            <span>Total</span>
            <strong>{formatPrice(total)}</strong>
          </div>
          <p className="cart__installments">
            {total > 0 ? `ou em até 10x de ${formatPrice(total / 10)} sem juros` : ""}
          </p>
          <button
            type="button"
            className="btn btn--warning cart__continue"
            disabled={isEmpty}
            onClick={() => navigate("/checkout")}
          >
            Continuar
          </button>
        </aside>
      </div>
    </Layout>
  )
}

export default CartPage

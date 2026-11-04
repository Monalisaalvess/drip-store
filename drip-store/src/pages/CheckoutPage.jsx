import { useRef, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import Layout from "./Layout.jsx"
import FormField from "../components/FormField.jsx"
import { formatPrice } from "../components/ProductCard.jsx"
import { calcShipping, useCart } from "../context/CartContext.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import {
  emptyProfile,
  maskCEP,
  maskCPF,
  maskCVV,
  maskCard,
  maskExpiry,
  maskPhone,
  onlyDigits,
  isCPF,
  validateProfile,
} from "../utils/forms.js"
import "./CheckoutPage.css"

const emptyPayment = {
  method: "card",
  cardName: "",
  cardNumber: "",
  cardExpiry: "",
  cardCvv: "",
  cardCpf: "",
}

function validatePayment(payment) {
  if (payment.method === "boleto") return {}
  const errors = {}
  if (payment.cardName.trim().length < 3) errors.cardName = "Informe o nome impresso no cartão"
  if (onlyDigits(payment.cardNumber).length < 13) errors.cardNumber = "Informe um número de cartão válido"
  const [month, year] = payment.cardExpiry.split("/")
  if (!month || !year || year.length !== 2 || Number(month) < 1 || Number(month) > 12)
    errors.cardExpiry = "Validade inválida (MM/AA)"
  if (onlyDigits(payment.cardCvv).length < 3) errors.cardCvv = "Informe o código de segurança"
  if (!isCPF(payment.cardCpf)) errors.cardCpf = "Informe um CPF válido"
  return errors
}

function CheckoutPage() {
  const navigate = useNavigate()
  const { items, subtotal, discount, coupon, clearCart } = useCart()
  const { user, addOrder } = useAuth()

  const [profile, setProfile] = useState({ ...emptyProfile, ...(user ?? {}) })
  const [payment, setPayment] = useState(emptyPayment)
  const [errors, setErrors] = useState({})
  const placedRef = useRef(false) // evita voltar ao carrinho depois de finalizar o pedido

  if (items.length === 0) return placedRef.current ? null : <Navigate to="/carrinho" replace />

  const shipping = calcShipping(subtotal)
  const total = subtotal - discount + shipping

  const setProfileField = (name, value) => {
    setProfile((p) => ({ ...p, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }
  const setPaymentField = (name, value) => {
    setPayment((p) => ({ ...p, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = { ...validateProfile(profile), ...validatePayment(payment) }
    if (Object.keys(found).length > 0) {
      setErrors(found)
      // leva o foco ao primeiro campo com erro
      requestAnimationFrame(() => document.querySelector("[aria-invalid='true']")?.focus())
      return
    }

    const id = String(Date.now()).slice(-8)
    addOrder({
      id,
      date: new Date().toISOString(),
      status: payment.method === "boleto" ? "Pagamento pendente" : "Pagamento aprovado",
      items,
      subtotal,
      discount,
      shipping,
      total,
      profile,
      payment: {
        method: payment.method,
        cardName: payment.method === "card" ? payment.cardName : null,
        cardLast4: payment.method === "card" ? onlyDigits(payment.cardNumber).slice(-4) : null,
      },
    })
    placedRef.current = true
    clearCart()
    navigate("/compra-realizada", { state: { orderId: id }, replace: true })
  }

  return (
    <Layout>
      <div className="checkout page container">
        <h1 className="page-title">Finalizar Compra</h1>

        <form id="checkout-form" className="checkout__layout" onSubmit={handleSubmit} noValidate>
          <div className="checkout__forms">
            <section className="card">
              <h2 className="card__title">Informações Pessoais</h2>
              <div className="checkout__fields">
                <FormField label="Nome Completo" name="name" value={profile.name} onChange={setProfileField} error={errors.name} required placeholder="Insira seu nome" autoComplete="name" />
                <FormField label="CPF" name="cpf" value={profile.cpf} onChange={setProfileField} error={errors.cpf} mask={maskCPF} required placeholder="Insira seu CPF" inputMode="numeric" />
                <FormField label="E-mail" name="email" type="email" value={profile.email} onChange={setProfileField} error={errors.email} required placeholder="Insira seu e-mail" autoComplete="email" />
                <FormField label="Celular" name="phone" value={profile.phone} onChange={setProfileField} error={errors.phone} mask={maskPhone} required placeholder="Insira seu celular" inputMode="tel" autoComplete="tel" />
              </div>
            </section>

            <section className="card">
              <h2 className="card__title">Informações de Entrega</h2>
              <div className="checkout__fields">
                <FormField label="Endereço" name="address" value={profile.address} onChange={setProfileField} error={errors.address} required placeholder="Insira seu endereço" autoComplete="street-address" />
                <FormField label="Bairro" name="district" value={profile.district} onChange={setProfileField} error={errors.district} required placeholder="Insira seu bairro" />
                <FormField label="Cidade" name="city" value={profile.city} onChange={setProfileField} error={errors.city} required placeholder="Insira sua cidade" />
                <FormField label="CEP" name="cep" value={profile.cep} onChange={setProfileField} error={errors.cep} mask={maskCEP} required placeholder="Insira seu CEP" inputMode="numeric" autoComplete="postal-code" />
                <FormField label="Complemento" name="complement" value={profile.complement} onChange={setProfileField} placeholder="Insira complemento" />
              </div>
            </section>

            <section className="card">
              <h2 className="card__title">Informações de Pagamento</h2>
              <fieldset className="checkout__methods">
                <legend>Forma de Pagamento</legend>
                <label>
                  <input type="radio" name="method" value="card" checked={payment.method === "card"} onChange={() => setPaymentField("method", "card")} />
                  Cartão de Crédito
                </label>
                <label>
                  <input type="radio" name="method" value="boleto" checked={payment.method === "boleto"} onChange={() => setPaymentField("method", "boleto")} />
                  Boleto Bancário
                </label>
              </fieldset>

              {payment.method === "card" ? (
                <div className="checkout__fields">
                  <FormField label="Número do Cartão" name="cardNumber" value={payment.cardNumber} onChange={setPaymentField} error={errors.cardNumber} mask={maskCard} required placeholder="Insira o número do cartão" inputMode="numeric" autoComplete="cc-number" />
                  <FormField label="Nome impresso no Cartão" name="cardName" value={payment.cardName} onChange={setPaymentField} error={errors.cardName} required placeholder="Insira o nome como está no cartão" autoComplete="cc-name" />
                  <FormField half label="Validade" name="cardExpiry" value={payment.cardExpiry} onChange={setPaymentField} error={errors.cardExpiry} mask={maskExpiry} required placeholder="MM/AA" inputMode="numeric" autoComplete="cc-exp" />
                  <FormField half label="Código de Segurança (CVV)" name="cardCvv" value={payment.cardCvv} onChange={setPaymentField} error={errors.cardCvv} mask={maskCVV} required placeholder="CVV" inputMode="numeric" autoComplete="cc-csc" />
                  <FormField label="CPF do titular" name="cardCpf" value={payment.cardCpf} onChange={setPaymentField} error={errors.cardCpf} mask={maskCPF} required placeholder="Insira o CPF do titular" inputMode="numeric" />
                </div>
              ) : (
                <p className="checkout__boleto">
                  O boleto será gerado após a confirmação do pedido e tem vencimento em 3 dias úteis.
                </p>
              )}
            </section>
          </div>

          <aside className="card checkout__summary" aria-label="Resumo do pedido">
            <h2 className="card__title">Resumo</h2>
            <ul className="checkout__items">
              {items.map((item) => (
                <li key={item.key}>
                  <img src={item.image} alt="" width={48} height={48} />
                  <div>
                    <p>{item.name}</p>
                    <span>
                      {item.qty} x {formatPrice(item.price)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <dl className="checkout__lines">
              <div>
                <dt>Subtotal:</dt>
                <dd>{formatPrice(subtotal)}</dd>
              </div>
              <div>
                <dt>Frete:</dt>
                <dd>{shipping === 0 ? "Grátis" : formatPrice(shipping)}</dd>
              </div>
              <div>
                <dt>Desconto{coupon ? ` (${coupon.code})` : ""}:</dt>
                <dd>{discount > 0 ? `- ${formatPrice(discount)}` : formatPrice(0)}</dd>
              </div>
            </dl>
            <div className="checkout__total">
              <div>
                <span>Total</span>
                <strong>{formatPrice(total)}</strong>
              </div>
              <p>ou em até 10x de {formatPrice(total / 10)} sem juros</p>
            </div>
            <button type="submit" className="btn btn--warning checkout__pay">
              Realizar Pagamento
            </button>
          </aside>
        </form>
      </div>
    </Layout>
  )
}

export default CheckoutPage

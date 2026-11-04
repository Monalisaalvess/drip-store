import { useRef, useState } from "react"
import { Navigate, useLocation, useNavigate } from "react-router-dom"

import Layout from "./Layout.jsx"

import FormField   from "../components/FormField.jsx"
import { useAuth } from "../context/AuthContext.jsx"

import { emptyProfile, maskCEP, maskCPF, maskPhone, validateProfile } from "../utils/forms.js"

import "./pages-CSS/SignupFormPage.css"

function SignupFormPage() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { user, register } = useAuth()

  const [values, setValues] = useState({ ...emptyProfile, email: state?.email ?? "" })
  const [errors, setErrors] = useState({})
  const [acceptsOffers, setAcceptsOffers] = useState(true)

  const justRegistered = useRef(false) 

  if (user && !justRegistered.current) return <Navigate to="/minhas-informacoes" replace />

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = validateProfile(values)
    if (Object.keys(found).length) {
      setErrors(found)
      requestAnimationFrame(() => document.querySelector("[aria-invalid='true']")?.focus())
      return
    }
    justRegistered.current = true
    register({ ...values, acceptsOffers })
    navigate("/", { replace: true })
  }

  return (
    <Layout simpleHeader>
      <div className="signup page">
        <form className="signup__form" onSubmit={handleSubmit} noValidate>
          <h1 className="page-title">Criar Conta</h1>

          <section className="card">
            <h2 className="card__title">Informações Pessoais</h2>
            <div className="signup__fields">
              <FormField label="Nome Completo" name="name" value={values.name} onChange={setField} error={errors.name} required placeholder="Insira seu nome" autoComplete="name" />
              <FormField label="CPF" name="cpf" value={values.cpf} onChange={setField} error={errors.cpf} mask={maskCPF} required placeholder="Insira seu CPF" inputMode="numeric" />
              <FormField label="E-mail" name="email" type="email" value={values.email} onChange={setField} error={errors.email} required placeholder="Insira seu e-mail" autoComplete="email" />
              <FormField label="Celular" name="phone" value={values.phone} onChange={setField} error={errors.phone} mask={maskPhone} required placeholder="Insira seu celular" inputMode="tel" autoComplete="tel" />
            </div>
          </section>

          <section className="card">
            <h2 className="card__title">Informações de Entrega</h2>
            <div className="signup__fields">
              <FormField label="Endereço" name="address" value={values.address} onChange={setField} error={errors.address} required placeholder="Insira seu endereço" autoComplete="street-address" />
              <FormField label="Bairro" name="district" value={values.district} onChange={setField} error={errors.district} required placeholder="Insira seu bairro" />
              <FormField label="Cidade" name="city" value={values.city} onChange={setField} error={errors.city} required placeholder="Insira sua cidade" />
              <FormField label="CEP" name="cep" value={values.cep} onChange={setField} error={errors.cep} mask={maskCEP} required placeholder="Insira seu CEP" inputMode="numeric" autoComplete="postal-code" />
              <FormField label="Complemento" name="complement" value={values.complement} onChange={setField} placeholder="Insira complemento" />
            </div>
          </section>

          <label className="signup__offers">
            <input type="checkbox" checked={acceptsOffers} onChange={(e) => setAcceptsOffers(e.target.checked)} />
            <span>
              Quero receber por e-mail ofertas e novidades das lojas da Digital Store. A frequência de envios pode variar de acordo com a interação do cliente.
            </span>
          </label>

          <button type="submit" className="btn btn--primary signup__submit">
            Criar Conta
          </button>
        </form>
      </div>
    </Layout>
  )
}

export default SignupFormPage

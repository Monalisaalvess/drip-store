import { useState } from "react"
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom"
import AuthHero from "./AuthHero.jsx"
import FormField from "../components/FormField.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import { isEmail } from "../utils/forms.js"

function LoginPage() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()
  const redirectTo = state?.from ?? "/meus-pedidos"

  const [values, setValues] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState({})

  if (user) return <Navigate to={redirectTo} replace />

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }))
    setErrors((e) => ({ ...e, [name]: undefined }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const found = {}
    if (!isEmail(values.email)) found.email = "Informe um e-mail válido"
    if (values.password.length < 4) found.password = "A senha deve ter ao menos 4 caracteres"
    if (Object.keys(found).length) {
      setErrors(found)
      return
    }
    login(values.email)
    navigate(redirectTo, { replace: true })
  }

  return (
    <AuthHero>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1 className="auth-form__title">Acesse sua conta</h1>
        <p className="auth-form__subtitle">
          Novo cliente? Então registre-se <Link to="/cadastro">aqui</Link>.
        </p>
        <FormField label="Login" name="email" type="email" value={values.email} onChange={setField} error={errors.email} placeholder="Insira seu login ou e-mail" autoComplete="email" />
        <FormField label="Senha" name="password" type="password" value={values.password} onChange={setField} error={errors.password} placeholder="Insira sua senha" autoComplete="current-password" />
        <button type="submit" className="btn btn--primary auth-form__button">
          Acessar Conta
        </button>
        <div className="auth-form__social">
          <span>Ou faça login com</span>
          <button type="button" className="g" aria-label="Entrar com Google (em breve)" title="Em breve">G</button>
          <button type="button" className="f" aria-label="Entrar com Facebook (em breve)" title="Em breve">f</button>
        </div>
      </form>
    </AuthHero>
  )
}

export default LoginPage

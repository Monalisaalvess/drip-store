import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import AuthHero from "./AuthHero.jsx"
import FormField from "../components/FormField.jsx"
import { isEmail } from "../utils/forms.js"

// Primeira etapa do cadastro: só o e-mail
function SignupPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")

  function handleSubmit(event) {
    event.preventDefault()
    if (!isEmail(email)) {
      setError("Informe um e-mail válido")
      return
    }
    navigate("/cadastro/formulario", { state: { email: email.trim() } })
  }

  return (
    <AuthHero>
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h1 className="auth-form__title">Crie sua conta</h1>
        <p className="auth-form__subtitle">
          Já possui cadastro? Entre <Link to="/login">aqui</Link>.
        </p>
        <FormField
          label="E-mail"
          name="email"
          type="email"
          value={email}
          onChange={(_, value) => {
            setEmail(value)
            setError("")
          }}
          error={error}
          placeholder="Insira seu e-mail"
          autoComplete="email"
        />
        <button type="submit" className="btn btn--primary auth-form__button">
          Criar Conta
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

export default SignupPage

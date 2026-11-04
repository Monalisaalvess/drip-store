import Layout from "./Layout.jsx"
import "./AuthHero.css"

// Moldura das telas de login e "crie sua conta": cartão à esquerda e imagem à direita
function AuthHero({ children }) {
  return (
    <Layout simpleHeader>
      <div className="auth-hero">
        <div className="auth-hero__inner container">
          <section className="auth-hero__card">{children}</section>
          <img className="auth-hero__image" src="/produc-image-5.jpeg" alt="" aria-hidden="true" />
        </div>
      </div>
    </Layout>
  )
}

export default AuthHero

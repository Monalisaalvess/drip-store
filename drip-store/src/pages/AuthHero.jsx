import Layout from "./Layout.jsx"
import "./pages-CSS/AuthHero.css"
 
function AuthHero({ children }) {
  return (
    <Layout simpleHeader>
      <div className="auth-hero">
        <div className="auth-hero__inner container">
          <section className="auth-hero__card">{children}</section>
          <img className="auth-hero-image" src="./public/slide-tenis.png" alt="" aria-hidden="true" />
        </div>
      </div>
    </Layout>
  )
}

export default AuthHero

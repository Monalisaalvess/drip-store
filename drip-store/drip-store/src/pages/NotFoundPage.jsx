import { Link } from "react-router-dom"
import Layout from "./Layout.jsx"
import "./pages-CSS/StatusPage.css"

function NotFoundPage() {
  return (
    <Layout>
      <div className="status-page container">
        <h1>Página não encontrada</h1>
        <p>O endereço que você acessou não existe ou foi removido.</p>
        <Link to="/" className="status-page__button">
          Voltar para a Home
        </Link>
      </div>
    </Layout>
  )
}

export default NotFoundPage

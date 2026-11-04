import { Link } from "react-router-dom"
import Layout from "./Layout.jsx"
import "./StatusPage.css"

function ComingSoonPage({ title }) {
  return (
    <Layout>
      <div className="status-page container">
        <h1>{title}</h1>
        <p>Esta página será desenvolvida em uma próxima etapa do projeto.</p>
        <Link to="/" className="status-page__button">
          Voltar para a Home
        </Link>
      </div>
    </Layout>
  )
}

export default ComingSoonPage

import { Link } from "react-router-dom"
import   Layout from "./Layout.jsx"

import "./pages-CSS/StatusPage.css"

function ComingSoonPage({ title }) {
  return (
    <Layout>
      <div className="status-page container">
        <h1>{title}</h1>
        <p>Esta página ainda será desenvolvida.</p>
        <Link to="/" className="status-page__button">
          Voltar para a Home
        </Link>
      </div>
    </Layout>
  )
}

export default ComingSoonPage

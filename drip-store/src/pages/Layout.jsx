import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "./Layout.css"

// Estrutura comum a todas as páginas: Header + conteúdo + Footer
// simpleHeader: header só com a logo (telas de login e cadastro)
const Layout = ({ children, simpleHeader = false }) => {
  return (
    <div className="layout">
      <Header simple={simpleHeader} />
      <main className="layout__content">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout

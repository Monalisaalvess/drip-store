import Header from "../components/Header.jsx"
import Footer from "../components/Footer.jsx"
import "./pages-CSS/Layout.css"

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

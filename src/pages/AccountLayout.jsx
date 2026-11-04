import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Layout from "./Layout.jsx"
import AccountSidebar from "../components/AccountSidebar.jsx"
import { useAuth } from "../context/AuthContext.jsx"
import "./pages-CSS/AccountLayout.css"

function AccountLayout({ title, action, children }) {
  const { user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) navigate("/login", { replace: true, state: { from: location.pathname } })
  }, [user, navigate, location.pathname])

  if (!user) return null

  return (
    <Layout>
      <div className="account page container">
        <AccountSidebar />
        <section className="card account__content">
          <header className="account__header">
            <h1 className="account__title">{title}</h1>
            {action}
          </header>
          {children}
        </section>
      </div>
    </Layout>
  )
}

export default AccountLayout

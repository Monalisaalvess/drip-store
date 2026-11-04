import { Link } from "react-router-dom"
import "./Section.css"

// title: texto do título | titleAlign: "left" (padrão) ou "center"
// link: { text, href } | children: conteúdo da seção
function Section({ title, titleAlign = "left", link, children }) {
  return (
    <section className="section">
      <header className={`section__header section__header--${titleAlign}`}>
        <h2 className="section__title">{title}</h2>
        {link && (
          <Link className="section__link" to={link.href}>
            {link.text}
          </Link>
        )}
      </header>
      {children}
    </section>
  )
}

export default Section

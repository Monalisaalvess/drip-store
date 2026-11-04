import { Link } from "react-router-dom"
import "./components-CSS/FooterInfo.css"

function FooterInfo({ title, informations = [] }) {
  return (
    <div className="footer-info">
      <h3 className="footer-info__title">{title}</h3>
      <ul className="footer-info__list">
        {informations.map((info) => (
          <li key={info.text}>
            {info.link ? (
              <Link to={info.link}>{info.text}</Link>
            ) : (
              <span>{info.text}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FooterInfo

import logoHeader from "../assets/logo-header.svg"
import logoFooter from "../assets/logo-footer.svg"
import "./components-CSS/Logo.css"

function Logo({ variant = "header" }) {
  const src = variant === "footer" ? logoFooter : logoHeader
  return (
    <img
      className="logo"
      src={src}
      alt="Digital Store"
      width={253}
      height={44}
    />
  )
}

export default Logo

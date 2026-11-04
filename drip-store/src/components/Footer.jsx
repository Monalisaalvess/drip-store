import Logo from "./Logo.jsx"
import FooterInfo from "./FooterInfo.jsx"
import facebook from "../assets/icons/facebook.svg"
import instagram from "../assets/icons/instagram.svg"
import twitter from "../assets/icons/twitter.svg"
import "./Footer.css"

const informacao = [
  { text: "Sobre Drip Store", link: "/about" },
  { text: "Segurança", link: "/security" },
  { text: "Wishlist", link: "/wishlist" },
  { text: "Blog", link: "/blog" },
  { text: "Trabalhe conosco", link: "/jobs" },
  { text: "Meus Pedidos", link: "/meus-pedidos" },
]

const categorias = [
  { text: "Camisetas", link: "/produtos?filter=camisetas" },
  { text: "Calças", link: "/produtos?filter=calcas" },
  { text: "Bonés", link: "/produtos?filter=bones" },
  { text: "Headphones", link: "/produtos?filter=headphones" },
  { text: "Tênis", link: "/produtos?filter=tenis" },
]

const contato = [
  { text: "Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161" },
  { text: "(85) 3051-3411" },
]

const socials = [
  { name: "Facebook", icon: facebook, href: "https://www.facebook.com" },
  { name: "Instagram", icon: instagram, href: "https://www.instagram.com" },
  { name: "Twitter", icon: twitter, href: "https://twitter.com" },
]

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner container">
        <div className="footer__brand">
          <Logo variant="footer" />
          <p className="footer__description">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
          </p>
          <ul className="footer__socials">
            {socials.map((social) => (
              <li key={social.name}>
                <a href={social.href} target="_blank" rel="noreferrer" aria-label={social.name}>
                  <img src={social.icon} alt="" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <FooterInfo title="Informação" informations={informacao} />
        <FooterInfo title="Categorias" informations={categorias} />
        <FooterInfo title="Contato" informations={contato} />
      </div>

      <div className="footer__bottom container">
        <hr />
        <p>© {new Date().getFullYear()} Digital Store</p>
      </div>
    </footer>
  )
}

export default Footer

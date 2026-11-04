import Layout from "./Layout.jsx"
import Gallery from "../components/Gallery.jsx"
import Section from "../components/Section.jsx"
import ProductListing from "../components/ProductListing.jsx"
import { products } from "../data/products.js"
import "./HomePage.css"
import HeroSlider from "../components/HeroSlider.jsx"

const collections = [
  { src: "/collection-1.png", alt: "Novo drop Supreme" },
  { src: "/collection-2.png", alt: "Coleção Adidas" },
  { src: "/collection-3.png", alt: "Novo Beats Bass" },
]

function HomePage() {
  return (
    <Layout>
      <HeroSlider/>

      <div className="home__sections container">
        <Section title="Coleções em destaque" titleAlign="center">
          <ul className="home__collections">
            {collections.map((collection) => (
              <li key={collection.src}>
                <img src={collection.src} alt={collection.alt} width={405} height={251} />
              </li>
            ))}
          </ul>
        </Section>

        <Section title="Produtos em alta" titleAlign="left">
          <ProductListing products={products.slice(0, 8)} columns={4} />
        </Section>
      </div>
    </Layout>
  )
}

export default HomePage

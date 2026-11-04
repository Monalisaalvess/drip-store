import { useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"

import Layout from "./Layout.jsx"

import Gallery from "../components/Gallery.jsx"
import BuyBox  from "../components/BuyBox.jsx"
import Section from "../components/Section.jsx"

import ProductOptions from "../components/ProductOptions.jsx"
import ProductListing from "../components/ProductListing.jsx"

import { getProductById, products } from "../data/products.js"

import { useCart }  from "../context/CartContext.jsx"
import NotFoundPage from "./NotFoundPage.jsx"

import "./pages-CSS/ProductViewPage.css"

function ProductViewPage() {
  const { id } = useParams()
  const product = getProductById(id)
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [size, setSize] = useState(null)
  const [color, setColor] = useState(null)
  const [error, setError] = useState("")

  if (!product) return <NotFoundPage />

  function handleBuy() {
    if (!size) {
      setError("Selecione um tamanho antes de comprar.")
      return
    }
    addItem({ product, size, color: color ?? product.colors[0] })
    navigate("/carrinho")
  }

  const recommended = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <Layout>
      <div className="product-view container">
        <nav className="product-view__breadcrumb" aria-label="Você está em">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/produtos">Produtos</Link>
          <span>/</span>
          <span>{product.category}</span>
          <span>/</span>
          <span>{product.brand}</span>
          <span>/</span>
          <span aria-current="page">{product.name}</span>
        </nav>

        <div className="product-view__main">
          <div className="product-view__gallery">
            <Gallery
              images={product.images}
              showThumbs
              width="700px"
              height="570px"
              radius="4px"
            />
          </div>

          <BuyBox
            name={product.name}
            reference={product.reference}
            stars={product.stars}
            rating={product.rating}
            price={product.price}
            priceDiscount={product.priceDiscount}
            description={product.description}
            onBuy={handleBuy}
            error={error}
          >
            <ProductOptions
              title="Tamanho"
              options={product.sizes}
              shape="square"
              radius="4px"
              type="text"
              onChange={(value) => {
                setSize(value)
                setError("")
              }}
            />
            <ProductOptions
              title="Cor"
              options={product.colors}
              shape="circle"
              type="color"
              onChange={setColor}
            />
          </BuyBox>
        </div>

        <Section
          title="Produtos recomendados"
          titleAlign="left"
          link={{ text: "Ver todos", href: "/produtos" }}
        >
          <ProductListing products={recommended} columns={4} />
        </Section>
      </div>
    </Layout>
  )
}

export default ProductViewPage

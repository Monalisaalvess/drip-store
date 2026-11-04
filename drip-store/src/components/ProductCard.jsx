import { Link } from "react-router-dom"
import "./ProductCard.css"

export const formatPrice = (value) =>
  Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })

// image, name, price, priceDiscount (obrigatórios pelo README)
// id e category são opcionais: id transforma o card em link para /product/:id
function ProductCard({ id, image, name, price, priceDiscount, category }) {
  const hasDiscount = priceDiscount !== undefined && priceDiscount !== null
  const percent = hasDiscount ? Math.round((1 - priceDiscount / price) * 100) : 0

  const content = (
    <>
      <div className="product-card__image">
        <img src={image} alt={name} width={292} height={321} loading="lazy" />
        {hasDiscount && percent > 0 && (
          <span className="product-card__badge">{percent}% OFF</span>
        )}
      </div>
      {category && <span className="product-card__category">{category}</span>}
      <h3 className="product-card__name">{name}</h3>
      <p className="product-card__prices">
        {hasDiscount ? (
          <>
            <span className="product-card__price product-card__price--old">
              {formatPrice(price)}
            </span>
            <span className="product-card__price">{formatPrice(priceDiscount)}</span>
          </>
        ) : (
          <span className="product-card__price">{formatPrice(price)}</span>
        )}
      </p>
    </>
  )

  return id !== undefined ? (
    <Link className="product-card" to={`/product/${id}`}>
      {content}
    </Link>
  ) : (
    <article className="product-card">{content}</article>
  )
}

export default ProductCard

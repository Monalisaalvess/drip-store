import ProductCard from "./ProductCard.jsx"
import "./components-CSS/ProductListing.css"

function ProductListing({ products = [], columns = 4 }) {
  return (
    <div className={`product-listing product-listing--${columns}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id ?? product.name + product.image}
          id={product.id}
          image={product.image}
          name={product.name}
          price={product.price}
          priceDiscount={product.priceDiscount}
          category={product.category}
        />
      ))}
    </div>
  )
}

export default ProductListing

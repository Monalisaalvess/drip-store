import { Link } from "react-router-dom"
import { useCart } from "../context/CartContext.jsx"
import { formatPrice } from "./ProductCard.jsx"
import "./MiniCart.css"

// Pop-up do carrinho exibido ao clicar no ícone do header
function MiniCart({ onClose }) {
  const { items, total, subtotal, clearCart, removeItem } = useCart()
  const isEmpty = items.length === 0

  return (
    <div className="mini-cart" role="dialog" aria-label="Meu carrinho">
      {isEmpty ? (
        <p className="mini-cart__empty">Seu carrinho está vazio.</p>
      ) : (
        <>
          <ul className="mini-cart__list">
            {items.map((item) => (
              <li className="mini-cart__item" key={item.key}>
                <img src={item.image} alt="" width={56} height={56} />
                <div className="mini-cart__info">
                  <p className="mini-cart__name">{item.name}</p>
                  <p className="mini-cart__price">
                    {item.qty} x {formatPrice(item.price)}
                  </p>
                </div>
                <button
                  type="button"
                  className="mini-cart__remove"
                  onClick={() => removeItem(item.key)}
                  aria-label={`Remover ${item.name}`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
          <div className="mini-cart__total">
            <span>Valor total:</span>
            <strong>{formatPrice(subtotal || total)}</strong>
          </div>
        </>
      )}
      <div className="mini-cart__actions">
        {!isEmpty && (
          <button type="button" className="mini-cart__clear" onClick={clearCart}>
            Esvaziar
          </button>
        )}
        <Link to="/carrinho" className="btn btn--primary mini-cart__button" onClick={onClose}>
          Ver Carrinho
        </Link>
      </div>
    </div>
  )
}

export default MiniCart

import { useState } from "react"
import "./components-CSS/ProductOptions.css"

function ProductOptions({ options = [], radius = "4px", shape = "square", type = "text", title, onChange }) {
  const [selected, setSelected] = useState(null)

  function select(option) {
    setSelected(option)
    onChange?.(option)
  }

  return (
    <div className="product-options">
      {title && <p className="product-options__title">{title}</p>}
      <ul className="product-options__list">
        {options.map((option) => {
          const isSelected = selected === option
          const style =
            shape === "square"
              ? { borderRadius: radius }
              : undefined
          const colorStyle = type === "color" ? { background: option } : undefined
          return (
            <li key={option}>
              <button
                type="button"
                className={`product-options__item product-options__item--${shape}${
                  isSelected ? " product-options__item--selected" : ""
                }`}
                style={{ ...style, ...colorStyle }}
                onClick={() => select(option)}
                aria-pressed={isSelected}
                aria-label={type === "color" ? `Cor ${option}` : `Tamanho ${option}`}
              >
                {type === "text" ? option : null}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default ProductOptions

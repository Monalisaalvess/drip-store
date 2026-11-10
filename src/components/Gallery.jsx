import { useState } from "react"

import arrowLeft  from "../assets/icons/arrow-left.svg"
import arrowRight from "../assets/icons/arrow-right.svg"

import "./components-CSS/Gallery.css"

const toNumber = (value) => {
  const n = parseFloat(value)
  return Number.isNaN(n) ? undefined : n
}

function Gallery({ images = [], width, height, radius = "0px", showThumbs = false, className = "" }) {
  const [index, setIndex] = useState(0)
  const w = toNumber(width)
  const h = toNumber(height)
  const isFirst = index === 0
  const isLast = index === images.length - 1

  return (
    <div
      className={`gallery ${className}`.trim()}
      style={{ maxWidth: w ? `${w}px` : undefined }}
    >
      <div
        className="gallery__viewport"
        style={{
          aspectRatio: w && h ? `${w} / ${h}` : undefined,
          borderRadius: radius,
        }}
      >
        <div
          className="gallery__track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {images.map((image, i) => (
            <div className="gallery__slide" key={image.src} aria-hidden={i !== index}>
              <img src={image.src} alt={`Imagem ${i + 1} de ${images.length}`} />
            </div>
          ))}
        </div>

        <button
          type="button"
          className="gallery__arrow gallery__arrow--left"
          onClick={() => setIndex((i) => i - 1)}
          disabled={isFirst}
          aria-label="Imagem anterior"
        >
          <img src={arrowLeft} alt="" />
        </button>
        <button
          type="button"
          className="gallery__arrow gallery__arrow--right"
          onClick={() => setIndex((i) => i + 1)}
          disabled={isLast}
          aria-label="Próxima imagem"
        >
          <img src={arrowRight} alt="" />
        </button>
      </div>

      {showThumbs && (
        <ul className="gallery__thumbs">
          {images.map((image, i) => (
            <li key={image.src}>
              <button
                type="button"
                className={`gallery__thumb${i === index ? " gallery__thumb--active" : ""}`}
                style={{ borderRadius: radius }}
                onClick={() => setIndex(i)}
                aria-label={`Ver imagem ${i + 1}`}
                aria-current={i === index}
              >
                <img src={image.src} alt="" width={117} height={95} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default Gallery
